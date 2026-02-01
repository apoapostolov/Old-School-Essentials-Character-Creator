# OSE House Rules — Balance Feedback (Prioritized)

Source reviewed: [rpg/houserules/ose_house_rules.md](ose_house_rules.md)

TL;DR — Highest-impact risks

- GP→XP loops: treasure XP at 1 sp per XP plus Carousing and Philanthropy, with Paladin 1.5x donations, enables double-dipping and runaway leveling.
- Bard “charge stun”: low‑level encounter lockdown with unlimited use.
- Acrobat “Dodge die”: frequent 1‑damage mitigation eclipses armor and Fighter durability.
- Druid animal companions: mass companions without Morale/upkeep create action economy spiral.
- Drow/Elf power budgets: front‑loaded packages (poison crafting, Dex-to-damage, dual spell lists).
- Half‑Orc near‑death rules: synergy with your 0‑hp/Con damage makes them too reliable.
- Skill tiering: “class skills auto‑succeed on Expert” collapses tension and DC design.
- Exploration lighting: universal “Moonlit Vision” reduces torch/stealth gameplay.

## Detailed findings and targeted fixes

### 1) XP and economy loops (critical)

Symptoms

- XP for treasure: 1 XP per 1 sp nominal value.
- Carousing: GP spent converts to XP at 100% (table).
- Philanthropy: GP→XP at 80%, plus settlement events.
- Paladin: “one and a half times the XP reward for donated gold and treasure.”

Issues

- Same gold can yield treasure XP, then be “spent” again for Carousing/Philanthropy XP.
- Paladin bonus stacks for extreme GP→XP efficiency.

Fix (pick one strategy; A is simplest)

- A. Single-source XP: Treasure-as-XP is primary. Any gold converted via Carousing/Philanthropy is excluded from treasure XP (and vice versa). Paladin bonus applies only to Philanthropy.
- B. Conversion caps: Allow Carousing/Philanthropy but cap at 25% of session XP, and never stack with treasure XP for the same coin. Paladin bonus capped at +10% of session XP.

Ready-to-paste rule text

    ```markdown
    > XP Accounting
    > - The same coin cannot grant XP twice. Choose either treasure XP or GP→XP (Carousing/Philanthropy), not both.
    > - Carousing/Philanthropy XP per PC is capped at 25% of total XP earned that session.
    > - Paladin donation bonus applies only to Philanthropy XP and is capped at +10% of the Paladin’s total session XP. It does not stack with Carousing.
    ```

### 2) Bard “charge stun” (very strong at low levels)

Symptom

- On hit, can deal 1 dmg and force save vs spells or target loses next turn; repeatable.

Issues

- Reliable, spammable lockdown vs low‑HD poor-save enemies.

Fix

- Limit uses per rest; soften effect for bosses; remove turn-skips on standard foes.

Ready-to-paste rule text

    ```markdown
    > Bard Charge Control (Adjustment)
    > - Use limit: CHA modifier (minimum 1) times per long rest; one target per encounter.
    > - On a failed save: target suffers –2 to attack rolls until its next turn (no loss of turn).
    > - Elite/boss creatures gain +2 on the save and are never forced to lose a turn by this feature.
    ```

### 3) Acrobat “Dodge die” (overtuned)

Symptom

- Once per round roll d4/d6/d8/d10; if it beats the attack, the hit still lands but does only 1 dmg.

Issues

- Converts many hits into chip damage, out-tanking Fighters, especially at d8/d10.

Fix

- Make it a limited reaction; reduce damage by die instead of to flat 1; add equipment limits.

Ready-to-paste rule text

    ```markdown
    > Acrobat Dodge Die (Adjustment)
    > - Reaction; uses per encounter equal to 1 + DEX modifier (minimum 1).
    > - On use, reduce incoming damage by the Dodge Die result (minimum 1 damage remains).
    > - Cannot be used vs natural 20s, while prone/grappled, or in medium/heavy armor or with a shield.
    ```

### 4) Druid animal companions (action economy)

Symptom

- Up to hireling limit; no Morale; no upkeep; easy replacement.

Issues

- Early game swarm; companions don’t meaningfully tax party economy/XP.

Fix

- Hard limits; Morale checks; simple upkeep; action economy cap.

Ready-to-paste rule text

    ```markdown
    > Druid Companions (Adjustment)
    > - Limit: 1 companion at L1, +1 at L5, +1 at L9 (HD each ≤ ceil(Druid HD/3)).
    > - Companions make Morale checks (Morale 9–10). Require basic upkeep (food/care).
    > - No treasure share and do not gain XP; replacement requires downtime in favored terrain (1 week per HD).
    > - Action economy: at most two companion turns per round at L1–4; three at L5–8; four at L9+.
    ```

### 5) Drow and Elf power budgets (front‑loaded)

Drow

- Dex-to-damage with Drow weapons; free poison batches; broad sleep/paralysis immunity.

Fix

    ```markdown
    > Drow Constraints
    > - Sunlight Sensitivity: in direct sunlight, –2 to attack and Perception; –1 to reaction rolls with surface dwellers.
    > - Poison crafting: costs 25 gp/batch; requires 8 hours; max 1 batch/week; mishap on a natural 1 (take 1 damage).
    > - Dex-to-damage only with light/finesse Drow weapons; no shield; light armor only.
    ```

Elf

- Access to both MU and Illusionist lists plus two extra beginner spells.

Fix (choose one)

- A. Pick one list at creation; remove two extra beginner spells.
- B. Keep both lists but remove extra beginner spells and add 15% XP requirement increase.

### 6) Half‑Orc durability + 0‑hp rules (overtuned synergy)

Symptoms

- Acts while at 0 hp; reduces Con loss “by that amount minus one,” scaling at 5/9.

Issues

- Too reliable near death in a system where excess damage hits Constitution.

Fix

    ```markdown
    > Half‑Orc Near‑Death (Adjustment)
    > - At ≤0 hp: may move or take one simple action; cannot cast; acts at end of round.
    > - Con‑loss mitigation: When you would reduce Con from overflow, reduce the amount by 1 (minimum 0), once per day at L1–4, twice per day at L5–8, three times per day at L9+.
    ```

### 7) Fighter multi‑cleave clarification (pacing spikes)

Symptom

- Text implies chained extra attacks; intent/cap not explicit.

Fix

    ```markdown
    > Fighter Cleave (Clarification)
    > - Per turn, you may gain at most [cleave tier] extra attacks (1 at L1, 2 at L5, 3 at L9, 4 at L13).
    > - Extra attacks from cleave cannot generate further cleaves beyond this cap.
    > - After L9, spending a cleave use to step up to 5 ft remains allowed.
    ```

### 8) Skill tiers collapse tension

Symptom

- “Characters with a class skill succeed without making a check” on Expert checks.

Issues

- Expert tier becomes no-risk; fewer meaningful decisions; trivializes obstacles.

Fix

    ```markdown
    > Skill DC Tiers (Adjustment)
    > - Simple: class skill = auto‑success; trained = ability check; untrained = check with minor complication on success.
    > - Expert: class skill = ability check with +3 bonus; trained = ability check; untrained = normally disallowed.
    > - Heroic: only class specialists; use class X‑in‑6/percentile mechanics.
    ```

### 9) Magic identification power creep

Symptoms

- Magic User “Arcane Sense” reveals properties; Identify becomes marginal.

Fix

    ```markdown
    > Arcane Sense (Adjustment)
    > - Detects whether the held item is magical and its general school/feel; cursed items conceal curses.
    > - Revealing properties requires an Identify spell/ritual or 1 hour of careful examination and 50 gp in materials; still does not reveal curses.
    ```

### 10) Exploration lighting reduces torch/stealth gameplay

Symptom

- “Moonlit Vision”: everyone effectively gains Low‑Light Vision under moonlight.

Fix

    ```markdown
    > Moonlight Rules (Adjustment)
    > - Treat open full/half‑moon as dim light. Perception at distance suffers –2; ranged attacks beyond 30 ft suffer –1.
    > - Low‑Light creatures see normally in dim light; others still benefit from torches/lanterns.
    ```

## Secondary notes and quick fixes

- Magic User’s Grogs: No wage + +2 Morale is a hidden caster buff while hirelings tax party XP/loot. Consider minimal stipend or have the PC pay the grog’s half‑share from their personal share.
- Ranger assassination: Consider limiting to double damage from surprise vs favored enemies (not instant‑death save like Assassin) to preserve Assassin niche.
- Cleric disease cure rates: High success may trivialize disease play. If diseases are common in your setting, reduce base chances by 1‑in‑6 across the board.
- Oil fire: Current rule (1d6 at start of turn, 2 rounds, stacking resets duration only) is fine.
- Spelling/clarity nits:
  - “Silvan Sense” (Half‑Elf) → “Sylvan Sense” for consistency.
  - “Svirnefblin” → “Svirfneblin”.
  - Acrobat “FA skill check” is undefined; rename to a listed Acrobat skill or define “Fast Acrobatic” test explicitly.

## Optional patch bundle (ready for insertion)

Use the “Ready-to-paste rule text” under each item to edit `rpg/houserules/ose_house_rules.md`. Consider logging changes in `rpg/houserules/CHANGELOG.md`.

## Publishing reminder

- After edits, run: `npx -y markdownlint-cli2 --fix rpg\houserules\ose_house_rules.md`
- Re‑read Carousing/Philanthropy/Paladin sections together to ensure no GP→XP double counting remains.
