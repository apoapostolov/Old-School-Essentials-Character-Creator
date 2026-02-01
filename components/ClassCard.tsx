
import React from 'react';
import type { Ability, AbilityScores, ClassInfo, Race } from '../types';
import { isClassRestrictedByRace } from '../utils/character';
import { CheckIcon } from './icons/CheckIcon';
import { InfoIcon } from './icons/InfoIcon';
import { NameWithSource } from './NameWithSource';

interface ClassCardProps {
  classInfo: ClassInfo;
  scores: AbilityScores | null;
  onSelect: (classInfo: ClassInfo) => void;
  isSelected: boolean;
  onShowInfo: (classInfo: ClassInfo) => void;
  selectedRace: Race | null;
}

const checkQualification = (requirements: ClassInfo['requirements'], scores: AbilityScores): boolean => {
  return Object.entries(requirements).every(([ability, minScore]) => {
    return scores[ability as Ability] >= (minScore || 0);
  });
};

const checkNearMatch = (requirements: ClassInfo['requirements'], scores: AbilityScores): boolean => {
    if (checkQualification(requirements, scores)) {
        return false; // Already qualified, not a near match
    }

    let unmetRequirements = 0;
    let pointsNeeded = 0;

    for (const [ability, minScore] of Object.entries(requirements)) {
        if (scores[ability as Ability] < (minScore || 0)) {
            unmetRequirements++;
            pointsNeeded += (minScore || 0) - scores[ability as Ability];
        }
    }

    return unmetRequirements === 1 && pointsNeeded === 1;
};

const groupColorStyles: Record<ClassInfo['group'], string> = {
    Basic: 'border-slate-500/50',
    Demihuman: 'border-teal-500/50',
    Advanced: 'border-indigo-500/50',
};

export const ClassCard: React.FC<ClassCardProps> = ({ classInfo, scores, onSelect, isSelected, onShowInfo, selectedRace }) => {
  const isRestricted = isClassRestrictedByRace(classInfo, selectedRace);
  const isQualified = scores && !isRestricted ? checkQualification(classInfo.requirements, scores) : false;
  const isNearMatch = scores && !isRestricted ? checkNearMatch(classInfo.requirements, scores) : false;

  const getCardStyles = () => {
      if (isSelected) return 'border-yellow-400 shadow-lg shadow-yellow-400/20 ring-2 ring-yellow-400/50';
      if (isRestricted) return 'border-amber-900/80 bg-stone-800/50';
      if (isQualified) return 'border-green-500/80 shadow-lg shadow-green-500/10';
      if (isNearMatch) return 'border-yellow-500/80 shadow-lg shadow-yellow-500/10';
      return groupColorStyles[classInfo.group];
  };

  return (
    <div
      className={`
        bg-gray-800/50 border-2 rounded-lg p-4 pb-8 transition-all duration-300 flex flex-col relative
        ${getCardStyles()}
        ${!scores ? 'opacity-50' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-bold ${isRestricted ? 'text-amber-500' : isQualified ? 'text-green-400' : isNearMatch ? 'text-yellow-400' : 'text-white'}`}>
            <NameWithSource name={classInfo.name} sourceId={classInfo.sourceId} />
        </h3>

        <div className="flex items-center space-x-2">
            {isRestricted && (
                 <span className="text-amber-400 bg-amber-900/50 px-3 py-1 rounded-full text-xs font-semibold">
                    RESTRICTED
                </span>
            )}
            {isQualified && (
                <span className="text-green-400 bg-green-900/50 px-3 py-1 rounded-full text-xs font-semibold">
                    QUALIFIED
                </span>
            )}
            {isNearMatch && (
                <span
                    className="text-yellow-400 bg-yellow-900/50 px-3 py-1 rounded-full text-xs font-semibold cursor-help"
                    title="You can qualify by decreasing a non-key attribute by 2 points and increasing the key attribute by 1 point"
                >
                    NEAR MATCH
                </span>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onShowInfo(classInfo);
                }}
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                aria-label={`Show info for ${classInfo.name}`}
            >
                <InfoIcon className="h-6 w-6" />
            </button>
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-sm text-gray-400 mb-2">Requirements:</p>
        <ul className="space-y-1 text-sm">
          {Object.entries(classInfo.requirements).map(([ability, minScore]) => {
            const currentScore = scores ? scores[ability as Ability] : 0;
            const requirementMet = scores && currentScore >= (minScore ?? 0);
            const isTheSpecificNearMiss = isNearMatch && scores && (minScore ?? 0) - currentScore === 1;

            const getStatusStyles = () => {
                if (!scores) return '';
                if (requirementMet) return 'text-green-400';
                if (isTheSpecificNearMiss) return 'text-yellow-400';
                return 'text-red-400';
            };

            const getStatusIcon = () => {
                if (!scores) return '';
                if (requirementMet) return '✓';
                if (isTheSpecificNearMiss) return '≈';
                return '✗';
            };

            return (
              <li key={ability} className="flex items-center justify-between">
                <span className="text-gray-300">{ability}: {minScore}</span>
                {scores && (
                  <span className={getStatusStyles()}>
                    {currentScore} {getStatusIcon()}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {isQualified && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <button
                onClick={() => onSelect(classInfo)}
                disabled={!scores}
                className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400
                    ${isSelected
                        ? 'bg-yellow-500 text-gray-900'
                        : 'bg-gray-700 text-gray-400 hover:bg-green-600 hover:text-white'
                    }
                `}
                aria-label={`Select ${classInfo.name}`}
            >
                <CheckIcon className="h-6 w-6" />
            </button>
        </div>
      )}

    </div>
  );
};
