import type { Race } from '../../types';

export const RACES_DATA: Race[] = [
  {
    "name": "Norseman",
    "sourceId": "northland",
    "description": "A hardy human from the northern fjords, accustomed to harsh seas and colder climates.",
    "physicalDescription": { "male": "tall, powerfully built with fair skin, often with a braided beard and hair, and a weathered face", "female": "tall and strong, with fair skin and long, often braided hair, and a resilient expression" },
    "available_classes_max_level": {
      "Skald": "Unlimited", "Shield Maiden": "Unlimited", "Fighter": "Unlimited"
    },
    "requirements": {},
    "ability_modifiers": { "str": 1, "con": 1, "int": -1 },
    "languages": ["Old Norse", "Common"],
    "features": [
      { "name": "Sea Legs", "text": "Resistant to seasickness and adept at moving on ships.", "shown_on_sheet": true },
      { "name": "Raider's Courage", "text": "+1 to morale checks.", "shown_on_sheet": true }
    ]
  }
];