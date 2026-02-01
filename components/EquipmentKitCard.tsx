import React from 'react';
import type { EquipmentKit } from '../types';
import { InfoIcon } from './icons/InfoIcon';
import { NameWithSource } from './NameWithSource';

interface EquipmentKitCardProps {
    kit: EquipmentKit;
    currentMoney: number;
    otherKitCost: number;
    selectedVariantName: string | null;
    onSelect: (variantName: string) => void;
    onShowInfo: () => void;
}

export const EquipmentKitCard: React.FC<EquipmentKitCardProps> = ({ 
    kit, 
    currentMoney, 
    otherKitCost, 
    selectedVariantName, 
    onSelect,
    onShowInfo
}) => {
    return (
        <div className="bg-gray-800/50 border-2 border-gray-700/50 rounded-lg p-4 flex flex-col h-full transition-all duration-200 hover:border-gray-600/50">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-200 flex-1 pr-2">
                    <NameWithSource name={kit.name} sourceId={kit.sourceId} />
                </h4>
                <button 
                    onClick={onShowInfo} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                    aria-label={`Show info for ${kit.name}`}
                >
                    <InfoIcon className="h-6 w-6" />
                </button>
            </div>
            <p className="text-sm text-gray-400 flex-grow mb-4 line-clamp-3" style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            }}>
                {kit.description}
            </p>

            <div className="mt-auto space-y-2">
                {kit.variants.map(variant => {
                    const isSelected = selectedVariantName === variant.name;
                    const isAffordable = currentMoney >= otherKitCost + variant.cost;
                    const isDisabled = !isSelected && !isAffordable;

                    return (
                        <button
                            key={variant.name}
                            onClick={() => onSelect(variant.name)}
                            disabled={isDisabled}
                            className={`
                                w-full flex items-center justify-between text-left p-2 rounded-md border transition-all duration-200
                                ${isSelected 
                                    ? 'bg-yellow-500/20 border-yellow-400 ring-2 ring-yellow-400/50' 
                                    : 'border-gray-600 hover:bg-gray-700/50 hover:border-gray-500'
                                }
                                ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-800/30' : ''}
                            `}
                            aria-pressed={isSelected}
                        >
                            <div className="flex items-center">
                                <div className={`
                                    w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center
                                    ${isSelected ? 'bg-yellow-400 border-yellow-400' : 'border-gray-500'}
                                    ${isDisabled ? 'border-gray-700' : ''}
                                `}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-gray-900 rounded-full"></div>}
                                </div>
                                <span className={`font-semibold ${isSelected ? 'text-yellow-300' : 'text-gray-300'}`}>
                                    {variant.name}
                                </span>
                            </div>
                            <span className={`font-bold ${isSelected ? 'text-yellow-300' : 'text-gray-400'} ${isDisabled && !isAffordable ? 'text-red-500/70' : ''}`}>
                                {variant.cost} gp
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};