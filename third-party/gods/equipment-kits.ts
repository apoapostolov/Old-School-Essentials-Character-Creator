import type { EquipmentKit } from '../../types';

export const EQUIPMENT_KITS: EquipmentKit[] = [
  {
    id: 'gods-savage-raiders-haul',
    name: "Savage Raider's Haul",
    type: 'Martial',
    description: "The gear of a northern barbarian, taken from battle and the wilderness.",
    variants: [
      {
        name: 'Normal',
        cost: 60,
        items: ['cimmerian-war-axe', 'horned-helmet', 'loincloth-fur', 'rations-iron', 'great-ape-pelt']
      }
    ]
  },
  {
    id: 'gods-forgotten-sorcerers-cache',
    name: "Forgotten Sorcerer's Cache",
    type: 'Specialized',
    description: "The tools of a sorcerer who delves into forbidden lore and ancient evils.",
    variants: [
      {
        name: 'Normal',
        cost: 130,
        items: ['stygian-short-sword', 'black-lotus-powder', 'ancient-map-fragment', 'jeweled-idol', 'sack-small']
      }
    ]
  },
  {
    id: 'gods-hyperborean-hunters-pack',
    name: "Hyperborean Hunter's Pack",
    type: 'Martial',
    description: 'Equipment for a hunter who stalks great beasts in the frozen wastes.',
    variants: [
      {
        name: 'Normal',
        cost: 85,
        items: ['spear', 'long-bow', 'arrows-20', 'hand-axe', 'great-ape-pelt', 'rations-iron', 'rope-50ft', 'backpack']
      }
    ]
  }
];
