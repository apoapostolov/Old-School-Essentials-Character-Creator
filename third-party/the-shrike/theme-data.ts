import type { ThemeConfig } from '../../types';

export const THEMES: Record<string, ThemeConfig> = {
  'shrike': {
    displayName: 'The Shrike',
    portrait: {
      theme: "bleak 19th-century nautical fantasy, survival horror",
      setting: "a world of vast, stormy oceans, isolated whaling towns, and colossal sea monsters shrouded in fog",
      atmosphere: "desperate, obsessive, and weathered. A sense of grim determination against an overwhelming and indifferent sea. Characters are hardened survivors, not heroes.",
      visualStyle: "Desaturated, gritty digital oil painting style, reminiscent of 19th-century maritime art. Use a muted palette of greys, deep blues, and dirty whites. Emphasize harsh, dramatic lighting, the texture of wet wood and coarse wool, and the weary, salt-etched faces of the characters. The mood should be somber and intense.",
      additionalDetails: "Characters should wear practical, heavily worn sailor's garb: oilskins, thick wool sweaters, leather boots. Equipment is functional, scarred, and often improvised. A sense of cold and dampness should permeate the image.",
    },
    name: {
      promptDescription: "in a bleak, 19th-century nautical setting. Names should be inspired by classic maritime literature (e.g., English, Irish, American names like Ishmael, Quinn, Ahab, Starbuck)."
    },
    traits: {
      promptDescription: "in a bleak, 19th-century nautical setting. Traits should reflect the harsh realities of life at sea. The negative trait could be a grim superstition, an obsession with a particular beast, a deep-seated paranoia, or a physical malady caused by the unforgiving environment."
    }
  }
};