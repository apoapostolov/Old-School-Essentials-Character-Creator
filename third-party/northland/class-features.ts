import type { ClassFeatureData } from '../../types';

export const CLASS_FEATURES_DATA: ClassFeatureData[] = [
  {
    "name": "Skald",
    "category": "Advanced",
    "sourceId": "northland",
    "requirements": {"CHA": 13, "STR": 9},
    "prime_requisites": ["CHA"],
    "alignment": "Any",
    "hit_die": "1d6",
    "max_level": 14,
    "armor_allowed": "Leather, chainmail, shields",
    "weapons_allowed": "All except two-handed swords",
    "spellcasting": null,
    "abilities": [
      {"name": "Saga-Spiller", "level": 1, "desc": "Can perfectly recall epic poems and histories. Gains +2 on reaction rolls with Norse peoples.", "find-secret-door-value": 2},
      {"name": "War-Chanter", "level": 1, "desc": "Can sing to grant allies a +1 bonus to saving throws against fear for one encounter per day."},
      {"name": "Kenning-Smith", "level": 3, "desc": "Can compose a boast or insult so potent it affects morale. Boast grants +1 Morale to an ally, Insult inflicts -1 Morale on an enemy who understands the language."}
    ]
  },
  {
    "name": "Shield Maiden",
    "category": "Advanced",
    "sourceId": "northland",
    "requirements": {"STR": 13, "DEX": 9},
    "prime_requisites": ["STR"],
    "alignment": "Lawful or Neutral",
    "hit_die": "1d8",
    "max_level": 14,
    "armor_allowed": "Any armor, shields allowed",
    "weapons_allowed": "All weapons",
    "spellcasting": null,
    "abilities": [
      {"name": "Shield Wall", "level": 1, "desc": "When adjacent to an ally with a shield, both gain a +1 bonus to AC."},
      {"name": "Spear Dancer", "level": 1, "desc": "May use DEX modifier for attack rolls with spears."},
      {"name": "Fearsome Charge", "level": 3, "desc": "When charging into combat, enemies with fewer HD must make a morale check."}
    ]
  }
];