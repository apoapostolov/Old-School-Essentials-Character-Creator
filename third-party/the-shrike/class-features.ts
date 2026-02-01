
import type { ClassFeatureData } from '../../types';

export const CLASS_FEATURES_DATA: ClassFeatureData[] = [
  {
    "name": "Wayfarer",
    "category": "Advanced",
    "sourceId": "shrike",
    "requirements": {"DEX": 13, "CON": 9},
    "prime_requisites": ["DEX"],
    "alignment": "Neutral",
    "hit_die": "1d6",
    "max_level": 12,
    "armor_allowed": "Leather, no shields",
    "weapons_allowed": "Dagger, short sword, harpoon, sling",
    "spellcasting": null,
    "abilities": [
      {"name": "Sea Legs", "level": 1, "desc": "Advantage on checks to maintain balance on rough seas or slippery surfaces.", "find-secret-door-value": 2, "find-room-trap-value": 2},
      {"name": "Harpooner", "level": 1, "desc": "On a successful harpoon hit, can make an opposed Strength check to pull a target of same size or smaller 10ft closer."},
      {"name": "Old Salt", "level": 2, "desc": "Can accurately predict weather for the next 24 hours."}
    ]
  },
  {
    "name": "Tide-Priest",
    "category": "Basic",
    "sourceId": "shrike",
    "requirements": {"WIS": 9},
    "prime_requisites": ["WIS"],
    "alignment": "Neutral",
    "hit_die": "1d6",
    "max_level": 14,
    "armor_allowed": "Leather armor, shields allowed",
    "weapons_allowed": "Club, dagger, harpoon, staff, sling",
    "spellcasting": {"list": "Cleric", "starts_at_level": 2, "highest_spell_level": 5, "notes": "Spells are re-themed to relate to the sea, fog, and depths.", "knowsAllSpells": true, "default_spell": "Fog Cloud", "bonus_spell_ability": "WIS", "caster_type": "Divine", "spell_list_keys": ["Cleric"]},
    "grog_eligible": true,
    "abilities": [
      {"name": "Turn Aquatic Creatures", "level": 1, "desc": "Can turn fish, amphibians, and other sea creatures as a Cleric turns undead."},
      {"name": "Fog Sense", "level": 1, "desc": "Is not blinded or slowed by natural fog, mist, or heavy rain."},
      {"name": "Read the Tides", "level": 2, "desc": "Can accurately predict tides and strong currents for the next 24 hours."}
    ]
  }
];