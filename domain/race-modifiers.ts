/**
 * Apply racial ability score modifiers (pure helper).
 */
import type { AbilityScores, Race } from '../types';
import { Ability } from '../types';

const ABILITY_MAP: Record<string, Ability> = {
  str: Ability.Strength,
  dex: Ability.Dexterity,
  con: Ability.Constitution,
  int: Ability.Intelligence,
  wis: Ability.Wisdom,
  cha: Ability.Charisma,
};

export function applyRaceModifiers(
  scores: AbilityScores,
  race: Race | null | undefined,
): AbilityScores {
  if (!race) return scores;
  const newScores = { ...scores };
  for (const [key, mod] of Object.entries(race.ability_modifiers || {})) {
    const ability = ABILITY_MAP[key];
    if (ability && typeof mod === 'number') {
      newScores[ability] = Math.max(1, Math.min(20, newScores[ability] + mod));
    }
  }
  return newScores;
}
