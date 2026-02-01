import React from 'react';
import type { EquipmentKit } from '../types';
import { NameWithSource } from './NameWithSource';
import { useCharacterContext } from '../context/CharacterContext';

interface EquipmentKitModalProps {
  kit: EquipmentKit;
  onClose: () => void;
}

export const EquipmentKitModal: React.FC<EquipmentKitModalProps> = ({ kit, onClose }) => {
  const { aggregatedData } = useCharacterContext();
  const { ITEMS } = aggregatedData;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="kit-modal-title"
    >
      <div
        className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-lg flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="kit-modal-title" className="text-2xl font-bold text-yellow-400">
            <NameWithSource name={kit.name} sourceId={kit.sourceId} />
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6">
          <p className="text-gray-300 mb-6">{kit.description}</p>
          
          <div className="space-y-6">
            {kit.variants.map((variant) => {
                const totalKitWeight = variant.items.reduce((total, key) => total + (ITEMS[key]?.weight ?? 0), 0);
                return (
                  <div key={variant.name} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-baseline mb-3 border-b border-gray-600 pb-2">
                        <h3 className="text-lg font-bold text-gray-200">{variant.name} Variant</h3>
                        <p className="text-xl font-black text-yellow-300">{variant.cost} gp</p>
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase px-1 mb-1">
                        <span className="w-2/3">Item</span>
                        <span className="w-1/6 text-right">Cost</span>
                        <span className="w-1/6 text-right">Weight</span>
                    </div>

                    <ul className="space-y-1 text-gray-300 pr-1">
                      {variant.items.map((itemKey, index) => {
                        const item = ITEMS[itemKey];
                        if (!item) return null;
                        return (
                          <li key={`${itemKey}-${index}`} className="flex justify-between items-center text-sm py-1 px-1 rounded hover:bg-gray-700/50">
                            <span className="w-2/3"><NameWithSource name={item.name} sourceId={item.sourceId} /></span>
                            <span className="w-1/6 text-right text-gray-400">{item.cost > 0 ? `${item.cost} gp` : '—'}</span>
                            <span className="w-1/6 text-right text-gray-400">{item.weight > 0 ? `${item.weight} cn` : '—'}</span>
                          </li>
                        );
                      })}
                    </ul>
                    
                    <div className="flex justify-end items-baseline mt-3 border-t border-gray-600 pt-2 text-right">
                        <div>
                            <p className="text-xs font-bold uppercase text-gray-500">Total Item Weight</p>
                            <p className="text-lg font-bold text-white">
                                {totalKitWeight} cn
                            </p>
                        </div>
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};