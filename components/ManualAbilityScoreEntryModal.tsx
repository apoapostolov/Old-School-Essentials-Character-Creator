import React, { useState } from 'react';
import { ABILITIES } from '../constants';
import { Ability, AbilityScores } from '../types';

interface ManualAbilityScoreEntryModalProps {
  currentScores: AbilityScores | null;
  onApply: (scores: AbilityScores) => void;
  onClose: () => void;
}

// Color based on score value (matching AbilityScoreDisplay component)
const getBackgroundColor = (score: number): string => {
  if (score <= 6) return 'bg-red-900/50';
  if (score <= 8) return 'bg-yellow-900/50';
  if (score <= 12) return 'bg-gray-700/50';
  if (score <= 15) return 'bg-sky-900/50';
  if (score <= 17) return 'bg-green-900/50';
  return 'bg-purple-900/50';
};

const getTextColor = (score: number): string => {
  if (score <= 6) return 'text-red-400';
  if (score <= 8) return 'text-yellow-400';
  if (score <= 12) return 'text-white';
  if (score <= 15) return 'text-sky-400';
  if (score <= 17) return 'text-green-400';
  return 'text-purple-400';
};

export const ManualAbilityScoreEntryModal: React.FC<ManualAbilityScoreEntryModalProps> = ({
  currentScores,
  onApply,
  onClose
}) => {
  const roll4d6DropLowest = (): number => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => a - b);
    return rolls[1] + rolls[2] + rolls[3];
  };
  // Initialize with current scores or default to 10s
  const initialScores: AbilityScores = currentScores || {
    [Ability.Strength]: 10,
    [Ability.Dexterity]: 10,
    [Ability.Constitution]: 10,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 10,
  };

  const [manualScores, setManualScores] = useState<AbilityScores>(initialScores);
  const [manualInputs, setManualInputs] = useState<Record<Ability, string>>(
    ABILITIES.reduce((acc, ability) => {
      acc[ability] = String(initialScores[ability]);
      return acc;
    }, {} as Record<Ability, string>)
  );
  const [errors, setErrors] = useState<Partial<Record<Ability, string>>>({});

  const handleScoreChange = (ability: Ability, value: string) => {
    // Allow free text entry, but keep only numeric characters
    const cleaned = value.replace(/[^0-9]/g, '');
    setManualInputs(prev => ({ ...prev, [ability]: cleaned }));

    // Prepare new error map without this ability's error first
    const newErrors = { ...errors };
    delete newErrors[ability];

    // Empty is allowed while typing; show 'Required' but don't update numeric state yet
    if (cleaned === '') {
      newErrors[ability] = 'Required';
      setErrors(newErrors);
      return;
    }

    const numValue = parseInt(cleaned, 10);

    // Validate numeric range
    if (isNaN(numValue)) {
      newErrors[ability] = 'Required';
      setErrors(newErrors);
      return;
    }

    if (numValue < 3 || numValue > 18) {
      newErrors[ability] = 'Must be 3-18';
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);
    setManualScores(prev => ({ ...prev, [ability]: numValue }));
  };

  const handleApply = () => {
    // Final validation
    const newErrors: Partial<Record<Ability, string>> = {};
    let hasErrors = false;

    // Build final scores from text inputs to ensure what's typed is applied
    const finalScores = ABILITIES.reduce((acc, ability) => {
      const input = manualInputs[ability] ?? '';
      const num = parseInt(input, 10);

      if (!input) {
        newErrors[ability] = 'Required';
        hasErrors = true;
      } else if (isNaN(num) || num < 3 || num > 18) {
        newErrors[ability] = 'Must be 3-18';
        hasErrors = true;
      } else {
        acc[ability] = num as number;
      }
      return acc;
    }, {} as AbilityScores);

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    onApply(finalScores);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-800 border-2 border-gray-600 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b-2 border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-yellow-400">Manual Ability Score Entry</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-300 text-sm">
              Enter ability scores between <strong className="text-yellow-400">3</strong> and <strong className="text-yellow-400">18</strong>.
              The boxes will change color based on the score value, matching the standard ability score display.
            </p>
          </div>

          {/* Ability Score Entry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ABILITIES.map(ability => {
              const score = manualScores[ability];
              const error = errors[ability];
              const bgColor = getBackgroundColor(score);
              const textColor = getTextColor(score);

              return (
                <div
                  key={ability}
                  className={`flex flex-col items-center justify-between p-4 rounded-lg shadow-lg border-2 transition-all duration-300 ${
                    error
                      ? 'border-red-500 bg-red-900/30'
                      : `border-gray-700/50 ${bgColor}`
                  }`}
                >
                  <label
                    htmlFor={`score-${ability}`}
                    className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2"
                  >
                    {ability}
                  </label>

                  <input
                    id={`score-${ability}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    value={manualInputs[ability]}
                    onChange={(e) => handleScoreChange(ability, e.target.value)}
                    className={`w-20 text-center text-5xl font-extrabold bg-black/30 border-2 rounded-lg px-2 py-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      error
                        ? 'border-red-500 text-red-400'
                        : `border-gray-600 ${textColor}`
                    }`}
                  />

                  {error && (
                    <span className="text-xs text-red-400 mt-1 font-semibold">{error}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Fill Options */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-3 font-semibold">Quick Fill:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const allTens: AbilityScores = {
                    [Ability.Strength]: 10,
                    [Ability.Dexterity]: 10,
                    [Ability.Constitution]: 10,
                    [Ability.Intelligence]: 10,
                    [Ability.Wisdom]: 10,
                    [Ability.Charisma]: 10,
                  };
                  setManualScores(allTens);
                  setManualInputs(ABILITIES.reduce((acc, a) => { acc[a] = '10'; return acc; }, {} as Record<Ability, string>));
                  setErrors({});
                }}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
              >
                Reset to 10
              </button>
              <button
                onClick={() => {
                  const allEighteens: AbilityScores = {
                    [Ability.Strength]: 18,
                    [Ability.Dexterity]: 18,
                    [Ability.Constitution]: 18,
                    [Ability.Intelligence]: 18,
                    [Ability.Wisdom]: 18,
                    [Ability.Charisma]: 18,
                  };
                  setManualScores(allEighteens);
                  setManualInputs(ABILITIES.reduce((acc, a) => { acc[a] = '18'; return acc; }, {} as Record<Ability, string>));
                  setErrors({});
                }}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
              >
                All 18s
              </button>
              <button
                onClick={() => {
                  const rolled: AbilityScores = ABILITIES.reduce((acc, a) => {
                    acc[a] = roll4d6DropLowest();
                    return acc;
                  }, {} as AbilityScores);
                  setManualScores(rolled);
                  setManualInputs(ABILITIES.reduce((acc, a) => { acc[a] = String(rolled[a]); return acc; }, {} as Record<Ability, string>));
                  setErrors({});
                }}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
              >
                4d6 drop lowest
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t-2 border-gray-700 p-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors"
          >
            Apply Scores
          </button>
        </div>
      </div>
    </div>
  );
};
