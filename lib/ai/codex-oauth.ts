/**
 * OpenAI Codex OAuth session helpers.
 *
 * Device login against auth.openai.com using the public Codex CLI client
 * (same flow as the Codex CLI / AI Provider Library reference).
 * Browser SPAs cannot call auth.openai.com directly (CORS) — use the
 * same-origin proxy path `/__codex_oauth/*` (Vite dev proxy).
 *
 * Flow (verified against AI-Provider-Library-for-Foundry-VTT backend/app/oauth.py):
 *   1. POST /api/accounts/deviceauth/usercode  {client_id} → user_code + device_auth_id
 *   2. User opens https://auth.openai.com/codex/device and approves
 *   3. POST /api/accounts/deviceauth/token {device_auth_id, user_code}
 *      403/404 = still pending; 200 → authorization_code + code_verifier
 *   4. POST /oauth/token (authorization_code + PKCE verifier, redirect
 *      https://auth.openai.com/deviceauth/callback) → access/refresh tokens
 *   5. Refresh: POST /oauth/token grant_type=refresh_token
 */

export const CODEX_OAUTH_STORAGE_KEYS = {
  accessToken: 'ai.openai-codex.accessToken',
  refreshToken: 'ai.openai-codex.refreshToken',
  expiresAt: 'ai.openai-codex.expiresAt',
} as const;

/** Public Codex CLI OAuth client_id (not a secret). */
export const CODEX_OAUTH_CLIENT_ID = 'app_EMoamEEZ73f0CkXaXp7hrann';

export const CODEX_OAUTH_ABSOLUTE = {
  userCode: 'https://auth.openai.com/api/accounts/deviceauth/usercode',
  poll: 'https://auth.openai.com/api/accounts/deviceauth/token',
  token: 'https://auth.openai.com/oauth/token',
} as const;

export const CODEX_OAUTH_VERIFY_URL = 'https://auth.openai.com/codex/device';
export const CODEX_OAUTH_REDIRECT = 'https://auth.openai.com/deviceauth/callback';

/** Same-origin proxy prefix (Vite `server.proxy`). */
export const CODEX_OAUTH_PROXY_PREFIX = '/__codex_oauth';

const FORM_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as const;

export const getCodexOauthUrls = () => {
  const inBrowser = typeof window !== 'undefined';
  if (inBrowser) {
    return {
      userCode: `${CODEX_OAUTH_PROXY_PREFIX}/api/accounts/deviceauth/usercode`,
      poll: `${CODEX_OAUTH_PROXY_PREFIX}/api/accounts/deviceauth/token`,
      token: `${CODEX_OAUTH_PROXY_PREFIX}/oauth/token`,
    };
  }
  return CODEX_OAUTH_ABSOLUTE;
};

export type CodexOauthSession = {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number | null;
};

export type CodexOauthDevicePending = {
  deviceAuthId: string;
  userCode: string;
  verificationUri: string;
  intervalSeconds: number;
  expiresAt: number;
};

export type CodexOauthDeviceState =
  | { status: 'idle' }
  | { status: 'starting' }
  | { status: 'pending'; pending: CodexOauthDevicePending }
  | { status: 'polling'; pending: CodexOauthDevicePending }
  | { status: 'connected' }
  | { status: 'error'; message: string; pending?: CodexOauthDevicePending | null };

const read = (storage: Storage | undefined, key: string) => {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const write = (storage: Storage | undefined, key: string, value: string | null) => {
  if (!storage) return;
  try {
    if (value == null) storage.removeItem(key);
    else storage.setItem(key, value);
  } catch {
    // private mode
  }
};

export const getCodexOauthSession = (): CodexOauthSession | null => {
  if (typeof window === 'undefined') return null;
  const session = window.sessionStorage;
  const local = window.localStorage;
  const accessToken =
    read(session, CODEX_OAUTH_STORAGE_KEYS.accessToken)
    || read(local, CODEX_OAUTH_STORAGE_KEYS.accessToken);
  if (!accessToken) return null;
  const refreshToken =
    read(session, CODEX_OAUTH_STORAGE_KEYS.refreshToken)
    || read(local, CODEX_OAUTH_STORAGE_KEYS.refreshToken);
  const expiresRaw =
    read(session, CODEX_OAUTH_STORAGE_KEYS.expiresAt)
    || read(local, CODEX_OAUTH_STORAGE_KEYS.expiresAt);
  const expiresAt = expiresRaw ? Number(expiresRaw) : null;
  return {
    accessToken,
    refreshToken: refreshToken || null,
    expiresAt: Number.isFinite(expiresAt) ? expiresAt : null,
  };
};

export const setCodexOauthSession = (
  session: CodexOauthSession,
  options?: { persistLocally?: boolean },
) => {
  if (typeof window === 'undefined') return;
  const primary = window.sessionStorage;
  const secondary = options?.persistLocally ? window.localStorage : null;
  write(primary, CODEX_OAUTH_STORAGE_KEYS.accessToken, session.accessToken);
  write(primary, CODEX_OAUTH_STORAGE_KEYS.refreshToken, session.refreshToken);
  write(
    primary,
    CODEX_OAUTH_STORAGE_KEYS.expiresAt,
    session.expiresAt != null ? String(session.expiresAt) : null,
  );
  if (secondary) {
    write(secondary, CODEX_OAUTH_STORAGE_KEYS.accessToken, session.accessToken);
    write(secondary, CODEX_OAUTH_STORAGE_KEYS.refreshToken, session.refreshToken);
    write(
      secondary,
      CODEX_OAUTH_STORAGE_KEYS.expiresAt,
      session.expiresAt != null ? String(session.expiresAt) : null,
    );
  }
};

export const clearCodexOauthSession = () => {
  if (typeof window === 'undefined') return;
  for (const key of Object.values(CODEX_OAUTH_STORAGE_KEYS)) {
    write(window.sessionStorage, key, null);
    write(window.localStorage, key, null);
  }
};

export const isCodexOauthSessionExpired = (session: CodexOauthSession | null, skewMs = 60_000) => {
  if (!session?.accessToken) return true;
  if (session.expiresAt == null) return false;
  return Date.now() >= session.expiresAt - skewMs;
};

/** Read chatgpt_account_id from the unverified access-token JWT payload. */
export const chatgptAccountId = (token: string): string => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return '';
    const pad = '='.repeat((4 - (parts[1].length % 4)) % 4);
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/') + pad));
    const auth = payload?.['https://api.openai.com/auth'];
    if (auth && typeof auth === 'object') {
      return String(auth.chatgpt_account_id || '').trim();
    }
  } catch {
    /* ignore */
  }
  return '';
};

const readBody = async (response: Response): Promise<{ json: any; text: string }> => {
  const text = await response.text().catch(() => '');
  if (!text) return { json: null, text: '' };
  try {
    return { json: JSON.parse(text), text };
  } catch {
    return { json: null, text };
  }
};

const looksLikeHtml = (text: string) => /^\s*<(!doctype|html)/i.test(text);

const PROXY_HELP =
  'Codex device OAuth needs a same-origin proxy: Vite dev (`server.proxy./__codex_oauth` → https://auth.openai.com) ' +
  'or an equivalent reverse proxy in production. Hard-refresh the page after restarting `npm run dev`. ' +
  'Alternatively pick provider "OpenAI (API key)" or use advanced token paste.';

const describeFetchFailure = (err: unknown, phase: string) => {
  const name = err instanceof Error ? err.name : '';
  const msg = err instanceof Error ? err.message : String(err);
  if (name === 'TypeError' || /failed to fetch|networkerror|load failed/i.test(msg)) {
    return `${phase}: could not reach OpenAI auth (network/CORS/proxy). ${PROXY_HELP}`;
  }
  return `${phase}: ${msg || 'unknown error'}`;
};

export const startCodexOauthDeviceFlow = async (): Promise<CodexOauthDevicePending> => {
  const urls = getCodexOauthUrls();
  let response: Response;
  try {
    response = await fetch(urls.userCode, {
      method: 'POST',
      headers: FORM_HEADERS,
      body: JSON.stringify({ client_id: CODEX_OAUTH_CLIENT_ID }),
    });
  } catch (err) {
    throw new Error(describeFetchFailure(err, 'Device code request'));
  }

  const { json, text } = await readBody(response);
  if (looksLikeHtml(text)) {
    throw new Error(
      `Device code request got HTML instead of OAuth JSON (proxy missing or misconfigured). ${PROXY_HELP}`,
    );
  }
  if (!response.ok) {
    const msg = json?.error?.message || json?.error || json?.message
      || `Device code failed (${response.status})`;
    throw new Error(String(msg) + (text && !json ? ` ${text.slice(0, 80)}` : ''));
  }

  const userCode = String(json?.user_code || '');
  const deviceAuthId = String(json?.device_auth_id || json?.deviceAuthId || '');
  // interval can arrive as a string ("5")
  const intervalSeconds = Math.max(3, Number(json?.interval ?? 5) || 5);
  const expiresAtRaw = json?.expires_at ? Date.parse(json.expires_at) : NaN;
  const expiresAt = Number.isFinite(expiresAtRaw)
    ? expiresAtRaw
    : Date.now() + 15 * 60 * 1000;

  if (!userCode || !deviceAuthId) {
    throw new Error('OpenAI did not return a device/user code. Check client_id in codex-oauth.ts.');
  }

  return {
    deviceAuthId,
    userCode,
    verificationUri: CODEX_OAUTH_VERIFY_URL,
    intervalSeconds,
    expiresAt,
  };
};

export type CodexOauthPollResult =
  | { status: 'pending'; intervalSeconds?: number }
  | { status: 'expired' }
  | { status: 'denied'; message: string }
  | { status: 'error'; message: string }
  | { status: 'success'; session: CodexOauthSession };

/** One poll against the token endpoint while the user completes browser auth. */
export const pollCodexOauthDeviceToken = async (
  pending: CodexOauthDevicePending,
): Promise<CodexOauthPollResult> => {
  if (Date.now() >= pending.expiresAt) {
    return { status: 'expired' };
  }

  const urls = getCodexOauthUrls();
  let response: Response;
  try {
    response = await fetch(urls.poll, {
      method: 'POST',
      headers: FORM_HEADERS,
      body: JSON.stringify({
        device_auth_id: pending.deviceAuthId,
        user_code: pending.userCode,
      }),
    });
  } catch {
    return { status: 'pending' };
  }

  const { json, text } = await readBody(response);
  if (looksLikeHtml(text)) {
    return { status: 'pending' };
  }

  // OpenAI signals "not approved yet" with 403/404
  if (response.status === 403 || response.status === 404) {
    return { status: 'pending' };
  }
  if (!response.ok) {
    const msg = json?.error?.message || json?.error_description || json?.error
      || `Login poll failed (HTTP ${response.status})`;
    return { status: 'error', message: String(msg) };
  }

  const authorizationCode = String(json?.authorization_code || '');
  const codeVerifier = String(json?.code_verifier || '');
  if (!authorizationCode || !codeVerifier) {
    return { status: 'pending' };
  }

  // Exchange authorization code for tokens (form-encoded)
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: CODEX_OAUTH_REDIRECT,
    client_id: CODEX_OAUTH_CLIENT_ID,
    code_verifier: codeVerifier,
  });
  let tokenResp: Response;
  try {
    tokenResp = await fetch(urls.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body,
    });
  } catch (err) {
    return { status: 'error', message: describeFetchFailure(err, 'Token exchange') };
  }

  const tokenJson = (await readBody(tokenResp)).json;
  if (!tokenResp.ok || !tokenJson?.access_token) {
    const msg = tokenJson?.error_description || tokenJson?.error?.message
      || `Token exchange failed (${tokenResp.status})`;
    return { status: 'error', message: String(msg) };
  }

  const expiresIn = Number(tokenJson.expires_in ?? 3600) || 3600;
  const session: CodexOauthSession = {
    accessToken: String(tokenJson.access_token),
    refreshToken: tokenJson.refresh_token ? String(tokenJson.refresh_token) : null,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  setCodexOauthSession(session, { persistLocally: true });
  return { status: 'success', session };
};

export const refreshCodexOauthToken = async (refreshToken: string): Promise<CodexOauthSession> => {
  const urls = getCodexOauthUrls();
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CODEX_OAUTH_CLIENT_ID,
    refresh_token: refreshToken,
  });
  const response = await fetch(urls.token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body,
  });
  const { json, text } = await readBody(response);
  if (looksLikeHtml(text)) {
    throw new Error(`Token refresh got HTML instead of OAuth JSON. ${PROXY_HELP}`);
  }
  if (!response.ok || !json?.access_token) {
    throw new Error(String(json?.error_description || json?.error?.message || json?.error
      || `Refresh failed (${response.status})`));
  }
  const expiresIn = Number(json.expires_in ?? 3600) || 3600;
  const session: CodexOauthSession = {
    accessToken: String(json.access_token),
    refreshToken: json.refresh_token ? String(json.refresh_token) : refreshToken,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  setCodexOauthSession(session, { persistLocally: true });
  return session;
};

export const getValidCodexOauthAccessToken = async (): Promise<string | null> => {
  const session = getCodexOauthSession();
  if (!session?.accessToken) return null;
  if (!isCodexOauthSessionExpired(session)) return session.accessToken;
  if (session.refreshToken) {
    try {
      const refreshed = await refreshCodexOauthToken(session.refreshToken);
      return refreshed.accessToken;
    } catch {
      return null;
    }
  }
  if (session.expiresAt != null && Date.now() >= session.expiresAt) {
    return null;
  }
  return session.accessToken;
};

export const connectCodexOauthWithPastedToken = (params: {
  accessToken: string;
  refreshToken?: string | null;
  expiresAtOrInSeconds?: number | null;
  persistLocally?: boolean;
}) => {
  const token = params.accessToken.trim();
  if (!token) throw new Error('Access token is required.');
  let expiresAt: number | null = null;
  if (params.expiresAtOrInSeconds != null && Number.isFinite(params.expiresAtOrInSeconds)) {
    expiresAt = params.expiresAtOrInSeconds < 1e12
      ? Date.now() + params.expiresAtOrInSeconds * 1000
      : params.expiresAtOrInSeconds;
  }
  setCodexOauthSession(
    {
      accessToken: token,
      refreshToken: params.refreshToken?.trim() || null,
      expiresAt,
    },
    { persistLocally: params.persistLocally },
  );
};

/** Open the verification page in a new browser tab/window. */
export const openCodexOauthVerificationPage = (pending: CodexOauthDevicePending) => {
  const url = pending.verificationUri || CODEX_OAUTH_VERIFY_URL;
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
};
