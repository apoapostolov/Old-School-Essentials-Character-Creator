import React from 'react';
import { BackstoryDisplay } from '../BackstoryDisplay';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { PortraitIcon } from '../icons/PortraitIcon';
import { RefreshIcon } from '../icons/RefreshIcon';
import { QuestionIcon } from '../icons/QuestionIcon';

interface BackstoryGeneratorProps {
    backstory: string | null;
    isGenerating: boolean;
    onGenerate: () => void;
    canGenerate: boolean;
    onShowPromptInfo: () => void;
}

export const BackstoryGenerator: React.FC<BackstoryGeneratorProps> = ({ backstory, isGenerating, onGenerate, canGenerate, onShowPromptInfo }) => {
    return (
        <div className="mt-8 pt-6 border-t-2 border-gray-700/50">
            <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-3xl font-bold text-yellow-400 text-center">The Two-Page™ Backstory</h2>
                <button
                    onClick={onShowPromptInfo}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                    aria-label="Show backstory generation prompt"
                >
                    <QuestionIcon className="h-6 w-6" />
                </button>
            </div>
            <p className="text-gray-400 text-center mb-6">
                Using your character's generated details, the AI will write a rich, multi-page backstory to bring them to life.
            </p>

            {!backstory && !isGenerating && (
                <div className="text-center">
                     <button 
                        onClick={onGenerate} 
                        disabled={!canGenerate}
                        className="bg-green-700 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto"
                    >
                        <PortraitIcon className="mr-2 h-6 w-6" />
                        Generate Backstory
                    </button>
                    {!canGenerate && <p className="text-xs text-gray-500 mt-2">Please generate a name and traits first.</p>}
                </div>
            )}
            
            {isGenerating && (
                <div className="text-center text-gray-400 py-10">
                    <SpinnerIcon className="h-12 w-12 mx-auto mb-4" />
                    <p className="font-semibold text-lg">Writing an epic tale...</p>
                    <p className="text-sm">This can take a minute due to the story's length.</p>
                </div>
            )}

            {backstory && !isGenerating && (
                 <>
                    <BackstoryDisplay text={backstory} />
                    <div className="text-center mt-4">
                        <button
                            onClick={onGenerate}
                            disabled={isGenerating}
                            className="bg-sky-800/70 hover:bg-sky-700/70 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-400"
                            aria-label="Regenerate backstory"
                        >
                            <RefreshIcon className="mr-2 h-5 w-5" />
                            Regenerate Backstory
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};