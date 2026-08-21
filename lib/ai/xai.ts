import type { OpenRouterModelSummary, OpenRouterOutputModality } from './openrouter';
import { sortOpenRouterModels } from './openrouter';
import { fetchOpenAiCompatibleModels } from './openai-compatible';
import { XAI_MODEL_CACHE } from '../../data/xai-model-cache';

/** xAI OpenAI-compatible API base (API key and OAuth bearer). */
export const XAI_API_BASE = 'https://api.x.ai/v1';

const CACHE_MAP = new Map(XAI_MODEL_CACHE.map(entry => [entry.id, entry] as const));
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const titleCaseModelId = (id: string) => id
  .split(/[._/-]/g)
  .filter(Boolean)
  .map(part => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ');

const toCurrencyLabel = (value: number) => (value > 0 ? `$${value.toFixed(2)}` : 'api/plan');

const normalizeXaiModel = (raw: any): OpenRouterModelSummary => {
  const id = String(raw?.id || raw?.name || '');
  const cached = CACHE_MAP.get(id);
  const baseName = cached?.baseName || String(raw?.name || titleCaseModelId(id) || 'Unknown model');
  const mixedPricePerMillionUsd = cached?.mixedPricePerMillionUsd ?? 0;
  const priceLabel = cached?.priceLabel ?? toCurrencyLabel(mixedPricePerMillionUsd);

  const inputModalities = Array.isArray(raw?.input_modalities)
    ? raw.input_modalities.map(String)
    : (cached?.inputModalities || ['text']);
  const outputModalities = Array.isArray(raw?.output_modalities)
    ? raw.output_modalities.map(String)
    : (cached?.outputModalities || ['text']);

  return {
    id,
    baseName,
    name: cached?.displayName || `${baseName} — ${priceLabel}`,
    description: cached?.description || (typeof raw?.description === 'string' ? raw.description : undefined),
    outputModalities: outputModalities as OpenRouterOutputModality[],
    inputModalities,
    mixedPricePerMillionUsd,
    priceLabel,
  };
};

const sortModels = (models: OpenRouterModelSummary[]) => (
  [...models].sort((left, right) => {
    const nameCompare = collator.compare(left.baseName, right.baseName);
    if (nameCompare !== 0) return nameCompare;
    return collator.compare(left.id, right.id);
  })
);

export const getXaiModelCacheSummaries = () =>
  sortModels(XAI_MODEL_CACHE.map(entry => normalizeXaiModel(entry)));

export const fetchXaiModels = async (apiKeyOrToken: string): Promise<OpenRouterModelSummary[]> => {
  const models = await fetchOpenAiCompatibleModels({
    baseUrl: XAI_API_BASE,
    apiKey: apiKeyOrToken,
  });
  const normalized = models
    .map((model: any) => normalizeXaiModel(model))
    .filter((model: OpenRouterModelSummary) => Boolean(model.id));
  return sortOpenRouterModels(normalized.length > 0 ? normalized : getXaiModelCacheSummaries());
};
