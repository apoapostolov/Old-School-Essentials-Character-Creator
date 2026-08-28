import type { IncomingMessage, ServerResponse } from 'http';
import { HOST_OAUTH_ADMIN_PATH } from '../lib/ai/host-oauth';
import type { HostAdminKind } from './host-oauth';

export type HostAdminDeps = {
  getStatus: () => Promise<{ codex: unknown; xai: unknown }>;
  setDisabled: (kind: HostAdminKind | 'all', value: boolean) => void;
  reload: (kind: HostAdminKind) => Promise<unknown>;
  test: (kind: HostAdminKind) => Promise<{ ok: boolean; ms: number; detail: string }>;
};

const COOKIE = 'ose_host_admin';

const adminKey = () => String(process.env.HOST_OAUTH_ADMIN_KEY || '').trim();

export const isPrivateClientAddress = (address: string | undefined): boolean => {
  const raw = String(address || '').replace(/^::ffff:/, '');
  if (!raw) return false;
  if (raw === '::1' || raw === '127.0.0.1' || raw === 'localhost') return true;
  const parts = raw.split('.').map(Number);
  if (parts.length !== 4 || parts.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return false;
  if (parts[0] === 10) return true;
  if (parts[0] === 127) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) return true;
  return false;
};

const cookieValue = (req: IncomingMessage, name: string) => {
  const header = String(req.headers.cookie || '');
  const match = header.split(/;\s*/).find(part => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : '';
};

export const isHostAdminAllowed = (req: IncomingMessage): boolean => {
  const key = adminKey();
  const provided = cookieValue(req, COOKIE)
    || String(req.headers['x-host-admin-key'] || '').trim();
  if (key) return provided === key;
  return isPrivateClientAddress(req.socket.remoteAddress);
};

const send = (res: ServerResponse, status: number, body: string, type: string) => {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
};

const json = (res: ServerResponse, status: number, payload: unknown) => {
  send(res, status, JSON.stringify(payload), 'application/json');
};

const readJsonBody = async (req: IncomingMessage): Promise<any> => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
};

const page = (authed: boolean) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>OSE host OAuth</title>
  <style>
    :root { color-scheme: dark; }
    body { margin: 0; font: 16px/1.4 system-ui, sans-serif; background: #111827; color: #e5e7eb; }
    main { max-width: 42rem; margin: 0 auto; padding: 1.5rem; }
    h1 { color: #facc15; font-size: 1.4rem; margin: 0 0 0.5rem; }
    p, label { color: #9ca3af; }
    a { color: #facc15; }
    .row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 0.75rem 0; }
    button, input { font: inherit; border-radius: 0.4rem; padding: 0.45rem 0.7rem; }
    button { background: #ca8a04; color: #111827; border: 0; font-weight: 700; cursor: pointer; }
    button.secondary { background: #374151; color: #f9fafb; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    input { background: #030712; color: #f9fafb; border: 1px solid #4b5563; min-width: 12rem; }
    .card { border: 1px solid #374151; background: #1f2937; border-radius: 0.6rem; padding: 1rem; margin: 0.75rem 0; }
    .ok { color: #86efac; }
    .bad { color: #fca5a5; }
    pre { white-space: pre-wrap; background: #030712; padding: 0.75rem; border-radius: 0.4rem; }
  </style>
</head>
<body>
  <main>
    <h1>Host OAuth admin</h1>
    <p>LAN table sharing for Codex and Grok. Tokens stay on this machine.</p>
    <p><a href="/">Open character creator</a></p>
    ${authed ? `
    <div id="cards"></div>
    <div class="row">
      <button type="button" id="reload">Reload sessions</button>
      <button type="button" class="secondary" id="disable-all">Disable both</button>
      <button type="button" class="secondary" id="enable-all">Enable both</button>
    </div>
    <pre id="log">loading…</pre>
    ` : `
    <form id="login" class="card">
      <p>This page needs the admin key from HOST_OAUTH_ADMIN_KEY.</p>
      <label>Admin key<br/><input name="key" type="password" autocomplete="current-password"/></label>
      <div class="row"><button type="submit">Unlock</button></div>
    </form>
    `}
  </main>
  <script>
    const log = (value) => {
      const el = document.getElementById('log');
      if (el) el.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    };
    const api = async (action, kind) => {
      const response = await fetch(${JSON.stringify(`${HOST_OAUTH_ADMIN_PATH}/api`)}, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ action, kind }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || ('HTTP ' + response.status));
      return data;
    };
    const render = (status) => {
      const root = document.getElementById('cards');
      if (!root) return;
      root.innerHTML = '';
      for (const kind of ['codex', 'xai']) {
        const row = status[kind] || {};
        const card = document.createElement('section');
        card.className = 'card';
        const live = row.available ? 'on' : 'off';
        const exp = row.expiresAt ? new Date(row.expiresAt).toISOString() : 'unknown';
        card.innerHTML = '<h2>' + kind + '</h2>'
          + '<p class="' + (row.available ? 'ok' : 'bad') + '">Sharing: ' + live + '</p>'
          + '<p>Source: ' + (row.source || 'none') + (row.persistKind ? ' (' + row.persistKind + ')' : '') + '</p>'
          + '<p>Expires: ' + exp + '</p>'
          + '<p>Admin disabled: ' + (row.disabled ? 'yes' : 'no')
          + (row.envDisabled ? ' · env disabled' : '') + '</p>'
          + '<div class="row">'
          + '<button type="button" data-act="test" data-kind="' + kind + '">Test ping</button>'
          + '<button type="button" class="secondary" data-act="disable" data-kind="' + kind + '">Disable</button>'
          + '<button type="button" class="secondary" data-act="enable" data-kind="' + kind + '">Enable</button>'
          + '</div>';
        root.appendChild(card);
      }
    };
    const refresh = async () => {
      const data = await api('status');
      render(data.status);
      log(data);
    };
    document.getElementById('login')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const key = event.target.key.value;
      const response = await fetch(${JSON.stringify(`${HOST_OAUTH_ADMIN_PATH}/login`)}, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ key }),
      });
      if (!response.ok) {
        alert('Wrong key');
        return;
      }
      location.reload();
    });
    document.getElementById('reload')?.addEventListener('click', () => api('reload', 'all').then(refresh).catch((err) => log(String(err))));
    document.getElementById('disable-all')?.addEventListener('click', () => api('disable', 'all').then(refresh).catch((err) => log(String(err))));
    document.getElementById('enable-all')?.addEventListener('click', () => api('enable', 'all').then(refresh).catch((err) => log(String(err))));
    document.getElementById('cards')?.addEventListener('click', async (event) => {
      const btn = event.target.closest('button[data-act]');
      if (!btn) return;
      try {
        const data = await api(btn.dataset.act, btn.dataset.kind);
        if (data.status) render(data.status);
        log(data);
      } catch (err) {
        log(String(err));
      }
    });
    if (${authed ? 'true' : 'false'}) refresh().catch((err) => log(String(err)));
  </script>
</body>
</html>`;

const asKind = (value: unknown): HostAdminKind | 'all' | null => {
  if (value === 'codex' || value === 'xai' || value === 'all') return value;
  return null;
};

export const createHostAdminHandler = (deps: HostAdminDeps) => async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean> => {
  const url = String(req.url || '');
  const pathOnly = url.split('?')[0];
  if (pathOnly !== HOST_OAUTH_ADMIN_PATH && !pathOnly.startsWith(`${HOST_OAUTH_ADMIN_PATH}/`)) {
    return false;
  }

  if (pathOnly === `${HOST_OAUTH_ADMIN_PATH}/login` && req.method === 'POST') {
    const body = await readJsonBody(req);
    const key = adminKey();
    if (!key || String(body.key || '') !== key) {
      json(res, 403, { error: 'Wrong admin key' });
      return true;
    }
    res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(key)}; Path=/; HttpOnly; SameSite=Lax`);
    json(res, 200, { ok: true });
    return true;
  }

  if (pathOnly === HOST_OAUTH_ADMIN_PATH && (req.method === 'GET' || req.method === 'HEAD')) {
    send(res, 200, page(isHostAdminAllowed(req)), 'text/html; charset=utf-8');
    return true;
  }

  if (pathOnly === `${HOST_OAUTH_ADMIN_PATH}/api` && req.method === 'POST') {
    if (!isHostAdminAllowed(req)) {
      json(res, 403, { error: 'Admin key required' });
      return true;
    }
    const body = await readJsonBody(req);
    const action = String(body.action || 'status');
    const kind = asKind(body.kind) || 'all';
    if (action === 'disable' || action === 'enable') {
      deps.setDisabled(kind, action === 'disable');
    }
    if (action === 'reload') {
      if (kind === 'all') {
        await deps.reload('codex');
        await deps.reload('xai');
      } else {
        await deps.reload(kind);
      }
    }
    const status = await deps.getStatus();
    if (action === 'test') {
      if (kind === 'all') {
        json(res, 400, { error: 'Pick Codex or Grok for a ping' });
        return true;
      }
      const test = await deps.test(kind);
      json(res, 200, { status, test });
      return true;
    }
    json(res, 200, { status });
    return true;
  }

  json(res, 404, { error: 'Not found' });
  return true;
};
