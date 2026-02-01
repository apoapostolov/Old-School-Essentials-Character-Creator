import type { Theme, ThemeConfig } from './types';

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