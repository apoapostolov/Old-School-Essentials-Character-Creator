import type { LanguageSetting } from '../../types';

export const LANGUAGE_SETTINGS: Record<string, LanguageSetting> = {
  'The Shrike': {
    name: 'The Shrike',
    description: 'Languages of the fog-shrouded, salt-sprayed islands.',
    defaultCommon: "Mariner's Cant",
    commonOptions: ["Mariner's Cant"],
    languages: [
      { roll: 1, name: 'Whaler\'s Jargon', description: 'A mix of cant and technical terms used by whaling crews.' },
      { roll: 2, name: 'Old Tongue', description: 'An ancient, nearly-forgotten human language from the mainland.' },
      { roll: 3, name: 'Islander Creole', description: 'A pidgin of various tongues spoken on isolated islands.' },
      { roll: 4, name: 'The Deep Tongue', description: 'A guttural, wet language seemingly spoken by creatures of the abyss.' },
      { roll: 5, name: 'Signal Whistles', description: 'A complex language of coded whistles used between ships in fog.' },
      { roll: 6, name: 'The Bleating', description: 'The unsettling, goat-like language of isolated, inbred communities.' },
    ],
  },
};
