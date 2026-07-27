export interface ZhipuModelCacheEntry {
  id: string;
  baseName: string;
  displayName: string;
  description: string | null;
  mixedPricePerMillionUsd: number;
  priceLabel: string;
  inputModalities: string[];
  outputModalities: string[];
}

/** Offline seed for Z.ai GLM Coding Plan — refresh from /models when a key is present. */
export const ZHIPU_MODEL_CACHE: ZhipuModelCacheEntry[] = [
  {
    id: 'glm-5.2',
    baseName: 'GLM-5.2',
    displayName: 'GLM-5.2 — plan quota',
    description: 'Flagship GLM coding/agent model on the Z.ai Coding Plan.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text'],
    outputModalities: ['text'],
  },
  {
    id: 'glm-5-turbo',
    baseName: 'GLM-5-Turbo',
    displayName: 'GLM-5-Turbo — plan quota',
    description: 'Faster GLM-5 family model for interactive coding and writing.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text'],
    outputModalities: ['text'],
  },
  {
    id: 'glm-4.7',
    baseName: 'GLM-4.7',
    displayName: 'GLM-4.7 — plan quota',
    description: 'Prior-generation GLM coding model still available on many plans.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text'],
    outputModalities: ['text'],
  },
  {
    id: 'glm-4.5-air',
    baseName: 'GLM-4.5-Air',
    displayName: 'GLM-4.5-Air — plan quota',
    description: 'Lighter GLM model for simple / high-volume text tasks.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text'],
    outputModalities: ['text'],
  },
];
