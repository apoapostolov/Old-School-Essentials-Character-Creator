/**
 * Central model catalog loaders for every AiProviderId.
 * Used by multi-slot settings (one catalog cache per provider).
 */
import type { OpenRouterModelSummary } from './openrouter';
import type { AiProviderId } from './provider-options';
import { ensureModelPresent, sortOpenRouterModels } from './openrouter';

const FALLBACKS: Record<string, OpenRouterModelSummary> = {
  openai: {
    id: 'gpt-4o-mini',
    baseName: 'GPT-4o Mini',
    name: 'GPT-4o Mini',
    description: undefined,
    outputModalities: ['text'],
    inputModalities: ['text', 'image'],
    mixedPricePerMillionUsd: 0.75,
    priceLabel: '$0.75',
  },
};

const asSummary = (partial: Partial<OpenRouterModelSummary> & { id: string; baseName: string }): OpenRouterModelSummary => ({
  id: partial.id,
  baseName: partial.baseName,
  name: partial.name || partial.baseName,
  description: partial.description,
  outputModalities: partial.outputModalities || ['text'],
  inputModalities: partial.inputModalities || ['text'],
  mixedPricePerMillionUsd: partial.mixedPricePerMillionUsd ?? 0,
  priceLabel: partial.priceLabel || '—',
});

/** Minimal offline defaults when a provider catalog is empty. */
export const getMinimalModelsForProvider = (provider: AiProviderId): OpenRouterModelSummary[] => {
  switch (provider) {
    case 'openai':
      return sortOpenRouterModels([
        asSummary({ id: 'gpt-4o-mini', baseName: 'GPT-4o Mini', inputModalities: ['text', 'image'], mixedPricePerMillionUsd: 0.75, priceLabel: '$0.75' }),
        asSummary({ id: 'gpt-4.1', baseName: 'GPT-4.1', inputModalities: ['text', 'image'], mixedPricePerMillionUsd: 5, priceLabel: '$5.00' }),
        asSummary({ id: 'gpt-4o', baseName: 'GPT-4o', inputModalities: ['text', 'image'], mixedPricePerMillionUsd: 6.25, priceLabel: '$6.25' }),
      ]);
    case 'openai-codex':
      return sortOpenRouterModels([
        asSummary({ id: 'gpt-5.6-luna', baseName: 'GPT-5.6 Luna', inputModalities: ['text', 'image'], priceLabel: 'plan' }),
        asSummary({ id: 'gpt-5.6-terra', baseName: 'GPT-5.6 Terra', inputModalities: ['text', 'image'], priceLabel: 'plan' }),
        asSummary({ id: 'gpt-5.5', baseName: 'GPT-5.5', inputModalities: ['text', 'image'], priceLabel: 'plan' }),
        asSummary({ id: 'gpt-image-2', baseName: 'GPT Image 2', outputModalities: ['image', 'text'], inputModalities: ['text', 'image'], priceLabel: 'plan' }),
      ]);
    case 'anthropic':
      return sortOpenRouterModels([
        asSummary({ id: 'claude-haiku-4-5', baseName: 'Claude Haiku 4.5', inputModalities: ['text', 'image'] }),
        asSummary({ id: 'claude-sonnet-4-5', baseName: 'Claude Sonnet 4.5', inputModalities: ['text', 'image'] }),
      ]);
    case 'gemini':
      return sortOpenRouterModels([
        asSummary({ id: 'gemini-2.5-flash', baseName: 'Gemini 2.5 Flash', inputModalities: ['text', 'image'] }),
        asSummary({ id: 'gemini-2.5-flash-image', baseName: 'Gemini 2.5 Flash Image', outputModalities: ['text', 'image'], inputModalities: ['text', 'image'] }),
        asSummary({ id: 'gemini-3.1-pro-preview', baseName: 'Gemini 3.1 Pro Preview', inputModalities: ['text', 'image'] }),
      ]);
    case 'openrouter':
      return sortOpenRouterModels(ensureModelPresent(ensureModelPresent([
        asSummary({ id: 'openai/gpt-5-mini', baseName: 'OpenAI GPT-5 Mini' }),
        asSummary({ id: 'google/gemini-2.5-flash', baseName: 'Google Gemini 2.5 Flash', inputModalities: ['text', 'image'] }),
        asSummary({ id: 'google/gemini-2.5-flash-image', baseName: 'Google Nano Banana', outputModalities: ['text', 'image'], inputModalities: ['text', 'image'] }),
      ], asSummary({ id: 'openai/gpt-5-mini', baseName: 'OpenAI GPT-5 Mini' })), asSummary({ id: 'google/gemini-2.5-flash-image', baseName: 'Google Nano Banana', outputModalities: ['text', 'image'] })));
    case 'deepseek':
      return sortOpenRouterModels([
        asSummary({ id: 'deepseek-v4-flash', baseName: 'DeepSeek V4 Flash' }),
        asSummary({ id: 'deepseek-v4-pro', baseName: 'DeepSeek V4 Pro' }),
      ]);
    case 'opencode-go':
      return sortOpenRouterModels([
        asSummary({ id: 'qwen3.5-plus', baseName: 'Qwen 3.5 Plus' }),
        asSummary({ id: 'deepseek-v4-pro', baseName: 'DeepSeek V4 Pro' }),
      ]);
    case 'zhipu':
      return sortOpenRouterModels([
        asSummary({ id: 'glm-4.5-air', baseName: 'GLM-4.5-Air', priceLabel: 'plan' }),
        asSummary({ id: 'glm-5.2', baseName: 'GLM-5.2', priceLabel: 'plan' }),
        asSummary({ id: 'glm-5-turbo', baseName: 'GLM-5-Turbo', priceLabel: 'plan' }),
      ]);
    case 'xai':
    case 'xai-oauth':
      return sortOpenRouterModels([
        asSummary({ id: 'grok-3-mini', baseName: 'Grok 3 Mini' }),
        asSummary({ id: 'grok-4', baseName: 'Grok 4', inputModalities: ['text', 'image'] }),
        asSummary({ id: 'grok-4.5', baseName: 'Grok 4.5', inputModalities: ['text', 'image'] }),
        asSummary({ id: 'grok-2-image', baseName: 'Grok 2 Image', outputModalities: ['image', 'text'] }),
      ]);
    default:
      return FALLBACKS.openai ? [FALLBACKS.openai] : [];
  }
};

export const getDefaultModelIdForProvider = (provider: AiProviderId, slot: 'simple' | 'creative' | 'vision' | 'image'): string => {
  const models = getMinimalModelsForProvider(provider);
  if (slot === 'image') {
    const img = models.find(m => m.outputModalities.includes('image'));
    return img?.id || models[0]?.id || '';
  }
  if (slot === 'vision') {
    const vis = models.find(m => m.inputModalities.includes('image'));
    return vis?.id || models[0]?.id || '';
  }
  if (slot === 'simple') return models[0]?.id || '';
  return models[Math.min(1, models.length - 1)]?.id || models[0]?.id || '';
};

/** Fetch live catalog when credential present; otherwise bundled/minimal cache. */
export const loadModelsForProvider = async (
  provider: AiProviderId,
  credential: string,
): Promise<OpenRouterModelSummary[]> => {
  const minimal = getMinimalModelsForProvider(provider);
  if (!credential) {
    // Still try cache modules for richer offline lists
    try {
      if (provider === 'openrouter') {
        const { OPENROUTER_MODEL_CACHE } = await import('../../data/openrouter-model-cache');
        const mapped = OPENROUTER_MODEL_CACHE.map(model => asSummary({
          id: model.id,
          baseName: model.baseName,
          name: model.displayName,
          description: model.description,
          outputModalities: model.outputModalities as any,
          inputModalities: model.inputModalities,
          mixedPricePerMillionUsd: model.mixedPricePerMillionUsd,
          priceLabel: model.priceLabel,
        }));
        return sortOpenRouterModels(mapped.length ? mapped : minimal);
      }
      if (provider === 'gemini') {
        const { getGeminiModelCacheSummaries } = await import('./gemini');
        const models = getGeminiModelCacheSummaries();
        return models.length ? models : minimal;
      }
      if (provider === 'deepseek') {
        const { getDeepSeekModelCacheSummaries } = await import('./deepseek');
        return getDeepSeekModelCacheSummaries();
      }
      if (provider === 'opencode-go') {
        const { getOpenCodeGoModelCacheSummaries } = await import('./opencode-go');
        return getOpenCodeGoModelCacheSummaries();
      }
      if (provider === 'zhipu') {
        const { getZhipuModelCacheSummaries } = await import('./zhipu');
        return getZhipuModelCacheSummaries();
      }
      if (provider === 'xai') {
        const { getXaiModelCacheSummaries } = await import('./xai');
        return getXaiModelCacheSummaries();
      }
      if (provider === 'openai') {
        const { getOpenAiModelCacheSummaries } = await import('./openai');
        const models = getOpenAiModelCacheSummaries();
        return models.length ? models : minimal;
      }
      if (provider === 'openai-codex') {
        const { getCodexModelCacheSummaries } = await import('./codex');
        const models = getCodexModelCacheSummaries();
        return models.length ? models : minimal;
      }
      if (provider === 'anthropic') {
        const { getAnthropicModelCacheSummaries } = await import('./anthropic');
        const models = getAnthropicModelCacheSummaries();
        return models.length ? models : minimal;
      }
    } catch {
      return minimal;
    }
    return minimal;
  }

  try {
    if (provider === 'openai') {
      const { fetchOpenAiModels } = await import('./openai');
      return await fetchOpenAiModels(credential);
    }
    if (provider === 'openai-codex') {
      // The Codex backend exposes no public /models list; the static cache is the catalog.
      const { getCodexModelCacheSummaries } = await import('./codex');
      return getCodexModelCacheSummaries();
    }
    if (provider === 'anthropic') {
      const { fetchAnthropicModels } = await import('./anthropic');
      return await fetchAnthropicModels(credential);
    }
    if (provider === 'openrouter') {
      const { fetchOpenRouterModels } = await import('./openrouter');
      return await fetchOpenRouterModels(credential, 'all');
    }
    if (provider === 'gemini') {
      const { fetchGeminiModels } = await import('./gemini');
      return await fetchGeminiModels(credential);
    }
    if (provider === 'deepseek') {
      const { fetchDeepSeekModels } = await import('./deepseek');
      return await fetchDeepSeekModels(credential);
    }
    if (provider === 'opencode-go') {
      const { fetchOpenCodeGoModels } = await import('./opencode-go');
      return await fetchOpenCodeGoModels(credential);
    }
    if (provider === 'zhipu') {
      const { fetchZhipuModels } = await import('./zhipu');
      return await fetchZhipuModels(credential);
    }
    if (provider === 'xai' || provider === 'xai-oauth') {
      const { fetchXaiModels } = await import('./xai');
      return await fetchXaiModels(credential);
    }
  } catch (err) {
    // Fall back to offline lists so the UI stays usable
    console.warn(`Model refresh failed for ${provider}`, err);
  }
  return loadModelsForProvider(provider, ''); // offline path
};

export const filterModelsForSlot = (
  models: OpenRouterModelSummary[],
  slot: 'simple' | 'creative' | 'vision' | 'image',
): OpenRouterModelSummary[] => {
  if (slot === 'image') {
    const imgs = models.filter(m => m.outputModalities.includes('image'));
    return imgs.length ? imgs : models;
  }
  if (slot === 'vision') {
    const vis = models.filter(m => m.inputModalities.includes('image') && m.outputModalities.includes('text'));
    return vis.length ? vis : models.filter(m => m.outputModalities.includes('text'));
  }
  return models.filter(m => m.outputModalities.includes('text') || m.outputModalities.length === 0);
};
