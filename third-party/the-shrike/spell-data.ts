import type { Spell } from '../../types';

export const SPELLS: Spell[] = [
  // Tide-Priest (Cleric based)
  { 
    name: 'Fog Cloud', 
    level: 1, 
    description: 'Creates a 20ft radius sphere of dense fog that obscures vision.', 
    class: 'Cleric' 
  },
  { 
    name: 'Bless Water', 
    level: 1, 
    description: 'Makes a flask of water holy for 2d6 turns. Usable once.', 
    class: 'Cleric' 
  },
  {
    name: 'Sea Legs',
    level: 1,
    description: 'Target is immune to seasickness and cannot be knocked prone on a rocking ship for 1 hour.',
    class: 'Cleric'
  },
  { 
    name: 'Speak with Sea Creatures', 
    level: 2, 
    description: 'Allows the caster to communicate with natural aquatic animals for 1 turn.', 
    class: 'Cleric' 
  },
  {
    name: 'Call Leviathan\'s Ghost',
    level: 3,
    description: 'Summons a terrifying, illusory spectre of a great sea monster that forces a morale check on enemies.',
    class: 'Cleric'
  }
];
