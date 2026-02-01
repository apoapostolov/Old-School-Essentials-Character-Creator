# USER STYLE GUIDE — House Rules Wording

## Purpose

- Provide a precise, reproducible style for writing and editing rules so new content reads as if authored by the same person who wrote `ose_house_rules.md`.
- Ensure mechanical clarity, concision, and consistent formatting across sections, bullets, callouts, and tables.
- Enable AI and human editors to maintain house rules with predictable, auditable changes.

## Style Compliance — Required for AI and Editors

- **This document is authoritative.** Any AI or human editing `ose_house_rules.md` or related houserules MUST follow this guide.
- **Consistency over correctness.** Do not "improve" tone or grammar if it violates this style.
- **No silent renames.** Do not rename features, headings, or labels unless explicitly requested.
- **Precedent first.** Mirror existing terminology and patterns; do not invent new jargon.
- **Minimal diffs.** Limit changes to what the instruction requires; avoid scope creep.
- **Format precision.** Preserve headers, bold names, colons, callouts, tables, and requirement lines exactly.
- **Notation is law.** The Mechanics & Notation section is a binding contract for numbers, dice, and abbreviations.
- **Pre-merge validation.** Run the Consistency Checklist before finalizing any edit.
- **Precedent copying.** When uncertain, copy the nearest analogous rule verbatim and adapt only what differs.

## Persona — Adopt Before Writing

**Role:** Tabletop RPG Rules Referee/Designer — pragmatic, terse, exacting.
**Goal:** Mechanical clarity first; every sentence advances a rule or clarifies an interaction.
**Voice:** Direct, confident, system-facing. Present tense. No filler or narrative color.
**Verbs:** gain, lose, reduce, roll, choose, spend, must (avoid: utilize, leverage, enable, enhance).
**Notation:** Specific numbers and thresholds always; vague words only in callout guidance.
**Structure:** Bullets and tables over prose; lists over paragraphs; tables over nested bullets.
**Consistency:** Prefer existing precedent over novelty; mirror adjacent rules when uncertain.
**For AI writers:** Adopt this persona fully before editing. Load the surrounding rules as context. When in doubt, copy the nearest analogous rule and adapt only what differs.

## Pre-merge Checklist (Mandatory)

- [ ] Section heading is Title Case and placed correctly.
- [ ] Feature bullets use bold name + colon and follow the "Feature Bullets — Pattern".
- [ ] Requirements line exists under Advanced class headings and matches the requirements table.
- [ ] Numbers/notation follow the Mechanics & Notation rules (e.g., `1‑in‑6`, `10%`, `10+`, `7‑9`, `6‑`, case-correct hp/HD/AC/XP).
- [ ] Callouts are labeled: `> ?? **Label:** …` with emoji preserved and spacing correct.
- [ ] Tables include header + `| --- |` separator, and use `<br>` inside cells for multiline content.
- [ ] Diff is scoped; no broad reflow or rewrite of unrelated text.
- [ ] Terms retain house style (Magic User, Low‑Light Vision, save vs. poison, Morale).

## Forbidden Changes (without explicit instruction)

- Conversational or verbose tone ("You can now…" instead of "…grants…").
- Rewriting feature names, class names, or section titles without the user's say-so.
- Swapping terminology (e.g., Darkvision for Low‑Light Vision, M‑U for Magic User).
- Switching notation systems (e.g., "one in six" for `1‑in‑6`, "20 percent" for `20%`).
- Global grammar "cleanups" that alter cadence, break parallelism, or change emphasis.
- Adding narrative context or flavor text not in the original rule.
- Reordering bullets or changing sub-bullet indentation without reason.

## AI Editing Workflow

1. **Identify scope and precedents.** Use ripgrep or search to find the rule and 2–3 adjacent rules for context.
2. **Draft using templates.** Follow the mini-templates (below); keep bullets to 1–2 sentences max.
3. **Verify notation.** Check numbers, dice, abbreviations, and thresholds against the Mechanics & Notation section.
4. **Format for clarity.** Add requirement lines, label callouts, convert long lists to tables.
5. **Run the checklist.** Validate against Pre-merge Checklist; adjust wording to match surrounding rules.
6. **Produce minimal diff.** Output only the changed sections; no reflows or reformatting of untouched content.

## Voice & Tone

- **Direct, rules-forward, system-facing.** No narrative flavor, no hedging.
- **Present tense.** "The Paladin gains…" not "The Paladin will gain…"
- **Short, exact sentences.** Include timing, costs, limits. No approximations.
- **OSR/RC terminology.** hp, HD, saves, Morale, AC, THAC0 (where relevant); consistent abbreviations.
- **No assumptions.** Spell out mechanics; assume minimal prior knowledge of adjacent rules.

## Structure & Formatting

### Sections

### Sections

- Use `## Title` (Title Case). Keep sections focused and narrow in scope.
- Use `###` sparingly; most subdivisions should be within bullets or tables.

### Feature Bullets

- Format: `- **Feature Name:** Effect (timing, cost, limit).`
- Example: `- **Cleave:** On your turn, when you reduce a foe to 0 hp, make one free melee attack against an adjacent enemy.`
- Keep to 1–2 sentences; use sub-bullets for scaling or edge cases.

### Requirements Line (Advanced Classes)

- Insert immediately under the `## Class` heading.
- Format: `- Requirements: STR 13+, WIS 9+` (primary ability first, then secondary).
- Align with any requirements table in the document.

### Sub-bullets

- Indent with two spaces; treat as continuations of the parent bullet.
- Separate scaling or conditional rules into sub-bullets; keep each short.

### Callouts

- Syntax: `> ?? **Label:** Short note with direct guidance.`
- Preserve emoji codes; bold the label immediately after the emoji.
- Examples: `Read Magic Note`, `Practical Identification`, `Foundry Tip`, `NPC Expertise Guidance`.
- Keep callouts to one line; longer content goes in a separate bullet or table.

### Tables

- Use standard Markdown: header row, `| --- | --- |` separator, data rows.
- Keep to two–three columns when possible.
- For multiline cells, use `<br>` to maintain single-row layout.

### Emphasis

- Bold for feature names, key labels, and important thresholds.
- Avoid italics unless used in the surrounding context.

## Mechanics & Notation — Binding Contract

**Dice expressions:**

- `d6`, `2d6+STR`, `1d4 weeks`, `3d6` (no spaces around operators).

**Success bands:**

- `10+` (ten or more), `7–9` (seven to nine), `6–` (six or less).
- Use hyphen for "or less" (not "≤" or "under").

**Percentages:**

- `10%`, `70%` (no trailing space before the percent sign).

**X-in-6 chance:**

- `1-in-6`, `2-in-6`, `5-in-6` (hyphens, not slashes).

**Bonuses and penalties:**

- `+2 to hit`, `–1 to AC`, `–2 to Morale checks`; always include the plus or minus sign.

**Ability scores:**

- STR, DEX, CON, INT, WIS, CHA (uppercase, no periods).
- Requirements: `STR 13+`, `WIS 9+` (score then plus sign).

**Game terms:**

- `hp` (lowercase; plural `hp`), `HD` (uppercase), `AC` (Armor Class), `XP` (Experience Points).
- `save vs. poison` (use "vs." with a period; lowercase "vs").
- `Low-Light Vision` (hyphenated; title case within sentences).
- `Magic User` (two words, title case in class headings; lowercase in prose: "the magic user casts").

**Modifiers and thresholds:**

- Use "increase by +X", "reduce by X" (not "add", "subtract", "boost").
- "per day", "per encounter", "per round" (lowercase, no period).

## Feature Bullets — Pattern

## Feature Bullets — Pattern

- Start with the bolded feature name and a colon.
- Give the core effect in one sentence (two max). Include timing, costs, and limits.
- If needed, follow with 1–3 short sub-lines for thresholds, scaling, or edge cases.

**Example — Good**

- **Battle Songs:** When rolling initiative, choose to sing (allies +2 Morale) or play (enemies -2 to hit unless targeting you).

**Example — With thresholds**

- **Assassination Scaling:** On save success, damage is doubled at 5th, tripled at 9th, and quadrupled at 13th level.

## Class Requirements — Pattern (Advanced)

- Insert one line directly under `## Class`:
  - `- Requirements: STR 13+, WIS 9+`
  - Primary first (13+), then secondary (9+).

## Callouts — Pattern

- Syntax: `> ?? **Label:** Content…`
- Emoji codes used in the file (e.g., `??`, `????`) are preserved; add a short bold label after them.
- Keep callouts short; place longer lists in tables or bullets.

## Tables — Pattern

- Header row, separator, then rows. Keep two or three columns where possible.
- If a cell needs multiple lines, insert `<br>` to maintain a single row.

## Probability & Random Rolls

- **Exact dice, exact outcomes.** Use `3d6`, `2d6+1`, not "a few", "some", or "several".
- **Roll bands.** Use the document standard: `10+ choose one; 7–9 choose two; 6– choose all three`.
- **Single die vs. multiple.** Spell out single rolls: "Roll a d6" or "On a d6 roll of 4–5…"
- **Chance phrasing.** Use `1-in-6` (e.g., "A 1-in-6 chance") or percent (e.g., "70% chance"); avoid mixed notation in the same rule.

## Lexicon & Style Choices

**Modifiers:**

- "increase by +1", "reduce by 1" (not "add 1", "subtract 1", "boost", "penalty").
- "gain", "lose", "spend", "must" (short, concrete verbs).

**Modal verbs:**

- "may" for options ("may cast once per encounter").
- "can" for capability ("can use this ability").
- Imperative only for direct instructions ("Roll 3d6 and consult the table.").
- "must" for mandatory constraints ("must save vs. magic").

**Constraints:**

- Plain-language constraints: "cannot cast in metal armor", "once per encounter", "at the start of your turn".
- Avoid hedging: "is", not "seems"; "deals", not "might deal"; "requires", not "may require".

**Hyphenation:**

- Retain existing conventions: `Low-Light Vision`, `Shield Stand`, `damage reduction`, etc.
- Hyphenate compound adjectives before nouns: "low-level spells", "saving throw bonus".

## Consistency Checklist (Before Finalizing)

- Section heading present and in Title Case.
- Feature names bolded with trailing colon.
- Requirements line under advanced classes present and correct.
- Numbers and thresholds use established notation.
- Callouts labeled; labels in bold; emoji preserved.
- Tables (if any) have headers and `| --- |` separators.
- Terms (hp, HD, AC, XP) case-correct; “vs.” has a period.
- Magic User spelled as in the surrounding section.

Mini‑Templates

- New Feature

  - `- **Feature Name:** One-sentence effect (timing, cost, limits).`
  - Optional sub-lines for scaling/edge cases.

- Class Block (Advanced)

  - `## Class Name`
  - `- Requirements: STR 13+, WIS 9+`
  - Feature bullets in the established style.

- Callout
  - `> ?? **Label:** One-line note with direct guidance.`

Do / Don’t

- Do keep rules short, numeric, and unambiguous.
- Do reuse existing phrasing when feasible.
- Do prefer bullets and tables to paragraphs for mechanical lists.
- Don’t invent new idioms if an existing one is present (e.g., stick to 1‑in‑6, not “one in six”).
- Don’t over-explain narrative context; keep it mechanical.

Examples Pulled From Current Doc (for reference)

- “Decrease a score by 2 to gain 1 adjustment point. You can decrease each score only once. Spend 1 adjustment point to increase a score by +1.”
- “The Paladin can spend a turn concentrating to detect the presence of evil enchantments and creatures of evil alignment within 60'.”
- “The Druid can use survival skills and natural means to cure weaker poisons. The Druid has a 5‑in‑6 chance to cure poison. The chance is lowered by 1‑in‑6 for each level of poison above level I.”
