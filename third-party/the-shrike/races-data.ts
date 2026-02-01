import type { Race } from '../../types';

export const RACES_DATA: Race[] = [
  {
    "name": "Islander",
    "sourceId": "shrike",
    "description": "A grim and weather-beaten human from the isolated, fog-shrouded islands.",
    "physicalDescription": { "male": "lean and tough, with weather-beaten skin, a grim expression, and calloused hands", "female": "lean and resilient, with a watchful gaze and skin weathered by salt and wind" },
    "available_classes_max_level": {
      "Wayfarer": "Unlimited", "Tide-Priest": "Unlimited", "Fighter": 10
    },
    "requirements": { "min_con": 9 },
    "ability_modifiers": { "con": 1, "cha": -1 },
    "languages": ["Mariner's Cant", "Islander Creole"],
    "features": [
      { "name": "Fog-Wise", "text": "Can see moderately well in natural fog or mist.", "shown_on_sheet": true },
      { "name": "Stoic", "text": "+2 to saving throws against fear.", "shown_on_sheet": true }
    ]
  }
];