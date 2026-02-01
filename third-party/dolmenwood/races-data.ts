import type { Race } from '../../types';

export const RACES_DATA: Race[] = [
  {
    "name": "Mossling",
    "sourceId": "dolmenwood",
    "description": "A humanoid plant-creature, born from the sentient moss of Dolmenwood.",
    "physicalDescription": { "male": "a humanoid figure of woven moss and bark with glowing fungal eyes", "female": "a humanoid figure of woven moss and bark with glowing fungal eyes" },
    "available_classes_max_level": {
      "Fighter": 6, "Thief": 8, "Friar": 8, "Magician": 7
    },
    "requirements": { "min_con": 9 },
    "ability_modifiers": { "con": 1, "dex": -1 },
    "languages": ["Mossling", "Woldish", "Sylvan"],
    "features": [
      { "name": "Photosynthesis", "text": "Can sustain themselves on sunlight if water is available.", "shown_on_sheet": true },
      { "name": "Speak with Plants", "text": "Can communicate with normal plants at will.", "shown_on_sheet": true }
    ]
  }
];