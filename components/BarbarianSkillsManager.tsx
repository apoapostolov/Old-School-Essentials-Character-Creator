
import React, { useMemo } from 'react';
import { BarbarianSkill, type BarbarianSkillIncreases } from '../types';
import { BARBARIAN_SKILLS_ORDER, BARBARIAN_SKILL_DESCRIPTIONS } from '../constants';
import { calculateBarbarianSkills } from '../utils/skills';

interface BarbarianSkillsManagerProps {
    level: number;
    increases: BarbarianSkillIncreases;
    onIncreasesChange: (increases: BarbarianSkillIncreases) => void;
}

export const BarbarianSkillsManager: React.FC<BarbarianSkillsManagerProps> = ({ level, increases, onIncreasesChange }) => {
    const { totalPointsAvailable, totalPointsSpent } = useMemo(() => {
        let available = 0;
        if (level >= 2) {
            available += Math.min(level - 1, 8); // +1 for levels 2-9
        }
        if (level >= 10) {
            available += (level - 9) * 2; // +2 for levels 10+
        }
        
        let spent = 0;
        for (let i = 2; i <= level; i++) {
            spent += Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
        }
        return { totalPointsAvailable: available, totalPointsSpent: spent };
    }, [level, increases]);
    
    const pointsRemaining = totalPointsAvailable - totalPointsSpent;

    const calculatedSkills = useMemo(() => calculateBarbarianSkills(level, increases), [level, increases]);

    const handleUpdateIncreases = (skill: BarbarianSkill, change: 1 | -1) => {
        const newIncreases: BarbarianSkillIncreases = JSON.parse(JSON.stringify(increases));

        if (change === 1) { // Adding a point
            for (let i = 2; i <= level; i++) {
                const levelIncreases = newIncreases[i] || {};
                const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
                const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;
                
                const maxPointsAtLevel = i < 10 ? 1 : 2;

                if (pointsSpentAtLevel < maxPointsAtLevel && !hasPointInSkillAtLevel) {
                    if (!newIncreases[i]) newIncreases[i] = {};
                    newIncreases[i][skill] = (newIncreases[i][skill] || 0) + 1;
                    onIncreasesChange(newIncreases);
                    return;
                }
            }
        } else { // Removing a point
            for (let i = level; i >= 2; i--) {
                if (newIncreases[i] && (newIncreases[i][skill] ?? 0) > 0) {
                    newIncreases[i][skill] = (newIncreases[i][skill] ?? 0) - 1;
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
    
    const totalIncreasesForSkill = (skill: BarbarianSkill) => {
        let total = 0;
        for (let i = 2; i <= level; i++) {
            total += increases[i]?.[skill] || 0;
        }
        return total;
    };
    
    const canIncreaseSkill = (skill: BarbarianSkill): boolean => {
        if (pointsRemaining <= 0) return false;

        const currentPercent = calculatedSkills[skill].value;
        const cap = skill === BarbarianSkill.ClimbSheerSurfaces ? 85 : 70;
        if (currentPercent >= cap) return false;

        for (let i = 2; i <= level; i++) {
            const levelIncreases = increases[i] || {};
            const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
            const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;
            const maxPointsAtLevel = i < 10 ? 1 : 2;

            if (pointsSpentAtLevel < maxPointsAtLevel && !hasPointInSkillAtLevel) {
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
                    L2-9: +1 pt/lvl. L10+: +2 pts/lvl. 1 pt per skill per level.
                </p>
            </div>

            <div className="space-y-3">
                {BARBARIAN_SKILLS_ORDER.map(skill => {
                    const skillValue = calculatedSkills[skill];
                    const canIncrease = canIncreaseSkill(skill);
                    const canDecrease = totalIncreasesForSkill(skill) > 0;

                    return (
                        <div key={skill} className="bg-gray-900/40 p-3 rounded-md flex items-center justify-between">
                            <div className="flex-1 pr-2">
                                <p className="font-bold text-gray-200">{skill}</p>
                                <p className="text-xs text-gray-400">{BARBARIAN_SKILL_DESCRIPTIONS[skill]}</p>
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
