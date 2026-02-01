import React from 'react';
import type { AbilityScores } from '../types';
import { ABILITIES } from '../constants';
import { ResetIcon } from './icons/ResetIcon';

interface RollHistoryCardProps {
  roll: AbilityScores;
  onRestore: () => void;
}

export const RollHistoryCard: React.FC<RollHistoryCardProps> = ({ roll, onRestore }) => {
  return (
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-lg p-4 flex flex-col justify-between hover:border-yellow-400/50 transition-colors duration-300">
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
        {ABILITIES.map(ability => (
          <div key={ability} className="text-sm">
            <span className="font-bold text-gray-400">{ability}: </span>
            <span className="text-white font-semibold">{roll[ability]}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onRestore}
        className="bg-sky-800/70 hover:bg-sky-700/70 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-label="Restore this set of ability scores"
      >
        <ResetIcon className="mr-2 h-5 w-5" />
        Restore This Roll
      </button>
    </div>
  );
};