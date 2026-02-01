import type { ClassFeatureData } from '../../types';

export const CLASS_FEATURES_DATA: ClassFeatureData[] = [
  {
    "name": "Grimalkin",
    "category": "Demihuman",
    "sourceId": "dolmenwood",
    "requirements": {"DEX": 11},
    "prime_requisites": ["DEX"],
    "alignment": "Neutral",
    "hit_die": "1d6",
    "max_level": 10,
    "armor_allowed": "Leather, no shields",
    "weapons_allowed": "Dagger, short sword, sling",
    "physicalDescription": {
      "male": "a humanoid feline with sleek fur, sharp claws, and piercing, intelligent eyes",
      "female": "a graceful humanoid feline with sleek fur, sharp claws, and watchful, intelligent eyes"
    },
    "spellcasting": null,
    "abilities": [
      {"name": "Nine Lives", "level": 1, "desc": "Once per day, may reroll a failed saving throw versus death."},
      {"name": "Cat's Grace", "level": 1, "desc": "Always land on their feet when falling, taking half damage."},
      {"name": "Speak with Felines", "level": 1, "desc": "Can communicate with all forms of cats, big and small."},
      {"name": "Enhanced Senses", "level": 1, "desc": "Surprised only on a 1-in-6.", "find-secret-door-value": 2, "find-room-trap-value": 2}
    ]
  }
];