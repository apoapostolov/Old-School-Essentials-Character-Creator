import type { OpenRouterModelSummary, OpenRouterOutputModality } from './openrouter';
import { sortOpenRouterModels } from './openrouter';
import { fetchOpenAiCompatibleChatCompletion, fetchOpenAiCompatibleModels } from './openai-compatible';
import { OPENCODE_GO_MODEL_CACHE } from '../../data/opencode-go-model-cache';

const OPENCODE_GO_API_BASE = 'https://opencode.ai/zen/go/v1';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const CACHE_MAP = new Map(OPENCODE_GO_MODEL_CACHE.map(entry => [entry.id, entry] as const));

const titleCaseModelId = (id: string) => id
    .split(/[._-]/g)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const toCurrencyLabel = (value: number) => `$${value.toFixed(2)}`;

const normalizeOpenCodeGoModel = (raw: any): OpenRouterModelSummary => {
    const id = String(raw?.id || raw?.name || '');
    const cached = CACHE_MAP.get(id);
    const baseName = cached?.baseName || titleCaseModelId(id) || 'Unknown model';
    const mixedPricePerMillionUsd = cached?.mixedPricePerMillionUsd ?? 0;
    const priceLabel = cached?.priceLabel ?? toCurrencyLabel(mixedPricePerMillionUsd);

    return {
        id,
        baseName,
        name: cached?.displayName || `${baseName} — ${priceLabel} / 1M mixed`,
        description: cached?.description || undefined,
        outputModalities: (cached?.outputModalities || ['text']) as OpenRouterOutputModality[],
        inputModalities: cached?.inputModalities || ['text'],
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

export const getOpenCodeGoModelCacheSummaries = () => sortModels(OPENCODE_GO_MODEL_CACHE.map(entry => normalizeOpenCodeGoModel(entry)));

export const splitOpenCodeGoModelsByPromptType = (models: OpenRouterModelSummary[]) => {
    const textModels = sortOpenRouterModels(models.filter(model => model.outputModalities.includes('text')));

    return {
        creativeModels: textModels,
        visionModels: [],
        imageModels: [],
    };
};

export const fetchOpenCodeGoModels = async (apiKey: string): Promise<OpenRouterModelSummary[]> => {
    const models = await fetchOpenAiCompatibleModels({
        baseUrl: OPENCODE_GO_API_BASE,
        apiKey,
    });
    const normalized = models
        .map((model: any) => normalizeOpenCodeGoModel(model))
        .filter((model: OpenRouterModelSummary) => Boolean(model.id));
    return sortOpenRouterModels(normalized.length > 0 ? normalized : getOpenCodeGoModelCacheSummaries());
};
