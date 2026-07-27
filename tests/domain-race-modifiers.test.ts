import { describe, expect, it } from 'vitest';
import { applyRaceModifiers } from '../domain/race-modifiers';
import { Ability, type AbilityScores, type Race } from '../types';

const base: AbilityScores = {
  [Ability.Strength]: 10,
  [Ability.Dexterity]: 10,
  [Ability.Constitution]: 10,
  [Ability.Intelligence]: 10,
  [Ability.Wisdom]: 10,
  [Ability.Charisma]: 10,
};

describe('applyRaceModifiers', () => {
  it('returns scores unchanged without a race', () => {
    expect(applyRaceModifiers(base, null)).toEqual(base);
  });

  it('applies racial mods and clamps to 1–20', () => {
    const race = {
      name: 'Test',
      ability_modifiers: { str: 2, dex: -1 },
    } as Race;
    const out = applyRaceModifiers(base, race);
    expect(out[Ability.Strength]).toBe(12);
    expect(out[Ability.Dexterity]).toBe(9);
    expect(out[Ability.Constitution]).toBe(10);
  });
});
