# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

Work in progress for tables sharing a local host and for Mystara characters.
These changes are in the current source, not the 1.1.3 release.

### Added

- A table host can share this machine's Codex or Grok session with players on
  the LAN. The host controls sharing at `/__host`; tokens stay on the server.
- World and class now guide profession choices. Mystara characters use
  Karameikos jobs, and their earlier life follows the social-standing roll.

### Changed

- Saves and JSON imports keep a character's world, source packs, and
  Karameikos background together.
- AI names and traits recover more reliably from Codex responses with line
  breaks or Markdown wrappers.

## [1.1.3] - 2026-09-03

Statblocks now carry the character you built more faithfully into an OSE
import, and three Advanced Fantasy options use their correct hit dice.

### Fixed

- Half-Elf and Half-Orc export class identifiers the importer recognizes, so
  their saves survive the trip. Ascending AC, missile attack bonuses, magic
  weapon bonuses, and languages also transfer correctly.
- Names and other free text can no longer break the semicolon-delimited
  statblock. The importer supplies class abilities from the Reforged pack.
- Acrobat, Gnome, and Svirfneblin use the 1d4 hit die from OSE Advanced
  Fantasy; Svirfneblin exports its Demihuman note.

## [1.1.0] - 2026-07-27

Choose a different AI provider for each creative task, load heavy catalogs only when you need them, and keep character saves more reliable when moving JSON in or out.

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
