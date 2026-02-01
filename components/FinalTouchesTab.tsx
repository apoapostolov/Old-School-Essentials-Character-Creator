// FIX: Replaced the entire component with a refactored version that uses the CharacterContext.
// This eliminates the need to pass down numerous props from App.tsx, resolving the TypeScript error
// related to missing properties. The component now fetches character data directly from the context.
import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useSourceContext } from '../context/SourceContext';
import { BackstoryGenerator } from './final-touches/BackstoryGenerator';
import { CharacterDetailsColumn } from './final-touches/CharacterDetailsColumn';
import { CreativeColumn } from './final-touches/CreativeColumn';
import { ExpressivePortraitsStudio } from './final-touches/ExpressivePortraitsStudio';

interface FinalTouchesTabProps {
    onShowPromptInfo: () => void;
    onShowBackstoryPromptInfo: () => void;
    onShowNamePromptInfo: () => void;
    onShowTraitsPromptInfo: () => void;
    onShowLifeStandardPromptInfo: () => void;
}

export const FinalTouchesTab: React.FC<FinalTouchesTabProps> = ({ onShowPromptInfo, onShowBackstoryPromptInfo, onShowNamePromptInfo, onShowTraitsPromptInfo, onShowLifeStandardPromptInfo }) => {
    const { selectedClass, ai } = useCharacterContext();
    const { selectedSources } = useSourceContext();

    if (!selectedClass) return null; // Should not happen if tab is active, but good practice

    const isKarameikos = selectedSources.has('mystara');
    const canGenerateBackstory = !!(ai.characterName && ai.characterTraits);
    const showExpressivePortraits = !!(ai.headshot && !ai.isGeneratingPortrait && !ai.isCroppingHeadshot);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-2">Final Character Touches</h2>
            <p className="text-gray-400 text-center mb-8">
                Add unique details to your {selectedClass.name} based on the chosen theme, then use AI to visualize them with a unique portrait.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <CharacterDetailsColumn onShowNamePromptInfo={onShowNamePromptInfo} onShowLifeStandardPromptInfo={onShowLifeStandardPromptInfo} />
                <CreativeColumn onShowPromptInfo={onShowPromptInfo} onShowTraitsPromptInfo={onShowTraitsPromptInfo} isKarameikos={isKarameikos} />
            </div>

            {showExpressivePortraits && (
                <ExpressivePortraitsStudio
                    pdfPortraitSrc={ai.pdfPortraitSrc}
                    onSelectPdfPortrait={ai.onSelectPdfPortrait}
                    emotionalPortraits={ai.emotionalPortraits}
                    generatingEmotion={ai.generatingEmotion}
                    onGenerateEmotionalPortrait={ai.onGenerateEmotionalPortrait}
                    characterName={ai.characterName}
                />
            )}

            <BackstoryGenerator
                backstory={ai.backstory}
                isGenerating={ai.isGeneratingBackstory}
                onGenerate={ai.onGenerateBackstory}
                canGenerate={canGenerateBackstory}
                onShowPromptInfo={onShowBackstoryPromptInfo}
            />
        </div>
    );
};
