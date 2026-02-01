

import type { ClassInfo, Race, Ability, AbilityScores, SavingThrowRange, AttackBonusProgressionRange } from '../types';
import { ATTACK_PROGRESSIONS } from '../class-data';

export const getModifier = (score: number): number => {
  if (score === 1) return -5;
  if (score <= 3) return -3;
  if (score <= 5) return -2;
  if (score <= 8) return -1;
  if (score <= 12) return 0;
  if (score <= 15) return 1;
  if (score <= 17) return 2;
  if (score === 18) return 3;
  if (score === 19) return 4;
  if (score <= 21) return 5;
  return 0;
};

export const getModifierString = (score: number): string => {
    const mod = getModifier(score);
    if (mod > 0) return `+${mod}`;
    return `${mod}`;
};

export const getOpenDoorsChance = (strength: number): number => {
    if (strength <= 5) return 1;
    if (strength <= 8) return 2;
    if (strength <= 12) return 3;
    if (strength <= 15) return 4;
    return 5; // Covers 16+
};

export const getFindSecretDoorChance = (race: Race | null): number => {
    return race?.find_secret_doors_value ?? 1;
};

export const getFindRoomTrapChance = (race: Race | null): number => {
    return race?.find_room_traps_value ?? 1;
};

export const getListenAtDoorsChance = (race: Race | null): number => {
    return race?.listen_at_doors_value ?? 1;
};

export const getXPModifierString = (classInfo: ClassInfo, scores: AbilityScores): string => {
    const { primeRequisite } = classInfo;
    let bonus = 0;

    const allPrScores = Array.isArray(primeRequisite)
        ? primeRequisite.map(pr => scores[pr as Ability])
        : [scores[primeRequisite as Ability]];
    const lowestPrScore = Math.min(...allPrScores);
    
    if (lowestPrScore <= 5) return '-20%';
    if (lowestPrScore <= 8) return '-10%';

    if (Array.isArray(primeRequisite)) {
        const highestScore = Math.max(...allPrScores);
        if (highestScore >= 16) {
            bonus += 5;
        }
        if (lowestPrScore >= 13) {
            bonus += 5;
        }
    } else {
        const score = scores[primeRequisite as Ability];
        if (score >= 16) {
            bonus = 10;
        } else if (score >= 13) {
            bonus = 5;
        }
    }
    
    if (bonus > 0) {
        return `+${bonus}%`;
    }

    return '–';
};

export const getSavingThrowsForLevel = (classInfo: ClassInfo, level: number): SavingThrowRange | null => {
  if (!classInfo.savingThrows) return null;
  for (const range of classInfo.savingThrows) {
    const [minStr, maxStr] = range.levels.split('-');
    const min = parseInt(minStr, 10);
    const max = maxStr ? parseInt(maxStr, 10) : min;
    if (level >= min && level <= max) {
      return range;
    }
  }
  return null;
};

export const getAttackValuesForLevel = (classInfo: ClassInfo, level: number): { thac0: number, bonus: number } | null => {
    const cappedLevel = Math.min(level, classInfo.maxLevel);
    const progression = ATTACK_PROGRESSIONS[classInfo.attackBonusProgression];
    if (!progression) return null;

    for (const range of progression) {
        const [minStr, maxStr] = range.levels.split('-');
        const min = parseInt(minStr, 10);
        const max = maxStr ? parseInt(maxStr, 10) : min;
        if (cappedLevel >= min && cappedLevel <= max) {
            return { thac0: range.THAC0, bonus: range.attack_bonus };
        }
    }
    return null;
};

export const getStartingXPForLevel = (classInfo: ClassInfo, level: number): number => {
  if (level > 0 && level <= classInfo.xp.length) {
    const xp = classInfo.xp[level - 1];
    return xp === null ? 0 : xp;
  }
  return 0;
};

export const getXPForNextLevel = (classInfo: ClassInfo, level: number): string => {
  if (level < classInfo.xp.length) {
    const xp = classInfo.xp[level];
    if (xp !== null) {
      return xp.toString();
    } else {
      return 'N/A';
    }
  }

  if (level >= 9 && classInfo.xpPerLevelAfter9) {
    const lastXp = classInfo.xp[classInfo.xp.length - 1];
    if(lastXp !== null) {
        const levelsAfterLastEntry = level - (classInfo.xp.length - 1);
        const nextXp = lastXp + (levelsAfterLastEntry * classInfo.xpPerLevelAfter9);
        return nextXp.toString();
    }
  }

  return 'N/A';
};

export const getTitleForLevel = (classInfo: ClassInfo, level: number): string => {
    if (!classInfo.titles || classInfo.titles.length === 0) {
        return '';
    }
    const index = Math.min(level - 1, classInfo.titles.length - 1);
    return classInfo.titles[index] || '';
};

export const isClassRestrictedByRace = (classInfo: ClassInfo, selectedRace: Race | null): boolean => {
    if (!selectedRace) return false;

    if (selectedRace.name === 'Human') {
        return classInfo.group === 'Demihuman';
    }

    const allowedClasses = selectedRace.available_classes_max_level;
    const classNameToCheck = classInfo.name;
    
    if (allowedClasses['All non-demihuman classes'] && classInfo.group !== 'Demihuman') {
        return false;
    }
    
    const isAllowed = Object.keys(allowedClasses).some(allowedClassName => 
        allowedClassName.replace('*', '') === classNameToCheck
    );
    
    return !isAllowed;
};
