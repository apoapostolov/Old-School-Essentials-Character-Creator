export interface AnthropicModelCacheEntry {
  id: string;
  baseName: string;
  displayName: string;
  description: string | null;
  mixedPricePerMillionUsd: number;
  priceLabel: string;
  inputModalities: string[];
  outputModalities: string[];
}

export const ANTHROPIC_MODEL_CACHE: AnthropicModelCacheEntry[] = [
  {
    id: 'claude-haiku-4-5',
    baseName: 'Claude Haiku 4.5',
    displayName: 'Claude Haiku 4.5 — $1.25 / 1M mixed',
    description: 'Fast, economical Claude model for simple writing and high-volume tasks.',
    mixedPricePerMillionUsd: 1.25,
    priceLabel: '$1.25',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'claude-sonnet-4-5',
    baseName: 'Claude Sonnet 4.5',
    displayName: 'Claude Sonnet 4.5 — $6.00 / 1M mixed',
    description: 'Balanced Claude model for creative writing, analysis, and vision.',
    mixedPricePerMillionUsd: 6,
    priceLabel: '$6.00',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'claude-sonnet-4-6',
    baseName: 'Claude Sonnet 4.6',
    displayName: 'Claude Sonnet 4.6 — $6.00 / 1M mixed',
    description: 'Latest Sonnet-tier model for high-quality creative and analytical work.',
    mixedPricePerMillionUsd: 6,
    priceLabel: '$6.00',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'claude-opus-4-5',
    baseName: 'Claude Opus 4.5',
    displayName: 'Claude Opus 4.5 — $15.00 / 1M mixed',
    description: 'Top-tier Claude model for the most demanding creative and reasoning tasks.',
    mixedPricePerMillionUsd: 15,
    priceLabel: '$15.00',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
];