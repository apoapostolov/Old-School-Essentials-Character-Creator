import type { Theme, ThemeConfig } from './types';

export const GENERIC_WORLD_THEME: Theme = 'ose';

/** Prefer a loaded source world over generic D&D/OSE. Keep a current source pick. */
export const preferredWorldTheme = (
  themes: Record<string, ThemeConfig>,
  current?: string | null,
): Theme => {
  const keys = Object.keys(themes);
  const sourceKeys = keys.filter((key) => key !== GENERIC_WORLD_THEME);
  if (current && current !== GENERIC_WORLD_THEME && themes[current]) return current;
  if (sourceKeys.length > 0) return sourceKeys[0];
  if (current && themes[current]) return current;
  if (themes[GENERIC_WORLD_THEME]) return GENERIC_WORLD_THEME;
  return keys[0] || GENERIC_WORLD_THEME;
};

/** Keep an explicit saved world, including generic OSE. Used on load/import. */
export const savedWorldTheme = (
  themes: Record<string, ThemeConfig>,
  saved?: string | null,
): Theme => {
  if (saved && themes[saved]) return saved;
  if (saved) return saved;
  return preferredWorldTheme(themes);
};

export const THEMES: Record<Theme, ThemeConfig> = {
  'ose': {
    displayName: 'D&D/OSE',
    portrait: {
      theme: "classic gritty fantasy",
      setting: "a low-to-mid fantasy world of dungeons, ruins, and fledgling kingdoms",
      atmosphere: "characters are hardy adventurers and mercenaries, practical and weathered by their travels, grounded in a sense of realism",
      visualStyle: "Photorealistic, hyperrealistic photography style. The image should look like a high-resolution photograph of a real person in costume. Emphasize realistic textures, naturalistic lighting, and fine details. The composition should be grounded and cinematic.",
      additionalDetails: "Focus on practical, worn equipment like chainmail, leather, and steel. The world is dangerous but not entirely bleak; a sense of adventure should prevail over despair. Avoid overly stylized or anime-inspired features.",
    },
    name: {
      promptDescription: "in a classic D&D/OSE fantasy world. Names should sound Anglo-Saxon, Germanic, or classic fantasy (e.g., Grendel, Alaric, Elara)."
    },
    traits: {
      promptDescription: "in a classic D&D/OSE fantasy world. Traits should reflect common adventuring archetypes. The negative trait should be a classic character flaw like greed, arrogance, or a debilitating fear."
    }
  }
};