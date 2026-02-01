# Starting Spell System

This document outlines the system used in the application for determining the starting spells for a new Level 1 spellcasting character. The system is designed to be flexible, data-driven, and provide player agency while introducing an element of fate.

## System Types

There are two main types of spellcasters, determined by flags in their class data:

1.  **Innate Knowledge Casters (`knowsAllSpells: true`)**
    - **Applies to:** Classes like Cleric, Druid, Paladin, Ranger.
    - **Mechanic:** These characters are considered to know all spells available to them for every spell level they can cast. They do not go through the random spell selection process. Their spell list is a matter of daily preparation from a wider pool of divine knowledge.

2.  **Studious Casters (`randomStartingSpell: true`)**
    - **Applies to:** Classes like Magic-User, Elf, Illusionist, and other custom classes who learn spells one by one.
    - **Mechanic:** These characters begin their career knowing only a single spell. This spell is determined through a three-step process designed to give the player choice.

## The Random Spell Process

For classes with the `randomStartingSpell` flag, the process is as follows:

### 1. Spell Selection

The user is presented with the complete list of available Level 1 spells for their chosen class. They must select exactly **four** spells to create a "pool" of their favorites. They cannot proceed until four spells are chosen.

### 2. Random Determination

Once four spells are selected, the "Determine Starting Spell" button becomes active. When clicked, the application performs a random roll (1d4) to select one of the four spells from the player's pool.

### 3. Finalizing the Spell

After the roll, the application displays the randomly determined spell. The player is then given a final choice:
- **Keep this Spell:** Finalizes the rolled spell as their character's known spell.
- **Take "[Default Spell]" Instead:** Discards the rolled spell and finalizes the class's pre-defined default spell as their known spell.

Once a spell is finalized, the process is complete, and the character's known spell is locked in.

## Data-Driven Configuration

This entire system is controlled by the `spellcasting` object within each class's data file.

-   `"knowsAllSpells": true`: Designates the class as an Innate Knowledge Caster.
-   `"randomStartingSpell": true`: Designates the class as a Studious Caster and activates the random selection process.
-   `"default_spell": "Spell Name"`: This field is **required** for any class with `randomStartingSpell: true`. It specifies the fallback spell offered to the player if they dislike the randomly rolled result.

This approach ensures that any third-party or custom class can easily be configured to use the appropriate starting spell system without changing any application code.
