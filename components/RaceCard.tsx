
import React from 'react';
// FIX: Changed import from 'import type' to a value import to allow using the 'Ability' enum as a value.
import { Race, AbilityScores, Ability } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { InfoIcon } from './icons/InfoIcon';
import { NameWithSource } from './NameWithSource';

interface RaceCardProps {
  race: Race;
  scores: AbilityScores | null;
  onSelect: (race: Race) => void;
  isSelected: boolean;
  onShowInfo: (race: Race) => void;
}

// FIX: Expanded map to include new 'min_str' and 'min_cha' requirements.
const abilityKeyMap: Record<keyof Race['requirements'], Ability> = {
    min_con: Ability.Constitution,
    min_dex: Ability.Dexterity,
    min_int: Ability.Intelligence,
    min_str: Ability.Strength,
    min_cha: Ability.Charisma,
};

const modifierKeyMap: Record<keyof Race['ability_modifiers'], Ability> = {
    str: Ability.Strength,
    dex: Ability.Dexterity,
    con: Ability.Constitution,
    int: Ability.Intelligence,
    wis: Ability.Wisdom,
    cha: Ability.Charisma,
};

const checkQualification = (requirements: Race['requirements'], scores: AbilityScores): boolean => {
  if (Object.keys(requirements).length === 0) return true;
  return Object.entries(requirements).every(([key, minScore]) => {
    const ability = abilityKeyMap[key as keyof Race['requirements']];
    return scores[ability] >= (minScore || 0);
  });
};

const checkNearMatch = (requirements: Race['requirements'], scores: AbilityScores): boolean => {
    if (Object.keys(requirements).length === 0 || checkQualification(requirements, scores)) {
        return false;
    }

    let unmetRequirements = 0;
    let pointsNeeded = 0;

    for (const [key, minScore] of Object.entries(requirements)) {
        const ability = abilityKeyMap[key as keyof Race['requirements']];
        if (scores[ability] < (minScore || 0)) {
            unmetRequirements++;
            pointsNeeded += (minScore || 0) - scores[ability];
        }
    }

    return unmetRequirements === 1 && pointsNeeded === 1;
};

export const RaceCard: React.FC<RaceCardProps> = ({ race, scores, onSelect, isSelected, onShowInfo }) => {
  const isQualified = scores ? checkQualification(race.requirements, scores) : false;
  const isNearMatch = scores ? checkNearMatch(race.requirements, scores) : false;

  const getCardStyles = () => {
      if (isSelected) return 'border-yellow-400 shadow-lg shadow-yellow-400/20 ring-2 ring-yellow-400/50';
      if (isQualified) return 'border-green-500/80 shadow-lg shadow-green-500/10';
      if (isNearMatch) return 'border-yellow-500/80 shadow-lg shadow-yellow-500/10';
      return 'border-red-900/50';
  };
  
  const hasRequirements = Object.keys(race.requirements).length > 0;
  const hasModifiers = Object.keys(race.ability_modifiers).length > 0;

  return (
    <div
      className={`
        bg-gray-800/50 border-2 rounded-lg p-4 pb-8 transition-all duration-300 flex flex-col relative
        ${getCardStyles()}
        ${!scores ? 'opacity-50' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-bold ${isQualified ? 'text-green-400' : isNearMatch ? 'text-yellow-400' : 'text-white'}`}>
            <NameWithSource name={race.name} sourceId={race.sourceId} />
        </h3>
        
        <div className="flex items-center space-x-2">
            {isQualified && hasRequirements && (
                <span className="text-green-400 bg-green-900/50 px-3 py-1 rounded-full text-xs font-semibold">
                    QUALIFIED
                </span>
            )}
            {isNearMatch && (
                <span className="text-yellow-400 bg-yellow-900/50 px-3 py-1 rounded-full text-xs font-semibold">
                    NEAR MATCH
                </span>
            )}
            <button
                onClick={(e) => { e.stopPropagation(); onShowInfo(race); }}
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                aria-label={`Show info for ${race.name}`}
            >
                <InfoIcon className="h-6 w-6" />
            </button>
        </div>
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-x-4">
            {hasRequirements ? (
            <div>
                <p className="text-sm text-gray-400 mb-2">Requirements:</p>
                <ul className="space-y-1 text-sm">
                {Object.entries(race.requirements).map(([key, minScore]) => {
                    const ability = abilityKeyMap[key as keyof Race['requirements']];
                    const currentScore = scores ? scores[ability] : 0;
                    const requirementMet = scores && currentScore >= (minScore ?? 0);
                    const isTheSpecificNearMiss = isNearMatch && scores && (minScore ?? 0) - currentScore === 1;

                    return (
                    <li key={ability} className="flex items-center justify-between">
                        <span className="text-gray-300">{ability.substring(0,3)}: {minScore}</span>
                        {scores && (
                        <span className={`${requirementMet ? 'text-green-400' : isTheSpecificNearMiss ? 'text-yellow-400' : 'text-red-400'}`}>
                            {currentScore} {requirementMet ? '✓' : isTheSpecificNearMiss ? '≈' : '✗'}
                        </span>
                        )}
                    </li>
                    );
                })}
                </ul>
            </div>
            ) : <div/>}
            {hasModifiers && (
            <div>
                <p className="text-sm text-gray-400 mb-2">Modifiers:</p>
                 <ul className="space-y-1 text-sm">
                    {Object.entries(race.ability_modifiers).map(([key, mod]) => {
                         const ability = modifierKeyMap[key as keyof Race['ability_modifiers']];
                         const modString = mod > 0 ? `+${mod}` : mod;
                         const color = mod > 0 ? 'text-green-400' : 'text-red-400';
                        return (
                             <li key={key} className="flex items-center justify-between">
                                <span className="text-gray-300">{ability.substring(0,3)}:</span>
                                <span className={color}>{modString}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            )}
        </div>
      </div>

      {(isQualified || !hasRequirements) && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <button
                onClick={() => onSelect(race)}
                disabled={!scores}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400
                    ${isSelected ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-400 hover:bg-green-600 hover:text-white'}`}
                aria-label={`Select ${race.name}`}
            >
                <CheckIcon className="h-6 w-6" />
            </button>
        </div>
      )}
    </div>
  );
};