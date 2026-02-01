import type { LanguageSetting } from './types';

export const LANGUAGE_SETTINGS: Record<string, LanguageSetting> = {
  'Generic OSE': {
    name: 'Generic OSE',
    description: 'Standard languages from the Old-School Essentials rules.',
    defaultCommon: 'Common Tongue',
    commonOptions: ['Common Tongue', 'Deepcommon'],
    languages: [
      { roll: 1, name: 'Bugbear', description: 'The guttural language of bugbears.' },
      { roll: 2, name: 'Doppelgänger', description: 'A strange, telepathic-like language of doppelgängers.' },
      { roll: 3, name: 'Dragon', description: 'The ancient and powerful tongue of dragons.' },
      { roll: 4, name: 'Dwarvish', description: 'The blocky, runic language of the dwarves.', assignedRace: 'Dwarf' },
      { roll: 5, name: 'Elvish', description: 'The elegant and flowing language of elves.', assignedRace: 'Elf' },
      { roll: 6, name: 'Gargoyle', description: 'A stony, grating language spoken by gargoyles.' },
      { roll: 7, name: 'Gnoll', description: 'The yipping, harsh language of gnolls.' },
      { roll: 8, name: 'Gnomish', description: 'The complex, technical language of gnomes.', assignedRace: 'Gnome' },
      { roll: 9, name: 'Goblin', description: 'The crude and simple language of goblins.' },
      { roll: 10, name: 'Halfling', description: 'The cheerful and rustic language of halflings.', assignedRace: 'Halfling' },
      { roll: 11, name: 'Harpy', description: 'A shrieking, melodic language used by harpies.' },
      { roll: 12, name: 'Hobgoblin', description: 'The militaristic and harsh language of hobgoblins.' },
      { roll: 13, name: 'Kobold', description: 'The yipping, dog-like language of kobolds.' },
      { roll: 14, name: 'Lizard man', description: 'A hissing, reptilian language.' },
      { roll: 15, name: 'Medusa', description: 'An ancient, sibilant tongue spoken by medusae.' },
      { roll: 16, name: 'Minotaur', description: 'A deep, bellowing language.' },
      { roll: 17, name: 'Ogre', description: 'A simple, brutish language.' },
      { roll: 18, name: 'Orcish', description: 'The harsh, guttural language of orcs.', assignedRace: 'Orc' },
      { roll: 19, name: 'Pixie', description: 'A whimsical, bell-like language of the fey.' },
      { roll: 20, name: 'Human dialect', description: 'A regional or cultural variant of the Common Tongue.' },
      { roll: '-', name: 'Common Tongue', description: 'The trade language spoken by most intelligent creatures.'},
      { roll: '-', name: 'Deepcommon', description: 'A subterranean variant of Common, used in the deep places of the world.'}
    ],
  },
};
