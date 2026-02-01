import type { Item } from '../../types';

export const ITEMS: Record<string, Item> = {
  'harpoon': { 
    name: 'Harpoon', 
    cost: 8, 
    weight: 40, 
    category: 'Weapon', 
    description: "A heavy spear with a barbed tip, attached to a rope. Can be used to pull targets closer.", 
    damage: '1d8', 
    qualities: ['Brace', 'Thrown'], 
    isMelee: true, 
    isMissile: true, 
    ranges: [15, 30, 45],
    carry_type: 'worn'
  },
  'whaling-lance': {
    name: 'Whaling Lance',
    cost: 10,
    weight: 120,
    category: 'Weapon',
    damage: '1d10',
    description: "A very long, sharp polearm used for dispatching large sea creatures from a boat.",
    isMelee: true,
    qualities: ['Brace', 'Two-handed'],
    carry_type: 'worn'
  },
  'oilskin-coat': {
    name: 'Oilskin Coat',
    cost: 5,
    weight: 100,
    category: 'Armor',
    ascending_ac: 10, // Not armor, but provides weather protection
    description: "A heavy canvas coat treated with oil to be waterproof. Provides excellent protection from cold and rain.",
    carry_type: 'worn'
  },
  'sextant': {
    name: 'Sextant',
    cost: 250,
    weight: 30,
    category: 'Gear',
    description: "A navigational instrument used to measure the angle between the horizon and a celestial body.",
    carry_type: 'stowed'
  },
  'belaying-pin': {
    name: 'Belaying Pin',
    cost: 1,
    weight: 30,
    category: 'Weapon',
    damage: '1d4',
    description: "A heavy wooden pin used on sailing ships, which can serve as an improvised club.",
    isMelee: true,
    qualities: ['Blunt'],
    carry_type: 'worn'
  },
  'scrimshaw-knife': {
    name: 'Scrimshaw Knife',
    cost: 5,
    weight: 5,
    category: 'Gear',
    description: "A small, sharp knife used for carving bone or ivory.",
    carry_type: 'stowed'
  },
  'spyglass': {
    name: 'Spyglass',
    cost: 100,
    weight: 20,
    category: 'Gear',
    description: "A collapsible telescope for viewing distant objects.",
    carry_type: 'stowed'
  },
  'grog-rum-bottle': {
    name: 'Grog (Bottle)',
    cost: 1,
    weight: 20,
    category: 'Gear',
    description: "A bottle of cheap, watered-down rum. A sailor's staple.",
    carry_type: 'stowed'
  },
  'hardtack-week': {
    name: 'Hardtack (1 week)',
    cost: 3,
    weight: 70,
    category: 'Gear',
    description: "A week's supply of simple, unleavened biscuits. Extremely durable and bland.",
    carry_type: 'stowed'
  },
  'fishing-net': {
    name: 'Fishing Net (25 sq ft)',
    cost: 4,
    weight: 50,
    category: 'Gear',
    description: "A net for catching fish, which can also be used to ensnare creatures.",
    carry_type: 'stowed'
  }
};