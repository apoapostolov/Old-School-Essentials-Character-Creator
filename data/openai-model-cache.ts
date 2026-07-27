export interface OpenAiModelCacheEntry {
  id: string;
  baseName: string;
  displayName: string;
  description: string | null;
  mixedPricePerMillionUsd: number;
  priceLabel: string;
  inputModalities: string[];
  outputModalities: string[];
}

export const OPENAI_MODEL_CACHE: OpenAiModelCacheEntry[] = [
  {
    id: 'gpt-4o-mini',
    baseName: 'GPT-4o Mini',
    displayName: 'GPT-4o Mini — $0.75 / 1M mixed',
    description: 'Fast, affordable multimodal model for everyday writing and vision tasks.',
    mixedPricePerMillionUsd: 0.75,
    priceLabel: '$0.75',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-4.1-mini',
    baseName: 'GPT-4.1 Mini',
    displayName: 'GPT-4.1 Mini — $1.05 / 1M mixed',
    description: 'Compact GPT-4.1 model with strong instruction following.',
    mixedPricePerMillionUsd: 1.05,
    priceLabel: '$1.05',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-4.1',
    baseName: 'GPT-4.1',
    displayName: 'GPT-4.1 — $5.00 / 1M mixed',
    description: 'High-capability model for creative writing and complex reasoning.',
    mixedPricePerMillionUsd: 5,
    priceLabel: '$5.00',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-4o',
    baseName: 'GPT-4o',
    displayName: 'GPT-4o — $6.25 / 1M mixed',
    description: 'Flagship multimodal model for vision analysis and advanced text generation.',
    mixedPricePerMillionUsd: 6.25,
    priceLabel: '$6.25',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'o4-mini',
    baseName: 'o4 Mini',
    displayName: 'o4 Mini — $2.75 / 1M mixed',
    description: 'Compact reasoning model in the o-series for STEM and structured tasks.',
    mixedPricePerMillionUsd: 2.75,
    priceLabel: '$2.75',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'o3-mini',
    baseName: 'o3 Mini',
    displayName: 'o3 Mini — $2.20 / 1M mixed',
    description: 'Cost-efficient reasoning model optimized for math, code, and analysis.',
    mixedPricePerMillionUsd: 2.2,
    priceLabel: '$2.20',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
];