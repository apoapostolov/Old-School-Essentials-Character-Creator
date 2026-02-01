import type { SavingThrowRange } from '../../types';

export const CLASS_TITLES = {
    "Traladaran Witch": ["Apprentice", "Charmer", "Hedge-Witch", "Soothsayer", "Crone", "Mystic", "Witch", "High Witch", "Matriarch"],
};
export const SPELL_SLOTS_DATA = { 
    classes: {
        "Traladaran Witch": { "slots_by_level": { "1":  [1,2,2,3,4,4,4,4,4,4,4,4], "2":  [0,0,1,2,2,3,3,3,3,3,3,3], "3":  [0,0,0,0,1,2,2,3,3,3,3,3], "4":  [0,0,0,0,0,0,1,2,2,2,2,2], "5":  [0,0,0,0,0,0,0,0,1,2,2,2] } },
    }
};
export const XP_DATA = {
    "Traladaran Witch": { "xp_to_level": [0,2250,4500,9000,18000,36000,72000,144000,288000], "per_level_after_9": 140000 },
};
export type SaveData = { saves_by_level_ranges: SavingThrowRange[] } | { alias_of: string };
export const SAVING_THROWS_DATA: Record<string, SaveData> = {
    "Traladaran Witch": { "alias_of": "Magic-User" },
};
export const ATTACK_DATA = { 
    progressions: {}, 
    classes: {
        "Traladaran Witch": "NonMartial" as const,
    } 
};
export const SUPPLEMENTAL_CLASS_DATA = {
    'Traladaran Witch': { startingWealth: '2d6 * 10', moneyGroup: 'Casters' as const },
};
