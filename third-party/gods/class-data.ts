import type { SavingThrowRange } from '../../types';

export const CLASS_TITLES = {
    "Savage": ["Youth", "Hunter", "Warrior", "Raider", "Berserker", "Champion", "Warlord", "Conqueror", "Savage Lord/Lady"],
};
export const SPELL_SLOTS_DATA = { classes: {} };
export const XP_DATA = {
    "Savage": { "xp_to_level": [0,2500,5000,10000,20000,40000,80000,160000,320000], "per_level_after_9": 160000 },
};
export type SaveData = { saves_by_level_ranges: SavingThrowRange[] } | { alias_of: string };
export const SAVING_THROWS_DATA: Record<string, SaveData> = {
    "Savage": { "alias_of": "Fighter" },
};
export const ATTACK_DATA = { 
    progressions: {}, 
    classes: {
        "Savage": "Martial" as const,
    } 
};
export const SUPPLEMENTAL_CLASS_DATA = {
    'Savage': { 
        startingWealth: '2d4 * 10', 
        moneyGroup: 'Martial' as const,
        features: { racialHpDie: 6 }
    },
};