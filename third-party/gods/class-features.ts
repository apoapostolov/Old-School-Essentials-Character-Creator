import type { ClassFeatureData } from '../../types';

export const CLASS_FEATURES_DATA: ClassFeatureData[] = [
  {
    "name": "Savage",
    "category": "Basic",
    "sourceId": "gods",
    "requirements": {"STR": 9, "CON": 9},
    "prime_requisites": ["STR", "CON"],
    "alignment": "Neutral",
    "hit_die": "1d10",
    "max_level": 12,
    "armor_allowed": "Furs and hides only, no shields",
    "weapons_allowed": "Crude weapons (clubs, spears, axes)",
    "spellcasting": null,
    "abilities": [
      {"name": "Primal Fury", "level": 1, "desc": "When reduced to half HP, gains +2 to damage rolls."},
      {"name": "Hardiness", "level": 1, "desc": "Ignores the first point of damage from any non-magical source."},
      {"name": "Wilderness Survivor", "level": 1, "desc": "Can find food and water for self in any natural environment."}
    ]
  }
];
