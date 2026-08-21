/**
 * Multi-provider AI slots — one independent provider/key/model stack per use type.
 * Shared contract for CoC, Delta Green, and other character-creator forks.
 *
 * @see docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md
 */
import type { AiProviderId } from './provider-options';
import { isAiProviderId } from './provider-options';

/** Independent model-use roles. Each has its own provider + model (+ shared per-provider key vault). */
export type AiModelSlot = 'simple' | 'creative' | 'vision' | 'image';

export const AI_MODEL_SLOTS: AiModelSlot[] = ['creative', 'simple', 'vision', 'image'];

export const AI_SLOT_LABELS: Record<AiModelSlot, string> = {
  creative: 'Creative writing',
  simple: 'Simple writing',
  vision: 'Vision / image analysis',
  image: 'Image generation',
};

export const AI_SLOT_DESCRIPTIONS: Record<AiModelSlot, string> = {
  creative: 'Long-form backstory, life-before-adventuring narrative, portrait prompts.',
  simple: 'Names, village names, traits JSON, grog details helpers.',
  vision: 'Describe portraits, headshot crop boxes, feature extraction.',
  image: 'Portrait, headshot, emotional and grog image generation.',
};

export type AiSlotConfig = {
  provider: AiProviderId;
  modelId: string;
};

/** Keys remembered per provider id (refilled when that provider is selected on any slot). */
export const providerKeyStorageKey = (provider: AiProviderId) => `ai.keys.${provider}`;

export const slotProviderStorageKey = (slot: AiModelSlot) => `ai.slot.${slot}.provider`;
export const slotModelStorageKey = (slot: AiModelSlot) => `ai.slot.${slot}.modelId`;

/** Legacy single-provider key (migration). */
export const LEGACY_PROVIDER_KEY = 'ai.provider';

const DEFAULT_SLOT_PROVIDERS: Record<AiModelSlot, AiProviderId> = {
  creative: 'openai',
  simple: 'openai',
  vision: 'openai',
  image: 'gemini',
};

export const getDefaultSlotProvider = (slot: AiModelSlot): AiProviderId =>
  DEFAULT_SLOT_PROVIDERS[slot];

export const readStoredSlotProvider = (slot: AiModelSlot): AiProviderId => {
  if (typeof window === 'undefined') return getDefaultSlotProvider(slot);
  try {
    const raw = window.localStorage.getItem(slotProviderStorageKey(slot));
    if (raw && isAiProviderId(raw)) return raw;
    // Migrate legacy single provider onto all slots once
    const legacy = window.localStorage.getItem(LEGACY_PROVIDER_KEY);
    if (legacy && isAiProviderId(legacy)) return legacy;
  } catch {
    /* ignore */
  }
  return getDefaultSlotProvider(slot);
};

export const readStoredSlotModelId = (slot: AiModelSlot, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  try {
    return window.localStorage.getItem(slotModelStorageKey(slot)) || fallback;
  } catch {
    return fallback;
  }
};

export const readStoredProviderKey = (provider: AiProviderId): string => {
  if (typeof window === 'undefined') return '';
  if (provider === 'xai-oauth' || provider === 'openai-codex') return ''; // OAuth never uses the key vault field
  try {
    const session = window.sessionStorage.getItem(providerKeyStorageKey(provider));
    const local = window.localStorage.getItem(providerKeyStorageKey(provider));
    if (session || local) return session || local || '';
    // Legacy key names used before multi-slot vault
    const legacyMap: Partial<Record<AiProviderId, string[]>> = {
      openai: ['ai.openai.apiKey'],
      anthropic: ['ai.anthropic.apiKey'],
      openrouter: ['ai.openrouter.apiKey'],
      gemini: ['ai.gemini.apiKey'],
      'opencode-go': ['ai.opencode-go.apiKey'],
      deepseek: ['ai.deepseek.apiKey'],
      zhipu: ['ai.zhipu.apiKey'],
      xai: ['ai.xai.apiKey'],
    };
    for (const k of legacyMap[provider] || []) {
      const v = window.sessionStorage.getItem(k) || window.localStorage.getItem(k);
      if (v) return v;
    }
  } catch {
    /* ignore */
  }
  return '';
};

export const writeStoredProviderKey = (provider: AiProviderId, key: string) => {
  if (typeof window === 'undefined' || provider === 'xai-oauth' || provider === 'openai-codex') return;
  const value = key.trim();
  try {
    if (!value) {
      window.sessionStorage.removeItem(providerKeyStorageKey(provider));
      window.localStorage.removeItem(providerKeyStorageKey(provider));
    } else {
      window.sessionStorage.setItem(providerKeyStorageKey(provider), value);
      window.localStorage.setItem(providerKeyStorageKey(provider), value);
    }
  } catch {
    /* ignore */
  }
};

export const writeStoredSlotProvider = (slot: AiModelSlot, provider: AiProviderId) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(slotProviderStorageKey(slot), provider);
  } catch {
    /* ignore */
  }
};

export const writeStoredSlotModelId = (slot: AiModelSlot, modelId: string) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(slotModelStorageKey(slot), modelId);
  } catch {
    /* ignore */
  }
};
