# Weighted & Deterministic Systems

This document explains the underlying logic for systems in the generator that use weighted randomness or deterministic calculations to produce results. It is intended to provide transparency and allow users to reverse-engineer the application's behavior.

## 1. Character Lifestyle Determination

The character's "Life Before Adventuring" is the result of a multi-stage deterministic and probabilistic process. It begins with a baseline lifestyle from their chosen profession, which is then advanced through a series of tiers, each with its own attribute requirements and chances of success or failure. This system creates a rich, narrative-driven background that influences both AI-generated traits and the character's portrait.

### The Process

**Step 1: Establish a Baseline**
Each profession has a pre-defined baseline lifestyle, representing the typical starting point for that trade (e.g., Farmer starts as `Poor`, Jeweller as `Wealthy`).

**Step 2: Tier-by-Tier Advancement**
The system attempts to advance the character's lifestyle one tier at a time, starting from their baseline. The process stops as soon as a requirement is not met or an advancement roll fails.

The rules for advancing from one tier to the next are as follows:

| From Tier | To Tier | Requirements | Advancement Chance | Failure Event Description |
| :--- | :--- | :--- | :--- | :--- |
| **Wretched** | Squalid | None | 60% (40% fail) | A brutal, unforgiving event (e.g., severe illness, violent robbery, press-ganged). |
| **Squalid** | Poor | None | 80% (20% fail) | A brutal, unforgiving event (e.g., evicted into the streets, betrayed by fellow vagrants). |
| **Poor** | Modest | `INT 11+` **or** `WIS 11+` | 100% | *(No chance of failure if requirements are met)* |
| **Modest** | Comfortable | `INT 9+` **and** `WIS 11+` | 85% (15% fail) | An unfortunate event (e.g., a bad harvest, a robbery, a local plague). |
| **Comfortable**| Wealthy | `INT 13+` **and** `WIS 13+` | 60% (40% fail) | A significant setback (e.g., a major business deal fails, robbed of life savings, political trouble). |
| **Wealthy** | Aristocratic | `INT 16+` **and** `WIS 13+` | 15% (85% fail) | A catastrophic event (e.g., house burned down, family disowned, exiled). |


**Step 3: AI Narrative Generation with Failure Context**
The character's final calculated lifestyle, along with their core ability scores (WIS, INT, CHA), is passed to the Gemini AI.

- If the character's progression was stopped by a **failed advancement roll**, the AI is explicitly told which tier they failed to reach and the *type* of unfortunate event that caused it. The AI then incorporates this failure into the "Life Before Adventuring" sentence.
- The AI still uses the WIS/INT/CHA scores to determine the overall tone of the character's career (skilled, wealthy, respected, etc.), as detailed in the next section.

#### Example Walkthrough

1.  **Character:** A Fighter with **INT 14**, **WIS 14**, **CHA 8**.
2.  **Profession Roll:** They roll **"Farmer"**.
3.  **Baseline:** The baseline lifestyle for a Farmer is **`Poor`**.
4.  **Advancement from `Poor` to `Modest`:**
    - **Requirement:** INT 11+ or WIS 11+. The character meets this.
    - **Chance:** 100% success.
    - **Current Lifestyle:** `Modest`.
5.  **Advancement from `Modest` to `Comfortable`:**
    - **Requirement:** INT 9+ and WIS 11+. The character has INT 14 and WIS 14, so they meet the requirement.
    - **Chance:** 85% success. A roll is made: `Math.random()` yields `0.35`. This is a **success**.
    - **Current Lifestyle:** `Comfortable`.
6.  **Advancement from `Comfortable` to `Wealthy`:**
    - **Requirement:** INT 13+ and WIS 13+. The character meets this.
    - **Chance:** 60% success. A roll is made: `Math.random()` yields `0.72`. This is a **failure**.
7.  **Final Outcome:**
    - The character's final lifestyle is **`Comfortable`**.
    - The AI is told that the character **failed to become `Wealthy` due to a "unfortunate" setback**.
    - The AI is also told the character was skilled (WIS 14), wealthy for their station (INT 14), but disliked (CHA 8).
8.  **AI Generated Output:** *"Though his sharp mind and keen instincts made his farm more productive than any in the valley, a devastating blight one year wiped out his profits and shattered his ambitions of a more comfortable life, a failure made worse by the fact that none of his resentful neighbors would help."*

---

### AI Narrative Generation (Core Abilities)

The AI is instructed to synthesize the character's ability scores into a single, evocative sentence about their past career, using the following framework:

| Ability Score | Interpretation for the AI |
| :--- | :--- |
| **Wisdom (WIS)** | Determines **Skill & Success**. A high score (13+) means the character was skilled, successful, and made wise decisions. A low score (8-) implies they were unskilled, clumsy, or made poor choices. |
| **Intelligence (INT)**| Determines **Wealth & Innovation**. A high score (13+) means the character likely became wealthier than their lifestyle suggests, perhaps through clever business deals or innovation. A low score (8-) implies they struggled financially or mismanaged their earnings. |
| **Charisma (CHA)**| Determines **Reputation & Relationships**. A high score (13+) means they were well-liked and respected by peers and clients. A low score (8-) implies they were disliked, infamous, or had a poor reputation. |

This system ensures that a character's core stats have a direct and meaningful impact on their generated backstory.

---

## 2. Grog Equipment Selection

The Grog (a Level 1 Fighter hireling) is equipped using a weighted-random system designed to provide cheap but logical gear based on their rolled ability scores.

### Armor Selection

The Grog's armor is chosen from a pool of cheap options using a weighted probability based on **inverse cost**. This makes cheaper, more common armor more likely to be selected.

- **Eligible Armor Pool:** `Leather` (20 gp), `Chainmail` (40 gp)
- **Weighting Formula:** `Weight = 1 / (Cost + 1)`
    - *Adding 1 to the cost prevents division-by-zero for free items and ensures they have a high weight.*

| Armor | Cost (gp) | Calculation | Weight | Probability |
| :--- | :--- | :--- | ---:| ---:|
| Leather | 20 | `1 / (20 + 1)` | 0.0476 | ~66.7% |
| Chainmail | 40 | `1 / (40 + 1)` | 0.0244 | ~33.3% |
| **Total** | | | **0.0720** | **100%** |

### Melee Weapon Selection

The weapon selection logic changes based on the Grog's Strength score.

#### Case 1: Standard Grog (Strength ≤ 10)

For weaker Grogs, the weapon is chosen using the same **inverse cost** model as the armor, making cheaper weapons more probable.

- **Eligible Weapon Pool:** Any melee weapon costing less than 20 gp.
- **Weighting Formula:** `Weight = 1 / (Cost + 1)`

| Weapon | Cost (gp) | Weight | Probability |
| :--- | :--- | ---:| ---:|
| Club | 3 | 0.250 | ~26.7% |
| Dagger | 3 | 0.250 | ~26.7% |
| Spear | 3 | 0.250 | ~26.7% |
| Hand axe | 4 | 0.200 | ~21.4% |
| Mace | 5 | 0.167 | ~17.8% |
| War hammer | 5 | 0.167 | ~17.8% |
| Battle axe | 7 | 0.125 | ~13.3% |
| Short sword | 7 | 0.125 | ~13.3% |
| Sword | 10 | 0.091 | ~9.7% |
| Two-handed sword | 15 | 0.063 | ~6.7% |

*(Note: Probabilities are approximate as they are derived from a larger pool of items in the code)*

#### Case 2: Strong Grog (Strength ≥ 11)

For stronger Grogs, the weighting system prioritizes weapons that are heavier and deal more damage.

- **Base Weight Formula:** `Base Weight = (Damage Die Size * 2) + (Item Weight in cn / 20)`
- **Strength Multiplier Formula:**
    - **STR 11-12:** `x2` for d8+ weapons, `x1.5` for d6 weapons.
    - **STR 13+:** `x4` for d8+ weapons, `x2` for d6 weapons.
- **Final Weight Formula:** `Final Weight = Base Weight * Strength Multiplier`

| Weapon | Damage | Item Weight (cn) | Base Weight | Final Weight (STR 11-12) | Final Weight (STR 13+) |
|:---|---:|---:|---:|---:|---:|
| **d4 Weapons** | | | | | |
| Club | 4 | 50 | 10.5 | 10.5 | 10.5 |
| Dagger | 4 | 10 | 8.5 | 8.5 | 8.5 |
| **d6 Weapons** | | | | | |
| Hand axe | 6 | 30 | 13.5 | 20.25 | 27.0 |
| Mace | 6 | 30 | 13.5 | 20.25 | 27.0 |
| Short sword | 6 | 30 | 13.5 | 20.25 | 27.0 |
| Spear | 6 | 30 | 13.5 | 20.25 | 27.0 |
| War hammer | 6 | 30 | 13.5 | 20.25 | 27.0 |
| **d8 Weapons** | | | | | |
| Battle axe | 8 | 50 | 18.5 | 37.0 | 74.0 |
| Sword | 8 | 60 | 19.0 | 38.0 | 76.0 |
| **d10 Weapons** | | | | | |
| Two-handed sword | 10 | 150 | 27.5 | 55.0 | 110.0 |

As the table shows, a Grog with 13+ Strength is significantly more likely to spawn with a d10 or d8 weapon than a weaker one.

### Shield and Ranged Weapon

- **Shield:** The Grog has a simple **50% chance** of being equipped with a shield.
- **Ranged Weapon:** If the Grog's Dexterity is 9 or higher, they have a chance to also carry a cheap ranged weapon.
    - **Chance Formula:** `Chance = min(0.95, 0.25 + (DEX - 9) * 0.175)`

| Dexterity | Calculation | Chance to have Ranged Weapon |
| :--- | :--- | ---:|
| 9 | `0.25 + (0 * 0.175)` | 25% |
| 10 | `0.25 + (1 * 0.175)` | 42.5% |
| 11 | `0.25 + (2 * 0.175)` | 60% |
| 12 | `0.25 + (3 * 0.175)` | 77.5% |
| 13+ | `0.25 + (4 * 0.175)` | 95% (Capped) |

If the check succeeds, a ranged weapon is chosen from a pool of cheap missile weapons using the standard **inverse cost** weighting.