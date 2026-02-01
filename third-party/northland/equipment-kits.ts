import type { EquipmentKit } from '../../types';

export const EQUIPMENT_KITS: EquipmentKit[] = [
  {
    id: 'northland-jarls-war-gear',
    name: "Jarl's War-Gear",
    type: 'Martial',
    description: "The fine wargear of a Norse chieftain, signifying wealth and power.",
    variants: [
      {
        name: 'Normal',
        cost: 110,
        items: ['chainmail', 'valsgarde-helmet', 'round-shield', 'bearded-axe', 'wolf-pelt-cloak']
      }
    ]
  },
  {
    id: 'northland-viking-raiders-kit',
    name: "Viking Raider's Kit",
    type: 'Martial',
    description: 'The practical equipment of a Norse warrior setting out on a longship.',
    variants: [
      {
        name: 'Normal',
        cost: 40,
        items: ['leather-armor', 'round-shield', 'bearded-axe', 'seax', 'throwing-spear', 'rations-standard', 'backpack']
      }
    ]
  },
  {
    id: 'northland-skalds-travel-pack',
    name: "Skald's Travel Pack",
    type: 'Specialized',
    description: "The possessions of a wandering poet and storyteller, valued for wisdom over wealth.",
    variants: [
      {
        name: 'Normal',
        cost: 60,
        items: ['dagger', 'seax', 'wolf-pelt-cloak', 'drinking-horn', 'rune-stones-pouch', 'mead-waterskin', 'rations-standard']
      }
    ]
  }
];