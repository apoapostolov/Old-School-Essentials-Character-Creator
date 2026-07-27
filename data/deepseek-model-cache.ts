export interface DeepSeekModelCacheEntry {
  id: string;
  baseName: string;
  displayName: string;
  description: string | null;
  mixedPricePerMillionUsd: number;
  priceLabel: string;
  inputModalities: string[];
  outputModalities: string[];
}

export const DEEPSEEK_MODEL_CACHE: DeepSeekModelCacheEntry[] = [
  {
    id: 'deepseek-v4-flash',
    baseName: 'DeepSeek V4 Flash',
    displayName: 'DeepSeek V4 Flash — $0.21 / 1M mixed',
    description: 'Fast, economical DeepSeek V4 model with 1M context.',
    mixedPricePerMillionUsd: 0.21,
    priceLabel: '$0.21',
    inputModalities: ['text'],
    outputModalities: ['text'],
  },
  {
    id: 'deepseek-v4-pro',
    baseName: 'DeepSeek V4 Pro',
    displayName: 'DeepSeek V4 Pro — $0.65 / 1M mixed',
    description: 'Higher-capability DeepSeek V4 model with 1M context and stronger reasoning.',
    mixedPricePerMillionUsd: 0.6525,
    priceLabel: '$0.65',
    inputModalities: ['text'],
    outputModalities: ['text'],
  },
];
