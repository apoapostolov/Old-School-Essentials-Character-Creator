# Shared AI Providers — Multi-slot UI + Zhipu + Grok OAuth

**Date:** 2026-07-27 (updated multi-slot UI)  
**Status:** **Landed in CoC + Delta Green + OSE** (2026-07-27)  
**Applies to (shared codebase shape):**

| Repo | Path root |
|------|-----------|
| Call of Cthulhu Character Creator | `/git-public/Call-of-Cthulhu-Character-Creator` |
| Delta Green AI Dossier Generator | `/git-public/Delta-Green-AI-Dossier-Generator` |
| Old School Essentials Character Creator | `/git-public/Old-School-Essentials-Character-Creator` |
| Future forks | Same `lib/ai/*` + multi-slot Settings pattern |

**Related:** `docs/OPTIMIZATION_PROPOSAL.md` § Later wave

---

## 1. Goals

1. **Multi-provider UI:** each *model use type* has its **own block** — independent provider, remembered key, and model.
2. **Use types (slots):**
   - `creative` — Creative writing  
   - `simple` — Simple writing  
   - `vision` — Vision / image analysis  
   - `image` — Image generation  
3. **Shared key vault per provider id:** selecting OpenAI on creative and simple reuses the same remembered OpenAI key.
4. **Zhipu / Z.ai GLM Coding Plan** as a provider (`zhipu`) with Coding endpoint only.
5. **xAI Grok** as:
   - `xai` — API key (show key field)
   - `xai-oauth` — SuperGrok / X Premium OAuth (**device code + open browser**, **no API key field**)
6. Portable modules so CoC → DG (and others) stay aligned.

### Non-goals

- Server-side secret proxy  
- Zhipu Anthropic-compat route (optional later)  
- Grok video / TTS product surfaces  

---

## 2. UX specification (required for all ports)

### Settings → AI Provider tab

Render **four stacked blocks** (order: creative, simple, vision, image). Each block contains:

| Control | Notes |
|---------|--------|
| Title + short description | From `AI_SLOT_LABELS` / `AI_SLOT_DESCRIPTIONS` |
| Provider select | Full `AI_PROVIDER_OPTIONS` list |
| Credential | See rules below |
| Model searchable select | Filtered for slot modality when possible |
| Refresh | Reloads catalog for **that block’s provider** |

### Credential rules

| Provider | Credential UI |
|----------|----------------|
| `openai`, `anthropic`, `gemini`, `openrouter`, `deepseek`, `opencode-go`, `zhipu`, `xai` | Password **API key** field; value from shared vault; label “remembered” |
| **`xai-oauth` only** | **No API key field.** Show: status, **device code** (large monospace, read-only), verification URL text, buttons: **Start device login**, **Open browser to authorize**, Cancel, Disconnect |

### Key memory

- Storage key: `ai.keys.<providerId>` (session + local)  
- Changing provider on a slot refills the key field from vault if that provider was used before  
- Never store OAuth tokens in the API key vault  

### OAuth device flow (xai-oauth)

1. User clicks **Start device login**  
2. Browser SPA POSTs to **same-origin** `/__xai_oauth/oauth2/device/code` (not cross-origin — auth.x.ai blocks CORS)  
3. Vite (or prod reverse proxy) rewrites that to `https://auth.x.ai/oauth2/device/code`  
4. UI shows **user_code** prominently  
5. **Open browser to authorize** opens `verification_uri` / `verification_uri_complete` (on `accounts.x.ai`)  
6. App polls `/__xai_oauth/oauth2/token` until success / expire / deny  
7. On success: store access (+ refresh) token; mark connected  

**Hard requirement:** SPA cannot call `auth.x.ai` directly. Without the proxy, the UI shows a network/CORS error. Static hosts need an equivalent reverse proxy for `/__xai_oauth` → `https://auth.x.ai`.

Constants live only in `lib/ai/xai-oauth.ts` for easy rotation.

---

## 3. Endpoints

### Zhipu Coding Plan

| Field | Value |
|-------|--------|
| Base | `https://api.z.ai/api/coding/paas/v4` |
| **Not for Coding Plan** | `https://api.z.ai/api/paas/v4` |
| Auth | `Authorization: Bearer <API_KEY>` |

### xAI API key

| Field | Value |
|-------|--------|
| Base | `https://api.x.ai/v1` |
| Auth | Bearer API key |

### xAI OAuth (OIDC device code — verified)

| Field | Value |
|-------|--------|
| OIDC discovery | `https://auth.x.ai/.well-known/openid-configuration` |
| Auth host | `https://auth.x.ai` |
| Device code URL | `https://auth.x.ai/oauth2/device/code` |
| Token URL | `https://auth.x.ai/oauth2/token` |
| Verification page | `https://accounts.x.ai/oauth2/device` |
| Public client_id | `b1a00492-073a-47ea-816f-4c329264a828` (Grok CLI / community) |
| Scope | `openid profile email offline_access grok-cli:access api:access` |
| Browser proxy path | `/__xai_oauth/*` → `https://auth.x.ai/*` (Vite `server.proxy`) |
| Chat API | `https://api.x.ai/v1` with OAuth access token as Bearer |

**Do not use** `accounts.x.ai/api/auth/*` or client_id `grok-cli` — those fail with “Could not reach xAI auth server”.

If device endpoints change, update `xai-oauth.ts` only.

---

## 4. Shared file layout

```text
lib/ai/
  ai-slots.ts                 # slot types, labels, storage keys, vault helpers
  load-provider-models.ts     # catalog load + slot modality filter
  provider-options.ts         # AiProviderId union + labels
  provider-keys.ts            # build-time env keys
  openai-compatible.ts
  zhipu.ts
  xai.ts
  xai-oauth.ts                # session + device flow + open browser
  …
data/
  zhipu-model-cache.ts
  xai-model-cache.ts
context/
  AiSettingsContext.tsx       # multi-slot state + OAuth device state
components/
  SettingsModal.tsx           # four SlotProviderBlock sections
hooks/
  useAiRuntime.ts             # purpose/image → slot → provider/key/model
```

### Slot → runtime mapping

| Call | Slot |
|------|------|
| `generateText({ purpose: 'simple' })` | `simple` |
| `generateText({ purpose: 'creative' })` / default | `creative` |
| `generateText({ imageDataUrl })` / `analyzeImage` | `vision` |
| `generateImage` | `image` |

---

## 5. Storage keys (stable across apps)

```text
ai.slot.creative.provider | ai.slot.creative.modelId
ai.slot.simple.provider   | ai.slot.simple.modelId
ai.slot.vision.provider   | ai.slot.vision.modelId
ai.slot.image.provider    | ai.slot.image.modelId
ai.keys.openai | anthropic | openrouter | gemini | …
ai.xai-oauth.accessToken | refreshToken | expiresAt   # session preferred
```

Legacy single-provider `ai.provider` may seed all slots once on first read.

---

## 6. Port checklist (per repo)

### Call of Cthulhu
- [x] Copy `lib/ai/ai-slots.ts`, `load-provider-models.ts`, `zhipu.ts`, `xai.ts`, `xai-oauth.ts`, caches  
- [x] Replace Settings AI tab with four slot blocks (no single global provider)  
- [x] `xai-oauth` block: device code + open browser, **no API key**  
- [x] Key vault shared across slots  
- [x] `useAiRuntime` (or equivalent) resolves credential per slot  
- [x] `npm test` / OAuth proxy live  
- [ ] Manual: mixed providers smoke in browser (optional)

### Delta Green
- [x] Same module set + multi-slot Settings + runtime  
- [x] Vite `server.proxy` + `preview.proxy` for `/__xai_oauth`  
- [x] `tests/zhipu-xai.test.ts` + provider order  
- [ ] Manual: mixed providers smoke in browser (optional)

### Old School Essentials
- [x] Full `lib/ai/*` port + model caches (was Gemini-only env)  
- [x] Multi-slot Settings modal + header **AI** button  
- [x] Generation hooks routed through `useAiRuntime`  
- [x] Vite OAuth proxy + multi-provider env defines  
- [x] `tests/zhipu-xai.test.ts` + `providers.test.ts`  

---

## 7. Implementation status (2026-07-27)

| Item | CoC | DG | OSE |
|------|-----|----|-----|
| Multi-slot Settings UI | Landed | Landed | Landed |
| Shared key vault | Landed | Landed | Landed |
| Zhipu Coding Plan provider | Landed | Landed | Landed |
| xAI API key provider | Landed | Landed | Landed |
| xAI OAuth device + proxy | Landed | Landed | Landed |
| Runtime per-slot routing | Landed | Landed | Landed |

---

## 8. Risks

| Risk | Mitigation |
|------|------------|
| xAI device endpoints / client_id change | Isolate in `xai-oauth.ts`; show clear error |
| User confuses Coding vs general Z.ai URL | Hard-code Coding base; UI note |
| Keys in localStorage XSS | Document; prefer short-lived OAuth in sessionStorage |
| Image slot on text-only provider | Runtime error with guidance to use Gemini/OpenRouter |

---

## 9. Acceptance criteria

- [x] Four independent slot blocks in Settings  
- [x] Key remembered per provider when reselected  
- [x] xAI OAuth shows device code + open browser, not API key  
- [x] Runtime uses the correct slot’s provider/model/key  
- [x] Same UX ported to Delta Green  
- [x] Same UX ported to Old School Essentials  

**Canonical document for all shared-code ports.**
