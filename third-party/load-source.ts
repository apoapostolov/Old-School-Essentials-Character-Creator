/**
 * Lazy third-party source pack loader (CoC eras/load-era analogue).
 * Base OSE data stays eager; optional packs dynamic-import on selection.
 */
import type {
  ClassFeatureData,
  EquipmentKit,
  Item,
  LanguageSetting,
  Race,
  SecondarySkillEntry,
  SourceID,
  Spell,
  ThemeConfig,
} from '../types';
import type { SheetConfig } from './ose/sheet-config';

export interface SourceData {
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
  classData: any;
}

const sourceCache = new Map<SourceID, SourceData>();
const sourceInflight = new Map<SourceID, Promise<SourceData>>();

async function importSourcePack(sourceId: SourceID): Promise<SourceData> {
  switch (sourceId) {
    case 'dolmenwood': {
      const [
        { CLASS_FEATURES_DATA },
        { RACES_DATA },
        { ITEMS },
        { EQUIPMENT_KITS },
        { SPELLS },
        { THEMES },
        { LANGUAGE_SETTINGS },
        { SECONDARY_SKILLS_DOLMENWOOD },
        { SHEET_CONFIG },
        { PDF_FIELD_MAP },
        classData,
      ] = await Promise.all([
        import('./dolmenwood/class-features'),
        import('./dolmenwood/races-data'),
        import('./dolmenwood/item-data'),
        import('./dolmenwood/equipment-kits'),
        import('./dolmenwood/spell-data'),
        import('./dolmenwood/theme-data'),
        import('./dolmenwood/language-data'),
        import('./dolmenwood/secondary-skills-data'),
        import('./dolmenwood/sheet-config'),
        import('./dolmenwood/pdf-fields-config'),
        import('./dolmenwood/class-data'),
      ]);
      return {
        features: CLASS_FEATURES_DATA,
        races: RACES_DATA,
        items: ITEMS,
        kits: EQUIPMENT_KITS,
        spells: SPELLS,
        themes: THEMES,
        languages: LANGUAGE_SETTINGS,
        secondarySkills: { dolmenwood: SECONDARY_SKILLS_DOLMENWOOD },
        sheetConfig: SHEET_CONFIG,
        pdfMap: PDF_FIELD_MAP,
        classData,
      };
    }
    case 'gods': {
      const [
        { CLASS_FEATURES_DATA },
        { RACES_DATA },
        { ITEMS },
        { EQUIPMENT_KITS },
        { SPELLS },
        { THEMES },
        { LANGUAGE_SETTINGS },
        { SECONDARY_SKILLS_GODS },
        { SHEET_CONFIG },
        { PDF_FIELD_MAP },
        classData,
      ] = await Promise.all([
        import('./gods/class-features'),
        import('./gods/races-data'),
        import('./gods/item-data'),
        import('./gods/equipment-kits'),
        import('./gods/spell-data'),
        import('./gods/theme-data'),
        import('./gods/language-data'),
        import('./gods/secondary-skills-data'),
        import('./gods/sheet-config'),
        import('./gods/pdf-fields-config'),
        import('./gods/class-data'),
      ]);
      return {
        features: CLASS_FEATURES_DATA,
        races: RACES_DATA,
        items: ITEMS,
        kits: EQUIPMENT_KITS,
        spells: SPELLS,
        themes: THEMES,
        languages: LANGUAGE_SETTINGS,
        secondarySkills: { gods: SECONDARY_SKILLS_GODS },
        sheetConfig: SHEET_CONFIG,
        pdfMap: PDF_FIELD_MAP,
        classData,
      };
    }
    case 'mystara': {
      const [
        { CLASS_FEATURES_DATA },
        { RACES_DATA },
        { ITEMS },
        { EQUIPMENT_KITS },
        { SPELLS },
        { THEMES },
        { LANGUAGE_SETTINGS },
        { SECONDARY_SKILLS_MYSTARA },
        { SHEET_CONFIG },
        { PDF_FIELD_MAP },
        classData,
      ] = await Promise.all([
        import('./mystara/class-features'),
        import('./mystara/races-data'),
        import('./mystara/item-data'),
        import('./mystara/equipment-kits'),
        import('./mystara/spell-data'),
        import('./mystara/theme-data'),
        import('./mystara/language-data'),
        import('./mystara/secondary-skills-data'),
        import('./mystara/sheet-config'),
        import('./mystara/pdf-fields-config'),
        import('./mystara/class-data'),
      ]);
      return {
        features: CLASS_FEATURES_DATA,
        races: RACES_DATA,
        items: ITEMS,
        kits: EQUIPMENT_KITS,
        spells: SPELLS,
        themes: THEMES,
        languages: LANGUAGE_SETTINGS,
        secondarySkills: { mystara: SECONDARY_SKILLS_MYSTARA },
        sheetConfig: SHEET_CONFIG,
        pdfMap: PDF_FIELD_MAP,
        classData,
      };
    }
    case 'northland': {
      const [
        { CLASS_FEATURES_DATA },
        { RACES_DATA },
        { ITEMS },
        { EQUIPMENT_KITS },
        { SPELLS },
        { THEMES },
        { LANGUAGE_SETTINGS },
        { SECONDARY_SKILLS_NORTHLAND },
        { SHEET_CONFIG },
        { PDF_FIELD_MAP },
        classData,
      ] = await Promise.all([
        import('./northland/class-features'),
        import('./northland/races-data'),
        import('./northland/item-data'),
        import('./northland/equipment-kits'),
        import('./northland/spell-data'),
        import('./northland/theme-data'),
        import('./northland/language-data'),
        import('./northland/secondary-skills-data'),
        import('./northland/sheet-config'),
        import('./northland/pdf-fields-config'),
        import('./northland/class-data'),
      ]);
      return {
        features: CLASS_FEATURES_DATA,
        races: RACES_DATA,
        items: ITEMS,
        kits: EQUIPMENT_KITS,
        spells: SPELLS,
        themes: THEMES,
        languages: LANGUAGE_SETTINGS,
        secondarySkills: { northland: SECONDARY_SKILLS_NORTHLAND },
        sheetConfig: SHEET_CONFIG,
        pdfMap: PDF_FIELD_MAP,
        classData,
      };
    }
    case 'shrike': {
      const [
        { CLASS_FEATURES_DATA },
        { RACES_DATA },
        { ITEMS },
        { EQUIPMENT_KITS },
        { SPELLS },
        { THEMES },
        { LANGUAGE_SETTINGS },
        { SECONDARY_SKILLS_SHRIKE },
        { SHEET_CONFIG },
        { PDF_FIELD_MAP },
        classData,
      ] = await Promise.all([
        import('./the-shrike/class-features'),
        import('./the-shrike/races-data'),
        import('./the-shrike/item-data'),
        import('./the-shrike/equipment-kits'),
        import('./the-shrike/spell-data'),
        import('./the-shrike/theme-data'),
        import('./the-shrike/language-data'),
        import('./the-shrike/secondary-skills-data'),
        import('./the-shrike/sheet-config'),
        import('./the-shrike/pdf-fields-config'),
        import('./the-shrike/class-data'),
      ]);
      return {
        features: CLASS_FEATURES_DATA,
        races: RACES_DATA,
        items: ITEMS,
        kits: EQUIPMENT_KITS,
        spells: SPELLS,
        themes: THEMES,
        languages: LANGUAGE_SETTINGS,
        secondarySkills: { shrike: SECONDARY_SKILLS_SHRIKE },
        sheetConfig: SHEET_CONFIG,
        pdfMap: PDF_FIELD_MAP,
        classData,
      };
    }
    case 'ose':
    default:
      throw new Error(`Source "${sourceId}" is base OSE or unknown — load via base data, not load-source.`);
  }
}

/** Load (and cache) a third-party source pack. */
export async function loadSourceData(sourceId: SourceID): Promise<SourceData> {
  if (sourceId === 'ose') {
    throw new Error('Base OSE is not a lazy third-party pack.');
  }
  const cached = sourceCache.get(sourceId);
  if (cached) return cached;
  let inflight = sourceInflight.get(sourceId);
  if (!inflight) {
    inflight = importSourcePack(sourceId).then(data => {
      sourceCache.set(sourceId, data);
      sourceInflight.delete(sourceId);
      return data;
    });
    sourceInflight.set(sourceId, inflight);
  }
  return inflight;
}

export async function loadSources(sourceIds: Iterable<SourceID>): Promise<Partial<Record<SourceID, SourceData>>> {
  const out: Partial<Record<SourceID, SourceData>> = {};
  const ids = [...sourceIds].filter(id => id !== 'ose');
  await Promise.all(ids.map(async id => {
    out[id] = await loadSourceData(id);
  }));
  return out;
}
