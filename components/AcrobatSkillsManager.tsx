
import React, { useMemo } from 'react';
import type { AcrobatSkillIncreases, AcrobatSkill } from '../types';
import { ACROBAT_SKILLS_ORDER, ACROBAT_SKILL_DESCRIPTIONS } from '../constants';
import { calculateAcrobatSkills } from '../utils/skills';

interface AcrobatSkillsManagerProps {
    level: number;
    increases: AcrobatSkillIncreases;
    onIncreasesChange: (increases: AcrobatSkillIncreases) => void;
}

export const AcrobatSkillsManager: React.FC<AcrobatSkillsManagerProps> = ({ level, increases, onIncreasesChange }) => {
    // Calculate total points available and spent up to the current level
    const { totalPointsAvailable, totalPointsSpent } = useMemo(() => {
        let available = Math.max(0, level - 1) * 2; // 0 points at level 1, 2 per level after
        let spent = 0;
        for (let i = 2; i <= level; i++) {
            spent += Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
        }
        return { totalPointsAvailable: available, totalPointsSpent: spent };
    }, [level, increases]);
    
    const pointsRemaining = totalPointsAvailable - totalPointsSpent;

    const calculatedSkills = useMemo(() => calculateAcrobatSkills(level, increases), [level, increases]);

    const handleUpdateIncreases = (skill: AcrobatSkill, change: 1 | -1) => {
        const newIncreases: AcrobatSkillIncreases = JSON.parse(JSON.stringify(increases));

        if (change === 1) { // Adding a point
            // Find the first level (from Lvl 2) with an available slot where this skill hasn't been increased yet.
            for (let i = 2; i <= level; i++) {
                const levelIncreases = newIncreases[i] || {};
                const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
                const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;
                
                // A level is valid if it has less than 2 points AND this skill hasn't received a point at this level yet.
                if (pointsSpentAtLevel < 2 && !hasPointInSkillAtLevel) {
                    if (!newIncreases[i]) newIncreases[i] = {};
                    // An increase is just 1 point per skill per level.
                    newIncreases[i][skill] = (newIncreases[i][skill] || 0) + 1;
                    onIncreasesChange(newIncreases);
                    return;
                }
            }
        } else { // Removing a point
            // Find the last level with a point to remove for this skill
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
    
    const totalIncreasesForSkill = (skill: AcrobatSkill) => {
        let total = 0;
        for (let i = 2; i <= level; i++) {
            total += increases[i]?.[skill] || 0;
        }
        return total;
    };
    
    const canIncreaseSkill = (skill: AcrobatSkill): boolean => {
        if (pointsRemaining <= 0) return false;

        const currentPercent = calculatedSkills[skill].value;
        const cap = (skill === 'Falling' || skill === 'Hide in Shadows' || skill === 'Move Silently') ? 70 : 100;
        if (currentPercent >= cap) return false;

        // Check if there is any level with a free slot for this skill.
        for (let i = 2; i <= level; i++) {
            const levelIncreases = increases[i] || {};
            const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
            const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;

            if (pointsSpentAtLevel < 2 && !hasPointInSkillAtLevel) {
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
                    At each level up, distribute 2 increases to different skills.
                </p>
            </div>

            <div className="space-y-3">
                {ACROBAT_SKILLS_ORDER.map(skill => {
                    const skillValue = calculatedSkills[skill];
                    const canIncrease = canIncreaseSkill(skill);
                    const canDecrease = totalIncreasesForSkill(skill) > 0;

                    return (
                        <div key={skill} className="bg-gray-900/40 p-3 rounded-md flex items-center justify-between">
                            <div className="flex-1 pr-2">
                                <p className="font-bold text-gray-200">{skill}</p>
                                <p className="text-xs text-gray-400">{ACROBAT_SKILL_DESCRIPTIONS[skill]}</p>
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
