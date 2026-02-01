import React from 'react';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { RefreshIcon } from '../icons/RefreshIcon';
import { DiceIcon } from '../icons/DiceIcon';

interface DetailGeneratorProps {
    onGenerate: () => void;
    isGenerating: boolean;
    children: React.ReactNode;
    isRoll?: boolean;
}

export const DetailGenerator: React.FC<DetailGeneratorProps> = ({ onGenerate, isGenerating, children, isRoll }) => {
    return (
        <div className="flex items-start gap-4">
            <div className="flex-grow bg-black/30 p-3 rounded-md border border-gray-600 min-h-[48px] flex items-center">
                <div className="text-gray-200 font-semibold text-lg w-full">
                    {children}
                </div>
            </div>
            <button 
                onClick={onGenerate} 
                disabled={isGenerating} 
                className="w-12 h-12 p-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-gray-900 transition-colors flex-shrink-0 flex items-center justify-center"
                aria-label={isRoll ? "Roll" : "Generate"}
            >
                {isGenerating 
                    ? <SpinnerIcon className="h-6 w-6"/> 
                    : (isRoll ? <DiceIcon className="h-6 w-6" /> : <RefreshIcon className="h-6 w-6" />)
                }
            </button>
        </div>
    );
};