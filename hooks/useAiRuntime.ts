import { useCallback } from 'react';
import { useAiSettings } from '../context/AiSettingsContext';
import type { AiModelSlot } from '../lib/ai/ai-slots';
import { isTextOnlyAiProvider, type AiProviderId } from '../lib/ai/provider-options';

const OPENCODE_GO_API_BASE = 'https://opencode.ai/zen/go/v1';
const DEEPSEEK_API_BASE = 'https://api.deepseek.com';

const getBuildTimeGeminiApiKey = () => String(
  process.env.API_KEY
  || process.env.GEMINI_API_KEY
  || process.env.VITE_GEMINI_API_KEY
  || '',
);

const extractText = (response: any) => String(response?.text || '').trim();

const imageDataUrlToParts = (imageDataUrl: string, prompt: string) => {
  const base64ImageData = imageDataUrl.split(',')[1];
  const mimeType = imageDataUrl.match(/data:(.*);/)?.[1] || 'image/png';
  return {
    parts: [
      { inlineData: { data: base64ImageData, mimeType } },
      { text: prompt },
    ],
  };
};

const extractImageDataUrl = (response: any) => {
  if (response?.candidates && response.candidates[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};

const getGeminiClient = async (apiKey: string) => {
  if (!apiKey) {
    throw new Error('Add a Gemini API key to use the Gemini provider (Image or Vision slot).');
  }
  const { GoogleGenAI } = await import('@google/genai');
  return new GoogleGenAI({ apiKey });
};

const resolveOpenAiCompatibleBase = async (provider: AiProviderId) => {
  if (provider === 'opencode-go') return OPENCODE_GO_API_BASE;
  if (provider === 'deepseek') return DEEPSEEK_API_BASE;
  if (provider === 'zhipu') {
    const { ZHIPU_CODING_API_BASE } = await import('../lib/ai/zhipu');
    return ZHIPU_CODING_API_BASE;
  }
  if (provider === 'xai' || provider === 'xai-oauth') {
    const { XAI_API_BASE } = await import('../lib/ai/xai');
    return XAI_API_BASE;
  }
  if (provider === 'openai') {
    const { OPENAI_API_BASE } = await import('../lib/ai/openai');
    return OPENAI_API_BASE;
  }
  return '';
};

export const useAiRuntime = () => {
  const { slots, resolveProviderCredential } = useAiSettings();

  const runSlot = useCallback(async (slot: AiModelSlot) => {
    const cfg = slots[slot];
    const credential = await resolveProviderCredential(cfg.provider);
    if (!credential) {
      throw new Error(
        cfg.provider === 'xai-oauth'
          ? 'Connect SuperGrok OAuth in Settings (device code + browser).'
          : `Add an API key for ${cfg.provider} in the ${slot} slot Settings.`,
      );
    }
    return { ...cfg, credential };
  }, [slots, resolveProviderCredential]);

  const generateText = useCallback(async (params: {
    prompt: string;
    json?: boolean;
    imageDataUrl?: string | null;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
    modelOverride?: string;
    purpose?: 'simple' | 'creative';
  }) => {
    const slot: AiModelSlot = params.imageDataUrl
      ? 'vision'
      : (params.purpose === 'simple' ? 'simple' : 'creative');
    const { provider, modelId, credential } = await runSlot(slot);
    const selectedModel = params.modelOverride || modelId;

    const messages: Array<{
      role: 'system' | 'user' | 'assistant';
      content: string | Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }>;
    }> = [];
    if (params.systemPrompt) {
      messages.push({ role: 'system', content: params.systemPrompt });
    }
    if (params.imageDataUrl) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: params.prompt },
          { type: 'image_url', image_url: { url: params.imageDataUrl } },
        ],
      });
    } else {
      messages.push({ role: 'user', content: params.prompt });
    }

    if (provider === 'openrouter') {
      const { fetchOpenRouterChatCompletion } = await import('../lib/ai/openrouter');
      const result = await fetchOpenRouterChatCompletion({
        apiKey: credential,
        model: selectedModel,
        messages,
        responseFormat: params.json ? { type: 'json_object' } : undefined,
        temperature: params.temperature,
        maxTokens: params.maxTokens,
      });
      return result.content;
    }

    if (provider === 'anthropic') {
      const { fetchAnthropicChatCompletion } = await import('../lib/ai/anthropic');
      const result = await fetchAnthropicChatCompletion({
        apiKey: credential,
        model: selectedModel,
        messages,
        responseFormat: params.json ? { type: 'json_object' } : undefined,
        temperature: params.temperature,
        maxTokens: params.maxTokens,
      });
      return result.content;
    }

    if (provider === 'gemini') {
      const ai = await getGeminiClient(credential || getBuildTimeGeminiApiKey());
      const config = params.json ? { responseMimeType: 'application/json' as const } : undefined;
      const contents = params.imageDataUrl
        ? imageDataUrlToParts(params.imageDataUrl, params.prompt)
        : params.prompt;
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config,
      });
      return extractText(response);
    }

    // OpenAI-compatible family
    if (
      provider === 'openai'
      || provider === 'opencode-go'
      || provider === 'deepseek'
      || provider === 'zhipu'
      || provider === 'xai'
      || provider === 'xai-oauth'
    ) {
      if (params.imageDataUrl && isTextOnlyAiProvider(provider)) {
        throw new Error(`Vision prompts are not available with ${provider}.`);
      }
      const { fetchOpenAiCompatibleChatCompletion } = await import('../lib/ai/openai-compatible');
      const baseUrl = await resolveOpenAiCompatibleBase(provider);
      const result = await fetchOpenAiCompatibleChatCompletion({
        baseUrl,
        apiKey: credential,
        model: selectedModel,
        messages,
        responseFormat: params.json ? { type: 'json_object' } : undefined,
        temperature: params.temperature,
        maxTokens: params.maxTokens,
      });
      return result.content;
    }

    throw new Error(`Unsupported provider for text: ${provider}`);
  }, [runSlot]);

  const generateImage = useCallback(async (params: {
    prompt: string;
    aspectRatio?: string;
    referenceImageDataUrl?: string | null;
    modelOverride?: string;
  }) => {
    const { provider, modelId, credential } = await runSlot('image');
    const selectedModel = params.modelOverride || modelId;

    if (provider === 'openrouter') {
      const { fetchOpenRouterChatCompletion } = await import('../lib/ai/openrouter');
      const messages = params.referenceImageDataUrl
        ? [{
          role: 'user' as const,
          content: [
            { type: 'text' as const, text: params.prompt },
            { type: 'image_url' as const, image_url: { url: params.referenceImageDataUrl } },
          ],
        }]
        : [{ role: 'user' as const, content: params.prompt }];
      const result = await fetchOpenRouterChatCompletion({
        apiKey: credential,
        model: selectedModel,
        messages,
        modalities: ['image', 'text'],
        imageConfig: params.aspectRatio ? { aspect_ratio: params.aspectRatio } : undefined,
      });
      const image = result.images[0];
      if (!image) throw new Error('The model did not return an image.');
      return image;
    }

    if (provider === 'gemini') {
      const ai = await getGeminiClient(credential || getBuildTimeGeminiApiKey());
      const { Modality } = await import('@google/genai');
      if (params.referenceImageDataUrl) {
        const response = await ai.models.generateContent({
          model: selectedModel,
          contents: imageDataUrlToParts(params.referenceImageDataUrl, params.prompt),
          config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
        });
        const image = extractImageDataUrl(response);
        if (!image) throw new Error('The AI did not return an image.');
        return image;
      }
      const response = await ai.models.generateImages({
        model: selectedModel,
        prompt: params.prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: params.aspectRatio || '1:1',
          outputMimeType: 'image/png',
        },
      });
      if (!response.generatedImages?.length) {
        throw new Error('The AI did not return an image.');
      }
      return `data:image/png;base64,${response.generatedImages[0].image.imageBytes}`;
    }

    throw new Error(`Image generation is not available with the ${provider} provider in this app yet. Use Gemini or OpenRouter on the Image slot.`);
  }, [runSlot]);

  const analyzeImage = useCallback(async (params: {
    prompt: string;
    imageDataUrl: string;
    json?: boolean;
    modelOverride?: string;
  }) => generateText({
    prompt: params.prompt,
    imageDataUrl: params.imageDataUrl,
    json: params.json,
    modelOverride: params.modelOverride,
    purpose: 'creative',
  }), [generateText]);

  return {
    generateText,
    generateImage,
    analyzeImage,
    // legacy fields some callers may read
    provider: slots.creative.provider,
    providerTextModelId: slots.creative.modelId,
    providerSimpleModelId: slots.simple.modelId,
    providerVisionModelId: slots.vision.modelId,
    providerImageModelId: slots.image.modelId,
    providerApiKey: slots.creative.apiKey,
    resolvedProviderApiKey: slots.creative.apiKey,
  };
};
