import type { EquipmentKit } from '../../types';

export const EQUIPMENT_KITS: EquipmentKit[] = [
  {
    id: 'shrike-whalers-kit',
    name: "Whaler's Kit",
    type: 'Martial',
    description: 'Gear for a sea-faring hunter from the cold north.',
    variants: [
      { 
        name: 'Harpooner', 
        cost: 45, 
        items: ['harpoon', 'leather-armor', 'hand-axe', 'rope-50ft', 'hardtack-week', 'backpack'] 
      },
      {
        name: 'Lancer',
        cost: 40,
        items: ['whaling-lance', 'leather-armor', 'belaying-pin', 'grog-rum-bottle', 'hardtack-week', 'backpack']
      }
    ]
  },
  {
    id: 'shrike-ships-carpenter',
    name: "Ship's Carpenter's Tools",
    type: 'Specialized',
    description: 'A set of tools for maintaining a sea vessel, along with a trusty hand axe.',
    variants: [
      {
        name: 'Normal',
        cost: 25,
        items: ['hand-axe', 'hammer-small', 'iron-spikes-12', 'rope-50ft', 'lantern', 'oil-flask']
      }
    ]
  },
  {
    id: 'shrike-captains-valuables',
    name: "Captain's Valuables",
    type: 'Specialized',
    description: 'The essential navigational and personal items for a ship captain.',
    variants: [
      {
        name: 'Normal',
        cost: 360,
        items: ['sextant', 'spyglass', 'sword', 'grog-rum-bottle', 'sack-small']
      }
    ]
  }
];
