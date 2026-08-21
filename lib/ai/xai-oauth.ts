/**
 * xAI Grok OAuth / SuperGrok session helpers.
 *
 * Device-code OIDC against auth.x.ai (same public client as Grok CLI / pi-xai).
 * Browser SPAs cannot call auth.x.ai directly (CORS) — use same-origin proxy path
 * `/__xai_oauth/*` (Vite dev proxy; reverse-proxy in production if needed).
 *
 * @see docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md
 * Constants verified against pi-xai-supergrok / OIDC discovery:
 *   https://auth.x.ai/.well-known/openid-configuration
 */

export const XAI_OAUTH_STORAGE_KEYS = {
  accessToken: 'ai.xai-oauth.accessToken',
  refreshToken: 'ai.xai-oauth.refreshToken',
  expiresAt: 'ai.xai-oauth.expiresAt',
} as const;

/**
 * Public Grok-CLI OAuth client_id (not a secret).
 * xAI allowlists this client for device + loopback OAuth used by community CLIs.
 */
export const XAI_OAUTH_CLIENT_ID = 'b1a00492-073a-47ea-816f-4c329264a828';

export const XAI_OAUTH_SCOPE =
  'openid profile email offline_access grok-cli:access api:access';

export const XAI_OAUTH_DEVICE_CODE_GRANT =
  'urn:ietf:params:oauth:grant-type:device_code';

/** Absolute OIDC endpoints (server-side / non-browser). */
export const XAI_OAUTH_ABSOLUTE = {
  deviceCode: 'https://auth.x.ai/oauth2/device/code',
  token: 'https://auth.x.ai/oauth2/token',
  authorize: 'https://auth.x.ai/oauth2/authorize',
} as const;

/**
 * Same-origin proxy prefix (Vite `server.proxy` and optional production reverse proxy).
 * Rewrites to https://auth.x.ai so the browser avoids CORS.
 */
export const XAI_OAUTH_PROXY_PREFIX = '/__xai_oauth';

export const XAI_OAUTH_VERIFY_FALLBACK_URL = 'https://accounts.x.ai/oauth2/device';

const FORM_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
} as const;

/** Prefer proxy when running in a browser (CORS-safe). */
export const getXaiOauthUrls = () => {
  const inBrowser = typeof window !== 'undefined';
  if (inBrowser) {
    return {
      deviceCode: `${XAI_OAUTH_PROXY_PREFIX}/oauth2/device/code`,
      token: `${XAI_OAUTH_PROXY_PREFIX}/oauth2/token`,
    };
  }
  return {
    deviceCode: XAI_OAUTH_ABSOLUTE.deviceCode,
    token: XAI_OAUTH_ABSOLUTE.token,
  };
};

export type XaiOauthSession = {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number | null;
};

export type XaiOauthDevicePending = {
  deviceCode: string;
  userCode: string;
  verificationUri: string;
  verificationUriComplete: string | null;
  intervalSeconds: number;
  expiresAt: number;
};

export type XaiOauthDeviceState =
  | { status: 'idle' }
  | { status: 'starting' }
  | { status: 'pending'; pending: XaiOauthDevicePending }
  | { status: 'polling'; pending: XaiOauthDevicePending }
  | { status: 'connected' }
  | { status: 'error'; message: string; pending?: XaiOauthDevicePending | null };

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

export const getXaiOauthSession = (): XaiOauthSession | null => {
  if (typeof window === 'undefined') return null;
  const session = window.sessionStorage;
  const local = window.localStorage;
  const accessToken =
    read(session, XAI_OAUTH_STORAGE_KEYS.accessToken)
    || read(local, XAI_OAUTH_STORAGE_KEYS.accessToken);
  if (!accessToken) return null;
  const refreshToken =
    read(session, XAI_OAUTH_STORAGE_KEYS.refreshToken)
    || read(local, XAI_OAUTH_STORAGE_KEYS.refreshToken);
  const expiresRaw =
    read(session, XAI_OAUTH_STORAGE_KEYS.expiresAt)
    || read(local, XAI_OAUTH_STORAGE_KEYS.expiresAt);
  const expiresAt = expiresRaw ? Number(expiresRaw) : null;
  return {
    accessToken,
    refreshToken: refreshToken || null,
    expiresAt: Number.isFinite(expiresAt) ? expiresAt : null,
  };
};

export const setXaiOauthSession = (
  session: XaiOauthSession,
  options?: { persistLocally?: boolean },
) => {
  if (typeof window === 'undefined') return;
  const primary = window.sessionStorage;
  const secondary = options?.persistLocally ? window.localStorage : null;
  write(primary, XAI_OAUTH_STORAGE_KEYS.accessToken, session.accessToken);
  write(primary, XAI_OAUTH_STORAGE_KEYS.refreshToken, session.refreshToken);
  write(
    primary,
    XAI_OAUTH_STORAGE_KEYS.expiresAt,
    session.expiresAt != null ? String(session.expiresAt) : null,
  );
  if (secondary) {
    write(secondary, XAI_OAUTH_STORAGE_KEYS.accessToken, session.accessToken);
    write(secondary, XAI_OAUTH_STORAGE_KEYS.refreshToken, session.refreshToken);
    write(
      secondary,
      XAI_OAUTH_STORAGE_KEYS.expiresAt,
      session.expiresAt != null ? String(session.expiresAt) : null,
    );
  }
};

export const clearXaiOauthSession = () => {
  if (typeof window === 'undefined') return;
  for (const key of Object.values(XAI_OAUTH_STORAGE_KEYS)) {
    write(window.sessionStorage, key, null);
    write(window.localStorage, key, null);
  }
};

export const isXaiOauthSessionExpired = (session: XaiOauthSession | null, skewMs = 60_000) => {
  if (!session?.accessToken) return true;
  if (session.expiresAt == null) return false;
  return Date.now() >= session.expiresAt - skewMs;
};

export const getValidXaiOauthAccessToken = async (): Promise<string | null> => {
  const session = getXaiOauthSession();
  if (!session?.accessToken) return null;
  if (!isXaiOauthSessionExpired(session)) return session.accessToken;
  // Try refresh if we have a refresh token
  if (session.refreshToken) {
    try {
      const refreshed = await refreshXaiOauthToken(session.refreshToken);
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

export const connectXaiOauthWithPastedToken = (params: {
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
  setXaiOauthSession(
    {
      accessToken: token,
      refreshToken: params.refreshToken?.trim() || null,
      expiresAt,
    },
    { persistLocally: params.persistLocally },
  );
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
  'Device OAuth needs a same-origin proxy: Vite dev (`server.proxy./__xai_oauth` → https://auth.x.ai) ' +
  'or an equivalent reverse proxy in production. Hard-refresh the page after restarting `npm run dev`. ' +
  'Alternatively pick provider “xAI Grok (API key)” or use advanced token paste.';

const describeFetchFailure = (err: unknown, phase: string) => {
  const name = err instanceof Error ? err.name : '';
  const msg = err instanceof Error ? err.message : String(err);
  // Browser CORS / blocked fetch usually surfaces as TypeError: Failed to fetch
  if (name === 'TypeError' || /failed to fetch|networkerror|load failed/i.test(msg)) {
    return `${phase}: could not reach xAI auth (network/CORS/proxy). ${PROXY_HELP}`;
  }
  return `${phase}: ${msg || 'unknown error'}`;
};

/**
 * Start device-code flow. Returns pending codes for the UI.
 * UI must display `userCode` and open `verificationUri` in a browser.
 */
export const startXaiOauthDeviceFlow = async (): Promise<XaiOauthDevicePending> => {
  const urls = getXaiOauthUrls();
  const body = new URLSearchParams({
    client_id: XAI_OAUTH_CLIENT_ID,
    scope: XAI_OAUTH_SCOPE,
  });

  let response: Response;
  try {
    response = await fetch(urls.deviceCode, {
      method: 'POST',
      headers: FORM_HEADERS,
      body,
    });
  } catch (err) {
    throw new Error(describeFetchFailure(err, 'Device code request'));
  }

  const { json, text } = await readBody(response);

  // Vite SPA fallback or missing proxy often returns index.html with 200.
  if (looksLikeHtml(text)) {
    throw new Error(
      `Device code request got HTML instead of OAuth JSON (proxy missing or misconfigured). ${PROXY_HELP}`,
    );
  }

  if (!response.ok) {
    const msg =
      json?.error_description
      || json?.error
      || json?.message
      || (response.status === 403
        ? 'xAI rejected the device-code request (403). Cloudflare or client allowlist may be blocking the proxy.'
        : `Device code failed (${response.status})`);
    throw new Error(String(msg) + (text && !json ? ` ${text.slice(0, 80)}` : ''));
  }

  const deviceCode = String(json?.device_code || json?.deviceCode || '');
  const userCode = String(json?.user_code || json?.userCode || '');
  const verificationUri = String(
    json?.verification_uri
    || json?.verificationUri
    || json?.verification_url
    || XAI_OAUTH_VERIFY_FALLBACK_URL,
  );
  const verificationUriComplete = json?.verification_uri_complete || json?.verificationUriComplete || null;
  const intervalSeconds = Number(json?.interval ?? 5) || 5;
  const expiresIn = Number(json?.expires_in ?? json?.expiresIn ?? 1800) || 1800;

  if (!deviceCode || !userCode) {
    throw new Error(
      'xAI did not return a device/user code. Check client_id/scope in xai-oauth.ts, or use API key provider.',
    );
  }

  return {
    deviceCode,
    userCode,
    verificationUri,
    verificationUriComplete: verificationUriComplete ? String(verificationUriComplete) : null,
    intervalSeconds: Math.max(3, intervalSeconds),
    expiresAt: Date.now() + expiresIn * 1000,
  };
};

export type XaiOauthPollResult =
  | { status: 'pending' }
  | { status: 'slow_down'; intervalSeconds: number }
  | { status: 'expired' }
  | { status: 'denied'; message: string }
  | { status: 'success'; session: XaiOauthSession };

/** One poll against the token endpoint while the user completes browser auth. */
export const pollXaiOauthDeviceToken = async (
  pending: XaiOauthDevicePending,
): Promise<XaiOauthPollResult> => {
  if (Date.now() >= pending.expiresAt) {
    return { status: 'expired' };
  }

  const urls = getXaiOauthUrls();
  const body = new URLSearchParams({
    grant_type: XAI_OAUTH_DEVICE_CODE_GRANT,
    device_code: pending.deviceCode,
    client_id: XAI_OAUTH_CLIENT_ID,
  });

  let response: Response;
  try {
    response = await fetch(urls.token, {
      method: 'POST',
      headers: FORM_HEADERS,
      body,
    });
  } catch {
    return { status: 'pending' };
  }

  const { json, text } = await readBody(response);
  if (looksLikeHtml(text)) {
    return { status: 'pending' };
  }
  const err = String(json?.error || '');

  if (response.ok && (json?.access_token || json?.accessToken)) {
    const accessToken = String(json.access_token || json.accessToken);
    const refreshToken = json.refresh_token || json.refreshToken || null;
    const expiresIn = Number(json.expires_in ?? json.expiresIn ?? 3600);
    const session: XaiOauthSession = {
      accessToken,
      refreshToken: refreshToken ? String(refreshToken) : null,
      expiresAt: Date.now() + (Number.isFinite(expiresIn) ? expiresIn : 3600) * 1000,
    };
    setXaiOauthSession(session, { persistLocally: true });
    return { status: 'success', session };
  }

  if (err === 'authorization_pending' || response.status === 428) {
    return { status: 'pending' };
  }
  if (err === 'slow_down') {
    return {
      status: 'slow_down',
      intervalSeconds: Math.max(pending.intervalSeconds + 5, Number(json?.interval ?? 10)),
    };
  }
  if (err === 'expired_token' || err === 'expired') {
    return { status: 'expired' };
  }
  if (err === 'access_denied' || err === 'denied' || err === 'authorization_denied') {
    return { status: 'denied', message: String(json?.error_description || 'Access denied') };
  }

  if (response.status >= 400 && response.status < 500 && err) {
    return { status: 'denied', message: String(json?.error_description || err) };
  }
  return { status: 'pending' };
};

export const refreshXaiOauthToken = async (refreshToken: string): Promise<XaiOauthSession> => {
  const urls = getXaiOauthUrls();
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: XAI_OAUTH_CLIENT_ID,
  });
  const response = await fetch(urls.token, {
    method: 'POST',
    headers: FORM_HEADERS,
    body,
  });
  const { json, text } = await readBody(response);
  if (looksLikeHtml(text)) {
    throw new Error(`Token refresh got HTML instead of OAuth JSON. ${PROXY_HELP}`);
  }
  if (!response.ok || !(json?.access_token || json?.accessToken)) {
    throw new Error(String(json?.error_description || json?.error || `Refresh failed (${response.status})`));
  }
  const accessToken = String(json.access_token || json.accessToken);
  const nextRefresh = json.refresh_token || json.refreshToken || refreshToken;
  const expiresIn = Number(json.expires_in ?? json.expiresIn ?? 3600);
  const session: XaiOauthSession = {
    accessToken,
    refreshToken: nextRefresh ? String(nextRefresh) : null,
    expiresAt: Date.now() + (Number.isFinite(expiresIn) ? expiresIn : 3600) * 1000,
  };
  setXaiOauthSession(session, { persistLocally: true });
  return session;
};

/** Open the verification page in a new browser tab/window. */
export const openXaiOauthVerificationPage = (pending: XaiOauthDevicePending) => {
  const url = pending.verificationUriComplete || pending.verificationUri || XAI_OAUTH_VERIFY_FALLBACK_URL;
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
};
