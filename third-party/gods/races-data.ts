import type { Race } from '../../types';

export const RACES_DATA: Race[] = [
  {
    "name": "Cimmerian",
    "sourceId": "gods",
    "description": "A grim, powerful human hailing from the northern hills, born to be a warrior.",
    "physicalDescription": { "male": "powerfully muscled with dark, brooding eyes and a square jaw, black-haired", "female": "athletic and fierce, with a wild mane of dark hair and a smoldering gaze" },
    "available_classes_max_level": {
        "Savage": "Unlimited", "Thief": 10, "Fighter": "Unlimited"
    },
    "requirements": { "min_str": 9 },
    "ability_modifiers": { "str": 1, "int": -1 },
    "languages": ["Cimmerian", "Northron"],
    "racialHpDie": 6,
    "features": [
      { "name": "Barbarian Cunning", "text": "When not wearing metal armor, gains +1 to AC.", "shown_on_sheet": true },
      { "name": "Born to Fight", "text": "Can use any weapon.", "shown_on_sheet": true }
    ]
  }
];