export interface CodexModelCacheEntry {
  id: string;
  baseName: string;
  displayName: string;
  description: string | null;
  mixedPricePerMillionUsd: number;
  priceLabel: string;
  inputModalities: string[];
  outputModalities: string[];
}

/**
 * Offline seed for OpenAI Codex (ChatGPT / Codex subscription OAuth).
 * The Codex backend exposes no public /models list; the catalog is static,
 * matching the AI Provider Library reference implementation.
 */
export const CODEX_MODEL_CACHE: CodexModelCacheEntry[] = [
  {
    id: 'gpt-5.6-luna',
    baseName: 'GPT-5.6 Luna',
    displayName: 'GPT-5.6 Luna',
    description: 'Frontline Codex model for reasoning and creative writing.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-5.6-terra',
    baseName: 'GPT-5.6 Terra',
    displayName: 'GPT-5.6 Terra',
    description: 'Codex model tuned for steady, balanced output.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-5.6-sol',
    baseName: 'GPT-5.6 Sol',
    displayName: 'GPT-5.6 Sol',
    description: 'Codex model for long-form and high-effort tasks.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-5.5',
    baseName: 'GPT-5.5',
    displayName: 'GPT-5.5',
    description: 'General-purpose GPT model with vision input.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-5.4',
    baseName: 'GPT-5.4',
    displayName: 'GPT-5.4',
    description: 'Previous-generation GPT model.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-5.2',
    baseName: 'GPT-5.2',
    displayName: 'GPT-5.2',
    description: 'Older GPT model, still solid for simple tasks.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-4o',
    baseName: 'GPT-4o',
    displayName: 'GPT-4o',
    description: 'Legacy multimodal GPT model.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
  },
  {
    id: 'gpt-image-2',
    baseName: 'GPT Image 2',
    displayName: 'GPT Image 2 (recommended)',
    description: 'Current Codex image generation model.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['image', 'text'],
  },
  {
    id: 'gpt-image-1.5',
    baseName: 'GPT Image 1.5',
    displayName: 'GPT Image 1.5',
    description: 'Mid-generation Codex image model with native alpha.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['image', 'text'],
  },
  {
    id: 'gpt-image-1',
    baseName: 'GPT Image 1',
    displayName: 'GPT Image 1',
    description: 'Legacy Codex image model with native alpha.',
    mixedPricePerMillionUsd: 0,
    priceLabel: 'plan',
    inputModalities: ['text', 'image'],
    outputModalities: ['image', 'text'],
  },
];
