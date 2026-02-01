import type { Item } from '../../types';

export const ITEMS: Record<string, Item> = {
  'bearded-axe': {
    name: 'Bearded Axe',
    cost: 8,
    weight: 50,
    category: 'Weapon',
    damage: '1d8',
    description: "A Viking axe with a long, hooked 'beard' that can be used to pull shields or weapons.",
    isMelee: true,
    carry_type: 'worn'
  },
  'round-shield': {
    name: 'Round Shield',
    cost: 12,
    weight: 100,
    category: 'Armor',
    ascending_ac: 1,
    description: "A classic Viking round shield, made of wood with an iron boss. Can be used to form a shield wall.",
    carry_type: 'worn'
  },
  'seax': {
    name: 'Seax',
    cost: 6,
    weight: 20,
    category: 'Weapon',
    damage: '1d6',
    description: "A long, single-edged knife or short sword, carried by all free Norsemen.",
    isMelee: true,
    carry_type: 'worn'
  },
  'drinking-horn': {
    name: 'Drinking Horn',
    cost: 3,
    weight: 15,
    category: 'Gear',
    description: "A polished horn from aurochs or cattle, used for drinking mead and ale.",
    carry_type: 'worn'
  },
  'valsgarde-helmet': {
    name: 'Valsgärde Helmet',
    cost: 50,
    weight: 60,
    category: 'Armor',
    ascending_ac: 0,
    description: "An ornate, crested helmet with a protective face guard, in the style of the Vendel-era chieftains.",
    carry_type: 'worn'
  },
  'norse-longbow': {
    name: 'Norse Longbow',
    cost: 45,
    weight: 30,
    category: 'Weapon',
    damage: '1d6',
    description: "A longbow made from yew, a powerful weapon for hunting and war.",
    isMissile: true,
    ranges: [70, 140, 210],
    carry_type: 'worn'
  },
  'rune-stones-pouch': {
    name: 'Rune Stones (pouch)',
    cost: 20,
    weight: 10,
    category: 'Gear',
    description: "A pouch containing carved stones or wood pieces with runes, used for divination.",
    carry_type: 'stowed'
  },
  'wolf-pelt-cloak': {
    name: 'Wolf Pelt Cloak',
    cost: 30,
    weight: 80,
    category: 'Gear',
    description: "A warm cloak made from the pelt of a northern wolf, fastened with a bronze pin.",
    carry_type: 'worn'
  },
  'mead-waterskin': {
    name: 'Mead (waterskin)',
    cost: 2,
    weight: 40,
    category: 'Gear',
    description: "A waterskin filled with sweet, potent honey mead.",
    carry_type: 'worn'
  },
  'throwing-spear': {
    name: 'Throwing Spear',
    cost: 4,
    weight: 30,
    category: 'Weapon',
    damage: '1d6',
    description: "A light spear balanced for throwing, often used in the opening volleys of a battle.",
    isMelee: true,
    isMissile: true,
    ranges: [25, 50, 75],
    carry_type: 'worn'
  }
};