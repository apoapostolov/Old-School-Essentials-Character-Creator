import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { useSourceContext } from '../../context/SourceContext';
import { QuestionIcon } from '../icons/QuestionIcon';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { DetailGenerator } from './DetailGenerator';
import { GenderSelector } from './GenderSelector';
import { LanguageManager } from './LanguageManager';
import { ThemeSelector } from './ThemeSelector';

const DetailCard: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-600 pb-2">{title}</h3>
        {children}
    </div>
);

interface CharacterDetailsColumnProps {
    onShowNamePromptInfo: () => void;
    onShowLifeStandardPromptInfo: () => void;
}

export const CharacterDetailsColumn: React.FC<CharacterDetailsColumnProps> = ({ onShowNamePromptInfo, onShowLifeStandardPromptInfo }) => {
    const { characterRoll, ai, aggregatedData } = useCharacterContext();
    const { selectedSources } = useSourceContext();
    const scores = characterRoll.scores!;

    const isKarameikos = selectedSources.has('mystara');

    return (
        <div className="space-y-6">
            <DetailCard title="1. Choose Your World">
                <ThemeSelector
                    themes={aggregatedData.THEMES}
                    theme={ai.theme}
                    onThemeChange={ai.setTheme}
                />
            </DetailCard>

            <DetailCard title="2. Select Gender">
                <GenderSelector gender={ai.gender} onGenderChange={ai.setGender} />
            </DetailCard>

            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3 border-b border-gray-600 pb-2">
                    <h3 className="text-lg font-bold text-gray-300">3. Generate Name</h3>
                    <button
                        onClick={onShowNamePromptInfo}
                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        aria-label="Show name generation prompt"
                    >
                        <QuestionIcon className="h-5 w-5" />
                    </button>
                </div>
                <DetailGenerator onGenerate={ai.onGenerateName} isGenerating={ai.isGeneratingName}>
                    <span>{ai.characterName || '...'}</span>
                </DetailGenerator>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3 border-b border-gray-600 pb-2">
                    <h3 className="text-lg font-bold text-gray-300">4. Determine Profession</h3>
                    <button
                        onClick={onShowLifeStandardPromptInfo}
                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        aria-label="Show life standard generation prompt"
                    >
                        <QuestionIcon className="h-5 w-5" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 -mt-2 mb-3">Rolling a profession generates a summary of your 'Life Before Adventuring' based on your abilities and resets character traits.</p>
                <DetailGenerator onGenerate={ai.onRollSecondarySkill} isGenerating={ai.isGeneratingLifeStandard} isRoll>
                     <span>{ai.secondarySkills ? ai.secondarySkills.join(', ') : '...'}</span>
                </DetailGenerator>
                {(ai.isGeneratingLifeStandard || ai.characterTraits?.lifeStandard) && (
                    <div className="mt-4 bg-black/30 p-3 rounded-md border border-gray-600">
                        <div className="flex justify-between items-baseline mb-2">
                            <p className="text-xs font-bold uppercase text-yellow-500">Life Before Adventuring</p>
                            {ai.characterTraits?.lifestyleKey && (
                                <p className="text-sm font-semibold text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded-md">{ai.characterTraits.lifestyleKey}</p>
                            )}
                        </div>
                        {ai.isGeneratingLifeStandard ? (
                            <div className="flex items-center gap-2 text-gray-400 italic">
                                <SpinnerIcon className="h-4 w-4" />
                                <span>Generating career summary...</span>
                            </div>
                        ) : (
                            <p className="text-gray-300 italic">"{ai.characterTraits?.lifeStandard}"</p>
                        )}
                    </div>
                )}
            </div>

            {!isKarameikos && (
                <DetailCard title="5. Learn Languages">
                    <LanguageManager
                        scores={scores}
                        theme={ai.theme}
                        selectedBonusLanguages={ai.selectedBonusLanguages}
                        onSelectedBonusLanguagesChange={ai.onSelectedBonusLanguagesChange}
                        onRandomLanguage={ai.onRandomLanguage}
                        commonLanguage={ai.commonLanguage}
                        onCommonLanguageChange={ai.onCommonLanguageChange}
                        racialLanguage={ai.racialLanguage}
                    />
                </DetailCard>
            )}
        </div>
    );
};
