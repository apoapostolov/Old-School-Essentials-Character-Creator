import type { LanguageSetting } from '../../types';

export const LANGUAGE_SETTINGS: Record<string, LanguageSetting> = {
  'Northland Saga': {
    name: 'Northland Saga',
    description: 'Languages of the Viking-age Northlands.',
    defaultCommon: 'Old Norse',
    commonOptions: ['Old Norse'],
    languages: [
      { roll: 1, name: 'Old Norse', description: 'The common tongue of the Norsemen, raiders, and traders.', assignedRace: 'Human' },
      { roll: 2, name: 'Anglo-Saxon', description: 'The language spoken in the southern kingdoms, a target for raids.' },
      { roll: 3, name: 'Gaelic', description: 'The tongue of the western isles and its inhabitants.' },
      { roll: 4, name: 'Jotun', description: 'The ancient, rumbling language of giants.' },
      { roll: 5, name: 'Skraelings Tongue', description: 'The language of the native peoples of the far western lands.' },
      { roll: 6, name: 'Dwarvish', description: 'The language of the dwarves who dwell in the mountains.', assignedRace: 'Dwarf' },
      { roll: 7, name: 'Elvish', description: 'The rare and ancient tongue of the hidden elves (Alfar).', assignedRace: 'Elf' },
    ],
  },
};
