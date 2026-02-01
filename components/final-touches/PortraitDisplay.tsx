import React from 'react';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { PortraitIcon } from '../icons/PortraitIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { DownloadIcon } from '../icons/DownloadIcon';

interface PortraitDisplayProps {
    imageSrc: string | null;
    altText: string;
    isLoading: boolean;
    loadingText: string;
    errorText: string | null;
    isSelectedForPdf: boolean;
    onSelectForPdf: () => void;
    onDownload: () => void;
    showDownload?: boolean;
    aspectRatio?: 'aspect-square' | 'aspect-[9/16]';
}

const PortraitSelector: React.FC<{ isSelected: boolean; onClick: (e: React.MouseEvent) => void }> = ({ isSelected, onClick }) => (
    <button
        onClick={onClick}
        className="absolute top-2 left-2 z-30 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center border-2 border-gray-500 hover:border-yellow-400 transition-all"
        aria-label="Select for PDF"
        title="Select for PDF Sheet"
    >
        {isSelected ? (
            <CheckCircleIcon className="w-7 h-7 text-yellow-400" />
        ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-400 bg-black/30"></div>
        )}
    </button>
);

export const PortraitDisplay: React.FC<PortraitDisplayProps> = ({
    imageSrc,
    altText,
    isLoading,
    loadingText,
    errorText,
    isSelectedForPdf,
    onSelectForPdf,
    onDownload,
    showDownload = false,
    aspectRatio = 'aspect-[9/16]'
}) => {
    return (
        <div className={`w-full max-w-[288px] mx-auto ${aspectRatio} bg-black/30 rounded-lg p-2 border border-gray-700 flex justify-center items-center relative`}>
            {isLoading ? (
                <div className="text-center text-gray-400">
                    <SpinnerIcon className="h-12 w-12 mx-auto mb-4" />
                    <p className="font-semibold">{loadingText}</p>
                </div>
            ) : errorText ? (
                <div className="text-center text-red-400 p-4">
                    <p className="font-bold">Error:</p>
                    <p className="text-sm">{errorText}</p>
                </div>
            ) : imageSrc ? (
                <div className="absolute inset-2">
                     <img src={imageSrc} alt={altText} className="w-full h-full object-cover rounded-md shadow-lg shadow-black/50" />
                     <PortraitSelector isSelected={isSelectedForPdf} onClick={(e) => { e.stopPropagation(); onSelectForPdf(); }} />
                     {showDownload && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onDownload(); }}
                            className="absolute top-2 right-2 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-yellow-500/80 hover:text-gray-900 transition-all duration-200"
                            aria-label="Download portrait"
                        >
                            <DownloadIcon className="h-5 w-5" />
                        </button>
                     )}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <PortraitIcon className="h-16 w-16 mx-auto text-gray-600 mb-2" />
                    <p>Portrait appears here.</p>
                </div>
            )}
        </div>
    );
};
