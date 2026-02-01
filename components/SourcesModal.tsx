
import React, { useMemo } from 'react';
import { useSourceContext } from '../context/SourceContext';
import { SOURCES } from '../third-party/manifest';
import type { SourceID } from '../types';

interface SourcesModalProps {
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ onClose }) => {
    const { selectedSources, setSelectedSources } = useSourceContext();

    const sortedSources = useMemo(() => {
        return [...SOURCES].sort((a, b) => {
            const nameA = a.name.replace(/^The\s+/i, '');
            const nameB = b.name.replace(/^The\s+/i, '');
            return nameA.localeCompare(nameB);
        });
    }, []);

    const handleToggleSource = (sourceId: SourceID) => {
        const newSelection = new Set(selectedSources);
        if (newSelection.has(sourceId)) {
            newSelection.delete(sourceId);
        } else {
            newSelection.add(sourceId);
        }

        // Rule: Cannot deselect the default source unless another is selected.
        if (!newSelection.has('ose')) {
            const hasOtherSelection = Array.from(newSelection).some(id => id !== 'ose');
            if (!hasOtherSelection) {
                // This case happens when only 'ose' is selected and the user tries to toggle it off.
                return; 
            }
        }
        
        // Rule: If all sources are deselected, re-select the default.
        if (newSelection.size === 0) {
            newSelection.add('ose');
        }

        setSelectedSources(newSelection);
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sources-modal-title"
        >
            <div
                className="bg-gray-800 border-2 border-blue-500/50 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 id="sources-modal-title" className="text-2xl font-bold text-blue-400">Manage Content Sources</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="p-6 overflow-y-auto">
                    <p className="text-gray-400 mb-6">Select which sources to include. Content like classes, items, and themes will be dynamically added to the application.</p>
                    
                    <div className="space-y-3">
                        {sortedSources.map(source => {
                            const isSelected = selectedSources.has(source.id);
                            // The default source can only be deselected if another source is active.
                            const isDefaultAndOnlyOne = source.isDefault && selectedSources.size === 1 && isSelected;

                            return (
                                <button
                                    key={source.id}
                                    onClick={() => handleToggleSource(source.id)}
                                    disabled={isDefaultAndOnlyOne}
                                    className={`w-full flex items-center text-left p-3 rounded-md border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-400
                                        ${isSelected 
                                            ? 'bg-blue-500/20 border-blue-400' 
                                            : 'border-gray-600 hover:bg-gray-700/50 hover:border-gray-500'
                                        }
                                        ${isDefaultAndOnlyOne ? 'opacity-60 cursor-not-allowed' : ''}
                                    `}
                                    aria-pressed={isSelected}
                                >
                                    <div className={`w-6 h-6 rounded-md border-2 mr-4 flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-blue-400 border-blue-400' : 'border-gray-500 bg-gray-900/50'}`}>
                                        {isSelected && <div className="w-3 h-3 bg-gray-900 rounded-sm"></div>}
                                    </div>
                                    <div className="flex-grow">
                                        <p className={`font-bold ${isSelected ? 'text-blue-300' : 'text-gray-200'}`}>{source.name}</p>
                                        {source.isDefault ? (
                                            <p className="text-xs text-gray-500">Default Rule Set</p>
                                        ) : (
                                            <p className="text-xs text-gray-500 italic mt-1">
                                                {source.publisher} &bull; {source.theme} &bull; {source.setting}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
