/**
 * LAN host OAuth: the Vite server injects Codex / Grok tokens.
 * The browser never receives the host session. `host` is a sentinel only.
 */

export const HOST_OAUTH_TOKEN = 'host';
export const HOST_OAUTH_STATUS_PATH = '/__oauth_host_status';
export const HOST_OAUTH_ADMIN_PATH = '/__host';
export const CODEX_API_PROXY_PREFIX = '/__codex_api';
export const XAI_API_PROXY_PREFIX = '/__xai_api';

export type HostOauthSource = 'codex-cli' | 'grok-cli' | 'pi-auth' | 'none';

export type HostOauthProviderStatus = {
  available: boolean;
  source: HostOauthSource;
};

export type HostOauthStatus = {
  codex: HostOauthProviderStatus;
  xai: HostOauthProviderStatus;
};

export const EMPTY_HOST_OAUTH_STATUS: HostOauthStatus = {
  codex: { available: false, source: 'none' },
  xai: { available: false, source: 'none' },
};

export const isHostOauthToken = (token: string) => token === HOST_OAUTH_TOKEN;

let cached: { at: number; status: HostOauthStatus } | null = null;
const CACHE_MS = 15_000;

export const probeHostOauth = async (): Promise<HostOauthStatus> => {
  if (typeof window === 'undefined') return EMPTY_HOST_OAUTH_STATUS;
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.status;
  try {
    const response = await fetch(HOST_OAUTH_STATUS_PATH);
    const json = (await response.json()) as Partial<HostOauthStatus>;
    const status: HostOauthStatus = {
      codex: {
        available: Boolean(json?.codex?.available),
        source: json?.codex?.source === 'codex-cli' || json?.codex?.source === 'pi-auth'
          ? json.codex.source
          : 'none',
      },
      xai: {
        available: Boolean(json?.xai?.available),
        source: json?.xai?.source === 'grok-cli' || json?.xai?.source === 'pi-auth'
          ? json.xai.source
          : 'none',
      },
    };
    cached = { at: Date.now(), status };
    return status;
  } catch {
    cached = { at: Date.now(), status: EMPTY_HOST_OAUTH_STATUS };
    return EMPTY_HOST_OAUTH_STATUS;
  }
};
