import type { OpenRouterModelSummary, OpenRouterOutputModality } from './openrouter';
import { sortOpenRouterModels } from './openrouter';
import { fetchOpenAiCompatibleModels } from './openai-compatible';
import { ZHIPU_MODEL_CACHE } from '../../data/zhipu-model-cache';

/**
 * Z.ai GLM Coding Plan OpenAI-compatible base.
 * Must stay on /coding/paas/v4 — not the general /api/paas/v4 balance endpoint.
 * @see docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md
 */
export const ZHIPU_CODING_API_BASE = 'https://api.z.ai/api/coding/paas/v4';
/** China BigModel Coding Plan (optional region later). */
export const ZHIPU_CN_CODING_API_BASE = 'https://open.bigmodel.cn/api/coding/paas/v4';

const CACHE_MAP = new Map(ZHIPU_MODEL_CACHE.map(entry => [entry.id, entry] as const));
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const titleCaseModelId = (id: string) => id
  .split(/[._/-]/g)
  .filter(Boolean)
  .map(part => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ');

const toCurrencyLabel = (value: number) => (value > 0 ? `$${value.toFixed(2)}` : 'plan');

const normalizeZhipuModel = (raw: any): OpenRouterModelSummary => {
  const id = String(raw?.id || raw?.name || '').replace(/^models\//, '');
  const cached = CACHE_MAP.get(id);
  const baseName = cached?.baseName || String(raw?.name || titleCaseModelId(id) || 'Unknown model');
  const mixedPricePerMillionUsd = cached?.mixedPricePerMillionUsd ?? 0;
  const priceLabel = cached?.priceLabel ?? toCurrencyLabel(mixedPricePerMillionUsd);

  return {
    id,
    baseName,
    name: cached?.displayName || `${baseName} — ${priceLabel}`,
    description: cached?.description || (typeof raw?.description === 'string' ? raw.description : undefined),
    outputModalities: (cached?.outputModalities || ['text']) as OpenRouterOutputModality[],
    inputModalities: cached?.inputModalities || ['text'],
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

export const getZhipuModelCacheSummaries = () =>
  sortModels(ZHIPU_MODEL_CACHE.map(entry => normalizeZhipuModel(entry)));

export const fetchZhipuModels = async (
  apiKey: string,
  baseUrl: string = ZHIPU_CODING_API_BASE,
): Promise<OpenRouterModelSummary[]> => {
  const models = await fetchOpenAiCompatibleModels({ baseUrl, apiKey });
  const normalized = models
    .map((model: any) => normalizeZhipuModel(model))
    .filter((model: OpenRouterModelSummary) => Boolean(model.id));
  return sortOpenRouterModels(normalized.length > 0 ? normalized : getZhipuModelCacheSummaries());
};
