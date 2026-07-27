export interface XaiModelCacheEntry {
  id: string;
  baseName: string;
  displayName: string;
  description: string | null;
  mixedPricePerMillionUsd: number;
  priceLabel: string;
  inputModalities: string[];
  outputModalities: string[];
}

/** Offline seed for xAI Grok — refresh from api.x.ai /models when authenticated. */
export const XAI_MODEL_CACHE: XaiModelCacheEntry[] = [
  {
    id: 'grok-4.5',
    baseName: 'Grok 4.5',
    displayName: 'Grok 4.5',
    description: 'Frontier Grok model for reasoning and creative writing.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'api/plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'grok-4',
    baseName: 'Grok 4',
    displayName: 'Grok 4',
    description: 'Grok 4 multimodal chat model.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'api/plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'grok-3-mini',
    baseName: 'Grok 3 Mini',
    displayName: 'Grok 3 Mini',
    description: 'Smaller Grok model for simple / lower-cost tasks.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'api/plan',
    inputModalities: ['text'],
    outputModalities: ['text'],
  },
  {
    id: 'grok-2-image',
    baseName: 'Grok 2 Image',
    displayName: 'Grok 2 Image',
    description: 'Image generation model when available on the account.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'api/plan',
    inputModalities: ['text'],
    outputModalities: ['image', 'text'],
  },
];
