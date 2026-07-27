# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.1.0] - 2026-07-27

Theme: **multi-slot AI** + **performance/context overhaul** + **save/load hardening**
(parity with CoC 1.1 / Delta Green 1.2).

### Added

- **Per-task AI setup in Settings.** Creative writing, simple writing, vision,
  and image generation each pick their own provider, remembered API key, and
  model — mix vendors freely across use cases.
- **Providers:** OpenAI, Anthropic, Gemini, OpenRouter, xAI (API key), xAI
  SuperGrok (device-code OAuth), Z.ai GLM Coding Plan, DeepSeek, OpenCode Go.
- **Gear Settings entry** with AI configuration and PDF source controls.
- **Sliced character context** so sheet tabs re-render less while editing.
- **Domain race-modifier tests** and provider/Zhipu/xAI unit coverage.

### Improved

- **Faster first load:** heavy catalogs and print tooling load when needed;
  production main chunk roughly **1.2 MB → ~0.5 MB**.
- **Generation hooks** use `useAiRuntime` instead of a Gemini-only path.
- **Vite proxy** `/__xai_oauth` → `auth.x.ai` for browser SuperGrok OAuth.
- **Save drawer reliability:** explicit JSON serialization (no function bloat),
  import from file or clipboard, load error handling, export download, disabled
  empty import, dimmed handle while modals are open.

### Notes for power users

- SuperGrok OAuth works best via `npm run dev` (device login needs the Vite proxy).
- Optional env keys: `VITE_ZHIPU_API_KEY` / `VITE_ZAI_API_KEY`, `VITE_XAI_API_KEY`
  (plus existing Gemini / OpenRouter / OpenAI / Anthropic / DeepSeek keys).
- Engineering notes: `docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md`.

## [1.0.0] - 2026-02-01

### Added

- **Core character creation**: 3d6 in-order rolling, optional score adjustments, roll history.
- **Race and class systems** with modifiers, level caps, and eligibility highlighting.
- **Character management**: level selection, HP & wealth calculation, combat stats.
- **Equipment system**: curated kits, custom gear, encumbrance and movement.
- **Specialized skill systems** for Thief, Acrobat, Barbarian, Ranger, and Bard.
- **Spellcasting rules** including class-specific spell list behavior and starting spells.
- **AI-assisted details (optional)** using Google Gemini: names, traits, lifestyle, portraits, and backstories.
- **Grog hireling system** with AI-generated details and portrait.
- **PDF export** for a complete, print-ready character sheet.
- **Third‑party content loader** for optional source packs.

### Changed

- Encumbrance thresholds and strength bonuses follow the OSE‑tuned ruleset used by this project.
- Racial HP die overrides and class tables update dynamically with level caps.
