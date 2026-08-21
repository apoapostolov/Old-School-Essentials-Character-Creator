import type { OpenRouterModelSummary, OpenRouterOutputModality } from './openrouter';
import { sortOpenRouterModels } from './openrouter';
import { fetchOpenAiCompatibleModels } from './openai-compatible';
import { OPENAI_MODEL_CACHE } from '../../data/openai-model-cache';

export const OPENAI_API_BASE = 'https://api.openai.com/v1';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const CACHE_MAP = new Map(OPENAI_MODEL_CACHE.map(entry => [entry.id, entry] as const));

const CHAT_MODEL_PATTERN = /^(gpt-|o[0-9]|chatgpt-)/i;
const EXCLUDED_MODEL_PATTERN = /(embedding|tts|whisper|audio|transcribe|realtime|search|moderation|dall-e|image|sora|instruct|legacy|preview-tts)/i;

const titleCaseModelId = (id: string) => id
    .split(/[._-]/g)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const toCurrencyLabel = (value: number) => `$${value.toFixed(2)}`;

export const isChatOpenAiModelId = (id: string) => {
    const normalized = String(id || '').trim();
    if (!normalized || EXCLUDED_MODEL_PATTERN.test(normalized)) return false;
    if (CACHE_MAP.has(normalized)) return true;
    return CHAT_MODEL_PATTERN.test(normalized);
};

const normalizeOpenAiModel = (raw: any): OpenRouterModelSummary => {
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

export const getOpenAiModelCacheSummaries = () => sortModels(OPENAI_MODEL_CACHE.map(entry => normalizeOpenAiModel(entry)));

export const splitOpenAiModelsByPromptType = (models: OpenRouterModelSummary[]) => {
    const textModels = sortOpenRouterModels(models.filter(model => model.outputModalities.includes('text')));
    const visionModels = sortOpenRouterModels(textModels.filter(model => model.inputModalities.includes('image')));

    return {
        creativeModels: textModels,
        visionModels,
        imageModels: [],
    };
};

export const fetchOpenAiModels = async (apiKey: string): Promise<OpenRouterModelSummary[]> => {
    const models = await fetchOpenAiCompatibleModels({
        baseUrl: OPENAI_API_BASE,
        apiKey,
    });
    const normalized = models
        .map((model: any) => normalizeOpenAiModel(model))
        .filter((model: OpenRouterModelSummary) => Boolean(model.id) && isChatOpenAiModelId(model.id));
    return sortOpenRouterModels(normalized.length > 0 ? normalized : getOpenAiModelCacheSummaries());
};