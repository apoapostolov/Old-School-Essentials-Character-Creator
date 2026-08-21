import type { OpenRouterChatMessage, OpenRouterChatCompletionResult, OpenRouterModelSummary, OpenRouterOutputModality } from './openrouter';
import { sortOpenRouterModels } from './openrouter';
import { ANTHROPIC_MODEL_CACHE } from '../../data/anthropic-model-cache';

export const ANTHROPIC_API_BASE = 'https://api.anthropic.com/v1';
const ANTHROPIC_VERSION = '2023-06-01';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const CACHE_MAP = new Map(ANTHROPIC_MODEL_CACHE.map(entry => [entry.id, entry] as const));

const titleCaseModelId = (id: string) => id
    .split(/[._-]/g)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const toCurrencyLabel = (value: number) => `$${value.toFixed(2)}`;

const joinUrl = (baseUrl: string, path: string) => {
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return new URL(path.replace(/^\//, ''), normalizedBase).toString();
};

const readErrorMessage = async (response: Response) => {
    const fallback = `Anthropic request failed (${response.status})`;
    try {
        const body = await response.json();
        return body?.error?.message || body?.message || body?.detail || fallback;
    } catch {
        try {
            const text = await response.text();
            return text || fallback;
        } catch {
            return fallback;
        }
    }
};

const getAnthropicHeaders = (apiKey: string, extra: Record<string, string> = {}) => ({
    'x-api-key': apiKey,
    'anthropic-version': ANTHROPIC_VERSION,
    'anthropic-dangerous-direct-browser-access': 'true',
    ...extra,
});

const normalizeAnthropicModel = (raw: any): OpenRouterModelSummary => {
    const id = String(raw?.id || raw?.name || '').replace(/^models\//, '');
    const cached = CACHE_MAP.get(id);
    const baseName = cached?.baseName || String(raw?.display_name || titleCaseModelId(id) || 'Unknown model');
    const mixedPricePerMillionUsd = cached?.mixedPricePerMillionUsd ?? 0;
    const priceLabel = cached?.priceLabel ?? toCurrencyLabel(mixedPricePerMillionUsd);

    return {
        id,
        baseName,
        name: cached?.displayName || `${baseName} — ${priceLabel} / 1M mixed`,
        description: cached?.description || undefined,
        outputModalities: (cached?.outputModalities || ['text']) as OpenRouterOutputModality[],
        inputModalities: cached?.inputModalities || ['text', 'image'],
        mixedPricePerMillionUsd,
        priceLabel,
    };
};

const sortModels = (models: OpenRouterModelSummary[]) => (
    [...models].sort((left, right) => {
        const priceCompare = left.mixedPricePerMillionUsd - right.mixedPricePerMillionUsd;
        if (priceCompare !== 0) return priceCompare;
        const nameCompare = collator.compare(left.baseName, right.baseName);
        if (nameCompare !== 0) return nameCompare;
        return collator.compare(left.id, right.id);
    })
);

export const getAnthropicModelCacheSummaries = () => sortModels(ANTHROPIC_MODEL_CACHE.map(entry => normalizeAnthropicModel(entry)));

export const splitAnthropicModelsByPromptType = (models: OpenRouterModelSummary[]) => {
    const textModels = sortOpenRouterModels(models.filter(model => model.outputModalities.includes('text')));
    const visionModels = sortOpenRouterModels(textModels.filter(model => model.inputModalities.includes('image')));

    return {
        creativeModels: textModels,
        visionModels,
        imageModels: [],
    };
};

export const fetchAnthropicModels = async (apiKey: string): Promise<OpenRouterModelSummary[]> => {
    if (!apiKey) {
        throw new Error('An API key is required to refresh the model list.');
    }

    const response = await fetch(joinUrl(ANTHROPIC_API_BASE, '/models'), {
        headers: getAnthropicHeaders(apiKey),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const json = await response.json();
    const rawModels = Array.isArray(json?.data) ? json.data : [];
    const normalized = rawModels
        .map((model: any) => normalizeAnthropicModel(model))
        .filter((model: OpenRouterModelSummary) => Boolean(model.id));
    return sortOpenRouterModels(normalized.length > 0 ? normalized : getAnthropicModelCacheSummaries());
};

const parseDataUrl = (dataUrl: string) => {
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    return {
        mediaType: match?.[1] || 'image/png',
        data: match?.[2] || dataUrl.split(',')[1] || '',
    };
};

const toAnthropicMessageContent = (
    content: OpenRouterChatMessage['content'],
): string | Array<{ type: 'text'; text: string } | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }> => {
    if (typeof content === 'string') return content;
    return content.map(part => {
        if (part.type === 'text') {
            return { type: 'text' as const, text: part.text };
        }
        const { mediaType, data } = parseDataUrl(part.image_url.url);
        return {
            type: 'image' as const,
            source: {
                type: 'base64' as const,
                media_type: mediaType,
                data,
            },
        };
    });
};

export const fetchAnthropicChatCompletion = async (params: {
    apiKey: string;
    model: string;
    messages: OpenRouterChatMessage[];
    responseFormat?: { type: 'json_object' } | { type: 'json_schema'; json_schema: Record<string, unknown> };
    temperature?: number;
    maxTokens?: number;
}): Promise<OpenRouterChatCompletionResult> => {
    const systemParts = params.messages
        .filter(message => message.role === 'system')
        .map(message => (typeof message.content === 'string' ? message.content : message.content.map(part => part.type === 'text' ? part.text : '').join('\n')))
        .join('\n')
        .trim();

    const conversationMessages = params.messages
        .filter(message => message.role !== 'system')
        .map(message => ({
            role: message.role === 'assistant' ? 'assistant' : 'user',
            content: toAnthropicMessageContent(message.content),
        }));

    const response = await fetch(joinUrl(ANTHROPIC_API_BASE, '/messages'), {
        method: 'POST',
        headers: getAnthropicHeaders(params.apiKey, { 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            model: params.model,
            max_tokens: params.maxTokens ?? 8192,
            temperature: params.temperature,
            system: systemParts || undefined,
            messages: conversationMessages,
            ...(params.responseFormat?.type === 'json_object'
                ? { response_format: { type: 'json_object' } }
                : {}),
        }),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const json = await response.json();
    const content = Array.isArray(json?.content)
        ? json.content
            .map((block: any) => (block?.type === 'text' ? String(block?.text || '') : ''))
            .join('')
            .trim()
        : '';

    return { content, images: [], raw: json };
};