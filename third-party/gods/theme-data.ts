import type { ThemeConfig } from '../../types';

export const THEMES: Record<string, ThemeConfig> = {
  'gods': {
    displayName: 'Gods of the Forbidden North',
    portrait: {
      theme: "grimdark sword & sorcery, low-magic",
      setting: "a brutal, prehistoric northern wilderness of crumbling ruins, dark forests, and warring tribes",
      atmosphere: "primal, savage, and melancholic. A world of fleeting glory and sudden, violent death. Characters are powerful but flawed individuals, driven by ambition, revenge, or survival.",
      visualStyle: "Dynamic, dramatic digital oil painting in the style of classic fantasy illustrators like Frank Frazetta. Use a rich, earthy color palette with high contrast between deep shadows and dramatic, warm highlights. Emphasize powerful, muscular anatomy, dynamic poses, and raw emotion. Textures should be rough and visceral (e.g., fur, leather, crude steel, stone).",
      additionalDetails: "Characters should wear minimal, practical gear suited for a cold, harsh environment: furs, leather, and rough-forged metal. Civilization is a distant memory; characters are barbarians, raiders, and sorcerers of a lost age. Avoid pristine, high-fantasy aesthetics.",
    },
    name: {
      promptDescription: "in a grim, Hyperborean-esque sword & sorcery world. Names should sound ancient, primal, and powerful (e.g., Cimmerian, Atlantean, or Nordic names like Crom, Kull, Valerius, Thulsa)."
    },
    traits: {
      promptDescription: "in a grim sword & sorcery world. Traits should be primal and intense. The negative trait should be a powerful, character-defining flaw, such as a barbarian's melancholy, a sorcerer's corrupting ambition, or a warrior's bloodlust."
    }
  }
};