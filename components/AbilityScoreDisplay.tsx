
import React from 'react';
import { ResetIcon } from './icons/ResetIcon';
import { getModifierString } from '../utils/character';

interface AbilityScoreDisplayProps {
  ability: string;
  score: number;
  preRaceScore: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
  isInteractive: boolean;
  isBelowBase: boolean;
}

const getBackgroundColor = (score: number): string => {
  if (score <= 6) return 'bg-red-900/50';
  if (score <= 8) return 'bg-yellow-900/50';
  if (score <= 12) return 'bg-gray-700/50';
  if (score <= 15) return 'bg-sky-900/50';
  if (score <= 17) return 'bg-green-900/50';
  return 'bg-purple-900/50';
};

export const AbilityScoreDisplay: React.FC<AbilityScoreDisplayProps> = ({ 
    ability, 
    score,
    preRaceScore,
    onIncrement,
    onDecrement,
    canIncrement,
    canDecrement,
    isInteractive,
    isBelowBase
 }) => {
  const modifier = getModifierString(score);
  const scoreColorClass = score > preRaceScore ? 'text-green-400' : score < preRaceScore ? 'text-red-400' : 'text-white';
  const buttonClasses = "h-8 w-8 rounded-full bg-gray-700/50 hover:bg-yellow-600/80 text-white font-bold text-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-400";

  return (
    <div className={`flex flex-col items-center justify-between p-4 rounded-lg shadow-lg border border-gray-700/50 text-white transition-all duration-300 ${getBackgroundColor(score)} min-h-[150px]`}>
      <div className="text-sm font-bold uppercase tracking-wider text-gray-400">{ability}</div>
      
      <div className="flex items-center justify-between w-full">
        {isInteractive ? (
          <button onClick={onDecrement} disabled={!canDecrement} className={buttonClasses} aria-label={`Decrease ${ability}`}>-</button>
        ) : <div className="w-8 h-8"></div>}
        
        <div className={`text-5xl font-extrabold transition-colors duration-300 ${scoreColorClass}`}>{score}</div>
        
        {isInteractive ? (
          <button onClick={onIncrement} disabled={!canIncrement} className={buttonClasses} aria-label={`Increase ${ability}`}>
            {isBelowBase ? <ResetIcon className="h-5 w-5" /> : '+'}
          </button>
        ) : <div className="w-8 h-8"></div>}
      </div>

      <div className="text-lg font-semibold text-gray-300 rounded-full bg-black/30 px-3 py-1">{modifier}</div>
    </div>
  );
};
