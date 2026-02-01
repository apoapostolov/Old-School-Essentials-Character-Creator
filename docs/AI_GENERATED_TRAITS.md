# AI-Generated Traits & Flaws — Implementation Guide

Purpose
-------
This document describes a complete, implementable design for adding an AI-driven "traits and flaws" field to a character generator project (example: `ose-character-roller`). It covers data schema, TypeScript types, prompt templates for the LLM, validation and moderation, UI integration, persistence, tests, and operational concerns so another AI or developer can implement the feature in a similar repository.

Scope
-----
- Physical traits: observable physical details (appearance, scars, posture, distinguishing marks).
- Mental traits: personality descriptors, habits, tendencies, strengths.
- Flaws: mechanical or roleplaying liabilities (phobias, vices, vulnerabilities, social blindspots).
- Each generated entry must be safe-for-work, culturally sensitive, concise for UI display, and optionally expandible into a longer backstory or roleplaying cue.

Design goals
------------
- Deterministic optionally: allow reproducible outputs via seed.
- Safe: filter or sanitize for toxic, NSFW, or disallowed content.
- Compact: store short canonical text for the sheet plus optional extended text for backstory/hover.
- Structured: provide tags/metadata (category, severity, seed, source, locale).
- Testable: generator function should be unit-testable via a mock LLM interface.

Data model
----------
Use a compact JSON schema and matching TypeScript types. Place types in `types.ts` or `character-types.ts` and import where needed.

JSON schema (example)
```json
{
  "type": "object",
  "properties": {
    "id": {"type": "string"},
    "slug": {"type": "string"},
    "category": {"type": "string", "enum": ["physical","mental","flaw"]},
    "text": {"type": "string"},
    "detail": {"type": ["string","null"]},
    "severity": {"type": ["string","null"], "enum": [null, "minor", "moderate", "major"]},
    "tags": {"type": "array", "items": {"type":"string"}},
    "seed": {"type": ["integer","null"]},
    "source": {"type": ["string","null"]},
    "createdAt": {"type": "string", "format":"date-time"}
  },
  "required": ["id","slug","category","text"]
}
```

TypeScript interface (suggested)
```ts
export type TraitCategory = 'physical' | 'mental' | 'flaw';

export interface AITrait {
  id: string;           // UUID or deterministic id (e.g., `trait-<hash>`)
  slug: string;         // machine-friendly kebab-case
  category: TraitCategory;
  text: string;         // short canonical text for the sheet (one sentence)
  detail?: string | null; // optional expanded paragraph (hover/backstory)
  severity?: 'minor'|'moderate'|'major' | null;
  tags?: string[];      // free-form tags for filtering/search
  seed?: number | null; // optional seed used for deterministic generation
  source?: string | null; // e.g., 'ai' or 'manual'
  createdAt?: string;   // ISO timestamp
}
```

Storage and shape on the character object
----------------------------------------
Add an optional field on the character model, e.g. `traits: AITrait[]`. The character reducer/context should implement actions to:
- `ADD_TRAIT(trait: AITrait)`
- `UPDATE_TRAIT(id, patch)`
- `REMOVE_TRAIT(id)`
- `REGENERATE_TRAIT(id, options)`

UI presentation
---------------
Recommended minimal UI elements:
- Compact card/list on the character sheet showing the `text` and `category` icon.
- Hover or expand option showing `detail` (longer paragraph) and `severity`/`tags`.
- Edit (manual override) and Regenerate buttons.
- Bulk-generate button for initial character creation.

Suggested component responsibilities (map to existing project)
- `FinalTouchesTab` / `BackstoryGenerator` — include a small `TraitsPanel` component.
- `TraitsPanel` — lists `traits` with controls to regenerate/remove/add.
- `TraitEditorModal` — lets players edit text or convert an AI suggestion into a permanent custom trait.

Example UI microcopy
- Sheet line: "Scar across left eyebrow — physical"
- Hover/expanded detail: "A shallow white scar from a childhood riding accident; slight twitch when exposed to bright lights." 
- Flaw display: show severity icon (minor/moderate/major) and a small caution color for major flaws.

LLM generation contract
-----------------------
Design a single function `generateTraits` that accepts options and returns a list of validated, typed `AITrait` objects. Keep the LLM interface isolated behind an adapter so it can be mocked in tests.

Function signature (TypeScript suggestion)
```ts
export type GenerateTraitsOptions = {
  categories?: TraitCategory[]; // which types to create
  count?: number;               // max items to return
  locale?: string;              // e.g., 'en-US'
  seed?: number | null;         // optional deterministic seed
  tone?: 'neutral' | 'gritty' | 'cinematic';
  constraints?: {
    avoidTags?: string[];      // tags to avoid
    maxSeverity?: 'minor'|'moderate'|'major';
  }
}

export async function generateTraits(options: GenerateTraitsOptions): Promise<AITrait[]>;
```

LLM prompt templates
--------------------
Use structured prompts and few-shot examples. Keep each requested trait short (one sentence for `text`) and include an optional `detail` paragraph. Provide explicit constraints in the prompt to reduce hallucination.

Prompt skeleton (system)
```
You are a helpful content generator for a tabletop RPG character builder. Generate concise traits and flaws for player characters.
- Output JSON array only.
- Each item must include: category (physical|mental|flaw), text (1 sentence), detail (1 short paragraph, optional), severity (minor|moderate|major or null), and tags[].
- Do not include real person names, political content, or discriminatory content.
- Keep descriptions safe and playable.
```

Few-shot example (user/instruction)
```
Example output:
[
  {"category":"physical","text":"Scar across the left eyebrow","detail":"A thin white scar from a horseback fall; eye twitch in bright light.","severity":"minor","tags":["scar","eye"]},
  {"category":"mental","text":"Stoic under stress","detail":"Rarely shows emotion; prefers action over words in tense situations.","severity":"minor","tags":["stoic","control"]},
  {"category":"flaw","text":"Claustrophobia","detail":"Panics in enclosed spaces; may freeze or flee when trapped.","severity":"major","tags":["phobia","panic"]}
]
```

Generation constraints
- Limit `text` to 100 characters.
- Limit `detail` to ~250 characters.
- Prefer specificity (concrete physical marks, named behaviors) but avoid medical diagnoses and real-world stigmatizing language.
- Ensure diversity across categories when multiple items requested.

Moderation and sanitization
---------------------------
- Run all generated text through a moderation filter (either a hosted API or local rules). Block or re-prompt when the output contains sexual content, explicit violence, hate speech, or personal identifiers.
- Normalize whitespace and punctuation. Remove leading/trailing quotes if the LLM returns stringified JSON.
- Enforce the schema; if the LLM returns invalid JSON, fallback to a simpler prompt or a single deterministic seed fallback list.

Determinism and seeding
-----------------------
- If `seed` is provided, pass the seed to the adapter or produce a deterministic prompt (include `seed: <n>` and number-based examples) to get reproducible outputs. Not all LLMs support deterministic seeding; if unavailable, implement a local RNG overlay that post-selects or shuffles the cleaned outputs deterministically.

Adapter pattern (isolation)
---------------------------
- Implement a single adapter `llmAdapter` with methods `complete(prompt, opts)` and `moderate(text)`.
- Keep all prompt construction and parsing inside `generateTraits`, not spread across UI components.

Example adapter interface
```ts
export interface LLMAdapter {
  complete(prompt: string, options?: {temperature?: number, maxTokens?: number, seed?: number}): Promise<string>;
  moderate?(text: string): Promise<ModerationResult>;
}
```

Validation & parsing
--------------------
- After receiving the LLM response, attempt to parse JSON. If parsing fails, try a tolerant parser (strip trailing commas, replace smart quotes) and re-parse. If still failing, add a sanitized fallback and log the event.
- Validate each parsed entry against the JSON schema above. Drop or request regeneration for invalid entries.

Example parse/validate flow
1. `raw = await llmAdapter.complete(prompt)`
2. `json = tolerantJsonParse(raw)`
3. `for item in json: validate(item, schema) => AITrait` (add defaults: severity=null, tags=[])
4. `moderation = await llmAdapter.moderate(item.text + "\n" + (item.detail||""))`
5. if flagged -> discard or mark `source: 'flagged'` and optionally re-generate.

Integration points in `ose-character-roller`
-------------------------------------------
- `useAIGeneration.ts` hook: add `generateTraits` wrapper that calls the adapter and populates character context.
- `CharacterContext.tsx`: add action creators and reducers for `traits` array.
- `FinalTouchesTab`/`BackstoryGenerator`: include a `TraitsPanel` that calls `generateTraits` when the user clicks "Suggest Traits" and shows loading state.
- `Tooltip.tsx`: reuse to show `detail` on hover.

TypeScript sample: adding to `Character` type
```ts
interface Character {
  // ...existing fields
  traits?: AITrait[];
}
```

Testing strategy
----------------
- Unit tests for `generateTraits` using a mocked `LLMAdapter` that returns fixed samples. Assert correct parsing, slug/ID creation, tags, and severity.
- Tests for validation and tolerant JSON parsing using intentionally malformed LLM responses.
- Integration test: with a mocked adapter, call `generateTraits({count:3})` and assert that the `CharacterContext` reducer correctly adds traits and that UI components render expected text.
- Snapshot test for the generated UI list.

Suggested unit tests (jest)
```ts
test('generateTraits parses and normalizes LLM JSON', async () => {
  const adapter = mockAdapterReturning('[{"category":"physical","text":"Scar","detail":"...","severity":"minor"}]');
  const traits = await generateTraits({count:1});
  expect(traits[0].slug).toBe('scar');
  expect(traits[0].category).toBe('physical');
});

test('invalid JSON fallback triggers single deterministic trait', async () => {
  const adapter = mockAdapterReturning('not json');
  const traits = await generateTraits({count:1, seed:42});
  expect(traits.length).toBe(1);
  expect(traits[0].source).toBe('fallback');
});
```

Edge cases and how to handle them
---------------------------------
1. LLM hallucination (invented medical diagnoses or personal names): moderate and sanitize; re-prompt with stronger constraints or drop.
2. Inappropriate content (sexual, extremist, racial slurs): block via moderation and re-prompt; provide safe fallback.
3. Duplicate or near-duplicate traits: deduplicate by normalized `text` similarity (lowercase, stripped punctuation); if duplicates occur, request additional outputs or post-generate a variation using local templates.
4. Conflicting traits ("shy" and "extroverted"): detect opposite tags (e.g., `introvert` vs `extrovert`) and either keep both with `detail` clarifying context or regenerate. Optionally allow contradictory traits (complex characters) but flag them in UI.
5. Localization / language mix: enforce `locale` in prompt and detect language in output; if mismatched, re-prompt.

Performance & operational concerns
---------------------------------
- Rate limiting & batching: batch multiple generations into one LLM call where possible. Cache recent generations keyed by (seed, prompt hash) to avoid repeated calls.
- Cost control: allow a low-cost deterministic local template fallback for offline use or when billing thresholds are reached.
- Logging & analytics: log generation requests, seeds, and moderation results (avoid storing PII). Use these logs to improve prompt templates.

Accessibility & UX
------------------
- Provide alt text friendly summaries for screen readers (use `text`).
- Make the regenerate action keyboard accessible and confirm destructive actions (removing a trait).
- Provide a clear warning for major flaws (color and ARIA alert) and the option to convert AI suggestions to player-owned custom text.

Operational checklist for implementation
----------------------------------------
1. Add `AITrait` type to `types.ts` and update `Character` type.
2. Implement `llmAdapter` wrapper and a mock adapter for tests.
3. Implement `generateTraits(options)` with prompt templates and parsing/validation.
4. Add actions and reducer cases in `CharacterContext` for managing traits.
5. Create `TraitsPanel` UI component and wire to `FinalTouchesTab`.
6. Write unit and integration tests for generator, parser, reducer, and UI.
7. Add moderation checks and logging.
8. Add e2e or manual QA with a handful of character examples to validate content quality.

Example minimal implementation snippets

Create slug/id
```ts
import { v4 as uuidv4 } from 'uuid';
function makeSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function traitFromLLMItem(item, seed?: number): AITrait {
  const text = (item.text || '').trim();
  return {
    id: `trait-${uuidv4()}`,
    slug: makeSlug(text || 'trait'),
    category: item.category as TraitCategory || 'mental',
    text: text,
    detail: item.detail || null,
    severity: item.severity || null,
    tags: item.tags || [],
    seed: seed ?? null,
    source: 'ai',
    createdAt: new Date().toISOString()
  };
}
```

Logging & telemetry
- Record: prompt hash, seed, returned slugs, moderation result, generation duration.
- Do not log raw model outputs that might contain PII.

Security & privacy
- Don't send player PII or user-uploaded images to the LLM. If the generation depends on player-supplied backstory, sanitize and anonymize it before sending.

Deliverables
------------
- `AI_GENERATED_TRAITS.md` (this doc) — implementation plan + examples.
- Type definitions added to `types.ts`.
- `llmAdapter` and `generateTraits` in a new `ai/traits.ts` or `hooks/useAIGeneration.ts`.
- `TraitsPanel` component and `TraitEditorModal` in `components/`.
- Tests in `__tests__/` or `src/__tests__/` directories.

Questions to resolve with product/PM
------------------------------------
- Should severity (minor/moderate/major) map to mechanical penalties or just UX flagging?
- Are there any forbidden topics or cultural rules specific to your audience?
- Do we want a deterministic seed option for reproducible character builds in docs or for sharing?

Appendix — Example LLM prompt (final form)
```
SYSTEM: You are an RPG character trait generator. Output JSON only.
INSTRUCTIONS: Generate up to {count} items. Each item must be an object with keys: category ("physical"|"mental"|"flaw"), text (single-sentence, ≤100 chars), detail (optional short paragraph ≤250 chars), severity ("minor"|"moderate"|"major"|null), tags (array of short strings). Do not use real names, political content, sexual or explicit violent descriptions, or slurs. Keep tone playable and respectful.
EXAMPLES: [provide 2-3 examples here]
USER: Generate {count} items for a character who is {shortCharacterPrompt}. Use locale {locale}. Use seed {seed} if provided for reproducibility.
```


If you'd like, I can now:
- Add TypeScript stubs (`ai/traits.ts`) and unit tests to the repository.
- Implement a `TraitsPanel` React component wired to `CharacterContext`.
- Produce a JSON export format that joins traits with other character fields for the sheet.

Which follow-up would you like me to implement next? (I can start with types + generator stubs.)