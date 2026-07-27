import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { OpenRouterModelSummary } from '../lib/ai/openrouter';
import { getBuildTimeApiKeyForProvider } from '../lib/ai/provider-keys';
import { getAiProviderLabel, type AiProviderId } from '../lib/ai/provider-options';
import {
  AI_MODEL_SLOTS,
  type AiModelSlot,
  readStoredProviderKey,
  readStoredSlotModelId,
  readStoredSlotProvider,
  writeStoredProviderKey,
  writeStoredSlotModelId,
  writeStoredSlotProvider,
} from '../lib/ai/ai-slots';
import {
  filterModelsForSlot,
  getDefaultModelIdForProvider,
  getMinimalModelsForProvider,
  loadModelsForProvider,
} from '../lib/ai/load-provider-models';
import {
  clearXaiOauthSession,
  connectXaiOauthWithPastedToken,
  getValidXaiOauthAccessToken,
  getXaiOauthSession,
  openXaiOauthVerificationPage,
  pollXaiOauthDeviceToken,
  startXaiOauthDeviceFlow,
  type XaiOauthDevicePending,
  type XaiOauthDeviceState,
} from '../lib/ai/xai-oauth';

export type { AiProviderId };
export type { AiModelSlot };

export type AiSlotView = {
  slot: AiModelSlot;
  provider: AiProviderId;
  modelId: string;
  /** Remembered key for this slot's provider (empty for xai-oauth). */
  apiKey: string;
  models: OpenRouterModelSummary[];
  catalogState: 'idle' | 'loading' | 'ready' | 'error';
  catalogError: string | null;
};

export interface AiSettingsContextType {
  /** Per-use-type slot configuration. */
  slots: Record<AiModelSlot, AiSlotView>;
  setSlotProvider: (slot: AiModelSlot, provider: AiProviderId) => void;
  setSlotModelId: (slot: AiModelSlot, modelId: string) => void;
  /** Shared key vault — same provider on multiple slots shares one remembered key. */
  setProviderApiKey: (provider: AiProviderId, apiKey: string) => void;
  getProviderApiKey: (provider: AiProviderId) => string;
  refreshProviderModels: (provider: AiProviderId) => Promise<void>;
  /** xAI OAuth device flow (no API key UI). */
  xaiOauthDevice: XaiOauthDeviceState;
  startXaiOauthDeviceFlow: () => Promise<void>;
  openXaiOauthBrowser: () => void;
  cancelXaiOauthDeviceFlow: () => void;
  disconnectXaiOauth: () => void;
  /** Advanced: paste a bearer access token if device flow is unavailable. */
  pasteXaiOauthToken: (accessToken: string) => void;
  xaiOauthConnected: boolean;
  /**
   * Resolve credential for a provider (API key vault or OAuth bearer).
   * Used by runtime + refresh.
   */
  resolveProviderCredential: (provider: AiProviderId) => Promise<string>;

  // —— Backward-compatible surface (legacy single-provider fields map to creative/simple/vision/image slots) ——
  provider: AiProviderId;
  setProvider: (provider: AiProviderId) => void;
  providerApiKey: string;
  /** @deprecated use setProviderApiKey(provider, key) — still works for active creative slot provider */
  setProviderApiKeyLegacy?: (apiKey: string) => void;
  providerSimpleModels: OpenRouterModelSummary[];
  providerCreativeModels: OpenRouterModelSummary[];
  providerVisionModels: OpenRouterModelSummary[];
  providerImageModels: OpenRouterModelSummary[];
  providerModelCatalogState: 'idle' | 'loading' | 'ready' | 'error';
  providerModelCatalogError: string | null;
  providerSimpleModelId: string;
  setProviderSimpleModelId: (modelId: string) => void;
  providerTextModelId: string;
  setProviderTextModelId: (modelId: string) => void;
  providerVisionModelId: string;
  setProviderVisionModelId: (modelId: string) => void;
  providerImageModelId: string;
  setProviderImageModelId: (modelId: string) => void;
}

const AiSettingsContext = createContext<AiSettingsContextType | null>(null);

const emptyCatalog = { state: 'idle' as const, error: null as string | null, models: [] as OpenRouterModelSummary[] };

export const AiSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slotProviders, setSlotProviders] = useState<Record<AiModelSlot, AiProviderId>>(() => ({
    creative: readStoredSlotProvider('creative'),
    simple: readStoredSlotProvider('simple'),
    vision: readStoredSlotProvider('vision'),
    image: readStoredSlotProvider('image'),
  }));

  const [slotModelIds, setSlotModelIds] = useState<Record<AiModelSlot, string>>(() => ({
    creative: readStoredSlotModelId('creative', getDefaultModelIdForProvider(readStoredSlotProvider('creative'), 'creative')),
    simple: readStoredSlotModelId('simple', getDefaultModelIdForProvider(readStoredSlotProvider('simple'), 'simple')),
    vision: readStoredSlotModelId('vision', getDefaultModelIdForProvider(readStoredSlotProvider('vision'), 'vision')),
    image: readStoredSlotModelId('image', getDefaultModelIdForProvider(readStoredSlotProvider('image'), 'image')),
  }));

  const [keyVault, setKeyVault] = useState<Partial<Record<AiProviderId, string>>>(() => {
    const vault: Partial<Record<AiProviderId, string>> = {};
    for (const id of ['openai', 'anthropic', 'openrouter', 'gemini', 'opencode-go', 'deepseek', 'zhipu', 'xai'] as AiProviderId[]) {
      vault[id] = readStoredProviderKey(id) || getBuildTimeApiKeyForProvider(id);
    }
    return vault;
  });

  const [catalogs, setCatalogs] = useState<Record<string, {
    state: 'idle' | 'loading' | 'ready' | 'error';
    error: string | null;
    models: OpenRouterModelSummary[];
  }>>({});

  const [xaiOauthDevice, setXaiOauthDevice] = useState<XaiOauthDeviceState>({ status: 'idle' });
  const [xaiOauthConnected, setXaiOauthConnected] = useState(() => Boolean(getXaiOauthSession()?.accessToken));
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<XaiOauthDevicePending | null>(null);

  const clearPoll = () => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  };

  const resolveProviderCredential = useCallback(async (provider: AiProviderId) => {
    if (provider === 'xai-oauth') {
      const token = await getValidXaiOauthAccessToken();
      return token || '';
    }
    return (keyVault[provider] || getBuildTimeApiKeyForProvider(provider) || '').trim();
  }, [keyVault]);

  const ensureCatalog = useCallback(async (provider: AiProviderId, force = false) => {
    const existing = catalogs[provider];
    if (!force && existing && (existing.state === 'ready' || existing.state === 'loading') && existing.models.length > 0) {
      return existing.models;
    }
    setCatalogs(prev => ({
      ...prev,
      [provider]: { state: 'loading', error: null, models: prev[provider]?.models || getMinimalModelsForProvider(provider) },
    }));
    try {
      const credential = await resolveProviderCredential(provider);
      const models = await loadModelsForProvider(provider, credential);
      setCatalogs(prev => ({
        ...prev,
        [provider]: { state: 'ready', error: null, models },
      }));
      return models;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load models';
      const fallback = getMinimalModelsForProvider(provider);
      setCatalogs(prev => ({
        ...prev,
        [provider]: { state: 'error', error: message, models: fallback },
      }));
      return fallback;
    }
  }, [catalogs, resolveProviderCredential]);

  // Warm catalogs for providers used by any slot
  useEffect(() => {
    const used = new Set(AI_MODEL_SLOTS.map(s => slotProviders[s]));
    used.forEach(p => {
      void ensureCatalog(p, false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when slot providers change
  }, [slotProviders.creative, slotProviders.simple, slotProviders.vision, slotProviders.image]);

  const setSlotProvider = useCallback((slot: AiModelSlot, provider: AiProviderId) => {
    setSlotProviders(prev => ({ ...prev, [slot]: provider }));
    writeStoredSlotProvider(slot, provider);
    const defaultModel = getDefaultModelIdForProvider(provider, slot);
    setSlotModelIds(prev => {
      const next = { ...prev, [slot]: defaultModel };
      writeStoredSlotModelId(slot, defaultModel);
      return next;
    });
    void ensureCatalog(provider, false);
  }, [ensureCatalog]);

  const setSlotModelId = useCallback((slot: AiModelSlot, modelId: string) => {
    setSlotModelIds(prev => ({ ...prev, [slot]: modelId }));
    writeStoredSlotModelId(slot, modelId);
  }, []);

  const setProviderApiKey = useCallback((provider: AiProviderId, apiKey: string) => {
    if (provider === 'xai-oauth') return;
    const trimmed = apiKey.trim();
    setKeyVault(prev => ({ ...prev, [provider]: trimmed }));
    writeStoredProviderKey(provider, trimmed);
  }, []);

  const getProviderApiKey = useCallback((provider: AiProviderId) => {
    if (provider === 'xai-oauth') return '';
    return keyVault[provider] || '';
  }, [keyVault]);

  const refreshProviderModels = useCallback(async (provider: AiProviderId) => {
    await ensureCatalog(provider, true);
  }, [ensureCatalog]);

  const cancelXaiOauthDeviceFlow = useCallback(() => {
    clearPoll();
    pendingRef.current = null;
    setXaiOauthDevice(getXaiOauthSession()?.accessToken ? { status: 'connected' } : { status: 'idle' });
  }, []);

  const disconnectXaiOauth = useCallback(() => {
    clearPoll();
    pendingRef.current = null;
    clearXaiOauthSession();
    setXaiOauthConnected(false);
    setXaiOauthDevice({ status: 'idle' });
  }, []);

  const schedulePoll = useCallback((pending: XaiOauthDevicePending, intervalSeconds: number) => {
    clearPoll();
    pollTimerRef.current = setTimeout(async () => {
      const result = await pollXaiOauthDeviceToken(pending);
      if (result.status === 'success') {
        pendingRef.current = null;
        setXaiOauthConnected(true);
        setXaiOauthDevice({ status: 'connected' });
        void ensureCatalog('xai-oauth', true);
        return;
      }
      if (result.status === 'pending') {
        setXaiOauthDevice({ status: 'polling', pending });
        schedulePoll(pending, pending.intervalSeconds);
        return;
      }
      if (result.status === 'slow_down') {
        const next = { ...pending, intervalSeconds: result.intervalSeconds };
        pendingRef.current = next;
        setXaiOauthDevice({ status: 'polling', pending: next });
        schedulePoll(next, result.intervalSeconds);
        return;
      }
      if (result.status === 'expired') {
        pendingRef.current = null;
        setXaiOauthDevice({ status: 'error', message: 'Device code expired. Start again.' });
        return;
      }
      if (result.status === 'denied') {
        pendingRef.current = null;
        setXaiOauthDevice({ status: 'error', message: result.message });
      }
    }, Math.max(3, intervalSeconds) * 1000);
  }, [ensureCatalog]);

  const startXaiOauthDeviceFlowUi = useCallback(async () => {
    clearPoll();
    setXaiOauthDevice({ status: 'starting' });
    try {
      const pending = await startXaiOauthDeviceFlow();
      pendingRef.current = pending;
      setXaiOauthDevice({ status: 'pending', pending });
      // Auto-open browser once
      openXaiOauthVerificationPage(pending);
      schedulePoll(pending, pending.intervalSeconds);
    } catch (err) {
      setXaiOauthDevice({
        status: 'error',
        message: err instanceof Error ? err.message : 'Failed to start xAI OAuth',
      });
    }
  }, [schedulePoll]);

  const openXaiOauthBrowser = useCallback(() => {
    const pending = pendingRef.current
      || (xaiOauthDevice.status === 'pending' || xaiOauthDevice.status === 'polling'
        ? xaiOauthDevice.pending
        : null);
    if (pending) openXaiOauthVerificationPage(pending);
  }, [xaiOauthDevice]);

  const pasteXaiOauthToken = useCallback((accessToken: string) => {
    try {
      connectXaiOauthWithPastedToken({ accessToken, persistLocally: true });
      clearPoll();
      pendingRef.current = null;
      setXaiOauthConnected(true);
      setXaiOauthDevice({ status: 'connected' });
      void ensureCatalog('xai-oauth', true);
    } catch (err) {
      setXaiOauthDevice({
        status: 'error',
        message: err instanceof Error ? err.message : 'Invalid token',
      });
    }
  }, [ensureCatalog]);

  useEffect(() => () => clearPoll(), []);

  const slots = useMemo(() => {
    const out = {} as Record<AiModelSlot, AiSlotView>;
    for (const slot of AI_MODEL_SLOTS) {
      const provider = slotProviders[slot];
      const cat = catalogs[provider] || {
        state: 'idle' as const,
        error: null,
        models: getMinimalModelsForProvider(provider),
      };
      const filtered = filterModelsForSlot(cat.models, slot);
      let modelId = slotModelIds[slot];
      if (filtered.length && !filtered.some(m => m.id === modelId)) {
        modelId = filtered[0].id;
      }
      out[slot] = {
        slot,
        provider,
        modelId,
        apiKey: provider === 'xai-oauth' ? '' : (keyVault[provider] || ''),
        models: filtered,
        catalogState: cat.state,
        catalogError: cat.error,
      };
    }
    return out;
  }, [slotProviders, slotModelIds, catalogs, keyVault]);

  // Legacy single-provider surface (maps to creative slot for "active" provider)
  const provider = slots.creative.provider;
  const setProvider = useCallback((p: AiProviderId) => setSlotProvider('creative', p), [setSlotProvider]);
  const providerApiKey = provider === 'xai-oauth' ? (xaiOauthConnected ? 'oauth-session' : '') : (keyVault[provider] || '');

  const value = useMemo<AiSettingsContextType>(() => ({
    slots,
    setSlotProvider,
    setSlotModelId,
    setProviderApiKey,
    getProviderApiKey,
    refreshProviderModels,
    xaiOauthDevice,
    startXaiOauthDeviceFlow: startXaiOauthDeviceFlowUi,
    openXaiOauthBrowser,
    cancelXaiOauthDeviceFlow,
    disconnectXaiOauth,
    pasteXaiOauthToken,
    xaiOauthConnected,
    resolveProviderCredential,
    // legacy
    provider,
    setProvider,
    providerApiKey,
    providerSimpleModels: slots.simple.models,
    providerCreativeModels: slots.creative.models,
    providerVisionModels: slots.vision.models,
    providerImageModels: slots.image.models,
    providerModelCatalogState: slots.creative.catalogState,
    providerModelCatalogError: slots.creative.catalogError,
    providerSimpleModelId: slots.simple.modelId,
    setProviderSimpleModelId: (id: string) => setSlotModelId('simple', id),
    providerTextModelId: slots.creative.modelId,
    setProviderTextModelId: (id: string) => setSlotModelId('creative', id),
    providerVisionModelId: slots.vision.modelId,
    setProviderVisionModelId: (id: string) => setSlotModelId('vision', id),
    providerImageModelId: slots.image.modelId,
    setProviderImageModelId: (id: string) => setSlotModelId('image', id),
  }), [
    slots,
    setSlotProvider,
    setSlotModelId,
    setProviderApiKey,
    getProviderApiKey,
    refreshProviderModels,
    xaiOauthDevice,
    startXaiOauthDeviceFlowUi,
    openXaiOauthBrowser,
    cancelXaiOauthDeviceFlow,
    disconnectXaiOauth,
    pasteXaiOauthToken,
    xaiOauthConnected,
    resolveProviderCredential,
    provider,
    setProvider,
    providerApiKey,
  ]);

  return (
    <AiSettingsContext.Provider value={value}>
      {children}
    </AiSettingsContext.Provider>
  );
};

export const useAiSettings = () => {
  const ctx = useContext(AiSettingsContext);
  if (!ctx) throw new Error('useAiSettings must be used within AiSettingsProvider');
  return ctx;
};

// Re-export slot helpers for Settings UI
export { AI_MODEL_SLOTS, AI_SLOT_LABELS, AI_SLOT_DESCRIPTIONS } from '../lib/ai/ai-slots';
export { getAiProviderLabel } from '../lib/ai/provider-options';
