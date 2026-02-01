# Project Roadmap & TODO List

This document outlines potential future features, improvements, and technical tasks for the Advanced OSE Character Generator.

## High-Priority Features

- [x] **Character Save/Load**: Implement a system using browser `localStorage` to save a character's state, allowing users to close the tab and resume their session later.
- [ ] **Custom Item Entry**: Allow users to add their own custom items (weapons, armor, gear) with custom names, costs, and weights in the equipment customization modal.
- [ ] **Advanced Spellbook Management**: For spellcasting classes, create a dedicated interface to manage their entire spellbook beyond just starting spells, including preparing spells for the day.

## Medium-Priority Features

- [x] **More Classes**: Add support for additional OSE or popular homebrew classes. _(DONE: The dynamic third-party manifest system now allows new classes to be added easily.)_
- [ ] **Hireling & Henchmen Management**: Expand the Grog system to allow for the creation and management of multiple hirelings, tracking their stats, loyalty, and monthly costs.
- [x] **Theme Expansion**: Add more campaign setting themes (e.g., Greyhawk, Blackmoor) with custom language lists, secondary skills, and AI prompt adjustments. _(DONE: The manifest system supports adding new themes with all associated data. Several examples have been implemented.)_
- [ ] **Stronghold Management**: For high-level characters, add a basic interface for tracking stronghold details, followers, and domain-level play elements.

## UI/UX Improvements

- [ ] **Mobile Layout Optimization**: Further refine the layout for a better experience on small mobile screens, particularly in the `ManageTab`.
- [ ] **Accessibility Review**: Conduct a full accessibility audit (ARIA attributes, keyboard navigation, color contrast) to ensure the app is usable for everyone.
- [ ] **Subtle Animations**: Add more animations and transitions (e.g., when cards appear/disappear) to make the interface feel more dynamic.
- [ ] **Loading Skeletons**: Replace some spinners with skeleton loaders for a better perceived performance during data fetching/generation.

## Technical Debt & Code Quality

- [ ] **Unit & Integration Testing**: Write unit tests for critical utility functions (`calculateHP`, `getModifier`, skill calculations) and integration tests for major user flows.
- [ ] **Component Styling Consolidation**: Review components for inline styles and move them to a more organized CSS-in-JS or modular CSS solution.
- [ ] **Dependency Audit**: Periodically review the `importmap` dependencies for available updates and security vulnerabilities.
- [ ] **Error Handling**: Improve user-facing error messages from the AI API to be more specific (e.g., distinguishing between a network error and a content safety block).

## New OSE Play Aids & Quick Wins

- [ ] **Ability Roll Presets**: Add 3d6 in order, 3d6 arrange, DM-set array (e.g., 15/14/13/12/10/8), and keep 4d6 drop-lowest; include a point-buy toggle (25/28) as an option.
- [ ] **Eligibility Filters**: Let users hide ineligible classes/races and show “nearest eligibility” hints (which stat to raise, by how much).
- [ ] **Encumbrance & Load Packs**: Auto movement penalties; preset packs (dungeoneer/explorer) tuned to OSE weights.
- [ ] **Spellbook & Scroll Helpers**: Per-class lists with level caps; random spellbook/scroll hoards; memorized/known tracking per day.
- [ ] **Hirelings & Morale Tools**: Retainer generator with loyalty/wages; quick morale and reaction rolls with per-monster modifiers.
- [ ] **Exploration Turn Tracker**: Torch/lantern burn, encounter checks, getting lost, weather, forage/hunt rolls, and reaction/morale buttons.
- [ ] **Treasure & XP Calculator**: Dungeon-level treasure roller, gem/jewelry detail, XP splitter (GP-for-XP + monsters), henchman share option.
- [ ] **Formation & Marching Order**: Simple front/middle/rear editor for mapping to encounters and surprise.
- [ ] **Save/Export Enhancements**: Multiple save slots plus a compact, table-ready print/mobile sheet alongside the full PDF.
