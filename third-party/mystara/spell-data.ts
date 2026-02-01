import type { Spell } from '../../types';

export const SPELLS: Spell[] = [
  // Traladaran Witch (Magic-User based) - Level 1
  { 
    name: 'Bind Spirit', 
    level: 1, 
    description: 'A lesser creature (1 HD or less) is charmed into servitude for 24 hours. The creature gets a saving throw vs. spells.', 
    class: 'Magic-User' 
  },
  { 
    name: 'Evil Eye', 
    level: 1, 
    description: 'Curse one creature with a -1 penalty to attack rolls for 1 turn. The target gets a saving throw vs. spells to resist.', 
    class: 'Magic-User' 
  },
  { 
    name: 'Herbal Poultice', 
    level: 1, 
    description: 'Create a poultice that heals 1d3 hit points. Requires fresh herbs and 1 turn to prepare. Unusual for a Magic-User.', 
    class: 'Magic-User' 
  },
  // Traladaran Witch (Druid option) - Level 1
  {
    name: 'Whispers of the Forest',
    level: 1,
    description: 'You understand the general meaning of sounds in a forest (e.g., warning calls, presence of predators) for 1 turn.',
    class: 'Druid'
  }
];
