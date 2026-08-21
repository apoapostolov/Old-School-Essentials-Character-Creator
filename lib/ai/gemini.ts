import type { OpenRouterModelSummary, OpenRouterOutputModality } from './openrouter';
import { GEMINI_MODEL_CACHE } from '../../data/gemini-model-cache';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const getModelSortKey = (model: OpenRouterModelSummary) => model.baseName.toLowerCase();

const getMixedPricePerMillionUsd = (model: any) => {
    const mixed = Number(model?.mixedPricePerMillionUsd);
    if (Number.isFinite(mixed) && mixed >= 0) return mixed;
    return 0;
};

const toCurrencyLabel = (value: number) => `$${value.toFixed(2)}`;

const formatModelDisplayName = (baseName: string, priceLabel: string) => `${baseName} — ${priceLabel} / 1M mixed`;

export const normalizeGeminiModel = (model: any): OpenRouterModelSummary => ({
    id: String(model?.id || ''),
    baseName: String(model?.baseName || model?.name || model?.id || 'Unknown model'),
    name: formatModelDisplayName(
        String(model?.baseName || model?.name || model?.id || 'Unknown model'),
        toCurrencyLabel(getMixedPricePerMillionUsd(model)),
    ),
    description: typeof model?.description === 'string' ? model.description : undefined,
    outputModalities: (Array.isArray(model?.outputModalities) ? model.outputModalities : []) as OpenRouterOutputModality[],
    inputModalities: Array.isArray(model?.inputModalities) ? model.inputModalities : [],
    mixedPricePerMillionUsd: getMixedPricePerMillionUsd(model),
    priceLabel: toCurrencyLabel(getMixedPricePerMillionUsd(model)),
});

export const normalizeGeminiApiModel = (model: any): OpenRouterModelSummary => {
    const id = String(model?.name || model?.id || '').replace(/^models\//, '');
    const baseName = String(model?.displayName || model?.name || id || 'Unknown model');
    const cached = GEMINI_MODEL_CACHE.find(entry => entry.id === id);
    const mixedPricePerMillionUsd = cached?.mixedPricePerMillionUsd ?? 0;
    const priceLabel = cached?.priceLabel ?? toCurrencyLabel(mixedPricePerMillionUsd);
    const outputModalities = (cached?.outputModalities?.length
        ? cached.outputModalities
        : Array.isArray(model?.supportedActions) && model.supportedActions.includes('generateImages')
            ? ['image']
            : ['text']) as OpenRouterOutputModality[];
    const inputModalities = cached?.inputModalities?.length
        ? cached.inputModalities
        : Array.isArray(model?.supportedActions) && model.supportedActions.includes('generateImages')
            ? ['text', 'image']
            : ['text', 'image', 'video', 'audio'];

    return {
        id,
        baseName,
        name: formatModelDisplayName(baseName, priceLabel),
        description: typeof model?.description === 'string' ? model.description : cached?.description || undefined,
        outputModalities,
        inputModalities,
        mixedPricePerMillionUsd,
        priceLabel,
    };
};

export const sortGeminiModels = (models: OpenRouterModelSummary[]) => (
    [...models].sort((left, right) => {
        const modelCompare = collator.compare(getModelSortKey(left), getModelSortKey(right));
        if (modelCompare !== 0) return modelCompare;

        const priceCompare = left.mixedPricePerMillionUsd - right.mixedPricePerMillionUsd;
        if (priceCompare !== 0) return priceCompare;

        return collator.compare(left.id, right.id);
    })
);

export const splitGeminiModelsByPromptType = (models: OpenRouterModelSummary[]) => {
    const creativeModels = sortGeminiModels(models.filter(model => model.outputModalities.includes('text')));
    const visionModels = sortGeminiModels(creativeModels.filter(model => model.inputModalities.includes('image')));
    const imageModels = sortGeminiModels(models.filter(model => model.outputModalities.includes('image')));

    return {
        creativeModels,
        visionModels: visionModels.length > 0 ? visionModels : creativeModels,
        imageModels,
    };
};

export const getGeminiModelCacheSummaries = () => sortGeminiModels(GEMINI_MODEL_CACHE.map(normalizeGeminiModel));

const readErrorMessage = async (response: Response) => {
    const fallback = `Gemini request failed (${response.status})`;
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

export const fetchGeminiModels = async (apiKey: string): Promise<OpenRouterModelSummary[]> => {
    if (!apiKey) {
        throw new Error('A Gemini API key is required to refresh the model list.');
    }

    const models: OpenRouterModelSummary[] = [];
    let pageToken: string | null = null;

    do {
        const url = new URL(`${GEMINI_API_BASE}/models`);
        url.searchParams.set('key', apiKey);
        url.searchParams.set('pageSize', '1000');
        if (pageToken) {
            url.searchParams.set('pageToken', pageToken);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(await readErrorMessage(response));
        }

        const json = await response.json();
        const pageModels = Array.isArray(json?.models) ? json.models.map(normalizeGeminiApiModel) : [];
        models.push(...pageModels.filter(model => Boolean(model.id)));
        pageToken = typeof json?.nextPageToken === 'string' && json.nextPageToken ? json.nextPageToken : null;
    } while (pageToken);

    return sortGeminiModels(models);
};
