import type { ThemeConfig } from '../../types';

export const THEMES: Record<string, ThemeConfig> = {
  'dolmenwood': {
    displayName: 'Dolmenwood',
    portrait: {
      theme: "whimsical but dark fairy tale fantasy, folk horror",
      setting: "an ancient, sentient forest filled with strange fae, talking animals, moss-covered ruins, and eerie magic",
      atmosphere: "uncanny, psychedelic, and mysterious. A sense of child-like wonder mixed with palpable dread. Characters are often outsiders navigating a world with alien rules.",
      visualStyle: "Highly stylized storybook illustration in a flat, painterly style with strong silhouettes and textured shading. Use rich, earthy or jewel-toned color palettes with glowing highlights and deep shadows to evoke a mystical woodland atmosphere. Depict characters and creatures with simplified shapes, minimal facial detail, and bold outlines, blending folklore and fantasy themes. Incorporate decorative natural elements like ferns, trees, and starry skies, framed in symmetrical or layered compositions. The mood should feel timeless, magical, and slightly eerie, like illuminated folklore scenes or modern reinterpretations of medieval tapestries.",
      additionalDetails: "Characters should look rustic, eccentric, or slightly otherworldly. Clothing made from natural materials like woven roots, moss, or mushroom leather is common. Elves are terrifyingly alien, not noble. Gear is often simple or strangely decorated.",
    },
    name: {
      promptDescription: "in the eerie fairy tale forest of Dolmenwood. Names should be quaint and folksy English (e.g., Bramble, Pimpernel, Prudence) or strange and whimsical-sounding."
    },
    traits: {
      promptDescription: "in the eerie fairy tale forest of Dolmenwood. Traits should reflect the weirdness of the setting. The negative trait could be a strange fairy pact, an addiction to magical fungi, a fear of goat-men, or a physical oddity from exposure to forest magic."
    }
  }
};
