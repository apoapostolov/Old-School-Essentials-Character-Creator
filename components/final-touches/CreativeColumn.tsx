import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { QuestionIcon } from '../icons/QuestionIcon';
import { DetailGenerator } from './DetailGenerator';
import { PortraitStudio } from './PortraitStudio';

const DetailCard: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-600 pb-2">{title}</h3>
        {children}
    </div>
);

interface CreativeColumnProps {
    onShowPromptInfo: () => void;
    onShowTraitsPromptInfo: () => void;
    isKarameikos: boolean;
}

export const CreativeColumn: React.FC<CreativeColumnProps> = ({ onShowPromptInfo, onShowTraitsPromptInfo, isKarameikos }) => {
    const { ai } = useCharacterContext();
    const showTraits = ai.characterTraits && (ai.characterTraits.positivePhysical || ai.characterTraits.negative);
    const traitsStep = isKarameikos ? 5 : 6;
    const portraitStep = isKarameikos ? 6 : 7;

    return (
        <div className="space-y-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3 border-b border-gray-600 pb-2">
                    <h3 className="text-lg font-bold text-gray-300">{traitsStep}. Generate Traits</h3>
                    <button
                        onClick={onShowTraitsPromptInfo}
                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        aria-label="Show traits generation prompt"
                    >
                        <QuestionIcon className="h-5 w-5" />
                    </button>
                </div>
                <DetailGenerator onGenerate={ai.onGenerateTraits} isGenerating={ai.isGeneratingTraits}>
                    {showTraits ? (
                        <div className="text-sm space-y-1">
                            <p><strong className="text-green-400">Physical:</strong> {ai.characterTraits!.positivePhysical}</p>
                            <p><strong className="text-sky-400">Mental:</strong> {ai.characterTraits!.positiveMental}</p>
                            <p><strong className="text-red-400">Flaw:</strong> {ai.characterTraits!.negative}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic text-base">Generate traits to see them here...</p>
                    )}
                </DetailGenerator>
            </div>

            <PortraitStudio
                portrait={ai.portrait}
                headshot={ai.headshot}
                portraitView={ai.portraitView}
                setPortraitView={ai.setPortraitView}
                portraitError={ai.portraitError}
                isGeneratingPortrait={ai.isGeneratingPortrait}
                onGeneratePortrait={ai.onGeneratePortrait}
                isCroppingHeadshot={ai.isCroppingHeadshot}
                onCropHeadshot={ai.onCropHeadshot}
                pdfPortraitSrc={ai.pdfPortraitSrc}
                onSelectPdfPortrait={ai.onSelectPdfPortrait}
                characterName={ai.characterName}
                onShowPromptInfo={onShowPromptInfo}
                stepNumber={portraitStep}
            />
        </div>
    );
};
