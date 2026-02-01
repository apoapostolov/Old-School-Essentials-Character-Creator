import type { ThemeConfig } from '../../types';

export const THEMES: Record<string, ThemeConfig> = {
  'northland': {
    displayName: 'Northland Saga',
    portrait: {
      theme: "historical Norse saga fantasy",
      setting: "the fog-shrouded fjords and wind-swept shores of a land inspired by Viking-age Scandinavia",
      atmosphere: "a mix of rugged adventure, stoic fatalism, and mythic grandeur. Characters are raiders, explorers, and jarls, driven by a desire for fame, wealth, and a place in the sagas.",
      visualStyle: "Realistic, cinematic digital painting with a grounded feel. Use a cool, desaturated color palette to evoke the northern climate, with emphasis on natural textures like wool, leather, wood, and steel. Lighting should be naturalistic, capturing the soft light of a northern sun or the warm glow of a hearth fire. Characters should have realistic proportions and wear historically-inspired Viking gear.",
      additionalDetails: "Focus on authenticity where possible. Mail, leather armor, round shields, bearded axes, and spears are common. Clothing is practical and layered. Tattoos and braids are common. The world is harsh, but not without beauty.",
    },
    name: {
      promptDescription: "in a world inspired by the Norse sagas. Names should be authentic Old Norse or Scandinavian (e.g., Ragnar, Lagertha, Bjorn, Astrid, Leif)."
    },
    traits: {
      promptDescription: "in a world inspired by the Norse sagas. Traits should reflect the values and challenges of Viking culture. The negative trait could be a dangerous pride (hubris), a belief in an inescapable doom (fatalism), a fierce rivalry with another clan, or a wanderlust that makes it impossible to settle down."
    }
  }
};