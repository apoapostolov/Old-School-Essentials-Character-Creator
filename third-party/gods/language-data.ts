import type { LanguageSetting } from '../../types';

export const LANGUAGE_SETTINGS: Record<string, LanguageSetting> = {
  'Forbidden North': {
    name: 'Forbidden North',
    description: 'Languages of a savage, prehistoric world.',
    defaultCommon: 'Northron',
    commonOptions: ['Northron'],
    languages: [
      { roll: 1, name: 'Cimmerian', description: 'A guttural tongue spoken by barbarian tribes.' },
      { roll: 2, name: 'Stygian', description: 'An ancient language used by southern sorcerers and priests of dark gods.' },
      { roll: 3, name: 'Atlantean Remnant', description: 'A debased form of the language of the sunken city of Atlantis, used in ancient texts.' },
      { roll: 4, name: 'Serpent-Man Hiss', description: 'The sibilant, ancient language of the serpent folk.' },
      { roll: 5, name: 'Ape-Man Grunts', description: 'A simple language of grunts, gestures, and hoots used by intelligent apes.' },
      { roll: 6, name: 'Pictish', description: 'A primitive, ritualistic language of painted savages.' },
    ],
  },
};
