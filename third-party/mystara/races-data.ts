import type { Race } from '../../types';

export const RACES_DATA: Race[] = [
  {
    "name": "Traladaran Human",
    "sourceId": "mystara",
    "description": "A native human of Karameikos, known for their superstitious nature and resilience.",
    "physicalDescription": { "male": "dark hair, olive skin, and a passionate, expressive face, often with a mustache", "female": "dark, wavy hair, olive skin, and large, expressive dark eyes" },
    "available_classes_max_level": {
        "All non-demihuman classes": "Unlimited"
    },
    "requirements": {},
    "ability_modifiers": { "wis": 1, "cha": -1 },
    "languages": ["Traladaran", "Thyatian"],
    "features": [
      { "name": "Forest Affinity", "text": "+1 to saving throws against charms from fey creatures.", "shown_on_sheet": true },
      { "name": "Superstitious", "text": "Carries a folk charm to ward off evil.", "shown_on_sheet": true }
    ]
  }
];