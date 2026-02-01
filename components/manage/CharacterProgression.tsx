import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { CombatVitals } from './CombatVitals';

interface CharacterProgressionProps {
    stepNumber: number;
}

export const CharacterProgression: React.FC<CharacterProgressionProps> = ({ stepNumber }) => {
    const { progression } = useCharacterContext();
    const { characterLevel: level, handleLevelChange, hpResult, moneyResult } = progression;

    const levelOptions = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <>
            {/* Step 1 or 2: Level and HP */}
            <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Choose Starting Level</h2>
                <p className="text-gray-400 mb-6">Select your character's starting level to calculate their Hit Points and combat abilities.</p>

                <CombatVitals />

                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-lg shadow-md bg-gray-900/50 border border-gray-700 p-1 space-x-1" role="group" aria-label="Level Selector">
                        {levelOptions.map(l => (
                            <button
                                key={l}
                                onClick={() => handleLevelChange(l)}
                                className={`px-6 py-2 rounded-md font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:z-10
                                    ${level === l ? 'bg-yellow-500 text-gray-900 shadow-sm' : 'bg-transparent text-gray-400 hover:bg-gray-700/50'}
                                `}
                                aria-pressed={level === l}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col items-center justify-center bg-black/30 p-8 rounded-lg border border-gray-700 h-full">
                        <p className="text-gray-400 uppercase tracking-widest text-lg">Total Hit Points</p>
                        <p className="text-8xl font-black text-white my-2" aria-live="polite">
                            {hpResult ? hpResult.total : '--'}
                        </p>
                        <p className="text-yellow-400 font-semibold">at Level {level}</p>
                    </div>

                    <div className="bg-black/30 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-600 pb-2">HP Development</h3>
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {hpResult ? hpResult.breakdown.map((entry, index) => (
                                <li key={index} className="flex justify-between items-center text-sm p-2 rounded-md bg-gray-900/40">
                                    <div>
                                        <p className="font-bold text-gray-300">{entry.source}</p>
                                        <p className="text-xs text-gray-400">{entry.calculation}</p>
                                    </div>
                                    <p className={`text-xl font-bold ${index === 0 ? 'text-white' : 'text-green-400'}`}>
                                      {index > 0 && entry.result >= 0 ? `+${entry.result}` : entry.result}
                                    </p>
                                </li>
                            )) : (
                                <li className="text-center text-gray-500 p-4">Select a level to see HP details.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Step 2: Money */}
            <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step 2: Roll Starting Money</h2>
                <p className="text-gray-400 mb-6">Your starting wealth is rolled automatically based on your class and level.</p>
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col items-center justify-center bg-black/30 p-8 rounded-lg border border-gray-700 h-full">
                        <p className="text-gray-400 uppercase tracking-widest text-lg">Total Gold Pieces</p>
                        <p className="text-8xl font-black text-yellow-300 my-2" aria-live="polite">
                            {moneyResult ? moneyResult.total : '--'}
                        </p>
                        <p className="text-yellow-400 font-semibold">at Level {level}</p>
                    </div>

                    <div className="bg-black/30 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-600 pb-2">Wealth Development</h3>
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                           {moneyResult ? moneyResult.breakdown.map((entry, index) => (
                                <li key={index} className="flex justify-between items-start text-sm p-2 rounded-md bg-gray-900/40">
                                    <div className="flex-1 pr-2">
                                        <p className="font-bold text-gray-300">{entry.source}</p>
                                        <p className="text-xs text-gray-400 break-words">{entry.calculation}</p>
                                    </div>
                                    <p className="text-xl font-bold text-yellow-400 whitespace-nowrap">
                                      {`+${entry.result} gp`}
                                    </p>
                                </li>
                            )) : (
                                <li className="text-center text-gray-500 p-4">Your wealth will be calculated here.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
