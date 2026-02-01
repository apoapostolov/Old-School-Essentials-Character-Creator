import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { BackstoryGenerator } from './final-touches/BackstoryGenerator';
import { ExpressivePortraitsStudio } from './final-touches/ExpressivePortraitsStudio';
import { CharacterDetailsColumn } from './final-touches/CharacterDetailsColumn';
import { CreativeColumn } from './final-touches/CreativeColumn';

interface FinalTouchesTabProps {
    onShowPromptInfo: () => void;
    onShowBackstoryPromptInfo: () => void;
}

export const FinalTouchesTab: React.FC<FinalTouchesTabProps> = ({ onShowPromptInfo, onShowBackstoryPromptInfo }) => {
    const { selectedClass, ai } = useCharacterContext();

    if (!selectedClass) return null; // Should not happen if tab is active, but good practice

    const canGenerateBackstory = !!(ai.characterName && ai.characterTraits);
    const showExpressivePortraits = !!(ai.headshot && !ai.isGeneratingPortrait && !ai.isCroppingHeadshot);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-2">Final Character Touches</h2>
            <p className="text-gray-400 text-center mb-8">
                Add unique details to your {selectedClass.name} based on the chosen theme, then use AI to visualize them with a unique portrait.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <CharacterDetailsColumn />
                <CreativeColumn onShowPromptInfo={onShowPromptInfo} />
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
