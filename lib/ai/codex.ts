import type { OpenRouterModelSummary, OpenRouterOutputModality } from './openrouter';
import { sortOpenRouterModels } from './openrouter';
import { CODEX_MODEL_CACHE } from '../../data/codex-model-cache';
import { isHostOauthToken } from './host-oauth';

/**
 * OpenAI Codex (ChatGPT subscription OAuth) Responses API client.
 * Verified against AI-Provider-Library-for-Foundry-VTT backend/app/oauth.py.
 */

/** Codex Responses API base (browser: same-origin Vite proxy). */
export const CODEX_API_BASE = 'https://chatgpt.com/backend-api/codex';
export const CODEX_PROXY_PREFIX = '/__codex_api';

export const getCodexApiBase = () => (
  typeof window !== 'undefined'
    ? `${CODEX_PROXY_PREFIX}/backend-api/codex`
    : CODEX_API_BASE
);

const CODEX_CHAT_MODEL = 'gpt-5.5';
const CODEX_IMAGE_MODEL = 'gpt-image-2';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const asSummary = (entry: typeof CODEX_MODEL_CACHE[number]): OpenRouterModelSummary => ({
  id: entry.id,
  baseName: entry.baseName,
  name: entry.displayName,
  description: entry.description || undefined,
  outputModalities: entry.outputModalities as OpenRouterOutputModality[],
  inputModalities: entry.inputModalities,
  mixedPricePerMillionUsd: entry.mixedPricePerMillionUsd,
  priceLabel: entry.priceLabel,
});

const sortModels = (models: OpenRouterModelSummary[]) => (
  [...models].sort((left, right) => {
    const nameCompare = collator.compare(left.baseName, right.baseName);
    if (nameCompare !== 0) return nameCompare;
    return collator.compare(left.id, right.id);
  })
);

/** Static catalog — the Codex backend exposes no public /models endpoint. */
export const getCodexModelCacheSummaries = () =>
  sortModels(CODEX_MODEL_CACHE.map(asSummary));

const codexHeaders = (token: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (!isHostOauthToken(token)) {
    headers.Authorization = `Bearer ${token}`;
    const account = chatgptAccountIdFromToken(token);
    if (account) headers['ChatGPT-Account-ID'] = account;
  }
  return headers;
};

const chatgptAccountIdFromToken = (token: string): string => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return '';
    const pad = '='.repeat((4 - (parts[1].length % 4)) % 4);
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const auth = payload?.['https://api.openai.com/auth'];
    if (auth && typeof auth === 'object') {
      return String(auth.chatgpt_account_id || '').trim();
    }
  } catch {
    /* ignore */
  }
  return '';
};

const readSseBlock = (raw: string): any | null => {
  if (!raw || raw === '[DONE]') return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/** Pull complete `data:` JSON events out of an SSE buffer. CRLF-safe. */
export const parseCodexSseBuffer = (buf: string): { events: any[]; rest: string } => {
  const events: any[] = [];
  const parts = buf.split(/\r?\n/);
  const rest = parts.pop() ?? '';
  for (const rawLine of parts) {
    const line = rawLine.trim();
    if (!line.startsWith('data:')) continue;
    const event = readSseBlock(line.slice(5).trim());
    if (event) events.push(event);
  }
  return { events, rest };
};

/** Parse one SSE stream into events. */
const streamSse = async (
  response: Response,
  onEvent: (event: any) => void,
): Promise<void> => {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Codex returned no stream');
  const decoder = new TextDecoder();
  let buf = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const parsed = parseCodexSseBuffer(buf);
    buf = parsed.rest;
    parsed.events.forEach(onEvent);
  }
  buf += decoder.decode();
  const parsed = parseCodexSseBuffer(buf.endsWith('\n') ? buf : `${buf}\n`);
  parsed.events.forEach(onEvent);
};

/** Convert OpenAI chat messages → Codex Responses `instructions` + `input` rows. */
export const messagesToCodexInput = (messages: Array<{
  role: string;
  content: unknown;
}>): { instructions: string; rows: Array<Record<string, unknown>> } => {
  let instructions = '';
  const rows: Array<Record<string, unknown>> = [];
  for (const msg of messages || []) {
    const role = String(msg?.role || 'user');
    if (role === 'system') {
      const text = typeof msg.content === 'string'
        ? msg.content
        : Array.isArray(msg.content)
          ? msg.content.filter((p: any) => p?.type === 'text').map((p: any) => p.text).join(' ')
          : '';
      instructions = instructions ? `${instructions} ${text}`.trim() : text.trim();
      continue;
    }
    const parts: Array<Record<string, unknown>> = [];
    if (typeof msg.content === 'string') {
      parts.push({ type: 'input_text', text: msg.content });
    } else if (Array.isArray(msg.content)) {
      for (const item of msg.content as any[]) {
        if (item?.type === 'text') {
          parts.push({ type: 'input_text', text: String(item.text || '') });
        } else if (item?.type === 'image_url') {
          const url = typeof item.image_url === 'object' ? item.image_url?.url : item.image_url;
          if (url) parts.push({ type: 'input_image', image_url: String(url) });
        }
      }
    }
    if (!parts.length) continue;
    rows.push({
      type: 'message',
      role: role === 'assistant' ? 'assistant' : 'user',
      content: parts,
    });
  }
  return { instructions, rows };
};

/** Extract assistant text deltas / final text from a Responses SSE event. */
export const extractCodexText = (event: any): string => {
  if (!event || typeof event !== 'object') return '';
  const etype = String(event.type || '');
  if (etype.endsWith('output_text.delta')) {
    return String(event.delta || '');
  }
  if (etype.endsWith('output_text.done') && typeof event.text === 'string') {
    return event.text;
  }
  if (typeof event.output_text === 'string' && etype.endsWith('completed')) {
    return event.output_text;
  }
  const texts: string[] = [];
  const walk = (node: any) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
    } else if (node && typeof node === 'object') {
      if ((node.type === 'output_text' || node.type === 'text') && typeof node.text === 'string') {
        texts.push(node.text);
      }
      Object.values(node).forEach(walk);
    }
  };
  if (
    etype === 'response.completed'
    || etype === 'response.output_item.done'
    || etype.endsWith('output_text.done')
  ) {
    walk(event);
  }
  return texts.join('');
};

const shortError = async (response: Response): Promise<string> => {
  const text = await response.text().catch(() => '');
  if (/^\s*<(!doctype|html)/i.test(text)) {
    return `HTTP ${response.status} HTML from chatgpt.com`;
  }
  if (!text) return `HTTP ${response.status}`;
  try {
    const json = JSON.parse(text);
    return String(json?.error?.message || json?.detail || json?.message || text.slice(0, 300));
  } catch {
    return text.slice(0, 300);
  }
};

/**
 * Chat completion via the Codex Responses API (SSE stream).
 * Returns plain text.
 */
export const fetchCodexChatCompletion = async (params: {
  token: string;
  model?: string;
  messages: Array<{ role: string; content: unknown }>;
  json?: boolean;
}): Promise<string> => {
  const { instructions, rows } = messagesToCodexInput(params.messages);
  if (!rows.length) throw new Error('Codex: no messages');
  const payload: Record<string, unknown> = {
    model: params.model || CODEX_CHAT_MODEL,
    store: false,
    input: rows,
    stream: true,
  };
  const jsonRule = params.json
    ? 'Reply with a single JSON object only. No markdown fences, no preamble.'
    : '';
  const joined = [instructions, jsonRule].filter(Boolean).join('\n');
  if (joined) payload.instructions = joined;

  const response = await fetch(`${getCodexApiBase()}/responses`, {
    method: 'POST',
    headers: codexHeaders(params.token),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(await shortError(response));
  }

  const deltas: string[] = [];
  let final = '';
  await streamSse(response, (event) => {
    const etype = String(event?.type || '');
    if (etype.endsWith('output_text.delta')) {
      deltas.push(String(event.delta || ''));
      return;
    }
    const hit = extractCodexText(event);
    if (hit) final = hit;
  });
  const text = (final || deltas.join('')).trim();
  if (!text) throw new Error('Codex returned no text');
  return text;
};

const openaiSize = (width: number, height: number) => {
  const ratio = (width || 1) / (height || 1);
  if (ratio > 1.15) return '1536x1024';
  if (ratio < 0.87) return '1024x1536';
  return '1024x1024';
};

const codexQuality = (model: string) => {
  const ident = model || '';
  if (ident.includes('low') || ident === 'gpt-image-1') return 'low';
  if (ident.includes('1.5') || ident.includes('medium')) return 'medium';
  return 'high';
};

/** Find generated image b64 in a Responses SSE event (partial or final). */
export const extractCodexImage = (event: any): string => {
  let found = '';
  const walk = (node: any) => {
    if (found) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
    } else if (node && typeof node === 'object') {
      if (node.type === 'image_generation_call' && typeof node.result === 'string' && node.result) {
        found = node.result;
        return;
      }
      const partial = node.partial_image_b64;
      if (typeof partial === 'string' && partial) found = partial;
      Object.values(node).forEach(walk);
    }
  };
  walk(event);
  return found;
};

/**
 * Image generation via the Codex Responses API + image_generation tool.
 * Returns a data URL.
 */
export const fetchCodexImage = async (params: {
  token: string;
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
  referenceImageDataUrl?: string | null;
}): Promise<string> => {
  const content: Array<Record<string, unknown>> = [{ type: 'input_text', text: params.prompt }];
  if (params.referenceImageDataUrl?.startsWith('data:image/')) {
    content.push({ type: 'input_image', image_url: params.referenceImageDataUrl });
  }
  const payload = {
    model: CODEX_CHAT_MODEL,
    store: false,
    instructions: (
      'You are an assistant that must fulfill image generation and image '
      + 'editing requests by using the image_generation tool when provided.'
    ),
    input: [{ type: 'message', role: 'user', content }],
    tools: [{
      type: 'image_generation',
      model: params.model || CODEX_IMAGE_MODEL,
      size: openaiSize(params.width || 1024, params.height || 1024),
      quality: codexQuality(params.model || CODEX_IMAGE_MODEL),
      output_format: 'png',
      background: 'opaque',
      partial_images: 1,
    }],
    stream: true,
  };

  const response = await fetch(`${getCodexApiBase()}/responses`, {
    method: 'POST',
    headers: codexHeaders(params.token),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(await shortError(response));
  }

  let found = '';
  await streamSse(response, (event) => {
    const hit = extractCodexImage(event);
    if (hit) found = hit;
  });
  if (!found) throw new Error('Codex returned no image');
  return found.startsWith('data:') ? found : `data:image/png;base64,${found}`;
};
