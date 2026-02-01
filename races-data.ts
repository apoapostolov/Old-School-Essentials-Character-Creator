import type { Race } from './types';

export const RACES_DATA: Race[] = [
  {
    "name": "Human",
    "description": "Versatile and passionate; no racial abilities by default, but unlimited advancement in all non-demihuman classes.",
    "physicalDescription": { "male": "varied in appearance, reflecting diverse ancestries", "female": "varied in appearance, reflecting diverse ancestries" },
    "available_classes_max_level": { "All non-demihuman classes": "Unlimited" },
    "requirements": {},
    "ability_modifiers": {},
    "languages": ["Alignment", "Common"],
    "features": [
      { "name": "Unlimited Advancement", "text": "Can advance to any level in any non-demihuman class.", "shown_on_sheet": false },
      { "name": "Optional Abilities (If Limits Lifted)", "text": "+1 CHA, +1 CON; Blessed (roll HP twice, take best); Decisiveness (win initiative ties); Leadership (+1 retainer morale/loyalty).", "shown_on_sheet": false }
    ]
  },
  {
    "name": "Drow",
    "description": "Slender, fey demihumans with skin black as night and white or silver hair; nigh-immortal, dwelling in vast subterranean cities ruled by priesthoods.",
    "physicalDescription": { "male": "slender and graceful with jet-black skin and stark white hair", "female": "slender and commanding with jet-black skin and stark white hair" },
    "available_classes_max_level": {
      "Acrobat": 10, "Assassin": 10, "Cleric": 11, "Fighter": 7, "Knight": 9, "Magic-User": 9, "Ranger": 9, "Thief": 11
    },
    "requirements": { "min_int": 9 },
    "ability_modifiers": { "con": -1, "dex": 1 },
    "languages": ["Alignment", "Common", "Deepcommon", "Elvish", "Gnomish"],
    "racialHpDie": 6,
    "listen_at_doors_value": 2,
    "find_secret_doors_value": 2,
    "features": [
      { "name": "Detect Secret Doors", "text": "2-in-6 chance when actively searching.", "shown_on_sheet": true },
      { "name": "Infravision", "text": "90’ range.", "shown_on_sheet": true },
      { "name": "Innate Magic", "text": "Darkness at 2nd level; detect magic at 4th level.", "shown_on_sheet": true },
      { "name": "Light Sensitivity", "text": "Penalties in bright light.", "shown_on_sheet": true },
      { "name": "Listening at Doors", "text": "2-in-6 chance.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Duergar",
    "description": "Sallow-skinned, hairless dwarven kin of the deep; dour and industrious, dwelling in harsh subterranean realms.",
    "physicalDescription": { "male": "hairless, with grey, ashen skin and a grim expression", "female": "hairless, with grey, ashen skin and a stern expression" },
    "available_classes_max_level": { "Assassin": 9, "Cleric": 8, "Fighter": 9, "Thief": 9 },
    "requirements": { "min_con": 9 },
    "ability_modifiers": { "cha": -1, "con": 1 },
    "languages": ["Alignment", "Common", "Dwarvish", "Gnomish", "Goblin", "Kobold"],
    "find_secret_doors_value": 2,
    "find_room_traps_value": 2,
    "features": [
      { "name": "Detect Construction Tricks", "text": "Sense slopes, traps, and new construction in stonework (2-in-6).", "shown_on_sheet": true },
      { "name": "Infravision", "text": "90’ range.", "shown_on_sheet": true },
      { "name": "Resilience", "text": "Bonus to saves vs poison and magic based on CON.", "shown_on_sheet": true },
      { "name": "Stealth", "text": "Chance to move silently/hide in underground stone environs.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Dwarf",
    "description": "Stout under-earth folk famed for stonecraft and stubbornness.",
    "physicalDescription": { "male": "short and stout, with a long, often braided beard and rugged features", "female": "short and sturdy, often with braided hair or sideburns and strong features" },
    "available_classes_max_level": { "Assassin": 9, "Cleric": 8, "Fighter": 10, "Thief": 9 },
    "requirements": { "min_con": 9 },
    "ability_modifiers": { "cha": -1, "con": 1 },
    "languages": ["Alignment", "Common", "Dwarvish", "Gnomish", "Goblin", "Kobold"],
    "listen_at_doors_value": 2,
    "find_room_traps_value": 2,
    "features": [
      { "name": "Detect Construction Tricks", "text": "Notice slopes, traps, new construction in stone (2-in-6).", "shown_on_sheet": true },
      { "name": "Detect Room Traps", "text": "Improved chance with stonework.", "shown_on_sheet": true },
      { "name": "Infravision", "text": "60’ range.", "shown_on_sheet": true },
      { "name": "Listening at Doors", "text": "2-in-6 chance.", "shown_on_sheet": true },
      { "name": "Resilience", "text": "Save bonuses vs poison and magic by CON.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Elf",
    "description": "Aloof, long-lived lovers of nature and magic; finest artisans among folk.",
    "physicalDescription": { "male": "tall and slender with fine features, pointed ears, and an ethereal grace", "female": "tall and slender with fine features, pointed ears, and an ethereal grace" },
    "available_classes_max_level": {
      "Acrobat": 10, "Assassin": 10, "Cleric": 7, "Druid": 8, "Fighter": 7, "Knight": 11, "Magic-User": 11, "Ranger": 11, "Thief": 10
    },
    "requirements": { "min_int": 9 },
    "ability_modifiers": { "con": -1, "dex": 1 },
    "languages": ["Alignment", "Common", "Elvish", "Gnoll", "Hobgoblin", "Orcish"],
    "listen_at_doors_value": 2,
    "find_secret_doors_value": 2,
    "features": [
      { "name": "Detect Secret Doors", "text": "2-in-6 chance when actively searching.", "shown_on_sheet": true },
      { "name": "Immunity to Ghoul Paralysis", "text": "Unaffected by ghoul paralysis.", "shown_on_sheet": true },
      { "name": "Infravision", "text": "60’ range.", "shown_on_sheet": true },
      { "name": "Listening at Doors", "text": "2-in-6 chance.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Gnome",
    "description": "Short, inventive cousins of dwarves; miners, machinists, and lovers of precious stones and clockworks.",
    "physicalDescription": { "male": "small and wiry with a prominent nose and twinkling eyes", "female": "small and nimble with a curious expression and intelligent eyes" },
    "available_classes_max_level": { "Assassin": 6, "Cleric": 7, "Fighter": 6, "Illusionist": 7, "Thief": 8 },
    "requirements": {},
    "ability_modifiers": {},
    "languages": ["Alignment", "Common", "Gnomish", "Dwarvish"],
    "find_secret_doors_value": 2,
    "find_room_traps_value": 2,
    "features": [
      { "name": "Detect Construction", "text": "Sense slopes, traps, and new construction in stonework (2-in-6).", "shown_on_sheet": true },
      { "name": "Infravision", "text": "60' range.", "shown_on_sheet": true },
      { "name": "Class Access", "text": "Access to Illusionist class; limited martial advancement.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Halfling",
    "description": "Small, comfort-seeking folk; friendly and home-loving, not renowned for bravery.",
    "physicalDescription": { "male": "small and stout with curly hair and a friendly, round face", "female": "small and stout with curly hair and a cheerful disposition" },
    "available_classes_max_level": { "Druid": 6, "Fighter": 6, "Thief": 8 },
    "requirements": { "min_con": 9, "min_dex": 9 },
    "ability_modifiers": { "dex": 1, "str": -1 },
    "languages": ["Alignment", "Common", "Halfling"],
    "features": [
      { "name": "Defensive Bonus", "text": "+2 AC vs large opponents.", "shown_on_sheet": true },
      { "name": "Missile Attack Bonus", "text": "+1 to attack rolls with missile weapons.", "shown_on_sheet": true },
      { "name": "Resilience", "text": "Save bonuses vs poison and magic by CON.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Half-Elf",
    "description": "Bridge between elf and human cultures; adaptable and keen-eyed.",
    "physicalDescription": { "male": "a blend of human robustness and elven grace, with slightly pointed ears", "female": "a blend of human curves and elven elegance, with slightly pointed ears" },
    "available_classes_max_level": {
      "Acrobat": 12, "Assassin": 11, "Bard": 12, "Cleric": 5, "Druid": 12, "Fighter": 8, "Knight": 12, "Magic-User": 8, "Paladin": 12, "Ranger": 8, "Thief": 12
    },
    "requirements": { "min_cha": 9, "min_con": 9 },
    "ability_modifiers": {},
    "languages": ["Alignment", "Common", "Elvish"],
    "find_secret_doors_value": 2,
    "features": [
      { "name": "Detect Secret Doors", "text": "2-in-6 chance when actively searching.", "shown_on_sheet": true },
      { "name": "Infravision", "text": "60’ range.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Half-Orc",
    "description": "Human–orc offspring; often outcasts, capable combatants with some thieving skill.",
    "physicalDescription": { "male": "powerfully built with greyish skin, a prominent jaw, and coarse hair", "female": "tall and strong with greyish skin, a determined jaw, and coarse hair" },
    "available_classes_max_level": { "Acrobat": 8, "Assassin": 8, "Cleric": 4, "Fighter": 10, "Thief": 8 },
    "requirements": {},
    "ability_modifiers": { "cha": -2, "con": 1, "str": 1 },
    "languages": ["Alignment", "Common", "Orcish"],
    "racialHpDie": 6,
    "features": [
      { "name": "Infravision", "text": "60’ range.", "shown_on_sheet": true },
      { "name": "Retainer Penalty", "text": "Retainers’ loyalty −1 due to mistrust.", "shown_on_sheet": true }
    ]
  },
  {
    "name": "Svirfneblin",
    "description": "Deep gnomes; subterranean relatives of gnomes, expert tunnellers and makers of secret mechanisms, gem-obsessed.",
    "physicalDescription": { "male": "small, wiry, and bald with grey, rocky skin", "female": "small, tough, and bald with grey, rocky skin" },
    "available_classes_max_level": { "Assassin": 8, "Cleric": 7, "Fighter": 6, "Illusionist": 7, "Thief": 8 },
    "requirements": {},
    "ability_modifiers": {},
    "languages": ["Alignment", "Common", "Gnomish"],
    "find_secret_doors_value": 2,
    "find_room_traps_value": 2,
    "features": [
      { "name": "Infravision", "text": "120' range.", "shown_on_sheet": true },
      { "name": "Detect Construction", "text": "Sense slopes, traps, and new construction in stonework (2-in-6).", "shown_on_sheet": true },
      { "name": "Blend into Stone", "text": "Remain unnoticed in stone environments while silent and still: 4-in-6 in gloom, 2-in-6 in bright light.", "shown_on_sheet": true }
    ]
  }
];