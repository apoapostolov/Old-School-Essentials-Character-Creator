import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  clearCodexOauthSession,
  connectCodexOauthWithPastedToken,
  getCodexOauthSession,
  getCodexOauthUrls,
  startCodexOauthDeviceFlow,
  pollCodexOauthDeviceToken,
  CODEX_OAUTH_ABSOLUTE,
  CODEX_OAUTH_CLIENT_ID,
  CODEX_OAUTH_PROXY_PREFIX,
  CODEX_OAUTH_VERIFY_URL,
} from '../lib/ai/codex-oauth';
import { getCodexModelCacheSummaries } from '../lib/ai/codex';

describe('openai codex oauth', () => {
  beforeEach(() => {
    clearCodexOauthSession();
  });
  afterEach(() => {
    clearCodexOauthSession();
    vi.unstubAllGlobals();
  });

  it('keeps absolute auth.openai.com constants and proxy shape', () => {
    expect(CODEX_OAUTH_ABSOLUTE.userCode).toBe('https://auth.openai.com/api/accounts/deviceauth/usercode');
    expect(CODEX_OAUTH_ABSOLUTE.poll).toBe('https://auth.openai.com/api/accounts/deviceauth/token');
    expect(CODEX_OAUTH_ABSOLUTE.token).toBe('https://auth.openai.com/oauth/token');
    expect(CODEX_OAUTH_PROXY_PREFIX).toBe('/__codex_oauth');
    expect(CODEX_OAUTH_CLIENT_ID).toMatch(/^app_[A-Za-z0-9]+$/);
    expect(CODEX_OAUTH_VERIFY_URL).toBe('https://auth.openai.com/codex/device');
    // jsdom sets window → browser proxy paths
    const urls = getCodexOauthUrls();
    expect(urls.userCode).toBe(`${CODEX_OAUTH_PROXY_PREFIX}/api/accounts/deviceauth/usercode`);
    expect(urls.poll).toBe(`${CODEX_OAUTH_PROXY_PREFIX}/api/accounts/deviceauth/token`);
    expect(urls.token).toBe(`${CODEX_OAUTH_PROXY_PREFIX}/oauth/token`);
  });

  it('stores and reads pasted tokens', () => {
    connectCodexOauthWithPastedToken({ accessToken: '  cod_tok  ', persistLocally: true });
    const session = getCodexOauthSession();
    expect(session?.accessToken).toBe('cod_tok');
    clearCodexOauthSession();
    expect(getCodexOauthSession()).toBeNull();
  });

  it('starts the device flow against the proxy with the public client id', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({
        device_auth_id: 'deviceauth_abc',
        user_code: '4BG9-Q679H',
        interval: '5', // string, as the real endpoint returns
        expires_at: '2026-08-21T12:03:09.063890+00:00',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const pending = await startCodexOauthDeviceFlow();
    expect(fetchMock).toHaveBeenCalledWith(
      `${CODEX_OAUTH_PROXY_PREFIX}/api/accounts/deviceauth/usercode`,
      expect.objectContaining({ method: 'POST' }),
    );
    const body = JSON.parse(String(fetchMock.mock.calls[0][1].body));
    expect(body.client_id).toBe(CODEX_OAUTH_CLIENT_ID);
    expect(pending.userCode).toBe('4BG9-Q679H');
    expect(pending.deviceAuthId).toBe('deviceauth_abc');
    expect(pending.intervalSeconds).toBe(5);
  });

  it('treats 403/404 poll responses as pending', async () => {
    const pending = {
      deviceAuthId: 'deviceauth_abc',
      userCode: '4BG9-Q679H',
      verificationUri: CODEX_OAUTH_VERIFY_URL,
      intervalSeconds: 5,
      expiresAt: Date.now() + 60_000,
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => '',
    });
    vi.stubGlobal('fetch', fetchMock);
    const result = await pollCodexOauthDeviceToken(pending);
    expect(result.status).toBe('pending');
  });

  it('exchanges authorization codes for a session', async () => {
    const pending = {
      deviceAuthId: 'deviceauth_abc',
      userCode: '4BG9-Q679H',
      verificationUri: CODEX_OAUTH_VERIFY_URL,
      intervalSeconds: 5,
      expiresAt: Date.now() + 60_000,
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ authorization_code: 'ac_1', code_verifier: 'cv_1' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ access_token: 'at_1', refresh_token: 'rt_1', expires_in: 3600 }),
      });
    vi.stubGlobal('fetch', fetchMock);
    const result = await pollCodexOauthDeviceToken(pending);
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.session.accessToken).toBe('at_1');
      expect(result.session.refreshToken).toBe('rt_1');
    }
    // second call: token exchange (form-encoded, PKCE verifier)
    const tokenCall = fetchMock.mock.calls[1];
    expect(String(tokenCall[0])).toBe(`${CODEX_OAUTH_PROXY_PREFIX}/oauth/token`);
    const tokenBody = tokenCall[1].body as URLSearchParams;
    expect(tokenBody.get('grant_type')).toBe('authorization_code');
    expect(tokenBody.get('code_verifier')).toBe('cv_1');
    expect(tokenBody.get('redirect_uri')).toBe('https://auth.openai.com/deviceauth/callback');
    // session persisted
    expect(getCodexOauthSession()?.accessToken).toBe('at_1');
  });

  it('rejects HTML proxy-miss responses with a clear error', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => '<!DOCTYPE html><html><body>index</body></html>',
    });
    vi.stubGlobal('fetch', fetchMock);
    await expect(startCodexOauthDeviceFlow()).rejects.toThrow(/HTML instead of OAuth JSON|proxy/i);
  });
});

describe('openai codex catalog', () => {
  it('seeds codex chat + image models', () => {
    const models = getCodexModelCacheSummaries();
    expect(models.some(m => m.id === 'gpt-5.6-luna')).toBe(true);
    expect(models.some(m => m.id === 'gpt-5.5')).toBe(true);
    expect(models.some(m => m.outputModalities.includes('image'))).toBe(true);
  });

  it('converts chat messages to Responses input rows', async () => {
    const { messagesToCodexInput } = await import('../lib/ai/codex');
    const { instructions, rows } = messagesToCodexInput([
      { role: 'system', content: 'You are a scribe.' },
      { role: 'user', content: 'Name a warrior.' },
    ]);
    expect(instructions).toBe('You are a scribe.');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      type: 'message',
      role: 'user',
      content: [{ type: 'input_text', text: 'Name a warrior.' }],
    });
  });

  it('extracts text deltas and completed text from SSE events', async () => {
    const { extractCodexText } = await import('../lib/ai/codex');
    expect(extractCodexText({ type: 'response.output_text.delta', delta: 'hi' })).toBe('hi');
    expect(extractCodexText({
      type: 'response.completed',
      response: { output: [{ type: 'message', content: [{ type: 'output_text', text: 'done' }] }] },
    })).toBe('done');
  });
});
