# Old-School Essentials Character Creator

A full-featured character generator for Old-School Essentials (OSE). Roll classic stats, select races and classes, manage gear and encumbrance, and export a print-ready PDF. The app also supports optional AI-powered name, trait, portrait, and backstory generation using Google Gemini.

This project integrates **Apostol Apostolov's extensive houserules for Old School Essentials**. Read the full rules here: `rules/OSE_HOUSE_RULES.md`.

## Features

- **Classic 3d6 stat rolling** with optional score adjustments and roll history.
- **Race and class selection** with dynamic eligibility, racial modifiers, and level caps.
- **Progression & combat stats** (HP, saves, THAC0, AC) with detailed breakdowns.
- **Equipment kits + custom gear**, plus encumbrance and movement calculations.
- **Specialized skill systems** for Thief, Acrobat, Barbarian, Ranger, and Bard.
- **AI-generated details (optional)**: names, traits, lifestyle, portraits, and backstories.
- **Grog hireling system** for fragile spellcasters.
- **PDF export** with all character details and portrait.
- **Third‑party source loader** for optional content packs.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run (Dev)

```bash
npm install
npm run dev
```

### Build (Production)

```bash
npm install
npm run build
npm run preview
```

## Environment Variables

AI features require a Google Gemini API key.

- Copy `.env.example` to `.env`
- Set `GEMINI_API_KEY` to your key

```bash
cp .env.example .env
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm test` — run tests

## House Rules

This project includes a full set of integrated houserules authored by Apostol Apostolov. See: `rules/OSE_HOUSE_RULES.md`.

## License

MIT. See `LICENSE`.
