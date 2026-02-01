import type { Item } from '../../types';

export const ITEMS: Record<string, Item> = {
  'cimmerian-war-axe': {
    name: 'Cimmerian War-Axe',
    cost: 15,
    weight: 60,
    category: 'Weapon',
    damage: '1d8',
    description: "A heavy, crude, but brutally effective axe favored by grim northern barbarians.",
    isMelee: true,
    carry_type: 'worn'
  },
  'serpent-scaled-shield': {
    name: 'Serpent-Scaled Shield',
    cost: 50,
    weight: 80,
    category: 'Armor',
    ascending_ac: 1,
    description: "A round shield covered in the iridescent scales of a giant serpent. Offers excellent protection.",
    carry_type: 'worn'
  },
  'black-lotus-powder': {
    name: 'Black Lotus Powder (dose)',
    cost: 100,
    weight: 1,
    category: 'Poison',
    description: "The dust of the infamous black lotus flower. When inhaled, causes visions and eventual death. (Ingested, Type IV).",
    carry_type: 'stowed'
  },
  'stygian-short-sword': {
    name: 'Stygian Short Sword',
    cost: 20,
    weight: 30,
    category: 'Weapon',
    damage: '1d6',
    description: "A bronze short sword with a distinctive, leaf-shaped blade, common among southern sorcerers.",
    isMelee: true,
    carry_type: 'worn'
  },
  'loincloth-fur': {
    name: 'Fur Loincloth & Harness',
    cost: 5,
    weight: 50,
    category: 'Armor',
    ascending_ac: 10, // Basically unarmored
    description: "Minimalist barbarian attire, offering more modesty than protection.",
    carry_type: 'worn'
  },
  'horned-helmet': {
    name: 'Horned Helmet',
    cost: 30,
    weight: 50,
    category: 'Armor',
    ascending_ac: 0, // No AC bonus, but provides head protection
    description: "An iron helm fitted with imposing horns. A symbol of a savage warrior.",
    carry_type: 'worn'
  },
  'zamorian-daggers': {
    name: 'Zamorian Daggers (pair)',
    cost: 10,
    weight: 20,
    category: 'Weapon',
    damage: '1d4',
    description: "A pair of perfectly balanced throwing daggers, favored by skulking thieves.",
    isMissile: true,
    carry_type: 'worn'
  },
  'ancient-map-fragment': {
    name: 'Ancient Map Fragment',
    cost: 200,
    weight: 1,
    category: 'Gear',
    description: "A piece of brittle parchment showing a forgotten city or treasure hoard.",
    carry_type: 'stowed'
  },
  'jeweled-idol': {
    name: 'Jeweled Idol',
    cost: 500,
    weight: 100,
    category: 'Gear',
    description: "A small, grotesque idol of some forgotten god, with glittering gems for eyes.",
    carry_type: 'stowed'
  },
  'great-ape-pelt': {
    name: 'Great Ape Pelt Cloak',
    cost: 75,
    weight: 150,
    category: 'Gear',
    description: "The thick, white fur of a great ape, worn as a heavy cloak. Provides excellent warmth.",
    carry_type: 'worn'
  }
};