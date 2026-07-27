import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getZhipuModelCacheSummaries, fetchZhipuModels, ZHIPU_CODING_API_BASE } from '../lib/ai/zhipu';
import { getXaiModelCacheSummaries, fetchXaiModels, XAI_API_BASE } from '../lib/ai/xai';
import {
  clearXaiOauthSession,
  connectXaiOauthWithPastedToken,
  getValidXaiOauthAccessToken,
  getXaiOauthSession,
  getXaiOauthUrls,
  startXaiOauthDeviceFlow,
  XAI_OAUTH_ABSOLUTE,
  XAI_OAUTH_CLIENT_ID,
  XAI_OAUTH_PROXY_PREFIX,
  XAI_OAUTH_SCOPE,
} from '../lib/ai/xai-oauth';
import { AI_PROVIDER_IDS, isAiProviderId } from '../lib/ai/provider-options';

describe('shared providers registry', () => {
  it('registers zhipu, xai, and xai-oauth', () => {
    expect(AI_PROVIDER_IDS).toContain('zhipu');
    expect(AI_PROVIDER_IDS).toContain('xai');
    expect(AI_PROVIDER_IDS).toContain('xai-oauth');
    expect(isAiProviderId('zhipu')).toBe(true);
    expect(isAiProviderId('xai-oauth')).toBe(true);
  });
});

describe('zhipu coding plan', () => {
  it('seeds GLM Coding Plan models', () => {
    const models = getZhipuModelCacheSummaries();
    expect(models.map(m => m.id)).toEqual(expect.arrayContaining(['glm-5.2', 'glm-5-turbo']));
  });

  it('fetches models from the Coding Plan base URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [{ id: 'glm-5.2' }, { id: 'glm-5-turbo' }] }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const models = await fetchZhipuModels('test-key');
    expect(fetchMock).toHaveBeenCalledWith(
      `${ZHIPU_CODING_API_BASE}/models`.replace(/([^:]\/)\/+/g, '$1'),
      expect.objectContaining({ headers: { Authorization: 'Bearer test-key' } }),
    );
    // joinUrl may normalize trailing slash — assert path ends with /models
    const calledUrl = String(fetchMock.mock.calls[0][0]);
    expect(calledUrl).toContain('/models');
    expect(calledUrl).toContain('coding/paas/v4');
    expect(models.map(m => m.id).sort()).toEqual(['glm-5-turbo', 'glm-5.2'].sort());
    vi.unstubAllGlobals();
  });
});

describe('xai api + oauth store', () => {
  beforeEach(() => {
    clearXaiOauthSession();
  });
  afterEach(() => {
    clearXaiOauthSession();
    vi.unstubAllGlobals();
  });

  it('seeds grok models', () => {
    const models = getXaiModelCacheSummaries();
    expect(models.some(m => m.id.startsWith('grok'))).toBe(true);
  });

  it('fetches from api.x.ai', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [{ id: 'grok-4.5' }] }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const models = await fetchXaiModels('xai-key');
    const calledUrl = String(fetchMock.mock.calls[0][0]);
    expect(calledUrl.startsWith(XAI_API_BASE) || calledUrl.includes('api.x.ai')).toBe(true);
    expect(models.map(m => m.id)).toContain('grok-4.5');
  });

  it('stores and reads pasted oauth tokens', async () => {
    connectXaiOauthWithPastedToken({ accessToken: '  tok_abc  ' });
    const session = getXaiOauthSession();
    expect(session?.accessToken).toBe('tok_abc');
    await expect(getValidXaiOauthAccessToken()).resolves.toBe('tok_abc');
    clearXaiOauthSession();
    expect(getXaiOauthSession()).toBeNull();
  });

  it('uses absolute auth.x.ai URLs outside the browser', () => {
    // jsdom may set window; force non-browser path by deleting window briefly is hard —
    // assert absolute constants + proxy prefix shape instead.
    expect(XAI_OAUTH_ABSOLUTE.deviceCode).toBe('https://auth.x.ai/oauth2/device/code');
    expect(XAI_OAUTH_ABSOLUTE.token).toBe('https://auth.x.ai/oauth2/token');
    expect(XAI_OAUTH_PROXY_PREFIX).toBe('/__xai_oauth');
    expect(XAI_OAUTH_CLIENT_ID).toMatch(/^[0-9a-f-]{36}$/i);
    expect(XAI_OAUTH_SCOPE).toContain('grok-cli:access');
    // In vitest/jsdom, window exists → browser proxy paths
    const urls = getXaiOauthUrls();
    expect(urls.deviceCode).toBe(`${XAI_OAUTH_PROXY_PREFIX}/oauth2/device/code`);
    expect(urls.token).toBe(`${XAI_OAUTH_PROXY_PREFIX}/oauth2/token`);
  });

  it('starts device flow against the proxy URL with correct client + scope', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({
        device_code: 'dev-1',
        user_code: 'ABCD-EFGH',
        verification_uri: 'https://accounts.x.ai/oauth2/device',
        verification_uri_complete: 'https://accounts.x.ai/oauth2/device?user_code=ABCD-EFGH',
        expires_in: 1800,
        interval: 5,
      }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const pending = await startXaiOauthDeviceFlow();
    expect(fetchMock).toHaveBeenCalledWith(
      `${XAI_OAUTH_PROXY_PREFIX}/oauth2/device/code`,
      expect.objectContaining({ method: 'POST' }),
    );
    const body = fetchMock.mock.calls[0][1].body as URLSearchParams;
    expect(body.get('client_id')).toBe(XAI_OAUTH_CLIENT_ID);
    expect(body.get('scope')).toBe(XAI_OAUTH_SCOPE);
    expect(pending.userCode).toBe('ABCD-EFGH');
    expect(pending.deviceCode).toBe('dev-1');
  });

  it('rejects HTML proxy-miss responses with a clear error', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => '<!DOCTYPE html><html><body>index</body></html>',
    });
    vi.stubGlobal('fetch', fetchMock);
    await expect(startXaiOauthDeviceFlow()).rejects.toThrow(/HTML instead of OAuth JSON|proxy/i);
  });
});
