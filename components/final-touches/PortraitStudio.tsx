import React from 'react';
import { CropIcon } from '../icons/CropIcon';
import { PortraitIcon } from '../icons/PortraitIcon';
import { QuestionIcon } from '../icons/QuestionIcon';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { PortraitDisplay } from './PortraitDisplay';

interface PortraitStudioProps {
    portrait: string | null;
    headshot: string | null;
    portraitView: 'full' | 'headshot';
    setPortraitView: (view: 'full' | 'headshot') => void;
    portraitError: string | null;
    isGeneratingPortrait: boolean;
    onGeneratePortrait: () => void;
    isCroppingHeadshot: boolean;
    onCropHeadshot: () => void;
    pdfPortraitSrc: string | null;
    onSelectPdfPortrait: (src: string) => void;
    characterName: string;
    onShowPromptInfo: () => void;
    stepNumber: number;
}

const handleDownloadImage = (base64Image: string, filename: string) => {
    if (!base64Image) return;
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const PortraitStudio: React.FC<PortraitStudioProps> = ({
    portrait, headshot, portraitView, setPortraitView, portraitError, isGeneratingPortrait, onGeneratePortrait,
    isCroppingHeadshot, onCropHeadshot, pdfPortraitSrc, onSelectPdfPortrait, characterName,
    onShowPromptInfo, stepNumber
}) => {
    const safeName = characterName.replace(/ /g, '_');
    const mainPortraitFilename = characterName ? `${safeName}_portrait.png` : 'character_portrait.png';
    const isHeadshotView = portraitView === 'headshot' && headshot;

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-3 border-b border-gray-600 pb-2">
                <h3 className="text-lg font-bold text-gray-300">{stepNumber}. Generate Portrait</h3>
                <button
                    onClick={onShowPromptInfo}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                    aria-label="Show portrait generation prompt"
                >
                    <QuestionIcon className="h-5 w-5" />
                </button>
            </div>

            <div className="relative">
                {portrait && (
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-sm p-1 rounded-full flex items-center text-xs font-bold shadow-lg">
                        <button
                            onClick={() => setPortraitView('full')}
                            className={`px-3 py-1 rounded-full transition-colors duration-200 ${portraitView === 'full' ? 'bg-yellow-500 text-black' : 'text-white hover:bg-gray-700'}`}
                        >
                            Full Body
                        </button>
                        <button
                            onClick={() => headshot && setPortraitView('headshot')}
                            disabled={!headshot}
                            className={`px-3 py-1 rounded-full transition-colors duration-200 ${portraitView === 'headshot' ? 'bg-yellow-500 text-black' : 'text-white hover:bg-gray-700'} disabled:text-gray-500 disabled:cursor-not-allowed`}
                        >
                            Headshot
                        </button>
                    </div>
                )}
                <PortraitDisplay
                    imageSrc={isHeadshotView ? headshot : portrait}
                    altText="Generated character portrait"
                    isLoading={isGeneratingPortrait || isCroppingHeadshot}
                    loadingText={isCroppingHeadshot ? 'Cropping...' : 'Summoning...'}
                    errorText={portraitError}
                    isSelectedForPdf={pdfPortraitSrc === (isHeadshotView ? headshot : portrait)}
                    onSelectForPdf={() => (isHeadshotView ? headshot : portrait) && onSelectPdfPortrait((isHeadshotView ? headshot : portrait)!)}
                    onDownload={() => portrait && handleDownloadImage(portrait, mainPortraitFilename)}
                    showDownload={!!portrait}
                    aspectRatio={isHeadshotView ? 'aspect-square' : 'aspect-[9/16]'}
                />
            </div>

            <div className="flex items-stretch gap-2 mt-4">
                <button
                    onClick={onGeneratePortrait}
                    disabled={isGeneratingPortrait || isCroppingHeadshot}
                    className="flex-grow bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-wait text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                    {isGeneratingPortrait ? <SpinnerIcon className="mr-2 h-6 w-6" /> : <PortraitIcon className="mr-2 h-6 w-6" />}
                    {isGeneratingPortrait ? 'Generating...' : (portrait ? 'Regenerate' : 'Generate Portrait')}
                </button>
                <button
                    onClick={onCropHeadshot}
                    disabled={!portrait || isGeneratingPortrait || isCroppingHeadshot}
                    className="bg-sky-700 hover:bg-sky-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold p-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
                    aria-label="Create Headshot"
                    title="Create Headshot"
                >
                    {isCroppingHeadshot ? <SpinnerIcon className="h-6 w-6" /> : <CropIcon className="h-6 w-6" />}
                </button>
            </div>
        </div>
    );
};
