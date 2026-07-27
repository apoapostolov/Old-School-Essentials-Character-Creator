# Optimization Proposal — Old School Essentials Character Creator

**Date:** 2026-07-27  
**Target:** `Old-School-Essentials-Character-Creator` (package version currently `0.0.0`)  
**Status:** **COMPLETE** (Waves A–C landed 2026-07-27)  
**Reference finish bars:**

| Repo | Role |
|------|------|
| `Call-of-Cthulhu-Character-Creator` v1.1.0 | Performance Waves A–C + multi-slot AI + lazy eras |
| `Delta-Green-AI-Dossier-Generator` v1.2.0 | Same waves on a multi-source dark-theme sibling |

---

## Outcome summary (after implementation)

| Metric | Before | After |
|--------|--------|-------|
| Main JS chunk | ~1.18 MB | **~456 KB** |
| pdf-lib | In main | **Separate ~440 KB** (print) |
| Third-party packs | Eager in main | **Lazy chunks** (~11–14 KB each) |
| Manage / Final / Settings | Eager | **`React.lazy`** |
| Character context | Thin pass-through | **Sliced** identity / progression / gear / extras |
| Tests | — | **25 green** (incl. domain race mods) |

---

## Context (pre-overhaul)

OSE, CoC, and DG share the same family of character-creator apps. Pre-A–C:

| Layer | CoC 1.1 | DG 1.2 | OSE pre |
|-------|---------|--------|---------|
| Multi-slot AI + sheet Settings | ✅ | ✅ | ✅ |
| Waves A–C performance | ✅ | ✅ | ❌ → ✅ |
| Main chunk | ~430 KB | ~592 KB | **~1.18 MB → ~456 KB** |

Structure highlights:

- `hooks/useCharacter.ts` — orchestration hub (smaller than CoC/DG but still fat surface)  
- `third-party/manifest.ts` — eager pull of all source packs (dolmenwood, gods, mystara, …)  
- `hooks/usePdfPrinting.ts` — static `pdf-lib`  
- `App.tsx` — manage / final tabs + many modals eager  

---

## Goals

1. **Cut first-load JS** toward DG-class main chunk (**≤ ~600–700 KB** preferred;  
   **≤ ~900 KB** hard bar given multi-source data).  
2. **Isolate re-renders** on equipment / final-touches hot paths.  
3. **Defer** pdf-lib, non-active tabs, heavy AI catalogs, and ideally inactive
   third-party source packs.  
4. Keep **OSE rules, multi-source content, saves, and print field maps** stable.  
5. Do **not** rework multi-slot AI or sheet Settings (already landed).

### Non-goals

- New classes/races/content packs  
- Full Zustand/Redux  
- Full TypeScript `strict` / ESLint package (optional later)  
- Replacing pdf-lib  
- Re-doing Zhipu / xAI OAuth or gear Settings  

---

## Proposed waves (map to CoC / DG)

### Wave A — Hygiene

| Item | Action | CoC/DG analogue |
|------|--------|-----------------|
| A1 | Add `npm run typecheck` (`tsc --noEmit`); mention in README | ✅ |
| A2 | Vitest + tsconfig exclude `.kilo/**`, `dist/**` | ✅ |
| A3 | Memoize `useCharacter` / composed hook return objects | ✅ |
| A4 | Document baked env keys (zhipu/xai already in vite define) | ✅ |
| A5 | Audit root orphans / dead stubs; remove if unused | DG deleted root `GearTab` etc. |
| A6 | `npm test` green | ✅ |

**Exit:** cleaner tooling; no UX regression.

### Wave B — Bundle / critical path

| Item | Action | CoC/DG analogue |
|------|--------|-----------------|
| B1 | `React.lazy` + `Suspense` for Manage, Final Touches, Settings, heavy modals | ✅ |
| B2 | Dynamic `import('pdf-lib')` in print path only | ✅ |
| B3 | Vite `manualChunks` for `pdf-lib`, `@google/genai`, openrouter cache | ✅ |
| B4 | AI catalogs: minimal fallback first; hydrate on Settings open / Refresh | CoC/DG load-provider-models |
| B5 | **OSE-specific:** lazy third-party sources — load source packs only when selected (mirror CoC `eras/load-era.ts` as `third-party/load-source.ts` or dynamic `import()` per pack) | CoC eras |
| B6 | WSL polling HMR + keep `/__xai_oauth` proxy | CoC/DG |

**Exit:** main chunk **≤ ~700 KB** preferred; print + multi-source still work when selected.

### Wave C — Runtime re-renders

| Item | Action | CoC/DG analogue |
|------|--------|-----------------|
| C1 | Slice character context (identity / manage-skills / gear / final-touches/extras) | ✅ |
| C2 | Migrate Manage / Final Touches / equipment consumers to narrow hooks | ✅ |
| C3 | `React.memo` on hot list rows (equipment lines, skill managers if thrashy) | SkillRow |
| C4 | Extract pure helpers (HP, encumbrance summaries, kit filters) + unit tests | CoC `domain/` |
| C5 | Stable callbacks for point/equipment changes | ✅ |

**Exit:** editing one skill or kit line does not re-render portrait/dossier tree.

### Finish pass

- Measure `dist/assets` before/after  
- Update this proposal Outcome table  
- Power-user changelog only when cutting an OSE release  

---

## Suggested sequencing

```text
A hygiene → B lazy/bundle (+ source lazy-load) → C context slices → measure → release
```

AI multi-slot and sheet Settings are **already done** — do not block Wave A on them.

### File map (port from CoC/DG)

| CoC / DG reference | OSE target |
|--------------------|------------|
| `App.tsx` lazy tabs | `App.tsx` |
| `hooks/usePdfPrinting.ts` dynamic pdf-lib | same |
| `context/CharacterContext.tsx` slices | `context/CharacterContext.tsx` |
| `vite.config.ts` manualChunks + polling | same (OAuth proxy already present) |
| `eras/load-era.ts` | **new** `third-party/load-source.ts` (or equivalent) |
| `domain/*.ts` | new `domain/` or pure `utils/` modules |
| `npm run typecheck` | `package.json` |

---

## Risks

| Risk | Mitigation |
|------|------------|
| Lazy source pack breaks default OSE open | Preload `ose` pack always; lazy only optional packs |
| Save slots reference unloaded source ids | Keep metadata list eager; load full pack on restore |
| Spellcaster PDF path regressions | Keep `SheetContext.getSheetPath` tests / manual print smoke |
| OAuth proxy lost when editing vite | Preserve `/__xai_oauth` block from AI wave |
| Grog / Karameikos special flows | Regression smoke after each wave |

---

## Acceptance criteria

- [x] Main production chunk substantially under ~1.18 MB (target ≤ 0.7 MB) — **~456 KB**  
- [x] Manage / Final / Settings not all in initial graph  
- [x] pdf-lib not in main chunk  
- [x] Optional third-party sources load on demand (`third-party/load-source.ts`)  
- [x] Multi-slot AI + sheet Settings + OAuth preserved  
- [x] `npm test` green (25); `npm run typecheck` available  
- [x] Outcome table filled  

---

## What shipped (by wave)

### Wave A
- `npm run typecheck`; vitest/tsconfig exclude `.kilo`
- Memoized `useCharacter` return
- Removed root orphan `ManageTab` / `FinalTouchesTab` (use `components/`)

### Wave B
- Lazy Manage / Final Touches / Settings / heavy modals
- Dynamic `pdf-lib`; Vite `manualChunks` + WSL polling HMR
- Lazy third-party packs via `load-source.ts` + async `useAggregatedData`

### Wave C
- Sliced `CharacterProvider` (identity / progression / gear / extras)
- Hot consumers on narrow hooks
- Pure `domain/race-modifiers.ts` + unit tests

**Optimization program: done.** AI multi-slot was already complete before this pass.
