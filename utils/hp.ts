
import type { ClassInfo, Race, AbilityScores, HpCalculationResult, HpRollResult, HpBreakdownEntry } from '../types';
import { getModifier, getModifierString } from './character';

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
    const conModifier = getModifier(scores.Constitution);
    let totalHp = 0;
    const breakdown: HpBreakdownEntry[] = [];

    const classHpDie = classInfo.features?.racialHpDie ?? 4;
    const raceHpDie = race?.racialHpDie ?? 4;
    const racialHpDie = Math.max(classHpDie, raceHpDie);
    totalHp += racialRoll;
    breakdown.push({
        source: 'Racial HP',
        calculation: `Rolled 1d${racialHpDie}: ${racialRoll}`,
        result: racialRoll,
    });

    const level1Hp = Math.max(1, classInfo.hitDie + conModifier);
    totalHp += level1Hp;
    breakdown.push({
        source: 'Level 1',
        calculation: `Max HD (${classInfo.hitDie}) + CON Mod (${getModifierString(scores.Constitution)})`,
        result: level1Hp,
    });
    
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
