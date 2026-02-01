import type { SavingThrowRange } from '../../types';

export const CLASS_TITLES = {};
export const SPELL_SLOTS_DATA = { classes: {} };
export const XP_DATA = {
    "Grimalkin": { "xp_to_level": [0,1500,3000,6000,12000,24000,48000,96000,192000, 280000], "per_level_after_9": null },
};
export type SaveData = { saves_by_level_ranges: SavingThrowRange[] } | { alias_of: string };
export const SAVING_THROWS_DATA: Record<string, SaveData> = {
    "Grimalkin": { "alias_of": "Halfling" },
};
export const ATTACK_DATA = { 
    progressions: {}, 
    classes: {
        "Grimalkin": "SemiMartial" as const,
    } 
};
export const SUPPLEMENTAL_CLASS_DATA = {
    'Grimalkin': { startingWealth: '2d6 * 10', moneyGroup: 'Skill' as const },
};
