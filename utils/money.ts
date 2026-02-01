

import type { AbilityScores, ClassInfo, MoneyBreakdownEntry, MoneyCalculationResult } from '../types';
import { rollDie } from './hp';

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
    moneyRolls: Record<number, number[]>,
    goldModifier: number = 0
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
                modReason = ` (+1 die for PR ${highestPrereqScore}>=16)`;
            } else if (highestPrereqScore <= 8) {
                modReason = ` (-1 die for PR ${highestPrereqScore}<=8)`;
            }

            let purse = sum * 10;
            calculation = `Purse (${baseCount}d${sides}${modReason}): Rolls (${rolls.join(', ')}) -> ${sum} * 10 = ${purse} gp`;

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

    // Apply Karameikos social standing gold modifier
    if (goldModifier !== 0) {
        const modifierAmount = Math.round(total * (goldModifier / 100));
        const adjustedTotal = total + modifierAmount;
        breakdown.push({
            source: 'Karameikos Social Standing',
            calculation: `Social Standing Modifier: ${total} gp ${goldModifier >= 0 ? '+' : ''}${goldModifier}% = ${goldModifier >= 0 ? '+' : ''}${modifierAmount} gp`,
            result: modifierAmount,
        });
        total = adjustedTotal;
    }

    return { total, breakdown };
};
