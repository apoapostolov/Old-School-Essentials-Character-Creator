import type { LanguageSetting } from '../../types';

export const LANGUAGE_SETTINGS: Record<string, LanguageSetting> = {
  'Dolmenwood': {
    name: 'Dolmenwood',
    description: 'Languages spoken in the eerie forests of Dolmenwood.',
    defaultCommon: 'Woldish',
    commonOptions: ['Woldish', 'Sylvan (Wood Elf dialect)'],
    languages: [
        { roll: 1, name: 'Sylvan (Wood Elf dialect)', description: 'The language of elves and fairy-kind. A debased form of High Sylvan.', assignedRace: 'Elf' },
        { roll: 2, name: 'Woldish', description: 'The common tongue of humans, halflings, and grimalkin in Dolmenwood.' },
        { roll: 3, name: 'Drune Cant', description: 'A secret language of signs and code-words used by the sorcerous Drunes.' },
        { roll: 4, name: 'Goat-Goblin Tongue', description: 'A crude, bleating tongue spoken by goatmen and goblins.' },
        { roll: 5, name: 'Mossling', description: 'A wet, gurgling language spoken by mosslings and sentient plants.' },
        { roll: 6, name: 'Ancient Brythonic', description: 'The long-dead language of ancient human tribes, found in inscriptions.' },
        { roll: 7, name: 'Faerie Tongue', description: 'An archaic and complex tongue spoken in the courts of the Faerie Lords.' },
        { roll: 8, name: 'Atacique (language of the Attercop)', description: 'The clicking, chittering language of giant spiders and other arachnoids.' },
    ],
  },
};
