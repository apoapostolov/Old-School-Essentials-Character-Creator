
import React, { useMemo } from 'react';
import type { SageSkillIncreases, SageSkill } from '../types';
import { SAGE_SKILLS_ORDER, SAGE_SKILL_DESCRIPTIONS } from '../constants';
import { calculateSageSkills } from '../utils/skills';

interface SageSkillsManagerProps {
    level: number;
    increases: SageSkillIncreases;
    onIncreasesChange: (increases: SageSkillIncreases) => void;
}

export const SageSkillsManager: React.FC<SageSkillsManagerProps> = ({ level, increases, onIncreasesChange }) => {
    // Sage: level 1 starts with 4 increases (+15% each, max 2 per skill);
    // each new level grants 2 more (max 1 per skill per level). Caps at 85%.
    const { totalPointsAvailable, totalPointsSpent } = useMemo(() => {
        let available = 4 + Math.max(0, level - 1) * 2;
        let spent = 0;
        for (let i = 1; i <= level; i++) {
            spent += Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
        }
        return { totalPointsAvailable: available, totalPointsSpent: spent };
    }, [level, increases]);

    const pointsRemaining = totalPointsAvailable - totalPointsSpent;

    const calculatedSkills = useMemo(() => calculateSageSkills(level, increases), [level, increases]);

    const handleUpdateIncreases = (skill: SageSkill, change: 1 | -1) => {
        const newIncreases: SageSkillIncreases = JSON.parse(JSON.stringify(increases));

        if (change === 1) {
            // Find the first level with an available slot
            for (let i = 1; i <= level; i++) {
                const levelIncreases = newIncreases[i] || {};
                const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
                const pointsInSkillAtLevel = levelIncreases[skill] || 0;

                const maxPointsAtLevel = i === 1 ? 4 : 2;
                const maxPerSkillAtLevel = i === 1 ? 2 : 1;

                if (pointsSpentAtLevel < maxPointsAtLevel && pointsInSkillAtLevel < maxPerSkillAtLevel) {
                    if (!newIncreases[i]) newIncreases[i] = {};
                    newIncreases[i][skill] = (newIncreases[i][skill] || 0) + 1;
                    onIncreasesChange(newIncreases);
                    return;
                }
            }
        } else {
            // Find the last level with a point to remove
            for (let i = level; i >= 1; i--) {
                if (newIncreases[i] && newIncreases[i][skill] > 0) {
                    newIncreases[i][skill] -= 1;
                    if (newIncreases[i][skill] === 0) {
                        delete newIncreases[i][skill];
                    }
                    if (Object.keys(newIncreases[i]).length === 0) {
                        delete newIncreases[i];
                    }
                    onIncreasesChange(newIncreases);
                    return;
                }
            }
        }
    };

    const totalIncreasesForSkill = (skill: SageSkill) => {
        let total = 0;
        for (let i = 1; i <= level; i++) {
            total += increases[i]?.[skill] || 0;
        }
        return total;
    };

    const canIncreaseSkill = (skill: SageSkill): boolean => {
        if (pointsRemaining <= 0) return false;

        // 5 increases max per skill (85% cap)
        const totalIncreases = totalIncreasesForSkill(skill);
        if (totalIncreases >= 5) return false;

        for (let i = 1; i <= level; i++) {
            const pointsSpentAtLevel = Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
            const pointsInSkillAtLevel = increases[i]?.[skill] || 0;
            const maxPointsAtLevel = i === 1 ? 4 : 2;
            const maxPerSkillAtLevel = i === 1 ? 2 : 1;

            if (pointsSpentAtLevel < maxPointsAtLevel && pointsInSkillAtLevel < maxPerSkillAtLevel) {
                return true;
            }
        }
        return false;
    };

    const buttonClasses = "h-7 w-7 rounded-full bg-gray-700/50 hover:bg-yellow-600/80 text-white font-bold text-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-400";

    return (
        <div>
            <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 mb-6 text-center">
                <h3 className="text-lg font-bold text-yellow-300">
                    {pointsRemaining} / {totalPointsAvailable} Points to Spend
                </h3>
                 <p className="text-sm text-gray-400">
                    Distribute points based on your total for level {level}. Rules are applied automatically.
                </p>
            </div>

            <div className="space-y-3">
                {SAGE_SKILLS_ORDER.map(skill => {
                    const skillValue = calculatedSkills[skill];
                    const canIncrease = canIncreaseSkill(skill);
                    const canDecrease = totalIncreasesForSkill(skill) > 0;

                    return (
                        <div key={skill} className="bg-gray-900/40 p-3 rounded-md flex items-center justify-between">
                            <div className="flex-1 pr-2">
                                <p className="font-bold text-gray-200">{skill}</p>
                                <p className="text-xs text-gray-400">{SAGE_SKILL_DESCRIPTIONS[skill]}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-black text-white w-24 text-center">{skillValue.display}</p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleUpdateIncreases(skill, -1)} disabled={!canDecrease} className={buttonClasses} aria-label={`Decrease ${skill}`}>-</button>
                                    <button onClick={() => handleUpdateIncreases(skill, 1)} disabled={!canIncrease} className={buttonClasses} aria-label={`Increase ${skill}`}>+</button>
                                </div>
                                <div className="hidden sm:block w-16" aria-hidden="true" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
