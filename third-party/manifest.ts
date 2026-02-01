
// third-party/manifest.ts
import type { ClassFeatureData, EquipmentKit, Item, LanguageSetting, Race, SecondarySkillEntry, Source, SourceID, Spell, ThemeConfig } from '../types';
import type { SheetConfig } from './ose/sheet-config';

// Dolmenwood Imports
import * as DOLMENWOOD_CLASS_DATA from './dolmenwood/class-data';
import { CLASS_FEATURES_DATA as DOLMENWOOD_CLASS_FEATURES } from './dolmenwood/class-features';
import { EQUIPMENT_KITS as DOLMENWOOD_KITS } from './dolmenwood/equipment-kits';
import { ITEMS as DOLMENWOOD_ITEMS } from './dolmenwood/item-data';
import { LANGUAGE_SETTINGS as DOLMENWOOD_LANGUAGES } from './dolmenwood/language-data';
import { PDF_FIELD_MAP as DOLMENWOOD_PDF_MAP } from './dolmenwood/pdf-fields-config';
import { RACES_DATA as DOLMENWOOD_RACES } from './dolmenwood/races-data';
import { SECONDARY_SKILLS_DOLMENWOOD } from './dolmenwood/secondary-skills-data';
import { SHEET_CONFIG as DOLMENWOOD_SHEET_CONFIG } from './dolmenwood/sheet-config';
import { SPELLS as DOLMENWOOD_SPELLS } from './dolmenwood/spell-data';
import { THEMES as DOLMENWOOD_THEMES } from './dolmenwood/theme-data';

// Gods of the Forbidden North Imports
import * as GODS_CLASS_DATA from './gods/class-data';
import { CLASS_FEATURES_DATA as GODS_CLASS_FEATURES } from './gods/class-features';
import { EQUIPMENT_KITS as GODS_KITS } from './gods/equipment-kits';
import { ITEMS as GODS_ITEMS } from './gods/item-data';
import { LANGUAGE_SETTINGS as GODS_LANGUAGES } from './gods/language-data';
import { PDF_FIELD_MAP as GODS_PDF_MAP } from './gods/pdf-fields-config';
import { RACES_DATA as GODS_RACES } from './gods/races-data';
import { SECONDARY_SKILLS_GODS } from './gods/secondary-skills-data';
import { SHEET_CONFIG as GODS_SHEET_CONFIG } from './gods/sheet-config';
import { SPELLS as GODS_SPELLS } from './gods/spell-data';
import { THEMES as GODS_THEMES } from './gods/theme-data';

// Mystara Imports
import * as MYSTARA_CLASS_DATA from './mystara/class-data';
import { CLASS_FEATURES_DATA as MYSTARA_CLASS_FEATURES } from './mystara/class-features';
import { EQUIPMENT_KITS as MYSTARA_KITS } from './mystara/equipment-kits';
import { ITEMS as MYSTARA_ITEMS } from './mystara/item-data';
import { LANGUAGE_SETTINGS as MYSTARA_LANGUAGES } from './mystara/language-data';
import { PDF_FIELD_MAP as MYSTARA_PDF_MAP } from './mystara/pdf-fields-config';
import { RACES_DATA as MYSTARA_RACES } from './mystara/races-data';
import { SECONDARY_SKILLS_MYSTARA } from './mystara/secondary-skills-data';
import { SHEET_CONFIG as MYSTARA_SHEET_CONFIG } from './mystara/sheet-config';
import { SPELLS as MYSTARA_SPELLS } from './mystara/spell-data';
import { THEMES as MYSTARA_THEMES } from './mystara/theme-data';

// Northland Saga Imports
import * as NORTHLAND_CLASS_DATA from './northland/class-data';
import { CLASS_FEATURES_DATA as NORTHLAND_CLASS_FEATURES } from './northland/class-features';
import { EQUIPMENT_KITS as NORTHLAND_KITS } from './northland/equipment-kits';
import { ITEMS as NORTHLAND_ITEMS } from './northland/item-data';
import { LANGUAGE_SETTINGS as NORTHLAND_LANGUAGES } from './northland/language-data';
import { PDF_FIELD_MAP as NORTHLAND_PDF_MAP } from './northland/pdf-fields-config';
import { RACES_DATA as NORTHLAND_RACES } from './northland/races-data';
import { SECONDARY_SKILLS_NORTHLAND } from './northland/secondary-skills-data';
import { SHEET_CONFIG as NORTHLAND_SHEET_CONFIG } from './northland/sheet-config';
import { SPELLS as NORTHLAND_SPELLS } from './northland/spell-data';
import { THEMES as NORTHLAND_THEMES } from './northland/theme-data';

// The Shrike Imports
import * as SHRIKE_CLASS_DATA from './the-shrike/class-data';
import { CLASS_FEATURES_DATA as SHRIKE_CLASS_FEATURES } from './the-shrike/class-features';
import { EQUIPMENT_KITS as SHRIKE_KITS } from './the-shrike/equipment-kits';
import { ITEMS as SHRIKE_ITEMS } from './the-shrike/item-data';
import { LANGUAGE_SETTINGS as SHRIKE_LANGUAGES } from './the-shrike/language-data';
import { PDF_FIELD_MAP as SHRIKE_PDF_MAP } from './the-shrike/pdf-fields-config';
import { RACES_DATA as SHRIKE_RACES } from './the-shrike/races-data';
import { SECONDARY_SKILLS_SHRIKE } from './the-shrike/secondary-skills-data';
import { SHEET_CONFIG as SHRIKE_SHEET_CONFIG } from './the-shrike/sheet-config';
import { SPELLS as SHRIKE_SPELLS } from './the-shrike/spell-data';
import { THEMES as SHRIKE_THEMES } from './the-shrike/theme-data';

// --- Single Source of Truth for available sources ---
export const SOURCES: Source[] = [
    { id: 'ose', name: 'Advanced OSE/D&D 1e', isDefault: true },
    {
        id: 'shrike',
        name: 'The Shrike',
        publisher: 'Joel Hines',
        theme: 'Infernal Fantasy',
        setting: 'A bleak world of whaling towns and stormy seas.'
    },
    {
        id: 'dolmenwood',
        name: 'Dolmenwood',
        publisher: 'Necrotic Gnome',
        theme: 'Fairy Tale Fantasy',
        setting: 'An ancient, sentient forest of eerie magic and strange fae.'
    },
    {
        id: 'gods',
        name: 'Gods of the Forbidden North',
        publisher: 'Pulp Hummock Press',
        theme: 'Sword & Sorcery',
        setting: 'A brutal, prehistoric wilderness of ruins and warring tribes.'
    },
    {
        id: 'mystara',
        name: 'Mystara: The Grand Dutchy of Karameikos',
        publisher: 'TSR / Wizards of the Coast',
        theme: 'Eastern European Fantasy',
        setting: 'A new Grand Duchy on the edge of a vast, dark wilderness.'
    },
    {
        id: 'northland',
        name: 'The Complete Northland Saga',
        publisher: 'Necromancer Games',
        theme: 'Norse Saga Fantasy',
        setting: 'The fog-shrouded fjords of a Viking-age Scandinavia.'
    }
];

export const SOURCE_IDS = SOURCES.map(s => s.id) as SourceID[];

// --- Manifest Structure ---
interface SourceData {
    features: ClassFeatureData[];
    races: Race[];
    items: Record<string, Item>;
    kits: EquipmentKit[];
    spells: Spell[];
    themes: Record<string, ThemeConfig>;
    languages: Record<string, LanguageSetting>;
    secondarySkills: Record<string, SecondarySkillEntry[]>;
    sheetConfig: SheetConfig;
    pdfMap: any;
    classData: any; // Contains titles, spell slots, etc.
}

// --- The Manifest ---
// To add a new source: 1. Add its folder. 2. Add its imports. 3. Add its entry to this object.
export const thirdPartyData: Partial<Record<SourceID, SourceData>> = {
    dolmenwood: {
        features: DOLMENWOOD_CLASS_FEATURES,
        races: DOLMENWOOD_RACES,
        items: DOLMENWOOD_ITEMS,
        kits: DOLMENWOOD_KITS,
        spells: DOLMENWOOD_SPELLS,
        themes: DOLMENWOOD_THEMES,
        languages: DOLMENWOOD_LANGUAGES,
        secondarySkills: { 'dolmenwood': SECONDARY_SKILLS_DOLMENWOOD },
        sheetConfig: DOLMENWOOD_SHEET_CONFIG,
        pdfMap: DOLMENWOOD_PDF_MAP,
        classData: DOLMENWOOD_CLASS_DATA,
    },
    gods: {
        features: GODS_CLASS_FEATURES,
        races: GODS_RACES,
        items: GODS_ITEMS,
        kits: GODS_KITS,
        spells: GODS_SPELLS,
        themes: GODS_THEMES,
        languages: GODS_LANGUAGES,
        secondarySkills: { 'gods': SECONDARY_SKILLS_GODS },
        sheetConfig: GODS_SHEET_CONFIG,
        pdfMap: GODS_PDF_MAP,
        classData: GODS_CLASS_DATA,
    },
    mystara: {
        features: MYSTARA_CLASS_FEATURES,
        races: MYSTARA_RACES,
        items: MYSTARA_ITEMS,
        kits: MYSTARA_KITS,
        spells: MYSTARA_SPELLS,
        themes: MYSTARA_THEMES,
        languages: MYSTARA_LANGUAGES,
        secondarySkills: { 'mystara': SECONDARY_SKILLS_MYSTARA },
        sheetConfig: MYSTARA_SHEET_CONFIG,
        pdfMap: MYSTARA_PDF_MAP,
        classData: MYSTARA_CLASS_DATA,
    },
    northland: {
        features: NORTHLAND_CLASS_FEATURES,
        races: NORTHLAND_RACES,
        items: NORTHLAND_ITEMS,
        kits: NORTHLAND_KITS,
        spells: NORTHLAND_SPELLS,
        themes: NORTHLAND_THEMES,
        languages: NORTHLAND_LANGUAGES,
        secondarySkills: { 'northland': SECONDARY_SKILLS_NORTHLAND },
        sheetConfig: NORTHLAND_SHEET_CONFIG,
        pdfMap: NORTHLAND_PDF_MAP,
        classData: NORTHLAND_CLASS_DATA,
    },
    shrike: {
        features: SHRIKE_CLASS_FEATURES,
        races: SHRIKE_RACES,
        items: SHRIKE_ITEMS,
        kits: SHRIKE_KITS,
        spells: SHRIKE_SPELLS,
        themes: SHRIKE_THEMES,
        languages: SHRIKE_LANGUAGES,
        secondarySkills: { 'shrike': SECONDARY_SKILLS_SHRIKE },
        sheetConfig: SHRIKE_SHEET_CONFIG,
        pdfMap: SHRIKE_PDF_MAP,
        classData: SHRIKE_CLASS_DATA,
    }
};
