import { describe, expect, it, vi, afterEach } from 'vitest';
import { HOST_OAUTH_TOKEN, isHostOauthToken, XAI_API_PROXY_PREFIX } from '../lib/ai/host-oauth';
import {
  chatgptAccountIdFromJwt,
  decodeJwtPayload,
  jwtExpiryMs,
  parseCodexCliAuth,
  parseGrokCliAuth,
  parsePiAuth,
  shouldInjectHostAuth,
} from '../vite/host-oauth';
import { fetchXaiModels } from '../lib/ai/xai';
import { isPrivateClientAddress } from '../vite/host-oauth-admin';

const b64url = (obj: unknown) => Buffer
  .from(JSON.stringify(obj))
  .toString('base64')
  .replace(/=+$/, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

const fakeJwt = (payload: Record<string, unknown>) => `hdr.${b64url(payload)}.sig`;

describe('host oauth inject policy', () => {
  it('injects when the browser sent no bearer or the host sentinel', () => {
    expect(shouldInjectHostAuth(undefined)).toBe(true);
    expect(shouldInjectHostAuth('')).toBe(true);
    expect(shouldInjectHostAuth('Bearer')).toBe(true);
    expect(shouldInjectHostAuth('Bearer host')).toBe(true);
    expect(shouldInjectHostAuth('host')).toBe(true);
    expect(isHostOauthToken(HOST_OAUTH_TOKEN)).toBe(true);
    expect(isHostOauthToken('')).toBe(false);
  });

  it('does not overwrite a real client bearer', () => {
    expect(shouldInjectHostAuth('Bearer eyJhbGciOiJIUzI1NiJ9.e30.sig')).toBe(false);
    expect(shouldInjectHostAuth('Bearer sk-player-own-key')).toBe(false);
  });
});

describe('host oauth session parsers', () => {
  it('reads Codex CLI auth.json tokens without requiring env', () => {
    const token = fakeJwt({
      exp: 2000000000,
      'https://api.openai.com/auth': { chatgpt_account_id: 'acct_cli' },
    });
    const session = parseCodexCliAuth({
      tokens: {
        access_token: token,
        refresh_token: 'r'.repeat(40),
        account_id: 'acct_cli',
      },
    }, '/tmp/codex-auth.json');
    expect(session?.source).toBe('codex-cli');
    expect(session?.accountId).toBe('acct_cli');
    expect(session?.refreshToken).toHaveLength(40);
    expect(chatgptAccountIdFromJwt(token)).toBe('acct_cli');
    expect(jwtExpiryMs(token)).toBe(2000000000 * 1000);
  });

  it('reads Grok CLI keyed entries and Pi xai-auth', () => {
    const grok = parseGrokCliAuth({
      'https://auth.x.ai::client': {
        key: 'g'.repeat(40),
        refresh_token: 'h'.repeat(40),
        expires_at: '2026-08-28T12:00:00.000Z',
      },
    }, '/tmp/grok-auth.json');
    expect(grok?.source).toBe('grok-cli');
    expect(grok?.accessToken).toHaveLength(40);

    const pi = parsePiAuth({
      'xai-auth': { access: 'p'.repeat(40), refresh: 'q'.repeat(40), expires: 1_800_000_000_000 },
    }, 'xai-auth', '/tmp/pi-auth.json');
    expect(pi?.source).toBe('pi-auth');
    expect(pi?.persistKind).toBe('pi-xai');
  });

  it('ignores stub-length tokens', () => {
    expect(parsePiAuth({
      'openai-codex': { access: 'short', refresh: 'nope' },
    }, 'openai-codex', null)).toBeNull();
    expect(decodeJwtPayload('not-a-jwt')).toBeNull();
  });
});

describe('host grok client routing', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls the same-origin proxy with no Authorization for the host sentinel', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [{ id: 'grok-4.5' }] }),
    });
    vi.stubGlobal('fetch', fetchMock);
    await fetchXaiModels(HOST_OAUTH_TOKEN);
    const calledUrl = String(fetchMock.mock.calls[0][0]);
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>;
    expect(calledUrl.startsWith(`${XAI_API_PROXY_PREFIX}/v1`)).toBe(true);
    expect(headers.Authorization).toBeUndefined();
  });
});

describe('host admin client gate', () => {
  it('treats loopback, RFC1918, and Tailscale as private',
    () => {
      expect(isPrivateClientAddress('127.0.0.1')).toBe(true);
      expect(isPrivateClientAddress('::1')).toBe(true);
      expect(isPrivateClientAddress('::ffff:192.168.1.217')).toBe(true);
      expect(isPrivateClientAddress('10.0.0.8')).toBe(true);
      expect(isPrivateClientAddress('172.20.0.1')).toBe(true);
      expect(isPrivateClientAddress('100.106.46.69')).toBe(true);
      expect(isPrivateClientAddress('8.8.8.8')).toBe(false);
      expect(isPrivateClientAddress('100.63.1.1')).toBe(false);
    });
});
