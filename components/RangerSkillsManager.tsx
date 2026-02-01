
import React, { useMemo } from 'react';
import { RangerSkill, type RangerSkillIncreases, type FavoredTerrain } from '../types';
import { RANGER_SKILLS_ORDER, RANGER_SKILL_DESCRIPTIONS, FAVORED_TERRAINS } from '../constants';
import { calculateRangerSkills } from '../utils/skills';

interface RangerSkillsManagerProps {
    level: number;
    increases: RangerSkillIncreases;
    onIncreasesChange: (increases: RangerSkillIncreases) => void;
    favoredTerrain: FavoredTerrain | null;
    onFavoredTerrainChange: (terrain: FavoredTerrain) => void;
}

export const RangerSkillsManager: React.FC<RangerSkillsManagerProps> = ({ level, increases, onIncreasesChange, favoredTerrain, onFavoredTerrainChange }) => {
    const { totalPointsAvailable, totalPointsSpent } = useMemo(() => {
        const available = Math.max(0, level - 1);
        let spent = 0;
        for (let i = 1; i <= level; i++) {
            spent += Object.values(increases[i] || {}).reduce((a, b) => a + (b || 0), 0);
        }
        return { totalPointsAvailable: available, totalPointsSpent: spent };
    }, [level, increases]);
    
    const pointsRemaining = totalPointsAvailable - totalPointsSpent;

    const calculatedSkills = useMemo(() => calculateRangerSkills(level, increases), [level, increases]);

    const handleUpdateIncreases = (skill: RangerSkill, change: 1 | -1) => {
        const newIncreases: RangerSkillIncreases = JSON.parse(JSON.stringify(increases));

        if (change === 1) { // Adding a point
            for (let i = 1; i <= level; i++) {
                const levelIncreases = newIncreases[i] || {};
                const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
                const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;
                
                const maxPointsAtLevel = i === 1 ? 0 : 1;

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
    
    const totalIncreasesForSkill = (skill: RangerSkill) => {
        let total = 0;
        for (let i = 1; i <= level; i++) {
            total += increases[i]?.[skill] || 0;
        }
        return total;
    };
    
    const canIncreaseSkill = (skill: RangerSkill): boolean => {
        if (pointsRemaining <= 0) return false;
        
        const skillValue = calculatedSkills[skill].value;
        const cap = skill === RangerSkill.HearNoise ? 5 : 70;
        if (skillValue >= cap) return false;

        for (let i = 1; i <= level; i++) {
            const levelIncreases = increases[i] || {};
            const pointsSpentAtLevel = Object.values(levelIncreases).reduce((a, b) => a + (b || 0), 0);
            const hasPointInSkillAtLevel = (levelIncreases[skill] || 0) > 0;
            const maxPointsAtLevel = i === 1 ? 0 : 1;
            
            if (pointsSpentAtLevel < maxPointsAtLevel && !hasPointInSkillAtLevel) {
                return true;
            }
        }
        return false;
    };
    
    const buttonClasses = "h-7 w-7 rounded-full bg-gray-700/50 hover:bg-yellow-600/80 text-white font-bold text-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-400";

    return (
        <div>
            <div className="mb-6">
                <label htmlFor="favored-terrain" className="block text-lg font-bold text-gray-300 mb-2">Favored Terrain</label>
                <select 
                    id="favored-terrain"
                    value={favoredTerrain || ''}
                    onChange={(e) => onFavoredTerrainChange(e.target.value as FavoredTerrain)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                >
                    <option value="" disabled>-- Select Your Terrain --</option>
                    {FAVORED_TERRAINS.map(terrain => (
                        <option key={terrain.name} value={terrain.name}>{terrain.name}</option>
                    ))}
                </select>
                <p className="text-sm text-gray-400 mt-2">
                    {favoredTerrain ? FAVORED_TERRAINS.find(t => t.name === favoredTerrain)?.description : "Your chosen terrain determines where your skills function."}
                </p>
            </div>

            <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 mb-6 text-center">
                <h3 className="text-lg font-bold text-yellow-300">
                    {pointsRemaining} / {totalPointsAvailable} Points to Spend
                </h3>
                 <p className="text-sm text-gray-400">
                    L1: 0 pts. L2+: +1 pt/lvl. 1 pt per skill per level.
                </p>
            </div>

            <div className="space-y-3">
                {RANGER_SKILLS_ORDER.map(skill => {
                    const skillValue = calculatedSkills[skill];
                    const canIncrease = canIncreaseSkill(skill);
                    const canDecrease = totalIncreasesForSkill(skill) > 0;

                    return (
                        <div key={skill} className="bg-gray-900/40 p-3 rounded-md flex items-center justify-between">
                            <div className="flex-1 pr-2">
                                <p className="font-bold text-gray-200">{skill}</p>
                                <p className="text-xs text-gray-400">{RANGER_SKILL_DESCRIPTIONS[skill]}</p>
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
