
import type { ThiefSkillIncreases, CalculatedThiefSkills, AcrobatSkillIncreases, CalculatedAcrobatSkills, BarbarianSkillIncreases, CalculatedBarbarianSkills, RangerSkillIncreases, CalculatedRangerSkills, BardSkillIncreases, CalculatedBardSkills } from '../types';
import { ThiefSkill, AcrobatSkill, BarbarianSkill, RangerSkill, BardSkill } from '../types';
import { THIEF_SKILLS_ORDER, ACROBAT_SKILLS_ORDER, BARBARIAN_SKILLS_ORDER, RANGER_SKILLS_ORDER, BARD_SKILLS_ORDER } from '../constants';

export const calculateThiefSkills = (
  level: number,
  increases: ThiefSkillIncreases
): CalculatedThiefSkills => {
  const totalIncreases: Partial<Record<ThiefSkill, number>> = {};

  for (let i = 1; i <= level; i++) {
    const levelIncreases = increases[i] || {};
    for (const skill of Object.keys(levelIncreases)) {
      totalIncreases[skill as ThiefSkill] = (totalIncreases[skill as ThiefSkill] || 0) + levelIncreases[skill as ThiefSkill]!;
    }
  }

  const finalSkills: Partial<CalculatedThiefSkills> = {};

  THIEF_SKILLS_ORDER.forEach(skill => {
    const numIncreases = totalIncreases[skill] || 0;
    
    if (skill === ThiefSkill.HearNoise) {
      const base = 1;
      const totalIncreasesCapped = Math.min(4, numIncreases);
      const value = Math.min(5, base + totalIncreasesCapped);
      finalSkills[skill] = { value, display: `${value}-in-6` };
      return;
    }

    const base = skill === ThiefSkill.ClimbSheerSurfaces ? 25 : 10;
    const totalIncreasesCapped = Math.min(5, numIncreases);
    const value = Math.min(85, base + (totalIncreasesCapped * 15));
    finalSkills[skill] = { value, display: `${value}%` };
  });

  return finalSkills as CalculatedThiefSkills;
};

export const calculateAcrobatSkills = (
    level: number,
    increases: AcrobatSkillIncreases
): CalculatedAcrobatSkills => {
    const totalIncreases: Partial<Record<AcrobatSkill, number>> = {};

    for (let i = 2; i <= level; i++) {
        const levelIncreases = increases[i] || {};
        for (const skill of Object.keys(levelIncreases)) {
            totalIncreases[skill as AcrobatSkill] = (totalIncreases[skill as AcrobatSkill] || 0) + levelIncreases[skill as AcrobatSkill]!;
        }
    }

    const finalSkills: Partial<CalculatedAcrobatSkills> = {};

    ACROBAT_SKILLS_ORDER.forEach(skill => {
        const numIncreases = totalIncreases[skill] || 0;

        let base: number;
        let cap: number;
        switch(skill) {
            case AcrobatSkill.ClimbSheerSurfaces:
            case AcrobatSkill.TightropeWalking:
                base = 40; cap = 100; break;
            case AcrobatSkill.Falling:
                base = 25; cap = 70; break;
            case AcrobatSkill.HideInShadows:
            case AcrobatSkill.MoveSilently:
                base = 10; cap = 70; break;
        }

        const value = Math.min(cap, base + (numIncreases * 15));
        finalSkills[skill] = { value, display: `${value}%` };
    });

    return finalSkills as CalculatedAcrobatSkills;
};

export const calculateBarbarianSkills = (
    level: number,
    increases: BarbarianSkillIncreases
): CalculatedBarbarianSkills => {
    const totalIncreases: Partial<Record<BarbarianSkill, number>> = {};

    for (let i = 2; i <= level; i++) {
        const levelIncreases = increases[i] || {};
        for (const skill of Object.keys(levelIncreases)) {
            totalIncreases[skill as BarbarianSkill] = (totalIncreases[skill as BarbarianSkill] || 0) + levelIncreases[skill as BarbarianSkill]!;
        }
    }

    const finalSkills: Partial<CalculatedBarbarianSkills> = {};

    BARBARIAN_SKILLS_ORDER.forEach(skill => {
        const numIncreases = totalIncreases[skill] || 0;

        let base: number;
        let cap: number;
        switch(skill) {
            case BarbarianSkill.ClimbSheerSurfaces:
                base = 25; cap = 85; break;
            case BarbarianSkill.HideInUndergrowth:
            case BarbarianSkill.MoveSilently:
                base = 10; cap = 70; break;
        }

        const value = Math.min(cap, base + (numIncreases * 15));
        finalSkills[skill] = { value, display: `${value}%` };
    });

    return finalSkills as CalculatedBarbarianSkills;
};

export const calculateRangerSkills = (
  level: number,
  increases: RangerSkillIncreases
): CalculatedRangerSkills => {
  const totalIncreases: Partial<Record<RangerSkill, number>> = {};

  for (let i = 1; i <= level; i++) {
    const levelIncreases = increases[i] || {};
    for (const skill of Object.keys(levelIncreases)) {
      totalIncreases[skill as RangerSkill] = (totalIncreases[skill as RangerSkill] || 0) + levelIncreases[skill as RangerSkill]!;
    }
  }

  const finalSkills: Partial<CalculatedRangerSkills> = {};

  RANGER_SKILLS_ORDER.forEach(skill => {
    const numIncreases = totalIncreases[skill] || 0;
    
    if (skill === RangerSkill.HearNoise) {
      const base = 1;
      const value = Math.min(5, base + numIncreases);
      finalSkills[skill] = { value, display: `${value}-in-6` };
      return;
    }

    const base = 10;
    const value = Math.min(70, base + (numIncreases * 15));
    finalSkills[skill] = { value, display: `${value}%` };
  });

  return finalSkills as CalculatedRangerSkills;
};

export const calculateBardSkills = (
  level: number,
  increases: BardSkillIncreases
): CalculatedBardSkills => {
  const totalIncreases: Partial<Record<BardSkill, number>> = {};

  for (let i = 1; i <= level; i++) {
    const levelIncreases = increases[i] || {};
    for (const skill of Object.keys(levelIncreases)) {
      totalIncreases[skill as BardSkill] = (totalIncreases[skill as BardSkill] || 0) + levelIncreases[skill as BardSkill]!;
    }
  }

  const finalSkills: Partial<CalculatedBardSkills> = {};

  BARD_SKILLS_ORDER.forEach(skill => {
    const numIncreases = totalIncreases[skill] || 0;
    
    if (skill === BardSkill.HearNoise) {
      const base = 1;
      const value = Math.min(5, base + numIncreases);
      finalSkills[skill] = { value, display: `${value}-in-6` };
      return;
    }

    const base = 10;
    const value = Math.min(70, base + (numIncreases * 15));
    finalSkills[skill] = { value, display: `${value}%` };
  });

  return finalSkills as CalculatedBardSkills;
};
