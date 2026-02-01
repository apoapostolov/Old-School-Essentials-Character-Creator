import type { EquipmentKit } from '../../types';

export const EQUIPMENT_KITS: EquipmentKit[] = [
  {
    id: 'dolmenwood-moss-witchs-satchel',
    name: "Moss-Witch's Satchel",
    type: 'Specialized',
    description: 'A collection of reagents and trinkets for a practitioner of wood-magic.',
    variants: [
      {
        name: 'Normal',
        cost: 60,
        items: ['hag-finger-necklace', 'faerie-honey', 'bottle-of-moonlight', 'dagger', 'sack-small', 'rations-standard']
      }
    ]
  },
  {
    id: 'dolmenwood-wood-woses-gear',
    name: "Wood-Wose's Gear",
    type: 'Martial',
    description: 'The simple, savage gear of a wild man of the woods.',
    variants: [
      {
        name: 'Normal',
        cost: 30,
        items: ['club', 'briar-wolf-pelt', 'goat-man-horn', 'rations-iron', 'waterskin']
      }
    ]
  },
  {
    id: 'dolmenwood-breggle-herders-pack',
    name: "Breggle-Herder's Pack",
    type: 'Martial',
    description: 'The humble equipment of a Dolmenwood commoner, used to herding the foul-tempered breggle-folk.',
    variants: [
      {
        name: 'Normal',
        cost: 25,
        items: ['staff', 'leather-armor', 'sling', 'sling-stones', 'rations-standard', 'backpack']
      }
    ]
  }
];
