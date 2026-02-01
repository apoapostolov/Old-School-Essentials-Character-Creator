import type { LanguageSetting } from '../../types';

export const LANGUAGE_SETTINGS: Record<string, LanguageSetting> = {
  'Karameikos': {
    name: 'Mystara - Karameikos',
    description: 'Languages of the Grand Duchy of Karameikos and the Known World.',
    defaultCommon: 'Thyatian',
    commonOptions: ['Thyatian', 'Traladaran'],
    languages: [
      { roll: 1, name: 'Thyatian', description: 'The official language of the Empire of Thyatis and Karameikos. Widespread as a common tongue.' },
      { roll: 2, name: 'Traladaran', description: 'The native tongue of the Traladaran people, with a lyrical, Romance-like quality.' },
      { roll: 3, name: 'Elvish (Shiye-Lawr)', description: 'The dialect of the sylvan elves of Karameikos and the great forest of Alfheim.', assignedRace: 'Elf' },
      { roll: 4, name: 'Dwarvish (Denwarf-Hurgon)', description: 'The dialect of the dwarves of Rockhome, spoken by most dwarves in the Known World.', assignedRace: 'Dwarf' },
      { roll: 5, name: 'Gnomish', description: 'The language of the gnomes of the mountains, full of technical terms.', assignedRace: 'Gnome' },
      { roll: 6, name: 'Halflingish', description: 'The language of the Five Shires halflings, a comfortable and rustic tongue.', assignedRace: 'Halfling' },
      { roll: 7, name: 'Orcish', description: 'The guttural language spoken by orc tribes.', assignedRace: 'Orc' },
      { roll: 8, name: 'Goblinoid', description: 'The common language used between goblins, hobgoblins, and bugbears.' },
    ]
  },
};
