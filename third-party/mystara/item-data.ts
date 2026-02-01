import type { Item } from '../../types';

export const ITEMS: Record<string, Item> = {
  'thyatian-scutum': {
    name: 'Thyatian Scutum',
    cost: 15,
    weight: 120,
    category: 'Armor',
    ascending_ac: 1,
    description: "A large, rectangular shield used by Thyatian legionaries. Offers superior protection but is cumbersome.",
    carry_type: 'worn'
  },
  'karameikan-short-sword': {
    name: 'Karameikan Short Sword',
    cost: 9,
    weight: 30,
    category: 'Weapon',
    damage: '1d6',
    description: "The standard-issue gladius-style short sword of the Karameikan military.",
    isMelee: true,
    carry_type: 'worn'
  },
  'tradaralan-folk-charm': {
    name: 'Traladaran Folk Charm',
    cost: 5,
    weight: 1,
    category: 'Gear',
    description: "A small, carved wooden charm said to ward off the evil eye and forest spirits.",
    carry_type: 'worn'
  },
  'black-eagle-barony-poison': {
    name: 'Black Eagle Poison',
    cost: 50,
    weight: 10,
    category: 'Poison',
    description: "A slow-acting but effective ingested poison (Type II) favored by agents of the Black Eagle Barony.",
    carry_type: 'stowed'
  },
  'elf-of-alfheim-pipeweed': {
    name: 'Alfheim Pipeweed (pouch)',
    cost: 10,
    weight: 5,
    category: 'Gear',
    description: "A pouch of aromatic pipeweed from the elven forests, known for its calming effects.",
    carry_type: 'stowed'
  },
  'dwarven-mining-pick': {
    name: 'Dwarven Mining Pick',
    cost: 8,
    weight: 60,
    category: 'Weapon',
    damage: '1d6',
    description: "A heavy, well-balanced pick that serves as both a tool and a formidable weapon.",
    isMelee: true,
    carry_type: 'worn'
  },
  'hin-slingshot': {
    name: 'Hin Slingshot',
    cost: 3,
    weight: 20,
    category: 'Weapon',
    damage: '1d4',
    description: "A masterfully crafted slingshot from the Five Shires, with greater range and accuracy.",
    isMissile: true,
    ranges: [50, 100, 200],
    carry_type: 'worn'
  },
  'specularium-cloak': {
    name: 'Specularium Cloak',
    cost: 20,
    weight: 30,
    category: 'Gear',
    description: "A dark grey cloak with a hidden hood, the uniform of the Duke's intelligence service.",
    carry_type: 'worn'
  },
  'threshold-river-ale': {
    name: 'Threshold River Ale (stein)',
    cost: 1,
    weight: 20,
    category: 'Gear',
    description: "A stein of the famous, hearty ale brewed in the town of Threshold.",
    carry_type: 'stowed'
  },
  'vyalian-lute': {
    name: 'Vyalian Lute',
    cost: 40,
    weight: 40,
    category: 'Gear',
    description: "A fine lute of Vyalian make, prized by bards for its clear, resonant tone.",
    carry_type: 'stowed'
  }
};