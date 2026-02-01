
import type { ClassFeatureData } from '../../types';

export const CLASS_FEATURES_DATA: ClassFeatureData[] = [
  {
    "name": "Traladaran Witch",
    "category": "Advanced",
    "sourceId": "mystara",
    "requirements": {"INT": 13, "WIS": 9},
    "prime_requisites": ["INT"],
    "alignment": "Any",
    "hit_die": "1d4",
    "max_level": 12,
    "armor_allowed": "None",
    "weapons_allowed": "Dagger, staff, sickle",
    "spellcasting": {"list": "Magic-User", "starts_at_level": 1, "highest_spell_level": 5, "randomStartingSpell": true, "default_spell": "Bind Spirit", "bonus_spell_ability": "INT", "caster_type": "Arcane", "spell_list_keys": ["Magic-User"]},
    "grog_eligible": true,
    "abilities": [
      {"name": "Forest Magic", "level": 1, "desc": "Can memorize one Druid spell of each spell level they can cast, in place of a Magic-User spell.", "find-secret-door-value": 2},
      {"name": "Brew Potion", "level": 3, "desc": "Can brew simple potions (e.g., healing) at a reduced cost."},
      {"name": "Evil Eye", "level": 1, "desc": "Once per day, can force one creature to reroll a successful saving throw."}
    ]
  }
];