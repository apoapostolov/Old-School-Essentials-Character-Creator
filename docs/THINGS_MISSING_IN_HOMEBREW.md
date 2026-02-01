# Addendum: Implemented & Application-Specific Rules

This document serves as an addendum to the main `OSE_HOUSE_RULES.md` file. It details the specific rules, systems, and mechanics that have been implemented directly into this application. These rules either expand upon, clarify, or supersede the base homebrew document to create a more dynamic and integrated character generation experience.

## I. Character Creation & Stats

### Ability Score Adjustments

After rolling your initial 3d6 for each ability score, you have the option to fine-tune your character's stats. This system works as follows:

-   **Gaining Adjustment Points:** You may decrease any ability score by 2 points to gain 1 Adjustment Point. An ability score cannot be lowered below 4.
-   **Spending Adjustment Points:** You may spend 1 Adjustment Point to increase any ability score by 1 point. An ability score cannot be raised above 18.

This system allows for strategic modification of a random roll to better meet class requirements or flesh out a character concept, while still preserving the old-school spirit of working with the stats you're given.

### Race as a Separate Choice (Not Race-as-Class)

This generator separates Race from Class, a significant departure from the traditional OSE "Race-as-Class" model for demihumans.

1.  **Race Selection:** You first choose a Race (e.g., Human, Elf, Dwarf).
2.  **Ability Modifiers:** Your chosen race may apply modifiers to your ability scores (e.g., Dwarves gain +1 CON and -1 CHA). These modified scores are used to determine class eligibility.
3.  **Racial Features:** Each race has a unique set of features and abilities.
4.  **Class Restrictions & Level Caps:** Your chosen race dictates which classes you are eligible for and imposes a maximum level you can attain in those classes. This is automatically calculated and displayed, with ineligible classes marked as "Restricted".

### Literacy

The application uses a simple, deterministic rule for literacy, replacing the need for a specific skill:

-   A character with an **Intelligence score of 9 or higher** is considered **Literate**.
-   A character with an **Intelligence score of 8 or lower** is **Illiterate**.

## II. Character Progression & Advancement

### Hit Points on Level Up

To increase character survivability and reduce the frustration of low rolls, the following house rules are applied when rolling Hit Dice upon gaining a level:

-   **General Rule:** For all classes, if you roll a 1 or a 2 on your Hit Die, you may reroll that die once. You must keep the second result.
-   **Dwarf Hardy Growth:** The Dwarf class has a special feature that builds upon this. They roll their Hit Die twice and take the higher of the two results. They may still use the general rule to reroll any individual die that results in a 1 or a 2.

### Wealth on Level Up

To ensure characters have the means to upgrade their equipment as they advance, the application includes a system for gaining a "purse" of gold upon reaching levels 2, 3, 4, and 5. This is in addition to any treasure found during adventures.

-   **Money Groups:** Each class is assigned to a `moneyGroup` which determines the size of the dice rolled for their purse (e.g., `Casters` roll d4s and d6s, while `Prestige Martial` classes roll d6s and d8s).
-   **Prime Requisite Modifier:** The number of dice rolled is modified by the character's highest Prime Requisite score:
    -   A score of **16 or higher** grants **+1 die**.
    -   A score of **8 or lower** imposes a penalty of **-1 die** (to a minimum of 1 die).
-   **Safeguards:** To ensure fairness, there is a minimum floor (20 gp) and a maximum ceiling (10 x Level x 100 gp) for any purse roll.

## III. Specialized Systems

### Detailed Class Skill Systems (Point-Buy)

For the five skill-based classes (Thief, Acrobat, Barbarian, Ranger, Bard), the application uses specific, data-driven point-buy systems for skill progression. While the core concepts are outlined in the house rules, the exact progression rates, allocation rules, and skill caps are implemented as detailed in the separate `SKILL_SYSTEM_DOCUMENTATION.md`. This ensures a balanced and predictable progression for these specialized classes.

### Grog Hireling Specifics

The Grog hireling provided to certain spellcasting classes has the following specific mechanics implemented in the application:

-   **HP Calculation:** A Grog's Hit Points are more robust than a standard 1 HD creature. They are calculated as: **1d4 (racial HP) + 1d8 (Fighter HD) + CON modifier**. Unlike player characters, a Grog does *not* reroll a 1 or 2 on their Fighter HD.
-   **Equipment Generation:** The Grog's equipment is generated using a weighted-random system to create a logical and thematic loadout:
    -   **Armor:** Chosen from cheap armors, weighted by inverse cost (cheaper armor is more common).
    -   **Melee Weapon:** Chosen based on Strength. Grogs with **STR 10 or lower** are more likely to get cheaper weapons. Grogs with **STR 11 or higher** are weighted to receive heavier, more damaging weapons.
    -   **Shield:** A Grog has a **50% chance** of being equipped with a shield.
    -   **Ranged Weapon:** A Grog with **Dexterity 9 or higher** has a scaling chance (from 25% at DEX 9 to 95% at DEX 13+) of also carrying a cheap ranged weapon.

## IV. Magic & Spells

### Bonus Spell Slots

Divine and Arcane spellcasters may gain bonus spell slots based on their primary spellcasting ability score (Wisdom for Divine, Intelligence for Arcane). The specific progression is as follows:

| Ability Score | Bonus Spells Granted |
| :--- | :--- |
| **1-12** | None |
| **13-15** | 1 bonus 1st-level spell |
| **16-17** | 2 bonus 1st-level spells |
| **18+** | 2 bonus 1st-level spells and 1 bonus 2nd-level spell |

## V. General Mechanics

### Default Dungeoneering Chances

While not explicitly stated in the core house rules, the application assumes the standard OSE baseline for dungeoneering tasks for all characters, which can then be improved by class features or skills.

-   **Listen at Doors:** 1-in-6 chance.
-   **Find Secret Doors (when searching):** 1-in-6 chance.
-   **Find Room Traps (when searching):** 1-in-6 chance.
-   **Open Stuck Doors:** 1-in-6 chance.

Classes like the Thief, Ranger, or Elf may have abilities that replace or enhance these base chances.

### Encumbrance System (Detailed)

This generator uses a simplified, detailed encumbrance system based on flat coin weight (cn) values, which is then modified by a character's Strength score. This replaces more complex systems with a clear set of thresholds that determine movement speed.

#### Base Encumbrance Thresholds

The system is based on four tiers of encumbrance, each with a corresponding movement rate:

| Encumbrance (cn) | Movement Rate |
| :--- | :--- |
| Up to **400 coins** | 120' (40') |
| Up to **600 coins** | 90' (30') |
| Up to **800 coins** | 60' (20') |
| Up to **1,600 coins**| 30' (10') |

Carrying weight above 1,600 coins results in being **Overburdened** (0' movement).

#### Strength Modifiers

A character's Strength score applies a percentage modifier to the first three thresholds (**400**, **600**, and **800** coins). The final threshold of **1,600** coins is an absolute maximum and is never modified by Strength.

| Strength Score | Threshold Modifier | Description |
| :--- | :--- | :--- |
| **18+** | +50% | A mighty hero, capable of carrying immense loads. |
| **16-17** | +30% | A very strong individual, well above average. |
| **13-15** | +15% | A strong individual, noticeably more capable. |
| **8-12** | +0% | Average strength with no modifier. |
| **5-7** | -25% | A weaker individual who struggles with heavy loads. |
| **4 or lower** | -40% | A frail individual, severely limited in carrying capacity. |

**Example:** A character with a Strength of 16 (+30% modifier) would have the following modified thresholds:
-   **120' Movement:** Up to 520 cn (400 * 1.3)
-   **90' Movement:** Up to 780 cn (600 * 1.3)
-   **60' Movement:** Up to 1,040 cn (800 * 1.3)
-   **30' Movement:** Up to 1,600 cn (unchanged)

This system makes Strength a valuable attribute for all characters, directly impacting their logistical capabilities on an adventure.