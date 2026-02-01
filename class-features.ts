

import type { ClassFeatureData } from './types';

export const CLASS_FEATURES_DATA: ClassFeatureData[] = [
  {
    "name": "Cleric",
    "category": "Basic",
    "requirements": {"WIS": 9},
    "prime_requisites": ["WIS"],
    "alignment": "Any (often Lawful/Neutral)",
    "hit_die": "1d6",
    "max_level": 14,
    "armor_allowed": "Any armor, shields allowed",
    "weapons_allowed": "Blunt weapons (club, mace, war hammer, staff, sling)",
    "spellcasting": {"list": "Cleric", "starts_at_level": 2, "highest_spell_level": 5, "knowsAllSpells": true, "bonus_spell_ability": "WIS", "caster_type": "Divine", "spell_list_keys": ["Cleric"]},
    "turn_undead": true,
    "followers": {"gained_at_level": 8, "notes": "Establish church/stronghold"},
    "grog_eligible": true,
    "abilities": [
      {"name": "Divine Spellcasting", "level": 2, "desc": "Pray to prepare cleric spells from level 2."},
      {"name": "Turn Undead", "level": 1, "desc": "Repel/command undead based on table."},
      {"name": "Cure Disease (ritual)", "level": 1, "desc": "Holy water + prayer: 4-in-6 cure simple; 2-in-6 virulent; 1-in-6 attempt vs magical/unholy via Turn HD; success halts/progresses to cure.", "homebrew": true},
      {"name": "Holy Sense", "level": 1, "desc": "1 turn: sense holy/unholy magic on held item or 30' area; ID properties if Holy to belief; reveal consecrated/desecrated; flag curses/intelligent items.", "homebrew": true},
      {"name": "Faith's Influence", "level": 1, "desc": "+1 on Reaction or WIS/CHA checks vs targets recognizing your faith and beneath your station; +2 if same faith and alignment. Hostile faiths may suffer a similar penalty.", "homebrew": true}
    ]
  },

  {
    "name": "Fighter",
    "category": "Basic",
    "requirements": {"STR": 9},
    "prime_requisites": ["STR"],
    "alignment": "Any",
    "hit_die": "1d8",
    "max_level": 14,
    "armor_allowed": "Any armor, shields allowed",
    "weapons_allowed": "All weapons",
    "spellcasting": null,
    "followers": {"gained_at_level": 9, "notes": "Establish stronghold; attracts mercenaries"},
    "abilities": [
      {"name": "Combat Mastery", "level": 1, "desc": "Best attack progression; multiple attacks vs 1 HD foes at high level (optional)."},
      {"name": "Cleave", "level": 1, "desc": "On melee kill: make 1 extra melee attack; tiers: 2 cleaves at 5th, 3 at 9th, 4 at 13th; after 9th may spend a cleave to step 5'.", "homebrew": true}
    ]
  },

  {
    "name": "Magic-User",
    "category": "Basic",
    "requirements": {"INT": 9},
    "prime_requisites": ["INT"],
    "alignment": "Any",
    "hit_die": "1d4",
    "max_level": 14,
    "armor_allowed": "None",
    "weapons_allowed": "Dagger, staff",
    "spellcasting": {"list": "Magic-User", "starts_at_level": 1, "highest_spell_level": 6, "notes": "Must maintain spellbook; Read Magic required.", "randomStartingSpell": true, "default_spell": "Sleep", "bonus_spell_ability": "INT", "caster_type": "Arcane", "spell_list_keys": ["Magic-User"]},
    "grog_eligible": true,
    "abilities": [
      {"name": "Read Magic", "level": 1, "desc": "Required to decipher scrolls and spellbooks."},
      {"name": "Research & Scrolls", "level": 9, "desc": "May research spells and create scrolls at sufficient level and cost."},
      {"name": "Arcane Sense", "level": 1, "desc": "1 turn: held item is arcane? reveal properties; curses stay hidden; detect intelligent item & rough intellect tier.", "homebrew": true}
    ]
  },

  {
    "name": "Thief",
    "category": "Basic",
    "requirements": {"DEX": 9},
    "prime_requisites": ["DEX"],
    "alignment": "Any (often Neutral/Chaotic)",
    "hit_die": "1d4",
    "max_level": 14,
    "armor_allowed": "Leather, no shields",
    "weapons_allowed": "1-handed weapons; bows/slings",
    "spellcasting": null,
    "skill_type": "thief",
    "abilities": [
      {"name": "Backstab", "level": 1, "desc": "+4 to hit and x2 damage from surprise (multiplier improves by level)."},
      {"name": "Thief Skills", "level": 1, "desc": "Open Locks; Find/Remove Traps; Pick Pockets; Move Silently; Climb; Hide in Shadows; Hear Noise (percent tables).", "hide_from_list": true},
      {"name": "Skill Progression", "level": 1, "desc": "Lvl1: 10% all but Climb (25%) and Hear (1-in-6); 4 increases (+15% or +1-in-6, max 2 per skill). Each level: +2 increases, max +1 per skill; caps: % 85, Hear 5-in-6.", "homebrew": true, "hide_from_list": true},
      {"name": "Iterative Attempts", "level": 1, "desc": "Repeat search/locks/traps only by spending 1 turn per retry (risking encounters), once.", "homebrew": true},
      {"name": "Environmental Edge", "level": 1, "desc": "+10% or +20% to % skills with smart use of cover/light or competent roleplay.", "homebrew": true}
    ]
  },

  {
    "name": "Drow",
    "category": "Demihuman",
    "requirements": {"DEX": 11},
    "prime_requisites": ["DEX"],
    "alignment": "Any (often Chaotic)",
    "hit_die": "1d6",
    "max_level": 10,
    "armor_allowed": "Elven mail/leather; shields",
    "weapons_allowed": "Rapiers/short swords, hand crossbows, etc.",
    "physicalDescription": { "male": "slender and graceful with jet-black skin and stark white hair", "female": "slender and commanding with jet-black skin and stark white hair" },
    "spellcasting": {"list": "Cleric", "starts_at_level": 1, "highest_spell_level": 5, "homebrew": true, "randomStartingSpell": true, "default_spell": "Purify Food and Water", "bonus_spell_ability": "WIS", "caster_type": "Divine", "spell_list_keys": ["Cleric"]},
    "abilities": [
      {"name": "Infravision", "level": 1, "desc": "120' typical underground."},
      {"name": "Sunlight Sensitivity", "level": 1, "desc": "Penalties in daylight unless shaded."},
      {"name": "Dark Assassination", "level": 1, "desc": "+4 to hit vs unaware/blinded in darkness; may forgo bonus to deal x2 damage on hit.", "homebrew": true},
      {"name": "Dex Finesse (Drow arms)", "level": 1, "desc": "Use DEX mod to attack and damage with Drow weapons.", "homebrew": true},
      {"name": "Poisoncraft (spiders)", "level": 1, "desc": "1 day with friendly spiders ≥1 HD yields 1d3 uses: Blood I or Ingest II; +1 tier per extra 3 HD; 1/week per colony.", "homebrew": true},
      {"name": "Sleep/Paralysis Immunity", "level": 1, "desc": "Immune to magical sleep and paralysis (not petrification).", "homebrew": true},
      {"name": "Sylvan Sense", "level": 1, "desc": "1 turn: held item is arcane? no properties.", "homebrew": true}
    ]
  },

  {
    "name": "Dwarf",
    "category": "Demihuman",
    "requirements": {"STR": 11},
    "prime_requisites": ["STR"],
    "alignment": "Lawful/Neutral typically",
    "hit_die": "1d8",
    "max_level": 12,
    "armor_allowed": "Any armor, shields",
    "weapons_allowed": "All dwarven-suitable",
    "physicalDescription": { "male": "short and stout, with a long, often braided beard and rugged features", "female": "short and sturdy, often with braided hair or sideburns and strong features" },
    "spellcasting": null,
    "abilities": [
      {"name": "Infravision", "level": 1, "desc": "60'."},
      {"name": "Detect Construction", "level": 1, "desc": "2-in-6 stonework features.", "find-room-trap-value": 2},
      {"name": "Resilience", "level": 1, "desc": "+2 saves vs poison/magic."},
      {"name": "Stout Fortune", "level": 1, "desc": "1/day reroll a failed save vs Death/Poison, Paralysis/Petrify, or Spells.", "homebrew": true},
      {"name": "Hardy Growth", "level": 2, "desc": "+1 hp per level after 1st; roll HD twice at level up, keep best; may reroll 1–2 once.", "homebrew": true},
      {"name": "Attack Giant Foes", "level": 1, "desc": "+2 to hit vs larger-than-human foes.", "homebrew": true}
    ]
  },

  {
    "name": "Duergar",
    "category": "Demihuman",
    "requirements": {"CON": 11},
    "prime_requisites": ["CON"],
    "alignment": "Lawful (often evil societies)",
    "hit_die": "1d8",
    "max_level": 9,
    "armor_allowed": "Any; shields",
    "weapons_allowed": "All dwarven-suitable",
    "physicalDescription": { "male": "hairless, with grey, ashen skin and a grim expression", "female": "hairless, with grey, ashen skin and a stern expression" },
    "spellcasting": {"list": "Innate", "starts_at_level": 1},
    "abilities": [
      {"name": "Infravision", "level": 1, "desc": "120'."},
      {"name": "Stonecunning", "level": 1, "desc": "As dwarves; 2-in-6 stonework features.", "find-secret-door-value": 2, "find-room-trap-value": 2},
      {"name": "Iron Will", "level": 1, "desc": "1/day reroll a failed save vs Poison or Spells.", "homebrew": true},
      {"name": "Stone Stealth", "level": 1, "desc": "Stealth applies to rough stone interiors, not just underground.", "homebrew": true},
      {"name": "Harm Giant Foes", "level": 1, "desc": "+2 damage vs larger-than-human foes.", "homebrew": true}
    ]
  },

  {
    "name": "Elf",
    "category": "Demihuman",
    "requirements": {"INT": 11},
    "prime_requisites": ["INT"],
    "alignment": "Any (often Neutral)",
    "hit_die": "1d6",
    "max_level": 10,
    "armor_allowed": "Any; cannot cast MU spells in metal armor",
    "weapons_allowed": "All swords and bows; others per list",
    "physicalDescription": { "male": "tall and slender with fine features, pointed ears, and an ethereal grace", "female": "tall and slender with fine features, pointed ears, and an ethereal grace" },
    "spellcasting": {"list": "Magic-User & Illusionist", "starts_at_level": 1, "highest_spell_level": 5, "homebrew": true, "notes": "Access to both MU and Illusionist spell lists; gains two additional Beginner Spells (see houserules).", "randomStartingSpell": true, "default_spell": "Charm Person", "bonus_spell_ability": "INT", "caster_type": "Arcane", "spell_list_keys": ["Magic-User", "Illusionist"]},
    "abilities": [
      {"name": "Low-Light Vision", "level": 1, "desc": "Replaces infravision; Drow only keep infra.", "homebrew": true},
      {"name": "Detect Secrets", "level": 1, "desc": "2-in-6 hidden objects when searching; 1-in-6 sense someone conceals a secret (no content).", "find-secret-door-value": 2},
      {"name": "Sleep/Paralysis Immunity", "level": 1, "desc": "Immune to magical sleep and paralysis (not petrification).", "homebrew": true},
      {"name": "Elven Finesse", "level": 1, "desc": "Use DEX mod to attack and damage with elven weapons.", "homebrew": true},
      {"name": "Sylvan Sense", "level": 1, "desc": "1 turn: held item is arcane? no properties.", "homebrew": true}
    ]
  },

  {
    "name": "Gnome",
    "category": "Demihuman",
    "requirements": {"INT": 11},
    "prime_requisites": ["INT"],
    "alignment": "Neutral typically",
    "hit_die": "1d6",
    "max_level": 8,
    "armor_allowed": "Leather/chain; shields",
    "weapons_allowed": "Small arms; crossbows common",
    "physicalDescription": { "male": "small and wiry with a prominent nose and twinkling eyes", "female": "small and nimble with a curious expression and intelligent eyes" },
    "spellcasting": {"list": "Magic-User or Illusionist (choose at creation)", "starts_at_level": 1, "highest_spell_level": 4, "homebrew": true, "notes": "Choose one spell list at character creation; cannot be changed later.", "randomStartingSpell": true, "default_spell": "Glamour", "bonus_spell_ability": "INT", "caster_type": "Arcane", "spell_list_keys": ["Magic-User", "Illusionist"]},
    "abilities": [
      {"name": "Blink Away", "level": 1, "desc": "1/day on taking damage: become invisible until next turn or until damaged again.", "homebrew": true},
      {"name": "Terrain Hiding", "level": 1, "desc": "Dense forest 4-in-6; urban crowd 3-in-6; dungeon/interior 2-in-6; else 1-in-6; +1 tier in darkness/moonlight; sustain 1d3 rds, then recheck.", "homebrew": true}
    ]
  },

  {
    "name": "Halfling",
    "category": "Demihuman",
    "requirements": {"DEX": 11},
    "prime_requisites": ["DEX"],
    "alignment": "Lawful/Neutral typically",
    "hit_die": "1d6",
    "max_level": 8,
    "armor_allowed": "Sized armor; shields",
    "weapons_allowed": "Small weapons; missiles",
    "physicalDescription": { "male": "small and stout with curly hair and a friendly, round face", "female": "small and stout with curly hair and a cheerful disposition" },
    "spellcasting": null,
    "abilities": [
      {"name": "Lucky", "level": 1, "desc": "1/day reroll a failed save or Hide d6 check.", "homebrew": true},
      {"name": "Stout Heart", "level": 1, "desc": "+2 saves vs magical charm/domination/possession/compulsion; stacks with racial saves.", "homebrew": true},
      {"name": "Terrain Hiding", "level": 1, "desc": "Forest 5-in-6; urban 4-in-6; dungeon/interior 3-in-6; else 1-in-6; sustain 1d3 rds, then recheck.", "homebrew": true},
      {"name": "Underfoot Defense", "level": 1, "desc": "Creatures larger than human-sized suffer -1 to hit you in melee.", "homebrew": true}
    ]
  },

  {
    "name": "Half-Elf",
    "category": "Demihuman",
    "requirements": {"CHA": 11},
    "prime_requisites": ["CHA"],
    "alignment": "Any",
    "hit_die": "1d6",
    "max_level": 12,
    "armor_allowed": "Any; shields",
    "weapons_allowed": "All",
    "physicalDescription": { "male": "a blend of human robustness and elven grace, with slightly pointed ears", "female": "a blend of human curves and elven elegance, with slightly pointed ears" },
    "spellcasting": {"list": "Magic-User", "starts_at_level": 2, "highest_spell_level": 4, "notes": "Cannot cast in metal armor.", "homebrew": true, "randomStartingSpell": true, "default_spell": "Read Magic", "bonus_spell_ability": "INT", "caster_type": "Arcane", "spell_list_keys": ["Magic-User"]},
    "abilities": [
      {"name": "Low-Light Vision", "level": 1, "desc": "Replaces infravision.", "homebrew": true},
      {"name": "Mixed Finesse", "level": 1, "desc": "Use DEX mod for attack/damage with elven or human weapons.", "homebrew": true},
      {"name": "See Through Pretense", "level": 1, "desc": "1-in-6 chance to passively detect lies, disguises, or hidden motives during conversation.", "homebrew": true},
      {"name": "Keen Awareness", "level": 1, "desc": "When surprised with the party, roll 1d6; you are surprised only on 1-3.", "homebrew": true},
      {"name": "Diplomat", "level": 1, "desc": "+1 reaction from creatures not hostile to humans/elves. Once per encounter during parley/negotiation, may reroll a Morale check; new result stands.", "homebrew": true},
      {"name": "Sleep/Paralysis Immunity", "level": 1, "desc": "Immune to magical sleep and paralysis.", "homebrew": true},
      {"name": "Sylvan Sense", "level": 1, "desc": "1 turn: held item is arcane? no properties.", "homebrew": true}
    ]
  },

  {
    "name": "Half-Orc",
    "category": "Demihuman",
    "requirements": {"CON": 11},
    "prime_requisites": ["CON"],
    "alignment": "Any (often Chaotic)",
    "hit_die": "1d6",
    "max_level": 10,
    "armor_allowed": "Any; shields",
    "weapons_allowed": "All",
    "physicalDescription": { "male": "powerfully built with greyish skin, a prominent jaw, and coarse hair", "female": "tall and strong with greyish skin, a determined jaw, and coarse hair" },
    "spellcasting": null,
    "abilities": [
      {"name": "Low-Light Vision", "level": 1, "desc": "See better in dim light.", "homebrew": true},
      {"name": "Grim Tenacity", "level": 1, "desc": "At 0 hp: save vs Death to remain conscious and act until end of next round or -10 hp; on failure, drop and begin dying.", "homebrew": true},
      {"name": "Stubborn Vitality", "level": 1, "desc": "When losing CON from ≤0 hp, reduce loss by 1; +1 at 5th and 9th.", "homebrew": true},
      {"name": "Brutal Grapple", "level": 1, "desc": "Unarmed/grapple deals 1d4 (may forgo).", "homebrew": true}
    ]
  },

  {
    "name": "Svirfneblin",
    "category": "Demihuman",
    "requirements": {"INT": 11},
    "prime_requisites": ["INT"],
    "alignment": "Neutral",
    "hit_die": "1d6",
    "max_level": 8,
    "armor_allowed": "Leather; shields",
    "weapons_allowed": "Light weapons; crossbows common",
    "physicalDescription": { "male": "small, wiry, and bald with grey, rocky skin", "female": "small, tough, and bald with grey, rocky skin" },
    "spellcasting": {"list": "Innate", "starts_at_level": 1},
    "abilities": [
      {"name": "Stone Camouflage", "level": 1, "desc": "Motionless against stone underground: 4-in-6 chance to be unnoticed by creatures without infravision or tremorsense.", "homebrew": true},
      {"name": "Gem Sense", "level": 1, "desc": "1 turn: evaluate gem value, detect magical alteration/illusion; sense gem veins within 30' without detail.", "homebrew": true},
      {"name": "Sure-Footed", "level": 1, "desc": "Half damage from falls on rock/earth; save vs Breath to catch a rocky edge.", "homebrew": true}
    ]
  },

  {
    "name": "Acrobat",
    "category": "Advanced",
    "requirements": {"DEX": 13, "STR": 9},
    "prime_requisites": ["DEX"],
    "alignment": "Any",
    "hit_die": "1d6",
    "max_level": 14,
    "armor_allowed": "Leather or lighter; no shields",
    "weapons_allowed": "As thief plus staff",
    "spellcasting": null,
    "skill_type": "acrobat",
    "abilities": [
      {"name": "Acrobat Skills", "level": 1, "desc": "Skills use a percentile system. Starts with: Climb Sheer Surfaces 40%, Falling 25%, Tightrope Walking 40%, Hide/Move Silently 10%. Gains 2 increases (+15% each) to different skills per level after 1st. Caps: Climb/Tightrope 100%, others 70%.", "homebrew": true, "hide_from_list": true},
      {"name": "Evasive Instinct", "level": 1, "desc": "1/day reroll a failed save vs Breath or Spells/Wands/Staves if unimpeded and not surprised.", "homebrew": true},
      {"name": "Dodge Die", "level": 1, "desc": "When hit: roll d4 to AC; if beats attack, take 1 dmg; die scales d6 @ Lv5, d8 @ Lv9, d10 @ Lv13; disabled if prone/grappled/impeded.", "homebrew": true},
      {"name": "Tumbling Strike", "level": 1, "desc": "Acrobatics (Falling) check or Charge before attack: on success, x2 dmg (+4 if unaware); on fail, hit deals 1 dmg and no more tumbling this encounter.", "homebrew": true}
    ]
  },

  {
    "name": "Assassin",
    "category": "Advanced",
    "requirements": {"DEX": 13, "INT": 9},
    "prime_requisites": ["DEX"],
    "alignment": "Neutral/Chaotic",
    "hit_die": "1d6",
    "max_level": 14,
    "armor_allowed": "Leather; small shields",
    "weapons_allowed": "Thief list + garotte/poisons",
    "spellcasting": null,
    "skill_type": "thief",
    "abilities": [
      {"name": "Assassination Scaling", "level": 1, "desc": "On save success: dmg x2@5, x3@9, x4@13; from 10th: target save -1 per level above 9.", "homebrew": true},
      {"name": "Skill Track (Thief conv.)", "level": 1, "desc": "Climb as thief; L1 +2 increases; +1 per level thereafter.", "homebrew": true, "hide_from_list": true}
    ]
  },

  {
    "name": "Barbarian",
    "category": "Advanced",
    "requirements": {"STR": 13, "CON": 9},
    "prime_requisites": ["STR"],
    "alignment": "Any (often Chaotic)",
    "hit_die": "1d8",
    "max_level": 14,
    "armor_allowed": "Light/medium early; shields",
    "weapons_allowed": "All",
    "spellcasting": null,
    "skill_type": "barbarian",
    "abilities": [
      {"name": "Damage Reduction", "level": 1, "desc": "Reduce nonmagical damage by 1; by 2 at 9th (min 1).", "homebrew": true},
      {"name": "Skill Track (Wilderness)", "level": 1, "desc": "Skills: Climb (25%), Hide in Undergrowth (10%), Move Silently (10%). No increases at L1. L2-9: +1 increase/lvl. L10+: +2 increases/lvl. Each adds 15%. Caps: Climb 85%; Hide in Undergrowth 70%; Move Silently 70%.", "homebrew": true, "hide_from_list": true},
      {"name": "Battle Senses", "level": 1, "desc": "Surprised/unaware vs you only +2 to hit; save vs Death to negate x2 damage in darkness/surprise.", "homebrew": true},
      {"name": "Charge Fury", "level": 1, "desc": "+2 to hit on charge and +2 + STR to damage; may re-charge after dropping a foe.", "homebrew": true}
    ]
  },

  {
    "name": "Bard",
    "category": "Advanced",
    "requirements": {"CHA": 13, "DEX": 9},
    "prime_requisites": ["CHA"],
    "alignment": "Non-Lawful",
    "hit_die": "1d6",
    "max_level": 14,
    "armor_allowed": "Leather; small shields",
    "weapons_allowed": "Thief list + shortbows",
    "spellcasting": {"list": "Scroll dabbling", "starts_at_level": 2},
    "skill_type": "bard",
    "abilities": [
      {"name": "Battle Songs", "level": 1, "desc": "On initiative choose: sing (+2 ally Morale) or play (foes -2 to hit unless targeting you).", "homebrew": true},
      {"name": "Stunning Flourish", "level": 1, "desc": "On charge hit, may deal 1 dmg; target save vs Spells or lose next turn; others get +2 to hit until it acts.", "homebrew": true},
      {"name": "Bardic Knowledge", "level": 1, "desc": "1 turn: obscure fact 1-in-6 (then helpful 2-in-6; a roll of 6 makes it wrong); improves to 2/6@5, 3/6@9, 4/6@13.", "homebrew": true},
      {"name": "Bard Skills", "level": 1, "desc": "Skills: Pick Pockets (10%), Move Silently (10%), Hide in Shadows (10%), Hear Noise (1-in-6). Starts with 1 increase at L1, gains 1 increase each level after. Each adds +15% or +1 to Hear. Max 1 increase/skill/lvl. Caps: Hear 5-in-6, others 70%.", "homebrew": true, "hide_from_list": true}
    ]
  },

  {
    "name": "Druid",
    "category": "Advanced",
    "requirements": {"WIS": 13, "CHA": 9},
    "prime_requisites": ["WIS"],
    "alignment": "Neutral",
    "hit_die": "1d6",
    "max_level": 14,
    "armor_allowed": "Leather; wooden shields",
    "weapons_allowed": "Clubs, daggers, spears, scimitars, slings, staffs",
    "spellcasting": {"list": "Druid", "starts_at_level": 1, "highest_spell_level": 5, "knowsAllSpells": true, "bonus_spell_ability": "WIS", "caster_type": "Divine", "spell_list_keys": ["Druid"]},
    "abilities": [
      {"name": "Favored Terrain Vow", "level": 1, "desc": "Bind to protect one terrain; may seek new one via deed and circle blessing.", "homebrew": true},
      {"name": "Herbal Salves", "level": 1, "desc": "In favored terrain: heal 1d3 and double natural healing; 1/creature/day.", "homebrew": true},
      {"name": "Antivenom Craft", "level": 1, "desc": "Cure poison 5-in-6; -1 tier per poison level above I; 0-in-6 means impossible.", "homebrew": true},
      {"name": "Wild Bonds", "level": 1, "desc": "-4 Morale to hire non-animals; +2 when recruiting/calming animals; can amass animal companions within hireling limits.", "homebrew": true},
      {"name": "Animal Companion", "level": 1, "desc": "Native to terrain; treat as henchman; HD <= ceil(1/3 druid HD); replace in 1d4 weeks per HD lost.", "homebrew": true}
    ]
  },

  {
    "name": "Illusionist",
    "category": "Advanced",
    "requirements": {"INT": 13, "DEX": 9},
    "prime_requisites": ["INT"],
    "alignment": "Any",
    "hit_die": "1d4",
    "max_level": 14,
    "armor_allowed": "None",
    "weapons_allowed": "Daggers, staffs",
    "spellcasting": {"list": "Illusionist", "starts_at_level": 1, "highest_spell_level": 5, "randomStartingSpell": true, "default_spell": "Phantasmal Force", "bonus_spell_ability": "INT", "caster_type": "Arcane", "spell_list_keys": ["Illusionist"]},
    "grog_eligible": true,
    "abilities": [
      {"name": "Minor Conjurations", "level": 1, "desc": "1 hour to make small object/creature illusion; 3/6 behave, 2/6 tactile, 1/6 sound/scent; no damage; pop on damage; all end if caster out.", "homebrew": true},
      {"name": "Illusion Savvy", "level": 1, "desc": "Illusionists can disbelieve by sight alone (Wis check); others need interaction.", "homebrew": true},
      {"name": "Arcane/Illusion Sense", "level": 1, "desc": "1 turn: held item arcane + properties; detect illusions in 30' up to your max spell level; curses stay hidden.", "homebrew": true}
    ]
  },

  {
    "name": "Knight",
    "category": "Advanced",
    "requirements": {"STR": 13, "CHA": 9},
    "prime_requisites": ["STR"],
    "alignment": "Lawful",
    "hit_die": "1d8",
    "max_level": 14,
    "armor_allowed": "Any; shields",
    "weapons_allowed": "All",
    "spellcasting": null,
    "prefers_warhorse": true,
    "abilities": [
      {"name": "Noble Standing", "level": 1, "desc": "May default to landless noble; inheritance quest; if claimed, keep at current level becomes available.", "homebrew": true},
      {"name": "Retinue", "level": 1, "desc": "+2 hire/attract/interview; +1 gauge talent; +2 hirelings now, +1 at 5th and 9th.", "homebrew": true},
      {"name": "Shield Stand", "level": 1, "desc": "Declare before initiative; no move this round; shield bonus becomes +2 AC and +1 to parry for you and adjacent allies wielding shields until next turn.", "homebrew": true},
      {"name": "Battle Oath", "level": 1, "desc": "Once/encounter before initiative: taunt opposite alignment to focus you; while standing, hirelings get +2 Morale.", "homebrew": true}
    ]
  },

  {
    "name": "Paladin",
    "category": "Advanced",
    "requirements": {"CHA": 13, "WIS": 9},
    "prime_requisites": ["CHA"],
    "alignment": "Lawful",
    "hit_die": "1d8",
    "max_level": 14,
    "armor_allowed": "Any; shields",
    "weapons_allowed": "All",
    "spellcasting": {"list": "Cleric", "starts_at_level": 9, "highest_spell_level": 2, "knowsAllSpells": true, "bonus_spell_ability": "WIS", "caster_type": "Divine", "spell_list_keys": ["Cleric"]},
    "prefers_warhorse": true,
    "abilities": [
      {"name": "Detect Evil", "level": 1, "desc": "Sense malevolent presence within 60'."},
      {"name": "Lay on Hands", "level": 1, "desc": "Heal a small amount per day."},
      {"name": "Donation Zeal", "level": 1, "desc": "1.5× XP for donated treasure (no max).", "homebrew": true},
      {"name": "Dedication to Law & Good", "level": 1, "desc": "+1 to hit vs evil HD ≥ yours; +2 damage vs evil HD < yours.", "homebrew": true},
      {"name": "Smite Evil", "level": 5, "desc": "On nat 20 vs inherently evil: max damage + extra damage roll; at 9th smite on nat 19, at 14th on nat 18.", "homebrew": true},
      {"name": "Divert the Wicked", "level": 1, "desc": "Taunt nearby evil to target you; smart foes need apt taunt.", "homebrew": true},
      {"name": "Sanctified Sense", "level": 1, "desc": "1 turn: detect evil enchantments/creatures presence; test held item for inherent evil/taint.", "homebrew": true},
      {"name": "Clean of Body", "level": 1, "desc": "Immune to common diseases; lay on hands cures simple (2-in-6) or virulent (1-in-6); recover in 3d6 days.", "homebrew": true}
    ]
  },

  {
    "name": "Ranger",
    "category": "Advanced",
    "requirements": {"STR": 13, "WIS": 9},
    "prime_requisites": ["STR","WIS"],
    "alignment": "Any Good",
    "hit_die": "1d8",
    "max_level": 14,
    "armor_allowed": "Any; shields",
    "weapons_allowed": "All",
    "spellcasting": {"list": "Cleric (limited)", "starts_at_level": 9, "highest_spell_level": 2, "knowsAllSpells": true, "bonus_spell_ability": "WIS", "caster_type": "Divine", "spell_list_keys": ["Cleric"]},
    "skill_type": "ranger",
    "abilities": [
      {"name": "Favored Terrain", "level": 1, "desc": "Choose one (e.g., home woods); fixed.", "homebrew": true},
      {"name": "Common Enemies", "level": 1, "desc": "Designate two enemy groups tied to terrain (e.g., goblinoids, orcs).", "homebrew": true},
      {"name": "No Tithes", "level": 1, "desc": "Donation requirement removed.", "homebrew": true},
      {"name": "Fleet in Terrain", "level": 1, "desc": "+10' speed in favored terrain if unimpeded.", "homebrew": true},
      {"name": "Terrain Skills", "level": 1, "desc": "Skills only function in favored terrain. Starts with Hear Noise 1-in-6, Hide/Move Silently 10%. No increases at Level 1. Starting with Level 2, the Ranger gains 1 increase each level. Each adds +15% or +1 to Hear. Max 1 increase/skill/lvl. Caps: Hear 5-in-6, others 70%.", "homebrew": true, "hide_from_list": true},
      {"name": "Enemy Slayer", "level": 1, "desc": "Assassinate common enemies: +4 to hit when unaware; x2 damage; +1 damage always vs them.", "homebrew": true},
      {"name": "Vigilant Guide", "level": 1, "desc": "Idle watch lowers party surprise to 1-in-6; prepared hideout raises enemy surprise to 3-in-6.", "homebrew": true},
      {"name": "Rough Company", "level": 1, "desc": "-2 Morale to recruit/keep non-animal or out-of-terrain humanoids; +2 with local animals.", "homebrew": true},
    ]
  }
]
