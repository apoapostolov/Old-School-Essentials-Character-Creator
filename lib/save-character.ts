import type { SourceID } from '../types';
import { SOURCES } from '../third-party/manifest';

const SOURCE_IDS = new Set<SourceID>(SOURCES.map((source) => source.id));

export type KarameikosSave = {
  socialStanding: unknown;
  ethnos: unknown;
  literacy: unknown;
  hometown: unknown;
  villageName: string | null;
  selectedScripts: string[];
};

const asScripts = (value: unknown): string[] => (
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
);

/** Persist only Karameikos sheet fields. Drop UI flags and action handlers. */
export const pickKarameikosSave = (kar: Record<string, unknown> | null | undefined): KarameikosSave => ({
  socialStanding: kar?.socialStanding ?? null,
  ethnos: kar?.ethnos ?? null,
  literacy: kar?.literacy ?? null,
  hometown: kar?.hometown ?? null,
  villageName: typeof kar?.villageName === 'string' ? kar.villageName : null,
  selectedScripts: asScripts(kar?.selectedScripts),
});

export const karameikosHasContent = (kar: KarameikosSave | Record<string, unknown> | null | undefined): boolean => {
  if (!kar) return false;
  const scripts = asScripts((kar as KarameikosSave).selectedScripts);
  return Boolean(
    kar.socialStanding
    || kar.ethnos
    || kar.literacy
    || kar.hometown
    || (typeof kar.villageName === 'string' && kar.villageName.trim())
    || scripts.length > 0,
  );
};

const asSourceId = (value: unknown): SourceID | null => (
  typeof value === 'string' && SOURCE_IDS.has(value as SourceID) ? value as SourceID : null
);

/** Normalize a saved source list. Always includes ose when anything is kept. */
export const normalizeSavedSources = (raw: unknown): SourceID[] => {
  const ids = (Array.isArray(raw) ? raw : [])
    .map(asSourceId)
    .filter((id): id is SourceID => id !== null);
  if (ids.length === 0) return [];
  const unique = [...new Set(ids)];
  if (!unique.includes('ose')) unique.unshift('ose');
  return unique;
};

/**
 * Sources to apply on load. Null means leave the current browser source list alone
 * (old saves). Mystara/Karameikos content infers mystara when the list is missing.
 */
export const inferSavedSources = (characterData: Record<string, unknown> | null | undefined): SourceID[] | null => {
  if (!characterData) return null;
  const listed = normalizeSavedSources(characterData.selectedSources);
  if (listed.length > 0) return listed;

  const extras = new Set<SourceID>();
  const theme = typeof characterData.ai === 'object' && characterData.ai
    ? (characterData.ai as { theme?: unknown }).theme
    : undefined;
  const themeId = asSourceId(theme);
  if (themeId && themeId !== 'ose') extras.add(themeId);
  if (karameikosHasContent(characterData.karameikos as Record<string, unknown>)) extras.add('mystara');
  if (extras.size === 0) return null;
  return normalizeSavedSources(['ose', ...extras]);
};
