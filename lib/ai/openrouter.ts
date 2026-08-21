export type OpenRouterOutputModality = 'text' | 'image' | 'audio' | 'embeddings';

export interface OpenRouterModelSummary {
    id: string;
    baseName: string;
    name: string;
    displayName?: string;
    description?: string;
    outputModalities: OpenRouterOutputModality[];
    inputModalities: string[];
    mixedPricePerMillionUsd: number;
    priceLabel: string;
}

export interface OpenRouterChatMessage {
    role: 'system' | 'user' | 'assistant';
    content:
        | string
        | Array<
            | { type: 'text'; text: string }
            | { type: 'image_url'; image_url: { url: string } }
          >;
}

export interface OpenRouterChatCompletionResult {
    content: string;
    images: string[];
    raw: unknown;
}

const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';
const OPENROUTER_APP_TITLE = 'Call of Cthulhu Character Creator';

const getReferer = () => {
    if (typeof window === 'undefined') return '';
    return window.location.origin;
};

const readErrorMessage = async (response: Response) => {
    const fallback = `OpenRouter request failed (${response.status})`;
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

const normalizeOutputModalities = (value: unknown): OpenRouterOutputModality[] => {
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is OpenRouterOutputModality => (
        item === 'text' || item === 'image' || item === 'audio' || item === 'embeddings'
    ));
};

const hasInputModality = (model: OpenRouterModelSummary, modality: string) => model.inputModalities.includes(modality);
const hasOutputModality = (model: OpenRouterModelSummary, modality: OpenRouterOutputModality) => model.outputModalities.includes(modality);

const toCurrencyLabel = (value: number) => `$${value.toFixed(2)}`;

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const getProviderSortKey = (model: OpenRouterModelSummary) => (model.id.split('/')[0] || '').toLowerCase();

const getModelSortKey = (model: OpenRouterModelSummary) => {
    const [, remainder = model.baseName || model.id] = model.id.split('/');
    return remainder.toLowerCase();
};

export const sortOpenRouterModels = (models: OpenRouterModelSummary[]) => (
    [...models].sort((left, right) => {
        const providerCompare = collator.compare(getProviderSortKey(left), getProviderSortKey(right));
        if (providerCompare !== 0) return providerCompare;

        const modelCompare = collator.compare(getModelSortKey(left), getModelSortKey(right));
        if (modelCompare !== 0) return modelCompare;

        const priceCompare = left.mixedPricePerMillionUsd - right.mixedPricePerMillionUsd;
        if (priceCompare !== 0) return priceCompare;

        return collator.compare(left.baseName, right.baseName) || collator.compare(left.id, right.id);
    })
);

const getMixedPricePerMillionUsd = (model: any) => {
    const pricing = model?.pricing || {};
    const promptRaw = Number(pricing.prompt ?? pricing.input ?? pricing.request ?? 0);
    const completionRaw = Number(pricing.completion ?? pricing.output ?? 0);
    const values = [promptRaw, completionRaw].filter(v => Number.isFinite(v) && v > 0);
    const mixedPerToken = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    return Math.round(mixedPerToken * 1_000_000 * 100) / 100;
};

const formatModelDisplayName = (baseName: string, priceLabel: string) => `${baseName} — ${priceLabel} / 1M mixed`;

export const normalizeOpenRouterModel = (model: any): OpenRouterModelSummary => ({
    id: String(model?.id || ''),
    baseName: String(model?.name || model?.id || 'Unknown model'),
    name: formatModelDisplayName(
        String(model?.name || model?.id || 'Unknown model'),
        toCurrencyLabel(getMixedPricePerMillionUsd(model)),
    ),
    description: typeof model?.description === 'string' ? model.description : undefined,
    outputModalities: normalizeOutputModalities(model?.architecture?.output_modalities || model?.output_modalities),
    inputModalities: Array.isArray(model?.architecture?.input_modalities)
        ? model.architecture.input_modalities.map((item: unknown) => String(item))
        : [],
    mixedPricePerMillionUsd: getMixedPricePerMillionUsd(model),
    priceLabel: toCurrencyLabel(getMixedPricePerMillionUsd(model)),
});

export const splitModelsByModality = (models: OpenRouterModelSummary[]) => {
    const textModels = models.filter(model => model.outputModalities.includes('text'));
    const imageModels = models.filter(model => model.outputModalities.includes('image'));
    return { textModels, imageModels };
};

export const splitModelsByPromptType = (models: OpenRouterModelSummary[]) => {
    const textModels = sortOpenRouterModels(models.filter(model => hasOutputModality(model, 'text')));
    const visionTextModels = sortOpenRouterModels(textModels.filter(model => hasInputModality(model, 'image')));
    const imageModels = sortOpenRouterModels(models.filter(model => hasOutputModality(model, 'image')));

    return {
        creativeModels: textModels,
        visionModels: visionTextModels.length > 0 ? visionTextModels : textModels,
        imageModels,
    };
};

export const ensureModelPresent = (
    models: OpenRouterModelSummary[],
    fallback: OpenRouterModelSummary,
) => {
    if (models.some(model => model.id === fallback.id)) return models;
    return [fallback, ...models];
};

export const fetchOpenRouterModels = async (
    apiKey: string,
    outputModalities: 'all' | OpenRouterOutputModality[] = 'all',
): Promise<OpenRouterModelSummary[]> => {
    if (!apiKey) {
        throw new Error('An OpenRouter API key is required to refresh the model list.');
    }

    const url = new URL(`${OPENROUTER_API_BASE}/models`);
    url.searchParams.set('output_modalities', Array.isArray(outputModalities) ? outputModalities.join(',') : outputModalities);

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const json = await response.json();
    const models = Array.isArray(json?.data) ? json.data.map(normalizeOpenRouterModel) : [];
    return sortOpenRouterModels(models.filter(model => model.id));
};

export const fetchOpenRouterChatCompletion = async (params: {
    apiKey: string;
    model: string;
    messages: OpenRouterChatMessage[];
    responseFormat?: { type: 'json_object' } | { type: 'json_schema'; json_schema: Record<string, unknown> };
    modalities?: Array<'text' | 'image'>;
    imageConfig?: Record<string, unknown>;
    temperature?: number;
    maxTokens?: number;
}): Promise<OpenRouterChatCompletionResult> => {
    const response = await fetch(`${OPENROUTER_API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${params.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': getReferer(),
            'X-OpenRouter-Title': OPENROUTER_APP_TITLE,
        },
        body: JSON.stringify({
            model: params.model,
            messages: params.messages,
            response_format: params.responseFormat,
            modalities: params.modalities,
            image_config: params.imageConfig,
            temperature: params.temperature,
            max_tokens: params.maxTokens,
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const json = await response.json();
    const message = json?.choices?.[0]?.message;
    const content = typeof message?.content === 'string' ? message.content : '';
    const images = Array.isArray(message?.images)
        ? message.images
            .map((image: any) => image?.image_url?.url || image?.imageUrl?.url || '')
            .filter((url: string) => Boolean(url))
        : [];

    return { content, images, raw: json };
};
