
import type { ClassInfo, Race, Ability, AbilityScores, HpCalculationResult, HpRollResult, HpBreakdownEntry, MoneyCalculationResult, MoneyBreakdownEntry, ThiefSkillIncreases, CalculatedThiefSkills, SavingThrowRange, AcrobatSkillIncreases, CalculatedAcrobatSkills, BarbarianSkillIncreases, CalculatedBarbarianSkills, RangerSkillIncreases, CalculatedRangerSkills, BardSkillIncreases, CalculatedBardSkills } from './types';
import { ThiefSkill, AcrobatSkill, BarbarianSkill, RangerSkill, BardSkill } from './types';
import { THIEF_SKILLS_ORDER, ACROBAT_SKILLS_ORDER, BARBARIAN_SKILLS_ORDER, RANGER_SKILLS_ORDER, BARD_SKILLS_ORDER } from './constants';
import { ATTACK_PROGRESSIONS } from './class-data';

export const cropImage = (imageBase64: string, box: { x: number, y: number, width: number, height: number }): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }

      // The AI is asked for a square box, so box.width and box.height are the same normalized value.
      // We interpret this as a size relative to the image's smaller dimension (width for a 9:16 portrait).
      const pixelSize = box.width * img.naturalWidth;

      // The AI provides the top-left corner of a non-square region in normalized coordinates.
      // We'll calculate the center of that region to anchor our new, truly square pixel region.
      const centerX = (box.x + box.width / 2) * img.naturalWidth;
      const centerY = (box.y + box.height / 2) * img.naturalHeight;
      
      // Calculate the top-left corner of the square source region in pixels.
      const sx = centerX - pixelSize / 2;
      const sy = centerY - pixelSize / 2;

      // The canvas is the size of the final cropped image, which must be square.
      canvas.width = pixelSize;
      canvas.height = pixelSize;

      // Draw the calculated square portion of the image onto the canvas.
      // sx, sy, sWidth, sHeight define the source rectangle (from the original image).
      // 0, 0, dWidth, dHeight define the destination rectangle (on the canvas).
      ctx.drawImage(img, sx, sy, pixelSize, pixelSize, 0, 0, pixelSize, pixelSize);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (err) => {
      reject(new Error('Image failed to load for cropping.'));
    };
    img.src = imageBase64;
  });
};

export const roundToNearest5 = (num: number): number => {
    return Math.round(num / 5) * 5;
};

export const getEncumbranceDetails = (weight: number, strength: number) => {
    const maxEncumbrance = getMaxEncumbranceByStrength(strength);
    const thresholds = {
        normal: Math.floor(maxEncumbrance * 0.25),
        slowed: Math.floor(maxEncumbrance * 0.375),
        verySlow: Math.floor(maxEncumbrance * 0.5),
        max: maxEncumbrance,
    };

    let result;
    if (weight > thresholds.max) result = { level: 'Overburdened', speed: "0'", speedValue: 0, color: 'bg-red-900', textColor: 'text-red-300' };
    else if (weight > thresholds.verySlow) result = { level: 'Barely Moving', speed: "30'", speedValue: 30, color: 'bg-red-800/80', textColor: 'text-red-400' };
    else if (weight > thresholds.slowed) result = { level: 'Very Slow', speed: "60'", speedValue: 60, color: 'bg-orange-800/80', textColor: 'text-orange-400' };
    else if (weight > thresholds.normal) result = { level: 'Slowed', speed: "90'", speedValue: 90, color: 'bg-yellow-800/80', textColor: 'text-yellow-400' };
    else result = { level: 'Normal', speed: "120'", speedValue: 120, color: 'bg-green-800/80', textColor: 'text-green-400' };
    
    return { ...result, thresholds, maxEncumbrance };
};

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

export const getXPModifierString = (classInfo: ClassInfo, scores: AbilityScores): string => {
    const { primeRequisite } = classInfo;
    let bonus = 0;

    // Determine the lowest PR score for penalty check
    const allPrScores = Array.isArray(primeRequisite)
        ? primeRequisite.map(pr => scores[pr as Ability])
        : [scores[primeRequisite as Ability]];
    const lowestPrScore = Math.min(...allPrScores);
    
    // Check for penalty first
    if (lowestPrScore <= 5) return '-20%';
    if (lowestPrScore <= 8) return '-10%';

    // If no penalty, check for bonus
    if (Array.isArray(primeRequisite)) {
        // Dual prime requisites bonus logic
        const highestScore = Math.max(...allPrScores);
        // lowestScore is lowestPrScore
        if (highestScore >= 16) {
            bonus += 5;
        }
        if (lowestPrScore >= 13) {
            bonus += 5;
        }
    } else {
        // Single prime requisite bonus logic
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
  // xp array is 0-indexed where index 0 is level 1's requirement.
  if (level > 0 && level <= classInfo.xp.length) {
    const xp = classInfo.xp[level - 1];
    return xp === null ? 0 : xp;
  }
  return 0;
};

export const getXPForNextLevel = (classInfo: ClassInfo, level: number): string => {
  // classInfo.xp is 0-indexed for level 1, 2, 3...
  // So to get XP for level L+1, we need index L.
  if (level < classInfo.xp.length) {
    const xp = classInfo.xp[level];
    if (xp !== null) {
      return xp.toString();
    } else {
      return 'N/A'; // Explicitly handle null for max level classes
    }
  }

  // If level is beyond the initial array, calculate based on xpPerLevelAfter9
  if (level >= 9 && classInfo.xpPerLevelAfter9) {
    const lastXp = classInfo.xp[classInfo.xp.length - 1];
    if(lastXp !== null) {
        const levelsAfterLastEntry = level - (classInfo.xp.length - 1);
        const nextXp = lastXp + (levelsAfterLastEntry * classInfo.xpPerLevelAfter9);
        return nextXp.toString();
    }
  }

  return 'N/A'; // For max level classes without per-level increments
};

export const rollDie = (sides: number): number => Math.floor(Math.random() * sides) + 1;

export const generateHpRollForLevel = (classInfo: ClassInfo): HpRollResult => {
    let levelRoll: number;
    let calculationString: string;
    const hitDie = classInfo.hitDie;

    if (classInfo.features?.hpRollRule === 'dwarf') {
        const roll1 = rollDie(hitDie);
        const roll2 = rollDie(hitDie);
        let chosenRoll = Math.max(roll1, roll2);
        calculationString = `Rolls (2d${hitDie}, take highest): (${roll1}, ${roll2}) -> ${chosenRoll}`;

        if (chosenRoll <= 2) {
            const reroll = rollDie(hitDie);
            calculationString += ` (rerolled ${chosenRoll} -> ${reroll})`;
            chosenRoll = reroll;
        }
        levelRoll = chosenRoll;
    } else {
        let initialRoll = rollDie(hitDie);
        calculationString = `Roll (1d${hitDie}): ${initialRoll}`;
        if (initialRoll <= 2) {
            const reroll = rollDie(hitDie);
            calculationString += ` (rerolled -> ${reroll})`;
            initialRoll = reroll;
        }
        levelRoll = initialRoll;
    }
    return { roll: levelRoll, calculation: calculationString };
};


export const calculateHP = (
    classInfo: ClassInfo,
    race: Race | null,
    scores: AbilityScores,
    level: number,
    racialRoll: number,
    levelRolls: Record<number, HpRollResult>
): HpCalculationResult => {
    // FIX: Property 'CON' does not exist on type 'AbilityScores'. Changed to 'Constitution'.
    const conModifier = getModifier(scores.Constitution);
    let totalHp = 0;
    const breakdown: HpBreakdownEntry[] = [];

    // 1. Racial HP
    const classHpDie = classInfo.features?.racialHpDie ?? 4;
    const raceHpDie = race?.racialHpDie ?? 4;
    const racialHpDie = Math.max(classHpDie, raceHpDie);
    totalHp += racialRoll;
    breakdown.push({
        source: 'Racial HP',
        calculation: `Rolled 1d${racialHpDie}: ${racialRoll}`,
        result: racialRoll,
    });

    // 2. Level 1 HP
    const level1Hp = Math.max(1, classInfo.hitDie + conModifier);
    totalHp += level1Hp;
    breakdown.push({
        source: 'Level 1',
        // FIX: Property 'CON' does not exist on type 'AbilityScores'. Changed to 'Constitution'.
        calculation: `Max HD (${classInfo.hitDie}) + CON Mod (${getModifierString(scores.Constitution)})`,
        result: level1Hp,
    });
    
    // 3. HP for subsequent levels
    for (let i = 2; i <= level; i++) {
        const result = levelRolls[i];
        if (!result) {
            breakdown.push({ source: `Level ${i}`, calculation: 'Error: roll data missing', result: 0 });
            continue;
        }
        
        const { roll: levelRoll, calculation: rollCalculation } = result;
        
        const dwarfBonus = classInfo.features?.hpBonusPerLevel ?? 0;
        const levelHpGain = Math.max(1, levelRoll + conModifier + dwarfBonus);
        totalHp += levelHpGain;

        // FIX: Property 'CON' does not exist on type 'AbilityScores'. Changed to 'Constitution'.
        let finalCalculationString = rollCalculation + ` + CON Mod (${getModifierString(scores.Constitution)})`;
        if (dwarfBonus > 0) {
             finalCalculationString += ` + Bonus (${dwarfBonus})`;
        }
        
        breakdown.push({
            source: `Level ${i}`,
            calculation: finalCalculationString,
            result: levelHpGain,
        });
    }

    return { total: totalHp, breakdown };
};

// --- MONEY CALCULATION ---

const parseDiceString = (str: string): { count: number, sides: number, multiplier: number } => {
    const match = str.match(/(\d+)d(\d+)\s*\*\s*(\d+)/);
    if (!match) return { count: 0, sides: 0, multiplier: 1 };
    return {
        count: parseInt(match[1], 10),
        sides: parseInt(match[2], 10),
        multiplier: parseInt(match[3], 10),
    };
};

const getAdvancementPurseDice = (group: ClassInfo['moneyGroup'], level: number): { count: number, sides: number } => {
    const purses = {
        Casters: { 2: {c:3,s:4}, 3: {c:4,s:4}, 4: {c:4,s:6}, 5: {c:5,s:6} },
        Skill: { 2: {c:3,s:6}, 3: {c:4,s:6}, 4: {c:4,s:8}, 5: {c:5,s:8} },
        Martial: { 2: {c:4,s:6}, 3: {c:5,s:6}, 4: {c:5,s:8}, 5: {c:6,s:8} },
        'Prestige Martial': { 2: {c:5,s:6}, 3: {c:6,s:6}, 4: {c:6,s:8}, 5: {c:7,s:8} },
    };
    const levelPurse = purses[group][level as keyof typeof purses[typeof group]];
    return levelPurse ? { count: levelPurse.c, sides: levelPurse.s } : { count: 0, sides: 0 };
};

export const generateRawMoneyRollsForLevel = (classInfo: ClassInfo, level: number, scores: AbilityScores): number[] => {
    let count: number;
    let sides: number;

    if (level === 1) {
        const parsed = parseDiceString(classInfo.startingWealth);
        count = parsed.count;
        sides = parsed.sides;
    } else {
        const purse = getAdvancementPurseDice(classInfo.moneyGroup, level);
        let baseCount = purse.count;
        sides = purse.sides;

        const { primeRequisite } = classInfo;
        const highestPrereqScore = Array.isArray(primeRequisite) 
            ? Math.max(...primeRequisite.map(pr => scores[pr]))
            : scores[primeRequisite];
        
        if (highestPrereqScore >= 16) {
            baseCount++;
        } else if (highestPrereqScore <= 8) {
            baseCount = Math.max(1, baseCount - 1);
        }
        count = baseCount;
    }

    if (count === 0 || sides === 0) return [];
    return Array.from({ length: count }, () => rollDie(sides));
};

export const calculateMoney = (
    classInfo: ClassInfo,
    scores: AbilityScores,
    level: number,
    moneyRolls: Record<number, number[]>
): MoneyCalculationResult => {
    let total = 0;
    const breakdown: MoneyBreakdownEntry[] = [];

    for (let i = 1; i <= level; i++) {
        const rolls = moneyRolls[i];
        if (!rolls) {
            breakdown.push({ source: `Level ${i}`, calculation: 'Error: roll data missing', result: 0 });
            continue;
        }

        let calculation = '';
        let finalAmount = 0;
        const sum = rolls.reduce((a, b) => a + b, 0);

        if (i === 1) {
            const { count, sides, multiplier } = parseDiceString(classInfo.startingWealth);
            finalAmount = sum * multiplier;
            calculation = `Starting Wealth (${count}d${sides}*${multiplier}): Rolls (${rolls.join(', ')}) -> ${sum} * ${multiplier} = ${finalAmount} gp`;
        } else {
            const { count: baseCount, sides } = getAdvancementPurseDice(classInfo.moneyGroup, i);
            let modReason = '';
            const { primeRequisite } = classInfo;
            const highestPrereqScore = Array.isArray(primeRequisite) 
                ? Math.max(...primeRequisite.map(pr => scores[pr]))
                : scores[primeRequisite];
            
            if (highestPrereqScore >= 16) {
                modReason = ` (+1 die for PR ${highestPrereqScore}≥16)`;
            } else if (highestPrereqScore <= 8) {
                modReason = ` (-1 die for PR ${highestPrereqScore}≤8)`;
            }

            let purse = sum * 10;
            calculation = `Purse (${baseCount}d${sides}${modReason}): Rolls (${rolls.join(', ')}) -> ${sum} * 10 = ${purse} gp`;
            
            // Safeguards
            const floor = 20;
            const ceiling = 10 * i * 100;
            
            if (purse < floor) {
                finalAmount = floor;
                calculation += ` (Floor applied: ${purse} -> ${floor} gp)`;
            } else if (purse > ceiling) {
                finalAmount = ceiling;
                calculation += ` (Ceiling applied: ${purse} -> ${ceiling} gp)`;
            } else {
                finalAmount = purse;
            }
        }

        total += finalAmount;
        breakdown.push({
            source: i === 1 ? 'Starting Wealth' : `Level ${i} Purse`,
            calculation,
            result: finalAmount,
        });
    }

    return { total, breakdown };
};


export const getMaxEncumbranceByStrength = (strength: number): number => {
  // Handles scores from 3 to 15 with a consistent linear progression.
  if (strength >= 3 && strength <= 15) {
    // Base at STR 3 is 300cn. Each point above 3 adds 100cn.
    return 300 + (strength - 3) * 100;
  }
  // Handles low strength scores by extrapolating backwards.
  if (strength < 3) {
    return Math.max(0, strength * 100); // e.g., STR 1=100, STR 2=200
  }
  // Handles high strength scores with their specific bonuses.
  if (strength === 16) {
    return 2000;
  }
  if (strength === 17) {
    return 2500;
  }
  // STR 18 and above
  return 3000;
};

// --- THIEF SKILLS CALCULATION ---

export const calculateThiefSkills = (
  level: number,
  increases: ThiefSkillIncreases
): CalculatedThiefSkills => {
  const totalIncreases: Partial<Record<ThiefSkill, number>> = {};

  // Sum up increases from all levels up to the current level
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
      // 4 increases max
      const totalIncreasesCapped = Math.min(4, numIncreases);
      const value = Math.min(5, base + totalIncreasesCapped);
      finalSkills[skill] = { value, display: `${value}-in-6` };
      return;
    }

    // All percentile skills
    const base = skill === ThiefSkill.ClimbSheerSurfaces ? 25 : 10;
    // 5 increases max
    const totalIncreasesCapped = Math.min(5, numIncreases);
    const value = Math.min(85, base + (totalIncreasesCapped * 15));
    finalSkills[skill] = { value, display: `${value}%` };
  });

  return finalSkills as CalculatedThiefSkills;
};

// --- ACROBAT SKILLS CALCULATION ---
export const calculateAcrobatSkills = (
    level: number,
    increases: AcrobatSkillIncreases
): CalculatedAcrobatSkills => {
    const totalIncreases: Partial<Record<AcrobatSkill, number>> = {};

    // Sum up increases from level 2 up to the current level
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
                base = 40;
                cap = 100;
                break;
            case AcrobatSkill.TightropeWalking:
                base = 40;
                cap = 100;
                break;
            case AcrobatSkill.Falling:
                base = 25;
                cap = 70;
                break;
            case AcrobatSkill.HideInShadows:
            case AcrobatSkill.MoveSilently:
                base = 10;
                cap = 70;
                break;
        }

        const value = Math.min(cap, base + (numIncreases * 15));
        finalSkills[skill] = { value, display: `${value}%` };
    });

    return finalSkills as CalculatedAcrobatSkills;
};

// --- BARBARIAN SKILLS CALCULATION ---
export const calculateBarbarianSkills = (
    level: number,
    increases: BarbarianSkillIncreases
): CalculatedBarbarianSkills => {
    const totalIncreases: Partial<Record<BarbarianSkill, number>> = {};

    // Sum up increases from level 2 up to the current level
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
                base = 25;
                cap = 85;
                break;
            case BarbarianSkill.HideInUndergrowth:
                base = 10;
                cap = 70;
                break;
            case BarbarianSkill.MoveSilently:
                base = 10;
                cap = 70;
                break;
        }

        const value = Math.min(cap, base + (numIncreases * 15));
        finalSkills[skill] = { value, display: `${value}%` };
    });

    return finalSkills as CalculatedBarbarianSkills;
};

// --- RANGER SKILLS CALCULATION ---
export const calculateRangerSkills = (
  level: number,
  increases: RangerSkillIncreases
): CalculatedRangerSkills => {
  const totalIncreases: Partial<Record<RangerSkill, number>> = {};

  // Sum up increases from all levels up to the current level
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

    // Hide in Shadows & Move Silently
    const base = 10;
    const value = Math.min(70, base + (numIncreases * 15));
    finalSkills[skill] = { value, display: `${value}%` };
  });

  return finalSkills as CalculatedRangerSkills;
};

// --- BARD SKILLS CALCULATION ---
export const calculateBardSkills = (
  level: number,
  increases: BardSkillIncreases
): CalculatedBardSkills => {
  const totalIncreases: Partial<Record<BardSkill, number>> = {};

  // Sum up increases from all levels up to the current level
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

    // Pick Pockets, Move Silently, Hide in Shadows
    const base = 10;
    const value = Math.min(70, base + (numIncreases * 15));
    finalSkills[skill] = { value, display: `${value}%` };
  });

  return finalSkills as CalculatedBardSkills;
};

export const getBonusSpellSlots = (classInfo: ClassInfo, scores: AbilityScores): { [spellLevel: string]: number } => {
  const bonuses: { [spellLevel: string]: number } = {};
  const ability = classInfo.spellcastingInfo?.bonus_spell_ability;

  if (ability === 'WIS') {
    const wis = scores.Wisdom;
    if (wis >= 13 && wis <= 15) {
      bonuses['1'] = (bonuses['1'] || 0) + 1;
    } else if (wis >= 16 && wis <= 17) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
    } else if (wis >= 18) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
      bonuses['2'] = (bonuses['2'] || 0) + 1;
    }
  } else if (ability === 'INT') {
    const int = scores.Intelligence;
    if (int >= 13 && int <= 15) {
      bonuses['1'] = (bonuses['1'] || 0) + 1;
    } else if (int >= 16 && int <= 17) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
    } else if (int >= 18) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
      bonuses['2'] = (bonuses['2'] || 0) + 1;
    }
  }
  
  return bonuses;
};

export const getTitleForLevel = (classInfo: ClassInfo, level: number): string => {
    if (!classInfo.titles || classInfo.titles.length === 0) {
        return '';
    }
    // Titles array is 0-indexed for level 1, 2, ...
    const index = Math.min(level - 1, classInfo.titles.length - 1);
    return classInfo.titles[index] || '';
};

export const isClassRestrictedByRace = (classInfo: ClassInfo, selectedRace: Race | null): boolean => {
    if (!selectedRace) return false;

    // Humans can be any non-demihuman class. So, demihuman classes are restricted.
    if (selectedRace.name === 'Human') {
        return classInfo.group === 'Demihuman';
    }

    const allowedClasses = selectedRace.available_classes_max_level;
    const classNameToCheck = classInfo.name;
    
    // If "All non-demihuman classes" is a rule, then this class is allowed if it is not a demihuman class.
    // If it IS a demihuman class, we continue to check if it's explicitly listed.
    if (allowedClasses['All non-demihuman classes'] && classInfo.group !== 'Demihuman') {
        return false;
    }
    
    // Check if the class is explicitly allowed (ignoring '*' which is for display)
    const isAllowed = Object.keys(allowedClasses).some(allowedClassName => 
        allowedClassName.replace('*', '') === classNameToCheck
    );
    
    return !isAllowed;
};