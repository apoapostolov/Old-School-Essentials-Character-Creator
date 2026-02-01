// --- equipment-kits.ts ---

import type { EquipmentKit } from './types';

export const EQUIPMENT_KITS: EquipmentKit[] = [
  // --- Martial Kits (formerly Main) ---
  // Basic Class Kits
  {
    id: 'clerics-kit',
    name: "Cleric's Kit",
    type: 'Martial',
    description: 'The wargear of a holy warrior. Includes a mace, heavy armor, a shield, and a holy symbol.',
    variants: [
      { name: 'Normal', cost: 90, items: ['mace', 'chainmail', 'shield', 'holy-symbol', 'backpack', 'rations-standard', 'torches-6'] }
    ]
  },
  {
    id: 'fighters-kit',
    name: "Fighter's Kit",
    type: 'Martial',
    description: 'Standard issue gear for a professional warrior. Includes chainmail, shield, sword, and a shortbow.',
    variants: [
      { name: 'Normal', cost: 100, items: ['chainmail', 'shield', 'sword', 'short-bow', 'arrows-20', 'backpack', 'rations-standard', 'torches-6', 'rope-50ft', 'waterskin'] }
    ]
  },
  {
    id: 'wizards-kit',
    name: "Wizard's Kit",
    type: 'Martial',
    description: 'A starting package for an arcane spellcaster, including basic tools for survival and study.',
    variants: [
      { name: 'Normal', cost: 40, items: ['dagger', 'staff', 'backpack', 'component-pouch', 'rations-iron', 'lantern', 'oil-flask', 'torches-6', 'waterskin'] }
    ]
  },
  {
    id: 'thiefs-kit',
    name: "Thief's Kit",
    type: 'Martial',
    description: 'Essential equipment for a skulker and burglar. Comes with leather armor, tools, and weapons.',
    variants: [
      { name: 'Normal', cost: 65, items: ['leather-armor', 'short-sword', 'dagger', 'sling', 'sling-stones', 'thieves-tools', 'backpack', 'rope-50ft', 'torches-6', 'sack-small'] }
    ]
  },
  // Generic Kits
  {
    id: 'explorers-kit',
    name: "Explorer's Kit",
    type: 'Martial',
    description: 'A versatile kit for a wilderness traveler. Features chainmail, a spear, and a shortbow.',
    variants: [
      { name: 'Normal', cost: 80, items: ['chainmail', 'spear', 'short-bow', 'arrows-20', 'backpack', 'sack-small', 'torches-6', 'waterskin'] }
    ]
  },
  {
    id: 'scouts-kit',
    name: "Scout's Kit",
    type: 'Martial',
    description: 'Lightweight gear for a fast-moving scout. Leather armor, sling, and useful adventuring items.',
    variants: [
      { name: 'Normal', cost: 35, items: ['leather-armor', 'sling', 'sling-stones', 'dagger', 'backpack', 'rope-50ft', 'iron-spikes-12', 'rations-standard'] }
    ]
  },
  // Advanced Class Kits
  {
    id: 'barbarian-kit',
    name: "Barbarian Kit",
    type: 'Martial',
    description: 'The gear of a hearty warrior from the wilds. Includes leather armor, a battle axe, and iron rations.',
    variants: [
      { name: 'Normal', cost: 55, items: ['leather-armor', 'battle-axe', 'spear', 'sling', 'sling-stones', 'dagger', 'backpack', 'rations-iron', 'torches-6'] }
    ]
  },
  {
    id: 'knights-kit',
    name: "Knight's Kit",
    type: 'Martial',
    description: 'A streamlined kit for a mounted warrior. Includes plate armor, shield, and lance.',
    variants: [
      { name: 'Normal', cost: 90, items: ['plate-mail', 'shield', 'short-sword', 'lance', 'backpack', 'rations-standard', 'waterskin'] }
    ]
  },
  {
    id: 'illusionists-kit',
    name: "Illusionist's Kit",
    type: 'Martial',
    description: 'Gear for a creator of deception and trickery, focusing on utility and survival.',
    variants: [
      { name: 'Normal', cost: 40, items: ['dagger', 'sling', 'sling-stones', 'backpack', 'rations-iron', 'mirror-steel', 'torches-6', 'rope-50ft', 'lantern'] }
    ]
  },
  {
    id: 'woodland-defenders-kit',
    name: "Woodland Defender's Kit",
    type: 'Martial',
    description: "A martial package tailored for Druids, Rangers, or anyone restricted to wooden/natural equipment.",
    variants: [
        { name: 'Normal', cost: 50, items: ['leather-armor', 'shield', 'spear', 'club', 'sling', 'sling-stones', 'backpack', 'rations-standard', 'rope-50ft', 'torches-6'] }
    ]
  },
  {
    id: 'mercenary-spearmans-kit',
    name: "Mercenary Spearman's Kit",
    type: 'Martial',
    description: "Cheap but practical soldier’s loadout focused on polearms and battlefield mobility.",
    variants: [
        { name: 'Normal', cost: 80, items: ['chainmail', 'shield', 'spear', 'hand-axe', 'sling', 'sling-stones', 'backpack', 'rations-iron'] }
    ]
  },
  {
    id: 'border-raiders-kit',
    name: "Border Raider's Kit",
    type: 'Martial',
    description: "A lightly-armored skirmisher set, suited for guerrilla tactics.",
    variants: [
        { name: 'Normal', cost: 65, items: ['leather-armor', 'short-bow', 'arrows-20', 'dagger', 'backpack', 'rations-standard', 'torches-6'] }
    ]
  },
  
  // --- Specialized Adventuring Gear Kits ---
  {
    id: 'dungeon-delvers-pack',
    name: "Dungeon Delver's Pack",
    type: 'Specialized',
    description: 'Essential tools for navigating and overcoming obstacles in dungeons and ruins.',
    variants: [
      { name: 'Normal', cost: 30, items: ['crowbar', 'iron-spikes-12', 'hammer-small', 'torches-6', 'rope-50ft', 'backpack', 'lantern'] }
    ]
  },
  {
    id: 'lightbringers-pack',
    name: "Lightbringer's Pack",
    type: 'Specialized',
    description: 'A comprehensive collection of light sources to keep the darkness at bay.',
    variants: [
      { name: 'Normal', cost: 25, items: ['lantern', 'oil-flask', 'oil-flask', 'oil-flask', 'tinder-box', 'torches-6', 'torches-6', 'mirror-steel', 'rope-50ft'] }
    ]
  },
  {
    id: 'undead-hunters-pack',
    name: "Undead Hunter's Pack",
    type: 'Specialized',
    description: 'Tools for confronting vampires, ghouls, and other restless dead.',
    variants: [
      { name: 'Normal', cost: 40, items: ['stakes-and-mallet', 'garlic', 'holy-water', 'wolfsbane'] },
      { name: 'Budget', cost: 5, items: ['garlic', 'stakes-and-mallet'] }
    ]
  },
  {
    id: 'climbers-pack',
    name: "Climber's Pack",
    type: 'Specialized',
    description: 'Gear for scaling walls and traversing chasms. With normal and premium options.',
    variants: [
      { name: 'Normal', cost: 15, items: ['rope-50ft', 'hammer-small', 'iron-spikes-12', 'backpack', 'lantern'] },
      { name: 'Premium', cost: 40, items: ['grappling-hook', 'rope-50ft', 'hammer-small', 'iron-spikes-12', 'backpack', 'lantern'] }
    ]
  },
  {
    id: 'explorers-survival-pack',
    name: "Explorer's Survival Pack",
    type: 'Specialized',
    description: 'Sustenance and tools for long journeys through untamed wilderness.',
    variants: [
      { name: 'Normal', cost: 30, items: ['rations-iron', 'waterskin', 'sack-large', 'pole-10ft', 'lantern', 'tinder-box'] }
    ]
  },
  {
    id: 'burglars-pack',
    name: "Burglar's Pack",
    type: 'Specialized',
    description: 'A small, focused kit for second-story work, containing only the essentials.',
    variants: [
      { name: 'Normal', cost: 25, items: ['thieves-tools', 'sack-small', 'rope-50ft'] }
    ]
  },
  {
    id: 'assassins-pack',
    name: "Assassin's Pack",
    type: 'Specialized',
    description: "A deadly kit containing a dagger, poisons, and tools for infiltration.",
    variants: [
      { name: 'Normal', cost: 40, items: ['dagger', 'poison-bloodstream-1', 'poison-ingested-1', 'thieves-tools', 'sack-small'] }
    ]
  },
  {
    id: 'healers-pack',
    name: "Healer's Pack",
    type: 'Specialized',
    description: "An emergency restorative kit with holy water, wine, and other supplies.",
    variants: [
      { name: 'Normal', cost: 35, items: ['holy-water', 'wine-2-pints', 'sack-small', 'backpack', 'garlic'] }
    ]
  },
  {
    id: 'hunters-pack',
    name: "Hunter's Pack",
    type: 'Specialized',
    description: "Equipment for tracking, trapping, and surviving in the wilderness.",
    variants: [
      { name: 'Normal', cost: 25, items: ['snare-trap', 'rations-standard', 'rope-50ft', 'sack-large', 'waterskin', 'lantern'] }
    ]
  },
];