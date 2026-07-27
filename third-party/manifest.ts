// third-party/manifest.ts — metadata only (data packs load via load-source.ts)
import type { Source, SourceID } from '../types';

/** Single source of truth for available content packs. */
export const SOURCES: Source[] = [
  { id: 'ose', name: 'Advanced OSE/D&D 1e', isDefault: true },
  {
    id: 'shrike',
    name: 'The Shrike',
    publisher: 'Joel Hines',
    theme: 'Infernal Fantasy',
    setting: 'A bleak world of whaling towns and stormy seas.',
  },
  {
    id: 'dolmenwood',
    name: 'Dolmenwood',
    publisher: 'Necrotic Gnome',
    theme: 'Fairy Tale Fantasy',
    setting: 'An ancient, sentient forest of eerie magic and strange fae.',
  },
  {
    id: 'gods',
    name: 'Gods of the Forbidden North',
    publisher: 'Pulp Hummock Press',
    theme: 'Sword & Sorcery',
    setting: 'A brutal, prehistoric wilderness of ruins and warring tribes.',
  },
  {
    id: 'mystara',
    name: 'Mystara: The Grand Dutchy of Karameikos',
    publisher: 'TSR / Wizards of the Coast',
    theme: 'Eastern European Fantasy',
    setting: 'A new Grand Duchy on the edge of a vast, dark wilderness.',
  },
  {
    id: 'northland',
    name: 'The Complete Northland Saga',
    publisher: 'Necromancer Games',
    theme: 'Norse Saga Fantasy',
    setting: 'The fog-shrouded fjords of a Viking-age Scandinavia.',
  },
];

export const SOURCE_IDS = SOURCES.map(s => s.id) as SourceID[];

/** @deprecated Use loadSourceData / loadSources from load-source.ts */
export { loadSourceData, loadSources, type SourceData } from './load-source';
