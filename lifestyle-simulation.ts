// lifestyle-simulation.ts
// FIX: Import the `Ability` enum to correctly type the keys for the `Pick` utility.
import type { LifestyleKey, AbilityScores, Ability } from './types';

/**
 * Defines the rules for advancing from one lifestyle tier to the next.
 */
interface AdvancementRule {
    // A function that returns true if the character meets the attribute requirements to attempt advancement.
    requirements: (scores: { Intelligence: number; Wisdom: number }) => boolean;
    // The chance of successfully advancing (e.g., 0.8 for 80%).
    successChance: number;
    // The type of narrative event the AI should generate upon failure.
    failureType: 'brutal' | 'unfortunate';
}

/**
 * A record mapping each lifestyle tier to the rules required to advance FROM it.
 * This is the central configuration for balancing the lifestyle system.
 */
const LIFESTYLE_ADVANCEMENT_RULES: Partial<Record<LifestyleKey, AdvancementRule>> = {
    'Wretched': {
        requirements: () => true,
        successChance: 0.60, // 40% fail
        failureType: 'brutal'
    },
    'Squalid': {
        requirements: () => true,
        successChance: 0.80, // 20% fail
        failureType: 'brutal'
    },
    'Poor': {
        requirements: ({ Intelligence, Wisdom }) => Intelligence >= 11 || Wisdom >= 11,
        successChance: 1.0, // No chance of failure if requirements met
        failureType: 'unfortunate' // Not applicable, but defined for consistency
    },
    'Modest': {
        requirements: ({ Intelligence, Wisdom }) => Intelligence >= 9 && Wisdom >= 11,
        successChance: 0.85, // 15% fail
        failureType: 'unfortunate'
    },
    'Comfortable': {
        requirements: ({ Intelligence, Wisdom }) => Intelligence >= 13 && Wisdom >= 13,
        successChance: 0.60, // 40% fail
        failureType: 'unfortunate'
    },
    'Wealthy': {
        requirements: ({ Intelligence, Wisdom }) => Intelligence >= 16 && Wisdom >= 13,
        successChance: 0.15, // 85% fail
        failureType: 'unfortunate'
    }
};

const LIFESTYLE_TIERS: LifestyleKey[] = ['Wretched', 'Squalid', 'Poor', 'Modest', 'Comfortable', 'Wealthy', 'Aristocratic'];

interface LifestyleCalculationResult {
    finalLifestyleKey: LifestyleKey;
    failureEvent: { tier: LifestyleKey, type: 'brutal' | 'unfortunate' } | null;
}

/**
 * Calculates a character's final lifestyle based on a tiered advancement system.
 * @param baseLifestyleKey The character's starting lifestyle from their profession.
 * @param scores The character's ability scores (INT and WIS are used).
 * @returns An object with the final lifestyle key and any failure event that occurred.
 */
export const calculateFinalLifestyle = (
    baseLifestyleKey: LifestyleKey,
    // FIX: Use enum members for Pick to satisfy the type constraint, as the keys of AbilityScores are of type `Ability`.
    scores: Pick<AbilityScores, Ability.Intelligence | Ability.Wisdom>
): LifestyleCalculationResult => {

    let currentLifestyleKey: LifestyleKey = baseLifestyleKey;
    let failureEvent: { tier: LifestyleKey, type: 'brutal' | 'unfortunate' } | null = null;

    while (currentLifestyleKey !== 'Aristocratic') {
        const currentTierIndex = LIFESTYLE_TIERS.indexOf(currentLifestyleKey);
        // Stop if at the top or something went wrong
        if (currentTierIndex === -1 || currentTierIndex + 1 >= LIFESTYLE_TIERS.length) break;

        const rule = LIFESTYLE_ADVANCEMENT_RULES[currentLifestyleKey];
        // Stop if there's no rule for advancing from the current tier
        if (!rule) break;

        const nextTier = LIFESTYLE_TIERS[currentTierIndex + 1];

        // 1. Check if the character meets the requirements to even attempt advancement.
        if (!rule.requirements(scores)) {
            break; // Cannot advance further
        }

        // 2. Roll to see if the advancement attempt is successful.
        if (Math.random() < rule.successChance) {
            currentLifestyleKey = nextTier; // Success! Move to the next tier.
        } else {
            // Failure. Record the event and stop the advancement process.
            failureEvent = { tier: currentLifestyleKey, type: rule.failureType };
            break;
        }
    }

    return {
        finalLifestyleKey: currentLifestyleKey,
        failureEvent,
    };
};