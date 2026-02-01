import type { SavingThrowRange } from '../../types';

export const CLASS_TITLES = {
    "Skald": ["Word-Smith", "Rhymer", "Griot", "Skald", "Lore-Keeper", "Saga-Spiller", "King's Voice", "Master Skald", "Jarl of Songs"],
    "Shield Maiden": ["Shield-Sworn", "Axe-Sister", "Spear-Daughter", "Shield Maiden", "Huscarl", "Jarl's Guard", "Einherjar", "Valkyrie", "Shield Queen"],
};
export const SPELL_SLOTS_DATA = { classes: {} };
export const XP_DATA = {
    "Skald": { "xp_to_level": [0,1800,3600,7200,15000,30000,60000,120000,240000], "per_level_after_9": 120000 },
    "Shield Maiden": { "xp_to_level": [0,2000,4000,8000,16000,32000,64000,120000,240000], "per_level_after_9": 120000 },
};
export type SaveData = { saves_by_level_ranges: SavingThrowRange[] } | { alias_of: string };
export const SAVING_THROWS_DATA: Record<string, SaveData> = {
    "Skald": { "alias_of": "Thief" },
    "Shield Maiden": { "alias_of": "Fighter" },
};
export const ATTACK_DATA = { 
    progressions: {}, 
    classes: {
        "Skald": "SemiMartial" as const,
        "Shield Maiden": "Martial" as const,
    } 
};
export const SUPPLEMENTAL_CLASS_DATA = {
    'Skald': { startingWealth: '3d6 * 10', moneyGroup: 'Skill' as const },
    'Shield Maiden': { startingWealth: '4d6 * 10', moneyGroup: 'Martial' as const },
};