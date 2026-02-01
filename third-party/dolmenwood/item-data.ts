import type { Item } from '../../types';

export const ITEMS: Record<string, Item> = {
  'worm-hide-boots': {
    name: 'Worm-hide Boots',
    cost: 30,
    weight: 50,
    category: 'Armor',
    description: "Boots made from the supple hide of a giant purple worm. They are unnaturally quiet on stone.",
    ascending_ac: 0, // No AC bonus, special property
    carry_type: 'worn'
  },
  'goat-man-horn': {
    name: 'Goat-Man Horn',
    cost: 15,
    weight: 20,
    category: 'Gear',
    description: "A spiraled horn from a goat-man. Can be sounded to create a startling, bleating cry.",
    carry_type: 'stowed'
  },
  'faerie-honey': {
    name: 'Faerie Honey (jar)',
    cost: 50,
    weight: 10,
    category: 'Gear',
    description: "A small jar of shimmering honey. Eating a spoonful may cause vivid hallucinations or grant visions.",
    carry_type: 'stowed'
  },
  'hag-finger-necklace': {
    name: 'Hag Finger Necklace',
    cost: 25,
    weight: 5,
    category: 'Gear',
    description: "A grotesque necklace of several desiccated, long-nailed fingers. Wards off bad luck (or so they say).",
    carry_type: 'worn'
  },
  'briar-wolf-pelt': {
    name: 'Briar-Wolf Pelt',
    cost: 40,
    weight: 100,
    category: 'Gear',
    description: "The thorny pelt of a briar-wolf, which can be fashioned into a prickly cloak.",
    carry_type: 'worn'
  },
  'singing-sword': {
    name: 'Singing Sword',
    cost: 120,
    weight: 30,
    category: 'Weapon',
    damage: '1d6',
    description: "A short sword that hums a faint, melancholic tune when drawn. It is uncomfortably talkative.",
    isMelee: true,
    carry_type: 'worn'
  },
  'moss-covered-shield': {
    name: 'Moss-Covered Shield',
    cost: 15,
    weight: 100,
    category: 'Armor',
    ascending_ac: 1,
    description: "A standard wooden shield covered in a thick, living layer of moss.",
    carry_type: 'worn'
  },
  'bottle-of-moonlight': {
    name: 'Bottle of Moonlight',
    cost: 75,
    weight: 10,
    category: 'Gear',
    description: "A bottle containing a silvery, phosphorescent liquid that casts a pale light, equivalent to a candle.",
    carry_type: 'stowed'
  },
  'night-oak-staff': {
    name: 'Night-Oak Staff',
    cost: 10,
    weight: 40,
    category: 'Weapon',
    damage: '1d4',
    description: "A staff of polished black wood that is cool to the touch, even in sunlight.",
    isMelee: true,
    carry_type: 'worn'
  },
  'elf-arrow': {
    name: 'Elf Arrow',
    cost: 10,
    weight: 1,
    category: 'Ammunition',
    description: "A single, white-fletched arrow. Elves of Dolmenwood are known to hunt humans for sport.",
    carry_type: 'worn'
  }
};