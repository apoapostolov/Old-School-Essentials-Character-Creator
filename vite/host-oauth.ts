import fs from 'fs';
import os from 'os';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Plugin } from 'vite';
import { CODEX_OAUTH_ABSOLUTE, CODEX_OAUTH_CLIENT_ID } from '../lib/ai/codex-oauth';
import {
  CODEX_API_PROXY_PREFIX,
  HOST_OAUTH_ADMIN_PATH,
  HOST_OAUTH_STATUS_PATH,
  HOST_OAUTH_TOKEN,
  XAI_API_PROXY_PREFIX,
  type HostOauthSource,
  type HostOauthStatus,
} from '../lib/ai/host-oauth';
import { XAI_OAUTH_ABSOLUTE, XAI_OAUTH_CLIENT_ID } from '../lib/ai/xai-oauth';
import { createHostAdminHandler } from './host-oauth-admin';

type Kind = 'codex' | 'xai';

export type HostSession = {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number | null;
  accountId: string;
  source: HostOauthSource;
  persistPath: string | null;
  persistKind: 'codex-cli' | 'grok-cli' | 'pi-codex' | 'pi-xai' | null;
};

const SKEW_MS = 60_000;
const MIN_TOKEN = 40;

const disabled = (envKey: string) => /^(1|true|yes)$/i.test(String(process.env[envKey] || '').trim());

export const shouldInjectHostAuth = (authorization: string | undefined): boolean => {
  if (!authorization || !authorization.trim()) return true;
  const raw = authorization.trim();
  const bearer = raw.replace(/^Bearer\s*/i, '').trim();
  if (!bearer) return true;
  return bearer.toLowerCase() === HOST_OAUTH_TOKEN;
};

export const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const pad = '='.repeat((4 - (parts[1].length % 4)) % 4);
    const json = Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64').toString('utf8');
    const payload = JSON.parse(json);
    return payload && typeof payload === 'object' ? payload as Record<string, unknown> : null;
  } catch {
    return null;
  }
};

export const jwtExpiryMs = (token: string): number | null => {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  return typeof exp === 'number' && Number.isFinite(exp) ? exp * 1000 : null;
};

export const chatgptAccountIdFromJwt = (token: string): string => {
  const payload = decodeJwtPayload(token);
  const auth = payload?.['https://api.openai.com/auth'];
  if (auth && typeof auth === 'object') {
    return String((auth as { chatgpt_account_id?: string }).chatgpt_account_id || '').trim();
  }
  return '';
};

const usable = (token: string | null | undefined) => String(token || '').trim().length >= MIN_TOKEN;

const readJson = (file: string): unknown | null => {
  try {
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
};

const writeJson = (file: string, data: unknown) => {
  const tmp = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(tmp, file);
};

export const parseCodexCliAuth = (data: unknown, persistPath: string | null): HostSession | null => {
  if (!data || typeof data !== 'object') return null;
  const tokens = (data as { tokens?: Record<string, unknown> }).tokens;
  if (!tokens || typeof tokens !== 'object') return null;
  const accessToken = String(tokens.access_token || '').trim();
  const refreshToken = String(tokens.refresh_token || '').trim();
  if (!usable(accessToken) && !usable(refreshToken)) return null;
  const accountId = String(tokens.account_id || chatgptAccountIdFromJwt(accessToken) || '').trim();
  return {
    accessToken,
    refreshToken: usable(refreshToken) ? refreshToken : null,
    expiresAt: jwtExpiryMs(accessToken),
    accountId,
    source: 'codex-cli',
    persistPath,
    persistKind: persistPath ? 'codex-cli' : null,
  };
};

export const parseGrokCliAuth = (data: unknown, persistPath: string | null): HostSession | null => {
  if (!data || typeof data !== 'object') return null;
  for (const value of Object.values(data as Record<string, unknown>)) {
    if (!value || typeof value !== 'object') continue;
    const row = value as Record<string, unknown>;
    const accessToken = String(row.key || row.access_token || '').trim();
    const refreshToken = String(row.refresh_token || '').trim();
    if (!usable(accessToken) && !usable(refreshToken)) continue;
    const parsed = row.expires_at ? Date.parse(String(row.expires_at)) : NaN;
    return {
      accessToken,
      refreshToken: usable(refreshToken) ? refreshToken : null,
      expiresAt: Number.isFinite(parsed) ? parsed : jwtExpiryMs(accessToken),
      accountId: String(row.team_id || row.user_id || '').trim(),
      source: 'grok-cli',
      persistPath,
      persistKind: persistPath ? 'grok-cli' : null,
    };
  }
  return null;
};

export const parsePiAuth = (
  data: unknown,
  provider: 'openai-codex' | 'xai-auth',
  persistPath: string | null,
): HostSession | null => {
  if (!data || typeof data !== 'object') return null;
  const row = (data as Record<string, unknown>)[provider];
  if (!row || typeof row !== 'object') return null;
  const rec = row as Record<string, unknown>;
  const accessToken = String(rec.access || rec.access_token || rec.key || '').trim();
  const refreshToken = String(rec.refresh || rec.refresh_token || '').trim();
  if (!usable(accessToken) && !usable(refreshToken)) return null;
  const expires = Number(rec.expires);
  return {
    accessToken,
    refreshToken: usable(refreshToken) ? refreshToken : null,
    expiresAt: Number.isFinite(expires) ? expires : jwtExpiryMs(accessToken),
    accountId: String(rec.accountId || rec.account_id || '').trim(),
    source: 'pi-auth',
    persistPath,
    persistKind: persistPath ? (provider === 'openai-codex' ? 'pi-codex' : 'pi-xai') : null,
  };
};

const expired = (session: HostSession | null) => {
  if (!session?.accessToken) return true;
  if (session.expiresAt == null) return false;
  return Date.now() >= session.expiresAt - SKEW_MS;
};

const persistSession = (session: HostSession) => {
  if (!session.persistPath || !session.persistKind) return;
  const current = readJson(session.persistPath);
  if (!current || typeof current !== 'object') return;
  const data = current as Record<string, any>;
  if (session.persistKind === 'codex-cli') {
    data.tokens = { ...(data.tokens || {}), access_token: session.accessToken };
    if (session.refreshToken) data.tokens.refresh_token = session.refreshToken;
    data.last_refresh = new Date().toISOString();
  } else if (session.persistKind === 'grok-cli') {
    for (const key of Object.keys(data)) {
      const row = data[key];
      if (!row || typeof row !== 'object') continue;
      row.key = session.accessToken;
      if (session.refreshToken) row.refresh_token = session.refreshToken;
      if (session.expiresAt) row.expires_at = new Date(session.expiresAt).toISOString();
      break;
    }
  } else if (session.persistKind === 'pi-codex' && data['openai-codex']) {
    data['openai-codex'].access = session.accessToken;
    if (session.refreshToken) data['openai-codex'].refresh = session.refreshToken;
    if (session.expiresAt) data['openai-codex'].expires = session.expiresAt;
  } else if (session.persistKind === 'pi-xai' && data['xai-auth']) {
    data['xai-auth'].access = session.accessToken;
    if (session.refreshToken) data['xai-auth'].refresh = session.refreshToken;
    if (session.expiresAt) data['xai-auth'].expires = session.expiresAt;
  } else {
    return;
  }
  writeJson(session.persistPath, data);
};

const refreshCodex = async (session: HostSession): Promise<HostSession> => {
  if (!session.refreshToken) throw new Error('no Codex refresh token');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CODEX_OAUTH_CLIENT_ID,
    refresh_token: session.refreshToken,
  });
  const response = await fetch(CODEX_OAUTH_ABSOLUTE.token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body,
  });
  const json = await response.json().catch(() => null) as any;
  if (!response.ok || !json?.access_token) {
    throw new Error(`Codex refresh failed (${response.status})`);
  }
  const expiresIn = Number(json.expires_in ?? 3600) || 3600;
  const next: HostSession = {
    ...session,
    accessToken: String(json.access_token),
    refreshToken: json.refresh_token ? String(json.refresh_token) : session.refreshToken,
    expiresAt: Date.now() + expiresIn * 1000,
    accountId: session.accountId || chatgptAccountIdFromJwt(String(json.access_token)),
  };
  persistSession(next);
  return next;
};

const refreshXai = async (session: HostSession): Promise<HostSession> => {
  if (!session.refreshToken) throw new Error('no Grok refresh token');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: session.refreshToken,
    client_id: XAI_OAUTH_CLIENT_ID,
  });
  const response = await fetch(XAI_OAUTH_ABSOLUTE.token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body,
  });
  const json = await response.json().catch(() => null) as any;
  if (!response.ok || !(json?.access_token || json?.accessToken)) {
    throw new Error(`Grok refresh failed (${response.status})`);
  }
  const expiresIn = Number(json.expires_in ?? json.expiresIn ?? 3600) || 3600;
  const next: HostSession = {
    ...session,
    accessToken: String(json.access_token || json.accessToken),
    refreshToken: json.refresh_token || json.refreshToken
      ? String(json.refresh_token || json.refreshToken)
      : session.refreshToken,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  persistSession(next);
  return next;
};

const loadKind = (kind: Kind): HostSession | null => {
  const home = os.homedir();
  if (kind === 'codex') {
    if (disabled('CODEX_HOST_DISABLED')) return null;
    const cli = path.join(home, '.codex', 'auth.json');
    const fromCli = parseCodexCliAuth(readJson(cli), cli);
    if (fromCli) return fromCli;
    const pi = path.join(home, '.pi', 'agent', 'auth.json');
    return parsePiAuth(readJson(pi), 'openai-codex', pi);
  }
  if (disabled('XAI_HOST_DISABLED')) return null;
  const grok = path.join(home, '.grok', 'auth.json');
  const fromGrok = parseGrokCliAuth(readJson(grok), grok);
  if (fromGrok) return fromGrok;
  const pi = path.join(home, '.pi', 'agent', 'auth.json');
  return parsePiAuth(readJson(pi), 'xai-auth', pi);
};

const sessions: Partial<Record<Kind, HostSession | null>> = {};
const inflight: Partial<Record<Kind, Promise<HostSession | null>>> = {};
const runtimeDisabled: Record<Kind, boolean> = { codex: false, xai: false };

const envDisabled = (kind: Kind) => (
  kind === 'codex' ? disabled('CODEX_HOST_DISABLED') : disabled('XAI_HOST_DISABLED')
);

const ensureSession = async (kind: Kind): Promise<HostSession | null> => {
  if (runtimeDisabled[kind] || envDisabled(kind)) return null;
  if (inflight[kind]) return inflight[kind]!;
  const run = (async () => {
    let session = sessions[kind];
    if (session === undefined) {
      session = loadKind(kind);
      sessions[kind] = session;
      if (session) {
        console.info(`[host-oauth] ${kind} loaded source=${session.source}`);
      }
    }
    if (!session) return null;
    if (!expired(session) && usable(session.accessToken)) return session;
    try {
      const next = kind === 'codex' ? await refreshCodex(session) : await refreshXai(session);
      sessions[kind] = next;
      console.info(`[host-oauth] ${kind} refreshed source=${next.source}`);
      return next;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[host-oauth] ${kind} refresh failed: ${message}`);
      if (usable(session.accessToken)) return session;
      return null;
    }
  })();
  inflight[kind] = run;
  try {
    return await run;
  } finally {
    if (inflight[kind] === run) inflight[kind] = undefined;
  }
};

const statusPayload = async (): Promise<HostOauthStatus> => {
  const [codex, xai] = await Promise.all([ensureSession('codex'), ensureSession('xai')]);
  return {
    codex: {
      available: Boolean(codex && usable(codex.accessToken)),
      source: codex?.source || 'none',
    },
    xai: {
      available: Boolean(xai && usable(xai.accessToken)),
      source: xai?.source || 'none',
    },
  };
};

const EMPTY_STATUS: HostOauthStatus = {
  codex: { available: false, source: 'none' },
  xai: { available: false, source: 'none' },
};

export type HostAdminKind = Kind;

export type HostAdminProviderView = {
  available: boolean;
  source: HostOauthSource;
  expiresAt: number | null;
  disabled: boolean;
  envDisabled: boolean;
  persistKind: HostSession['persistKind'];
};

const clipDetail = (text: string) => text.replace(/\s+/g, ' ').trim().slice(0, 80);

const snapshotKind = (kind: Kind): HostAdminProviderView => {
  const session = sessions[kind] || null;
  const envOff = envDisabled(kind);
  const adminOff = runtimeDisabled[kind];
  const live = !envOff && !adminOff && session && usable(session.accessToken);
  return {
    available: Boolean(live),
    source: session?.source || 'none',
    expiresAt: session?.expiresAt ?? null,
    disabled: adminOff,
    envDisabled: envOff,
    persistKind: session?.persistKind || null,
  };
};

export const getHostAdminStatus = async () => {
  for (const kind of ['codex', 'xai'] as Kind[]) {
    if (sessions[kind] === undefined && !envDisabled(kind)) {
      sessions[kind] = loadKind(kind);
    }
    if (!runtimeDisabled[kind] && !envDisabled(kind)) {
      await ensureSession(kind);
    }
  }
  return { codex: snapshotKind('codex'), xai: snapshotKind('xai') };
};

export const setHostRuntimeDisabled = (kind: Kind | 'all', value: boolean) => {
  const kinds: Kind[] = kind === 'all' ? ['codex', 'xai'] : [kind];
  for (const next of kinds) runtimeDisabled[next] = value;
};

export const reloadHostSession = async (kind: Kind) => {
  sessions[kind] = undefined;
  return ensureSession(kind);
};

export const testHostProvider = async (kind: Kind): Promise<{ ok: boolean; ms: number; detail: string }> => {
  const started = Date.now();
  const session = await ensureSession(kind);
  if (!session?.accessToken) {
    return { ok: false, ms: Date.now() - started, detail: runtimeDisabled[kind] ? 'disabled' : 'not available' };
  }
  try {
    if (kind === 'codex') {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
        Origin: 'https://chatgpt.com',
        Referer: 'https://chatgpt.com/',
      };
      const account = session.accountId || chatgptAccountIdFromJwt(session.accessToken);
      if (account) headers['ChatGPT-Account-ID'] = account;
      const response = await fetch('https://chatgpt.com/backend-api/codex/responses', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'gpt-5.5',
          store: false,
          input: [{ type: 'message', role: 'user', content: [{ type: 'input_text', text: 'Reply with the single word pong.' }] }],
          stream: false,
        }),
      });
      const text = await response.text();
      return { ok: response.ok, ms: Date.now() - started, detail: clipDetail(text) || `HTTP ${response.status}` };
    }
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: [{ role: 'user', content: 'Reply with the single word pong.' }],
        max_tokens: 8,
      }),
    });
    const text = await response.text();
    return { ok: response.ok, ms: Date.now() - started, detail: clipDetail(text) || `HTTP ${response.status}` };
  } catch (err) {
    return { ok: false, ms: Date.now() - started, detail: err instanceof Error ? err.message : 'test failed' };
  }
};

const readRequestBody = async (req: IncomingMessage): Promise<Buffer | undefined> => {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
};

const proxyApi = async (opts: {
  kind: Kind;
  prefix: string;
  origin: string;
  extraHeaders?: (session: HostSession) => Record<string, string>;
  req: IncomingMessage;
  res: ServerResponse;
}) => {
  const session = await ensureSession(opts.kind);
  const inject = shouldInjectHostAuth(String(opts.req.headers.authorization || ''));
  if (inject && !session?.accessToken) {
    opts.res.statusCode = 503;
    opts.res.setHeader('Content-Type', 'application/json');
    opts.res.end(JSON.stringify({ error: `Host ${opts.kind} OAuth is not available` }));
    return;
  }
  const destPath = String(opts.req.url || '').replace(new RegExp(`^${opts.prefix}`), '') || '/';
  const dest = `${opts.origin}${destPath}`;
  const headers: Record<string, string> = {
    Accept: String(opts.req.headers.accept || 'application/json'),
    'Content-Type': String(opts.req.headers['content-type'] || 'application/json'),
    Origin: opts.origin,
    Referer: `${opts.origin}/`,
  };
  if (opts.req.headers['user-agent']) headers['User-Agent'] = String(opts.req.headers['user-agent']);
  if (inject && session) {
    headers.Authorization = `Bearer ${session.accessToken}`;
    Object.assign(headers, opts.extraHeaders?.(session) || {});
  } else if (opts.req.headers.authorization) {
    headers.Authorization = String(opts.req.headers.authorization);
  }
  const body = await readRequestBody(opts.req);
  const upstream = await fetch(dest, {
    method: opts.req.method || 'GET',
    headers,
    body,
  });
  opts.res.statusCode = upstream.status;
  const skipHeader = new Set([
    'transfer-encoding',
    'connection',
    'content-encoding',
    'content-length',
    'set-cookie',
    'set-cookie2',
    'access-control-allow-origin',
    'access-control-allow-credentials',
    'nel',
    'report-to',
    'alt-svc',
  ]);
  upstream.headers.forEach((value, key) => {
    if (skipHeader.has(key.toLowerCase())) return;
    opts.res.setHeader(key, value);
  });
  if (!upstream.body) {
    opts.res.end();
    return;
  }
  const reader = upstream.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) opts.res.write(Buffer.from(value));
    }
  } finally {
    opts.res.end();
  }
};

const handleHostAdmin = createHostAdminHandler({
  getStatus: getHostAdminStatus,
  setDisabled: setHostRuntimeDisabled,
  reload: reloadHostSession,
  test: testHostProvider,
});

const attach = (middlewares: { use: Function }) => {
  middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = String(req.url || '');
    if (url === HOST_OAUTH_ADMIN_PATH || url.startsWith(`${HOST_OAUTH_ADMIN_PATH}/`)) {
      void handleHostAdmin(req, res).catch((err) => {
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'admin failed' }));
        }
      });
      return;
    }
    if (url === HOST_OAUTH_STATUS_PATH || url.startsWith(`${HOST_OAUTH_STATUS_PATH}?`)) {
      void statusPayload()
        .then((status) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(status));
        })
        .catch(() => {
          res.statusCode = 500;
          res.end(JSON.stringify(EMPTY_STATUS));
        });
      return;
    }
    if (url === CODEX_API_PROXY_PREFIX || url.startsWith(`${CODEX_API_PROXY_PREFIX}/`)) {
      void proxyApi({
        kind: 'codex',
        prefix: CODEX_API_PROXY_PREFIX,
        origin: 'https://chatgpt.com',
        extraHeaders: (session) => {
          const account = session.accountId || chatgptAccountIdFromJwt(session.accessToken);
          return account ? { 'ChatGPT-Account-ID': account } : {};
        },
        req,
        res,
      }).catch((err) => {
        if (!res.headersSent) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Codex proxy failed' }));
        }
      });
      return;
    }
    if (url === XAI_API_PROXY_PREFIX || url.startsWith(`${XAI_API_PROXY_PREFIX}/`)) {
      void proxyApi({
        kind: 'xai',
        prefix: XAI_API_PROXY_PREFIX,
        origin: 'https://api.x.ai',
        req,
        res,
      }).catch((err) => {
        if (!res.headersSent) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Grok proxy failed' }));
        }
      });
      return;
    }
    next();
  });
};

export const hostOauthPlugin = (): Plugin => ({
  name: 'ose-host-oauth',
  configureServer(server) {
    attach(server.middlewares);
    void statusPayload();
  },
  configurePreviewServer(server) {
    attach(server.middlewares);
    void statusPayload();
  },
});
