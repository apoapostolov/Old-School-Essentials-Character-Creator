import type { ThemeConfig } from '../../types';

export const THEMES: Record<string, ThemeConfig> = {
  'mystara': {
    displayName: 'Mystara - Karameikos',
    portrait: {
      theme: "Eastern European & Byzantine medieval fantasy",
      setting: "a newly-formed Grand Duchy on the edge of a vast, dark wilderness, filled with ancient evils and political intrigue",
      atmosphere: "a mix of pioneering hope and old-world superstition. Characters are settlers, nobles, or Traladaran natives navigating a clash of cultures.",
      visualStyle: "Dark, cinematic fantasy concept art with a painterly digital style. Use muted, desaturated palettes dominated by greys, browns, and mossy greens, contrasted with subtle highlights of firelight, mist, or magical glow. Scenes are atmospheric, fog-drenched, and moody, often set in ruined landscapes, haunted forests, or ancient stone structures. Figures are depicted with rough, textured brushwork, emphasizing silhouettes, cloaks, and worn armor rather than fine detail. The tone is bleak, mysterious, and ominous, evoking themes of decay, myth, and survival in a hostile world.",
      additionalDetails: "Focus on cultural details. Thyatians read East-Mediterranean/Byzantine; native humans read South or East Slavic unless an ethnic override says otherwise. Sun-disk and saint tokens are common. Stigani, when present, are bronze-dark with black hair — never pale.",
    },
    name: {
      promptDescription: "in the Grand Duchy of Karameikos. Prefer a real South/East Slavic or Byzantine name, then an optional fantasy twist (Petar to Petran or P'tran), then an optional Thyatian overlay (Petreus)."
    },
    traits: {
      promptDescription: "in the Grand Duchy of Karameikos. Traits should reflect the setting's themes of pioneering, political tension, and dark folklore. The negative trait could be a deep-seated superstition, a fierce loyalty to a noble house, or a pathological distrust of outsiders (either Thyatians or Traladarans)."
    }
  }
};
