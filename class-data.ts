import type { AttackBonusProgressionRange, SavingThrowRange } from './types';

// --- DATA SOURCES (Retained for progression, savings throws, etc.) ---

export const CLASS_TITLES: Record<string, string[]> = {
  "Acrobat": ["Apprentice", "Tumbler", "Jumper", "Gymnast", "Vaulter", "Leaper", "Aerialist", "Acrobat", "Master Acrobat"],
  "Assassin": ["Bravo", "Rutterkin", "Waghalter", "Murderer", "Thug", "Killer", "Cutthroat", "Executioner", "Assassin"],
  "Barbarian": ["Hunter", "Huntsmaster/Huntsmistress", "Barbarian Warrior", "Barbarian Hero", "Berserker", "Barbarian Champion", "Horde Master/Mistress", "Conqueror", "Barbarian Lord/Lady"],
  "Bard": ["Rhymer", "Lyricist", "Sonnateer", "Skald", "Troubadour", "Minstrel", "Muse", "Lorist", "Bard"],
  "Cleric": ["Acolyte", "Adept", "Priest/Priestess", "Vicar", "Curate", "Elder", "Bishop", "Lama", "Patriarch/Matriarch"],
  "Drow": ["Acolyte/Veteran", "Adept/Warrior", "Priest/Priestess/Swordmaster", "Vicar/Hero", "Curate/Swashbuckler", "Elder/Myrmidon", "Bishop/Champion", "Lama/Superhero", "Patriarch/Matriarch/Lord/Lady"],
  "Druid": ["Aspirant", "Ovate", "Initiate of the 1st Circle", "Initiate of the 2nd Circle", "Initiate of the 3rd Circle", "Initiate of the 4th Circle", "Initiate of the 5th Circle", "Initiate of the 6th Circle", "Druid"],
  "Duergar": ["Skulk", "Prowler", "Scavenger", "Warden", "Mentalist", "Kineticist", "Vanisher", "Duergar Champion", "Duergar Lord/Lady"],
  "Dwarf": ["Dwarven Veteran", "Dwarven Warrior", "Dwarven Swordmaster", "Dwarven Hero", "Dwarven Swashbuckler", "Dwarven Myrmidon", "Dwarven Champion", "Dwarven Superhero", "Dwarven Lord/Lady"],
  "Elf": ["Medium/Veteran", "Seer/Warrior", "Conjurer/Swordmaster", "Magician/Hero", "Enchanter/Enchantress/Swashbuckler", "Warlock/Witch/Myrmidon", "Sorcerer/Sorceress/Champion", "Necromancer/Superhero", "Wizard/Lord/Lady"],
  "Fighter": ["Veteran", "Warrior", "Swordmaster", "Hero", "Swashbuckler", "Myrmidon", "Champion", "Superhero", "Lord/Lady"],
  "Gnome": ["Gnomish Veteran", "Gnomish Warrior", "Gnomish Swordmaster", "Gnomish Hero", "Gnomish Swashbuckler", "Gnomish Myrmidon", "Gnomish Champion", "Gnomish Superhero", "Gnomish Lord/Lady"],
  "Half-Elf": ["Medium/Veteran", "Seer/Warrior", "Conjurer/Swordmaster", "Magician/Hero", "Enchanter/Enchantress/Swashbuckler", "Warlock/Witch/Myrmidon", "Sorcerer/Sorceress/Champion", "Necromancer/Superhero", "Wizard/Lord/Lady"],
  "Halfling": ["Halfling Veteran", "Halfling Warrior", "Halfling Swordmaster", "Halfling Hero", "Halfling Swashbuckler", "Halfling Myrmidon", "Halfling Champion", "Halfling Superhero", "Halfling Lord/Lady"],
  "Half-Orc": ["Bravo", "Rutterkin", "Waghalter", "Murderer", "Thug", "Killer", "Cutthroat", "Executioner", "Half-Orc Lord/Lady"],
  "Illusionist": ["Prestidigitator", "Minor Trickster", "Trickster", "Illusionist", "Master Trickster", "Phantasmist", "Visionist", "Mirrormage", "Grand Illusionist"],
  "Knight": ["Squire", "Gallant", "Cavalier", "Knight", "Knight Errant", "Knight Banneret", "Knight Commander", "Knight Champion", "Knight Lord/Lady"],
  "Magic-User": ["Medium", "Seer", "Conjurer", "Magician", "Enchanter/Enchantress", "Warlock/Witch", "Sorcerer/Sorceress", "Necromancer", "Wizard"],
  "Paladin": ["Gallant", "Keeper", "Protector", "Defender", "Champion", "Justicar", "Crusader", "Paladin", "Holy Knight"],
  "Ranger": ["Runner", "Strider", "Scout", "Courser", "Tracker", "Pathfinder", "Guide", "Warden", "Ranger Lord/Lady"],
  "Svirfneblin": ["Svirfneblin Skulk", "Svirfneblin Prowler", "Svirfneblin Scavenger", "Svirfneblin Warden", "Svirfneblin Mentalist", "Svirfneblin Kineticist", "Svirfneblin Vanisher", "Svirfneblin Champion", "Svirfneblin Lord/Lady"],
  "Thief": ["Apprentice", "Footpad", "Robber", "Burglar", "Cutpurse", "Sharper", "Pilferer", "Thief", "Master Thief"],
};

export const SPELL_SLOTS_DATA = {
  "classes": {
    "Cleric": { "slots_by_level": { "1":  [0,1,2,2,3,3,4,4,5,5,6,6,6,6], "2":  [0,0,0,1,2,2,3,3,4,4,5,5,5,5], "3":  [0,0,0,0,0,1,2,2,3,3,4,4,4,4], "4":  [0,0,0,0,0,0,0,1,2,2,3,3,3,3], "5":  [0,0,0,0,0,0,0,0,0,1,2,2,2,2] } },
    "Drow": { "slots_by_level": { "1":  [1,2,2,3,3,4,4,5,5,6], "2":  [0,0,1,2,2,3,3,4,4,5], "3":  [0,0,0,0,1,2,2,3,3,4], "4":  [0,0,0,0,0,0,1,2,2,3], "5":  [0,0,0,0,0,0,0,0,1,2] } },
    "Druid": { "slots_by_level": { "1":  [1,2,2,3,3,4,4,5,5,6,6,6,6,6], "2":  [0,0,1,2,2,3,3,4,4,5,5,5,5,5], "3":  [0,0,0,0,1,2,2,3,3,4,4,4,4,4], "4":  [0,0,0,0,0,0,1,2,2,3,3,3,3,3], "5":  [0,0,0,0,0,0,0,0,1,2,2,2,2,2] } },
    "Elf": { "slots_by_level": { "1": [1,2,2,2,2,2,3,3,3,3], "2": [0,0,1,2,2,2,2,3,3,3], "3": [0,0,0,0,1,2,2,2,3,3], "4": [0,0,0,0,0,0,1,2,2,3], "5": [0,0,0,0,0,0,0,0,1,2] } },
    "Gnome": { "slots_by_level": { "1": [1,2,2,2,2,2,3,3], "2": [0,0,1,2,2,2,2,3], "3": [0,0,0,0,1,2,2,2], "4": [0,0,0,0,0,0,1,2] } },
    "Half-Elf": { "slots_by_level": { "1": [0,1,2,2,2,2,2,2,3,3,3,3], "2": [0,0,0,0,1,2,2,2,2,2,2,3], "3": [0,0,0,0,0,0,0,1,1,2,2,2], "4": [0,0,0,0,0,0,0,0,0,0,1,1] } },
    "Magic-User": { "slots_by_level": { "1":  [1,2,2,3,4,4,4,4,4,4,4,4,4,4], "2":  [0,0,1,2,2,3,3,3,3,3,3,3,3,3], "3":  [0,0,0,0,1,2,2,3,3,3,3,3,3,3], "4":  [0,0,0,0,0,0,1,2,2,2,2,2,2,2], "5":  [0,0,0,0,0,0,0,0,1,2,2,2,2,2], "6":  [0,0,0,0,0,0,0,0,0,0,1,2,2,2] } },
    "Illusionist": { "slots_by_level": { "1":  [1,2,2,3,3,4,4,4,4,4,4,4,4,4], "2":  [0,0,1,2,2,2,3,3,3,3,3,3,3,3], "3":  [0,0,0,0,1,2,2,2,3,3,3,3,3,3], "4":  [0,0,0,0,0,0,1,2,2,2,2,2,2,2], "5":  [0,0,0,0,0,0,0,0,1,2,2,2,2,2] } },
    "Paladin": { "slots_by_level": { "1":  [0,0,0,0,0,0,0,0,1,1,1,2,2,2], "2":  [0,0,0,0,0,0,0,0,0,0,1,1,1,1] } },
    "Ranger": { "slots_by_level": { "1":  [0,0,0,0,0,0,0,0,1,1,1,2,2,2], "2":  [0,0,0,0,0,0,0,0,0,0,1,1,1,1] } },
  }
};

export const XP_DATA: Record<string, { xp_to_level: (number | null)[]; per_level_after_9: number | null }> = {
    "Cleric": { "xp_to_level": [0,1500,3000,6000,12000,25000,50000,100000,200000,300000,400000,600000,720000,840000], "per_level_after_9": null },
    "Fighter": { "xp_to_level": [0,2000,4000,8000,16000,32000,64000,120000,240000,360000,480000,600000,720000,840000], "per_level_after_9": null },
    "Magic-User": { "xp_to_level": [0,2500,5000,10000,20000,40000,80000,150000,300000,450000,600000,750000,900000,1050000], "per_level_after_9": null },
    "Thief": { "xp_to_level": [0,1200,2400,4800,9600,20000,40000,80000,160000,280000,400000,520000,640000,760000], "per_level_after_9": null },
    "Dwarf": { "xp_to_level": [0,2200,4400,8800,17000,35000,70000,140000,270000,400000,530000,660000], "per_level_after_9": null },
    "Elf": { "xp_to_level": [0,4000,8000,16000,32000,64000,120000,250000,400000,600000], "per_level_after_9": null },
    "Halfling": { "xp_to_level": [0,2000,4000,8000,16000,32000,64000,120000,240000,360000,500000,650000,800000,950000], "per_level_after_9": null },
    "Acrobat": { "xp_to_level": [0,1200,2400,4800,9600,20000,40000,80000,160000,280000,400000,600000,720000,840000], "per_level_after_9": null },
    "Assassin": { "xp_to_level": [0,1500,3000,6000,12000,25000,50000,100000,200000,300000,425000,575000,750000,900000], "per_level_after_9": null },
    "Barbarian": { "xp_to_level": [0,2500,5000,10000,18500,37000,75000,150000,300000,600000,800000,1000000,1200000,1400000], "per_level_after_9": null },
    "Bard": { "xp_to_level": [0,2000,4000,8000,16000,32000,64000,120000,240000,360000,500000,650000,800000,950000], "per_level_after_9": null },
    "Druid": { "xp_to_level": [0,2000,4000,7500,12500,20000,35000,60000,90000,125000,200000,300000,750000,1500000], "per_level_after_9": null },
    "Illusionist": { "xp_to_level": [0,2500,5000,10000,20000,40000,80000,150000,300000,450000,600000,750000,900000,1050000], "per_level_after_9": null },
    "Knight": { "xp_to_level": [0,2500,5000,10000,18500,37000,85000,140000,270000,400000,530000,660000,790000,920000], "per_level_after_9": null },
    "Paladin": { "xp_to_level": [0,2750,5500,12000,24000,45000,95000,175000,350000,500000,650000,800000,950000,1100000], "per_level_after_9": null },
    "Ranger": { "xp_to_level": [0,2250,4500,10000,20000,40000,90000,150000,300000,425000,550000,675000,800000,925000], "per_level_after_9": null },
    "Gnome": { "xp_to_level": [0,3000,6000,12000,30000,60000,120000,240000], "per_level_after_9": null },
    "Half-Elf": { "xp_to_level": [0,2500,5000,10000,20000,40000,80000,150000,300000,450000,600000,750000], "per_level_after_9": null },
    "Half-Orc": { "xp_to_level": [0,1800,3600,7200,14000,28000,60000,120000], "per_level_after_9": null },
    "Drow": { "xp_to_level": [0,3000,6000,12000,24000,50000,100000,200000,300000,450000,600000,750000,900000,1050000], "per_level_after_9": null },
    "Duergar": { "xp_to_level": [0,2800,5600,11200,23000,46000,100000,200000,300000,400000,500000,600000,700000,800000], "per_level_after_9": null },
    "Svirfneblin": { "xp_to_level": [0,2400,4800,10000,20000,40000,80000,160000], "per_level_after_9": null },
};

export type SaveData = { saves_by_level_ranges: SavingThrowRange[] } | { alias_of: string };
export const SAVING_THROWS_DATA: Record<string, SaveData> = {
    "Cleric": { "saves_by_level_ranges": [ {"levels": "1-4", "D": 11, "W": 12, "P": 14, "B": 16, "S": 15}, {"levels": "5-8", "D": 9,  "W": 10, "P": 12, "B": 14, "S": 12}, {"levels": "9-12","D": 6,  "W": 7,  "P": 9,  "B": 11, "S": 9}, {"levels": "13-14","D": 3,  "W": 5,  "P": 7,  "B": 8,  "S": 7} ] },
    "Fighter": { "saves_by_level_ranges": [ {"levels": "1-3", "D": 12, "W": 13, "P": 14, "B": 15, "S": 16}, {"levels": "4-6", "D": 10, "W": 11, "P": 12, "B": 13, "S": 14}, {"levels": "7-9", "D": 8,  "W": 9,  "P": 10, "B": 10, "S": 12}, {"levels": "10-12","D": 6,  "W": 7,  "P": 8,  "B": 8,  "S": 10}, {"levels": "13-14","D": 4,  "W": 5,  "P": 6,  "B": 5,  "S": 8} ] },
    "Magic-User": { "saves_by_level_ranges": [ {"levels": "1-5", "D": 13, "W": 14, "P": 13, "B": 16, "S": 15}, {"levels": "6-9", "D": 11, "W": 12, "P": 11, "B": 14, "S": 12}, {"levels": "10-12","D": 11, "W": 12, "P": 11, "B": 14, "S": 12}, {"levels": "13-14","D": 8,  "W": 9,  "P": 7,  "B": 10, "S": 8} ] },
    "Thief": { "saves_by_level_ranges": [ {"levels": "1-4", "D": 13, "W": 14, "P": 13, "B": 16, "S": 15}, {"levels": "5-8", "D": 12, "W": 13, "P": 11, "B": 14, "S": 13}, {"levels": "9-12","D": 10, "W": 11, "P": 9,  "B": 12, "S": 10}, {"levels": "13-14","D": 8,  "W": 9,  "P": 7,  "B": 10, "S": 8} ] },
    "Acrobat": { "alias_of": "Thief" }, "Assassin": { "alias_of": "Thief" },
    "Dwarf": { "saves_by_level_ranges": [ {"levels": "1-3", "D": 8,  "W": 9,  "P": 10, "B": 13, "S": 12}, {"levels": "4-6", "D": 6,  "W": 7,  "P": 8,  "B": 10, "S": 10}, {"levels": "7-9", "D": 4,  "W": 5,  "P": 6,  "B": 7,  "S": 8}, {"levels": "10-12","D": 2,  "W": 3,  "P": 4,  "B": 4,  "S": 6} ] },
    "Halfling": { "saves_by_level_ranges": [ {"levels": "1-3", "D": 8,  "W": 9,  "P": 10, "B": 13, "S": 12}, {"levels": "4-6", "D": 6,  "W": 7,  "P": 8,  "B": 10, "S": 10}, {"levels": "7-8", "D": 4,  "W": 5,  "P": 6,  "B": 7,  "S": 8} ] },
    "Half-Elf": { "saves_by_level_ranges": [ {"levels": "1-3", "D": 12, "W": 13, "P": 13, "B": 15, "S": 15}, {"levels": "4-6", "D": 10, "W": 11, "P": 11, "B": 13, "S": 12}, {"levels": "7-9", "D": 8,  "W": 9,  "P": 9,  "B": 10, "S": 10}, {"levels": "10-12","D": 6,  "W": 7,  "P": 8,  "B": 8,  "S": 8} ] },
    "Gnome": { "saves_by_level_ranges": [ {"levels": "1-5", "D": 8,  "W": 9,  "P": 10, "B": 14, "S": 11}, {"levels": "6-8", "D": 6,  "W": 7,  "P": 8,  "B": 11, "S": 9} ] },
    "Svirfneblin": { "saves_by_level_ranges": [ {"levels": "1-3", "D": 8,  "W": 9,  "P": 10, "B": 14, "S": 11}, {"levels": "4-6", "D": 6,  "W": 7,  "P": 8,  "B": 11, "S": 9}, {"levels": "7-8", "D": 4,  "W": 5,  "P": 6,  "B": 9,  "S": 7} ] },
    "Elf": { "saves_by_level_ranges": [ {"levels": "1-3", "D": 12, "W": 13, "P": 13, "B": 15, "S": 15}, {"levels": "4-6", "D": 10, "W": 11, "P": 11, "B": 13, "S": 12}, {"levels": "7-9", "D": 8,  "W": 9,  "P": 9,  "B": 10, "S": 10}, {"levels": "10",  "D": 6,  "W": 7,  "P": 8,  "B": 8,  "S": 8} ] },
    "Bard": { "alias_of": "Thief" }, "Druid": { "alias_of": "Cleric" }, "Illusionist": { "alias_of": "Magic-User" }, "Knight": { "alias_of": "Fighter" }, "Paladin": { "alias_of": "Cleric" }, "Ranger": { "alias_of": "Fighter" }, "Half-Orc": { "alias_of": "Fighter" }, "Drow": { "alias_of": "Elf" }, "Duergar": { "alias_of": "Dwarf" },
};

export const ATTACK_DATA: {
    progressions: Record<'Warrior' | 'WarriorFighter' | 'Adventurer' | 'Mage', AttackBonusProgressionRange[]>;
    classes: Record<string, 'Warrior' | 'WarriorFighter' | 'Adventurer' | 'Mage'>;
} = {
  "progressions": {
    "Warrior": [ {"levels": "1-2",  "THAC0": 19, "attack_bonus": 0}, {"levels": "3",  "THAC0": 18, "attack_bonus": 1}, {"levels": "4-5",  "THAC0": 17, "attack_bonus": 2}, {"levels": "6",  "THAC0": 16, "attack_bonus": 3}, {"levels": "7-8",  "THAC0": 15, "attack_bonus": 4}, {"levels": "9",  "THAC0": 14, "attack_bonus": 5}, {"levels": "10-11", "THAC0": 13, "attack_bonus": 6}, {"levels": "12", "THAC0": 12, "attack_bonus": 7}, {"levels": "13", "THAC0": 11, "attack_bonus": 8}, {"levels": "14", "THAC0": 10, "attack_bonus": 9} ],
    "WarriorFighter": [ {"levels": "1",  "THAC0": 19, "attack_bonus": 0}, {"levels": "2",  "THAC0": 18, "attack_bonus": 1}, {"levels": "3-4",  "THAC0": 17, "attack_bonus": 2}, {"levels": "5",  "THAC0": 16, "attack_bonus": 3}, {"levels": "6-7",  "THAC0": 15, "attack_bonus": 4}, {"levels": "8",  "THAC0": 14, "attack_bonus": 5}, {"levels": "9-10", "THAC0": 13, "attack_bonus": 6}, {"levels": "11", "THAC0": 12, "attack_bonus": 7}, {"levels": "12", "THAC0": 11, "attack_bonus": 8}, {"levels": "13-14", "THAC0": 10, "attack_bonus": 9} ],
    "Adventurer": [ {"levels": "1-2",  "THAC0": 19, "attack_bonus": 0}, {"levels": "3-4",  "THAC0": 18, "attack_bonus": 1}, {"levels": "5-6",  "THAC0": 17, "attack_bonus": 2}, {"levels": "7-8",  "THAC0": 16, "attack_bonus": 3}, {"levels": "9-10", "THAC0": 15, "attack_bonus": 4}, {"levels": "11-12","THAC0": 14, "attack_bonus": 5}, {"levels": "13", "THAC0": 13, "attack_bonus": 6}, {"levels": "14","THAC0": 12, "attack_bonus": 7} ],
    "Mage": [ {"levels": "1-3",  "THAC0": 19, "attack_bonus": 0}, {"levels": "4-6",  "THAC0": 18, "attack_bonus": 1}, {"levels": "7-8",  "THAC0": 17, "attack_bonus": 2}, {"levels": "9-11", "THAC0": 16, "attack_bonus": 3}, {"levels": "12-13","THAC0": 15, "attack_bonus": 4}, {"levels": "14","THAC0": 14, "attack_bonus": 5} ]
  },
  "classes": {
    "Fighter": "WarriorFighter", "Barbarian": "Warrior", "Dwarf": "Warrior", "Elf": "Warrior", "Duergar": "Warrior", "Half-Orc": "Warrior", "Knight": "Warrior", "Paladin": "Warrior", "Ranger": "Warrior", "Cleric": "Adventurer", "Druid": "Adventurer", "Drow": "Adventurer", "Thief": "Adventurer", "Halfling": "Adventurer", "Acrobat": "Adventurer", "Assassin": "Adventurer", "Bard": "Adventurer", "Half-Elf": "Adventurer", "Magic-User": "Mage", "Gnome": "Mage", "Illusionist": "Mage", "Svirfneblin": "Mage",
  }
};

export const ATTACK_PROGRESSIONS = ATTACK_DATA.progressions;

// Data not present in the new class-features.ts file
export const SUPPLEMENTAL_CLASS_DATA: Record<string, {
    startingWealth: string;
    moneyGroup: 'Casters' | 'Skill' | 'Martial' | 'Prestige Martial';
    features?: { hpRollRule?: 'dwarf'; hpBonusPerLevel?: number; racialHpDie?: number; };
}> = {
  'Cleric': { startingWealth: '3d6 * 10', moneyGroup: 'Martial' },
  'Fighter': { startingWealth: '3d6 * 10', moneyGroup: 'Martial' },
  'Magic-User': { startingWealth: '3d6 * 10', moneyGroup: 'Casters' },
  'Thief': { startingWealth: '3d6 * 10', moneyGroup: 'Skill' },
  'Drow': { startingWealth: '3d6 * 10', moneyGroup: 'Skill', features: { racialHpDie: 6 } },
  'Dwarf': { startingWealth: '3d6 * 10', moneyGroup: 'Martial', features: { hpRollRule: 'dwarf', hpBonusPerLevel: 1, racialHpDie: 4 } },
  'Duergar': { startingWealth: '3d6 * 10', moneyGroup: 'Martial', features: { hpRollRule: 'dwarf', hpBonusPerLevel: 1, racialHpDie: 6 } },
  'Elf': { startingWealth: '3d6 * 10', moneyGroup: 'Skill' },
  'Gnome': { startingWealth: '3d6 * 10', moneyGroup: 'Skill', features: { racialHpDie: 2 } },
  'Halfling': { startingWealth: '3d6 * 10', moneyGroup: 'Martial' },
  'Half-Elf': { startingWealth: '3d6 * 10', moneyGroup: 'Skill' },
  'Half-Orc': { startingWealth: '3d6 * 10', moneyGroup: 'Martial', features: { racialHpDie: 6 } },
  'Svirfneblin': { startingWealth: '3d6 * 10', moneyGroup: 'Skill', features: { racialHpDie: 6 } },
  'Acrobat': { startingWealth: '2d6 * 10', moneyGroup: 'Skill' },
  'Assassin': { startingWealth: '3d6 * 10', moneyGroup: 'Skill' },
  'Barbarian': { startingWealth: '5d4 * 10', moneyGroup: 'Prestige Martial' },
  'Bard': { startingWealth: '3d6 * 10', moneyGroup: 'Skill' },
  'Druid': { startingWealth: '2d6 * 10', moneyGroup: 'Casters' },
  'Illusionist': { startingWealth: '2d4 * 10', moneyGroup: 'Casters' },
  'Knight': { startingWealth: '6d4 * 10', moneyGroup: 'Prestige Martial' },
  'Paladin': { startingWealth: '3d6 * 10', moneyGroup: 'Prestige Martial' },
  'Ranger': { startingWealth: '5d4 * 10', moneyGroup: 'Prestige Martial' },
};
