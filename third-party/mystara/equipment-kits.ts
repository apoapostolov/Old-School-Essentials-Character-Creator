import type { EquipmentKit } from '../../types';

export const EQUIPMENT_KITS: EquipmentKit[] = [
  {
    id: 'mystara-karameikan-border-guard',
    name: "Karameikan Border Guard",
    type: 'Martial',
    description: 'The standard issue gear for a soldier patroling the wild borders of the Grand Duchy.',
    variants: [
      {
        name: 'Normal',
        cost: 75,
        items: ['karameikan-short-sword', 'chainmail', 'thyatian-scutum', 'rations-standard', 'waterskin', 'backpack']
      }
    ]
  },
  {
    id: 'mystara-traladaran-villager',
    name: "Traladaran Villager's Bundle",
    type: 'Specialized',
    description: 'The simple possessions of a native Traladaran, including a folk charm for protection.',
    variants: [
      {
        name: 'Normal',
        cost: 20,
        items: ['club', 'sling', 'sling-stones', 'tradaralan-folk-charm', 'rations-standard', 'sack-small']
      }
    ]
  },
  {
    id: 'mystara-specularium-agent-pouch',
    name: "Specularium Agent's Pouch",
    type: 'Specialized',
    description: "A discreet kit for an agent of the Duke's intelligence service.",
    variants: [
      {
        name: 'Normal',
        cost: 80,
        items: ['dagger', 'short-sword', 'leather-armor', 'specularium-cloak', 'black-eagle-barony-poison', 'rope-50ft', 'thieves-tools']
      }
    ]
  }
];
