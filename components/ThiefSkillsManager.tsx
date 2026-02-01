
import React, { useMemo } from 'react';
import type { ThiefSkillIncreases, ThiefSkill } from '../types';
import { THIEF_SKILLS_ORDER, THIEF_SKILL_DESCRIPTIONS } from '../constants';
import { calculateThiefSkills } from '../utils/skills';

interface ThiefSkillsManagerProps {
    level: number;
    increases: ThiefSkillIncreases;
    onIncreasesChange: (increases: ThiefSkillIncreases) => void;
}

export const ThiefSkillsManager: React.FC<ThiefSkillsManagerProps> = ({ level, increases, onIncreasesChange }) => {
    // Calculate total points available and spent up to the current level
    const { totalPointsAvailable, totalPointsSpent } = useMemo(() => {
        let available = 4 + Math.max(0, level - 1) * 2;
        let spent = 0;
        for (let i = 1; i <= level; i++) {
            spent += Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
        }
        return { totalPointsAvailable: available, totalPointsSpent: spent };
    }, [level, increases]);
    
    const pointsRemaining = totalPointsAvailable - totalPointsSpent;

    const calculatedSkills = useMemo(() => calculateThiefSkills(level, increases), [level, increases]);

    const handleUpdateIncreases = (skill: ThiefSkill, change: 1 | -1) => {
        // FIX: Explicitly typing `newIncreases` prevents `any` from `JSON.parse`.
        // This allows TypeScript to correctly infer types in the reduce function below, resolving the type errors.
        const newIncreases: ThiefSkillIncreases = JSON.parse(JSON.stringify(increases));

        if (change === 1) { // Adding a point
            // Find the first level with an available slot
            for (let i = 1; i <= level; i++) {
                const levelIncreases = newIncreases[i] || {};
                // The accumulator `a` and value `b` are now correctly typed as numbers.
                const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
                const pointsInSkillAtLevel = levelIncreases[skill] || 0;
                
                const maxPointsAtLevel = i === 1 ? 4 : 2;
                const maxPerSkillAtLevel = i === 1 ? 2 : 1;

                if (pointsSpentAtLevel < maxPointsAtLevel && pointsInSkillAtLevel < maxPerSkillAtLevel) {
                    if (!newIncreases[i]) newIncreases[i] = {};
                    newIncreases[i][skill] = (newIncreases[i][skill] || 0) + 1;
                    onIncreasesChange(newIncreases);
                    return; // Exit after adding the point
                }
            }
        } else { // Removing a point
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
                    return; // Exit after removing the point
                }
            }
        }
    };
    
    const totalIncreasesForSkill = (skill: ThiefSkill) => {
        let total = 0;
        for (let i = 1; i <= level; i++) {
            total += increases[i]?.[skill] || 0;
        }
        return total;
    };
    
    const canIncreaseSkill = (skill: ThiefSkill): boolean => {
        if (pointsRemaining <= 0) return false;
        
        const totalIncreases = totalIncreasesForSkill(skill);
        const maxTotalIncreases = skill === 'Hear Noise' ? 4 : 5;
        if (totalIncreases >= maxTotalIncreases) return false;

        // Check if there's any level with a free slot
        for (let i = 1; i <= level; i++) {
            const pointsSpentAtLevel = Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
            const pointsInSkillAtLevel = increases[i]?.[skill] || 0;
            const maxPointsAtLevel = i === 1 ? 4 : 2;
            const maxPerSkillAtLevel = i === 1 ? 2 : 1;
            
            if (pointsSpentAtLevel < maxPointsAtLevel && pointsInSkillAtLevel < maxPerSkillAtLevel) {
                return true; // Found a valid slot
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
                {THIEF_SKILLS_ORDER.map(skill => {
                    const skillValue = calculatedSkills[skill];
                    const canIncrease = canIncreaseSkill(skill);
                    const canDecrease = totalIncreasesForSkill(skill) > 0;

                    return (
                        <div key={skill} className="bg-gray-900/40 p-3 rounded-md flex items-center justify-between">
                            <div className="flex-1 pr-2">
                                <p className="font-bold text-gray-200">{skill}</p>
                                <p className="text-xs text-gray-400">{THIEF_SKILL_DESCRIPTIONS[skill]}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-black text-white w-24 text-center">{skillValue.display}</p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleUpdateIncreases(skill, -1)} disabled={!canDecrease} className={buttonClasses} aria-label={`Decrease ${skill}`}>-</button>
                                    <button onClick={() => handleUpdateIncreases(skill, 1)} disabled={!canIncrease} className={buttonClasses} aria-label={`Increase ${skill}`}>+</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
