# Class Feature Flags Documentation

This document provides a comprehensive reference for all the optional flags that can be used within the `class-features.ts` data files (both for the base game and third-party sources). These flags allow for the data-driven control of various application features, making the system highly extensible and configurable without needing to modify the core application code.

## General Class Flags

These flags are placed at the root level of a class definition object (`ClassFeatureData`).

### `sourceId`

-   **Type:** `SourceID` (string literal, e.g., `'ose'`, `'dolmenwood'`)
-   **Purpose:** Explicitly identifies the source of the class data. This is crucial for the data aggregation system to correctly categorize content and apply source-specific rules (like themes or PDF sheets). While optional, it is **highly recommended** for all third-party content.
-   **Example:**
    ```json
    "sourceId": "mystara"
    ```

### `grog_eligible`

-   **Type:** `boolean`
-   **Purpose:** Determines if a character of this class is eligible to recruit a "grog" hireling at the start of their career. If `true`, the Grog Manager will be displayed in the "Manage & Outfit" tab. This is typically used for fragile spellcasting classes.
-   **Example:**
    ```json
    "grog_eligible": true
    ```

### `skill_type`

-   **Type:** `'thief' | 'acrobat' | 'barbarian' | 'ranger' | 'bard'`
-   **Purpose:** Activates and selects the specific skill progression system for the class. The application will render the corresponding skill manager component in the "Manage & Outfit" tab based on this value. Omit this flag for classes without a specialized skill system.
-   **Example:**
    ```json
    "skill_type": "thief"
    ```

### `prefers_warhorse`

-   **Type:** `boolean`
-   **Purpose:** A hint for the AI portrait generator. If `true`, the AI is prompted to consider that the character might be mounted or associated with a warhorse, influencing the final image. Used for classes like Knight and Paladin.
-   **Example:**
    ```json
    "prefers_warhorse": true
    ```

---

## Spellcasting Flags

These flags are placed within the `spellcasting` object of a class definition.

### `knowsAllSpells`

-   **Type:** `boolean`
-   **Purpose:** Designates a class as an "Innate Knowledge" caster (e.g., Cleric, Druid). When `true`, the character is considered to know all spells on their list for the levels they can cast. This bypasses the starting spell selection process.
-   **Example:**
    ```json
    "spellcasting": {
      "knowsAllSpells": true,
      /* ... other properties ... */
    }
    ```

### `randomStartingSpell`

-   **Type:** `boolean`
-   **Purpose:** Designates a class as a "Studious" caster (e.g., Magic-User, Illusionist). When `true`, the `MagicManager` component is displayed, prompting the user to go through the random starting spell selection process.
-   **Example:**
    ```json
    "spellcasting": {
      "randomStartingSpell": true,
      /* ... other properties ... */
    }
    ```

### `default_spell`

-   **Type:** `string`
-   **Purpose:** Specifies the default fallback spell for a class with `randomStartingSpell: true`. If the player dislikes their randomly rolled starting spell, they are offered this spell as an alternative. This field is **required** if `randomStartingSpell` is `true`.
-   **Example:**
    ```json
    "spellcasting": {
      "randomStartingSpell": true,
      "default_spell": "Sleep",
      /* ... other properties ... */
    }
    ```

### `bonus_spell_ability`

-   **Type:** `'WIS' | 'INT'`
-   **Purpose:** Determines which ability score (Wisdom or Intelligence) is used to calculate bonus spell slots. The application's `getBonusSpellSlots` utility function uses this flag to apply the correct bonuses.
-   **Example:**
    ```json
    "spellcasting": {
      "bonus_spell_ability": "WIS",
      /* ... other properties ... */
    }
    ```

### `caster_type`

-   **Type:** `'Arcane' | 'Divine'`
-   **Purpose:** Specifies the type of magic the class wields. This determines UI elements and logic in components like the `MagicManager`. It removes hardcoded logic that maps class names to magic types.
-   **Example:**
    ```json
    "spellcasting": {
      "caster_type": "Arcane",
      /* ... other properties ... */
    }
    ```

---

## Class Ability Flags

These flags are placed within individual objects in the `abilities` array of a class definition.

### `homebrew`

-   **Type:** `boolean`
-   **Purpose:** Marks a specific class ability or spellcasting rule as a "homebrew" or non-standard rule. When `true`, the UI will display a small homebrew icon next to the ability's name to visually distinguish it from the standard ruleset.
-   **Example:**
    ```json
    "abilities": [
      {
        "name": "Cleave",
        "level": 1,
        "desc": "On melee kill: make 1 extra melee attack...",
        "homebrew": true
      }
    ]
    ```

### `hide_from_list`

-   **Type:** `boolean`
-   **Purpose:** Prevents a specific class ability from being included in the list of abilities printed on the final character sheet PDF. This is primarily used for abilities that explain rules (e.g., how a skill system works) rather than granting a direct, active feature to the character.
-   **Example:**
    ```json
    "abilities": [
      {
        "name": "Skill Progression",
        "level": 1,
        "desc": "Lvl1: 10% all but Climb (25%)...",
        "homebrew": true,
        "hide_from_list": true
      }
    ]
    ```

### `grants_skills` (Legacy)

-   **Type:** `Array<{ skill: 'find_secret_doors' | 'find_traps'; value: number }>`
-   **Purpose:** The original method for granting a dungeoneering skill bonus. While still supported for backward compatibility, the new direct properties are preferred.
-   **Example:**
    ```json
    "abilities": [
      {
        "name": "Detect Construction",
        "level": 1,
        "desc": "2-in-6 stonework features.",
        "grants_skills": [{"skill": "find_secret_doors", "value": 2}]
      }
    ]
    ```

### `find-secret-door-value` / `find-room-trap-value` (Recommended)

-   **Type:** `number` (typically 2-5)
-   **Purpose:** The new, simpler method for granting a dungeoneering skill bonus (X-in-6). The application will take the highest value between a character's racial bonus and any bonuses from their class abilities.
-   **Example:**
    ```json
    "abilities": [
      {
        "name": "Dungeon Sense",
        "level": 1,
        "desc": "You are adept at spotting hidden dangers.",
        "find-secret-door-value": 2,
        "find-room-trap-value": 2
      }
    ]
    ```