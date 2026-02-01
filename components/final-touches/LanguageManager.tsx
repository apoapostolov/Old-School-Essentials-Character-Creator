import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import type { AbilityScores, Language } from '../../types';
import { getModifier } from '../../utils';
import { Tooltip } from '../Tooltip';
import { DiceIcon } from '../icons/DiceIcon';

const themeToLanguageSettingMap: Record<string, string> = {
    'ose': 'Generic OSE',
    'mystara': 'Karameikos',
    'dolmenwood': 'Dolmenwood',
    'shrike': 'The Shrike',
    'gods': 'Forbidden North',
    'northland': 'Northland Saga',
};

interface LanguageManagerProps {
    scores: AbilityScores;
    theme: string;
    selectedBonusLanguages: string[];
    onSelectedBonusLanguagesChange: (languages: string[]) => void;
    onRandomLanguage: () => void;
    commonLanguage: string;
    onCommonLanguageChange: (language: string) => void;
    racialLanguage: Language | null;
}

export const LanguageManager: React.FC<LanguageManagerProps> = ({
    scores,
    theme,
    selectedBonusLanguages,
    onSelectedBonusLanguagesChange,
    onRandomLanguage,
    commonLanguage,
    onCommonLanguageChange,
    racialLanguage,
}) => {
    const { aggregatedData } = useCharacterContext();
    const languageSettingKey = themeToLanguageSettingMap[theme] || 'Generic OSE';
    const languageSetting = aggregatedData.LANGUAGE_SETTINGS[languageSettingKey];

    const isLiterate = scores.Intelligence >= 9;
    const intModifier = getModifier(scores.Intelligence);
    const bonusLanguageSlots = Math.max(0, intModifier);
    const availableBonusLanguages = languageSetting?.languages.filter(lang =>
        lang.name !== commonLanguage &&
        lang.name !== racialLanguage?.name
    ) ?? [];

    const handleLanguageSelect = (langName: string) => {
        const isSelected = selectedBonusLanguages.includes(langName);
        if (isSelected) {
            onSelectedBonusLanguagesChange(selectedBonusLanguages.filter(l => l !== langName));
        } else {
            if (selectedBonusLanguages.length < bonusLanguageSlots) {
                onSelectedBonusLanguagesChange([...selectedBonusLanguages, langName]);
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4 bg-gray-900/50 p-2 rounded-md border border-gray-700">
                <span className="font-bold text-gray-400">Literacy Status:</span>
                <span className={`font-bold text-lg ${isLiterate ? 'text-green-400' : 'text-red-400'}`}>
                    {isLiterate ? 'Literate' : 'Illiterate'}
                </span>
            </div>

            <div className="mb-4">
                <label htmlFor="common-language" className="block text-sm font-bold text-gray-400 mb-1">Common Language</label>
                <select
                    id="common-language"
                    value={commonLanguage}
                    onChange={(e) => onCommonLanguageChange(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                >
                    {languageSetting?.commonOptions.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            {racialLanguage && (
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-400 mb-1">Racial Language (Free)</label>
                    <div className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 text-green-300 font-semibold">
                        {racialLanguage.name}
                    </div>
                </div>
            )}

            {bonusLanguageSlots > 0 ? (
                <>
                    <p className="text-sm text-gray-400 mb-2">Your Intelligence of <span className="font-bold text-yellow-300">{scores.Intelligence}</span> grants you <span className="font-bold text-yellow-300">{bonusLanguageSlots}</span> bonus language(s).</p>

                    <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-2 mb-4 border border-gray-700 rounded-lg p-2 bg-black/20">
                        {availableBonusLanguages.map(lang => {
                            const isSelected = selectedBonusLanguages.includes(lang.name);
                            const isDisabled = !isSelected && selectedBonusLanguages.length >= bonusLanguageSlots;
                            return (
                                <Tooltip key={lang.name} text={lang.description}>
                                    <button
                                        onClick={() => handleLanguageSelect(lang.name)}
                                        disabled={isDisabled}
                                        className={`w-full p-2 rounded-md text-sm text-left transition-colors border ${
                                            isSelected ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'border-gray-600 text-gray-300'
                                        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700/50'}`}
                                    >
                                        <span className="font-semibold">{lang.name}</span>
                                    </button>
                                </Tooltip>
                            );
                        })}
                    </div>

                    <button
                        onClick={onRandomLanguage}
                        disabled={selectedBonusLanguages.length >= bonusLanguageSlots}
                        className="w-full flex items-center justify-center gap-2 bg-sky-800/70 hover:bg-sky-700/70 disabled:bg-gray-700/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                        <DiceIcon className="h-5 w-5"/>
                        Random Language
                    </button>
                </>
            ) : (
                <p className="text-gray-500 italic mt-4">Your Intelligence ({scores.Intelligence}) is not high enough to learn bonus languages.</p>
            )}
        </>
    );
};
