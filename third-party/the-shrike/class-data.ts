import type { SavingThrowRange } from '../../types';

export const CLASS_TITLES = {
    "Wayfarer": ["Swab", "Deckhand", "Boatswain", "Harpooner", "First Mate", "Old Salt", "Captain", "Master Mariner", "Lord of the Tides"],
    "Tide-Priest": ["Chum", "Wave-Caller", "Fog-Walker", "Tide-Priest", "Abyssal Seer", "Kraken-Sworn", "High Tide-Priest", "Master of the Deeps", "Voice of the Ocean"],
};
export const SPELL_SLOTS_DATA = { 
    classes: {
        "Tide-Priest": { "slots_by_level": { "1":  [0,1,2,2,3,3,4,4,5,5,6,6,6,6], "2":  [0,0,0,1,2,2,3,3,4,4,5,5,5,5], "3":  [0,0,0,0,0,1,2,2,3,3,4,4,4,4], "4":  [0,0,0,0,0,0,0,1,2,2,3,3,3,3], "5":  [0,0,0,0,0,0,0,0,0,1,2,2,2,2] } },
    }
};
export const XP_DATA = {
    "Wayfarer": { "xp_to_level": [0,1400,2800,5600,11200,22500,45000,90000,180000], "per_level_after_9": 100000 },
    "Tide-Priest": { "xp_to_level": [0,1500,3000,6000,12000,25000,50000,100000,200000], "per_level_after_9": 100000 },
};
export type SaveData = { saves_by_level_ranges: SavingThrowRange[] } | { alias_of: string };
export const SAVING_THROWS_DATA: Record<string, SaveData> = {
    "Wayfarer": { "alias_of": "Thief" },
    "Tide-Priest": { "alias_of": "Cleric" },
};
export const ATTACK_DATA = { 
    progressions: {}, 
    classes: {
        "Wayfarer": "SemiMartial" as const,
        "Tide-Priest": "SemiMartial" as const,
    } 
};
export const SUPPLEMENTAL_CLASS_DATA = {
    'Wayfarer': { startingWealth: '3d6 * 10', moneyGroup: 'Skill' as const },
    'Tide-Priest': { startingWealth: '3d6 * 10', moneyGroup: 'Casters' as const },
};