
import React, { useMemo } from 'react';
import { BardSkill, type BardSkillIncreases } from '../types';
import { BARD_SKILLS_ORDER, BARD_SKILL_DESCRIPTIONS } from '../constants';
import { calculateBardSkills } from '../utils/skills';

interface BardSkillsManagerProps {
    level: number;
    increases: BardSkillIncreases;
    onIncreasesChange: (increases: BardSkillIncreases) => void;
}

export const BardSkillsManager: React.FC<BardSkillsManagerProps> = ({ level, increases, onIncreasesChange }) => {
    const { totalPointsAvailable, totalPointsSpent } = useMemo(() => {
        const available = level; // 1 at L1, +1 each level after
        let spent = 0;
        for (let i = 1; i <= level; i++) {
            spent += Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
        }
        return { totalPointsAvailable: available, totalPointsSpent: spent };
    }, [level, increases]);
    
    const pointsRemaining = totalPointsAvailable - totalPointsSpent;

    const calculatedSkills = useMemo(() => calculateBardSkills(level, increases), [level, increases]);

    const handleUpdateIncreases = (skill: BardSkill, change: 1 | -1) => {
        const newIncreases: BardSkillIncreases = JSON.parse(JSON.stringify(increases));

        if (change === 1) { // Adding a point
            for (let i = 1; i <= level; i++) {
                const levelIncreases = newIncreases[i] || {};
                const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
                const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;
                
                const maxPointsAtLevel = 1;

                if (pointsSpentAtLevel < maxPointsAtLevel && !hasPointInSkillAtLevel) {
                    if (!newIncreases[i]) newIncreases[i] = {};
                    newIncreases[i][skill] = (newIncreases[i][skill] || 0) + 1;
                    onIncreasesChange(newIncreases);
                    return;
                }
            }
        } else { // Removing a point
            for (let i = level; i >= 1; i--) {
                if (newIncreases[i] && (newIncreases[i][skill] ?? 0) > 0) {
                    newIncreases[i][skill] = (newIncreases[i][skill] ?? 0) - 1;
                    if (newIncreases[i][skill] === 0) delete newIncreases[i][skill];
                    if (Object.keys(newIncreases[i]).length === 0) delete newIncreases[i];
                    onIncreasesChange(newIncreases);
                    return;
                }
            }
        }
    };
    
    const totalIncreasesForSkill = (skill: BardSkill) => {
        let total = 0;
        for (let i = 1; i <= level; i++) {
            total += increases[i]?.[skill] || 0;
        }
        return total;
    };
    
    const canIncreaseSkill = (skill: BardSkill): boolean => {
        if (pointsRemaining <= 0) return false;
        
        const skillValue = calculatedSkills[skill].value;
        const cap = skill === BardSkill.HearNoise ? 5 : 70;
        if (skillValue >= cap) return false;

        for (let i = 1; i <= level; i++) {
            const levelIncreases = increases[i] || {};
            const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
            const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;
            const maxPointsAtLevel = 1;
            
            if (pointsSpentAtLevel < maxPointsAtLevel && !hasPointInSkillAtLevel) {
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
                    L1: 1 pt. L2+: +1 pt/lvl. 1 pt per skill per level.
                </p>
            </div>

            <div className="space-y-3">
                {BARD_SKILLS_ORDER.map(skill => {
                    const skillValue = calculatedSkills[skill];
                    const canIncrease = canIncreaseSkill(skill);
                    const canDecrease = totalIncreasesForSkill(skill) > 0;

                    return (
                        <div key={skill} className="bg-gray-900/40 p-3 rounded-md flex items-center justify-between">
                            <div className="flex-1 pr-2">
                                <p className="font-bold text-gray-200">{skill}</p>
                                <p className="text-xs text-gray-400">{BARD_SKILL_DESCRIPTIONS[skill]}</p>
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
