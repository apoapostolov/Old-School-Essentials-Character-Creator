
import React from 'react';
import type { Race } from '../types';
import { NameWithSource } from './NameWithSource';

interface RaceInfoModalProps {
  race: Race;
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="bg-gray-900/50 p-2 rounded-md">
        <p className="text-xs font-bold uppercase text-gray-500">{label}</p>
        <p className="text-gray-200 font-semibold">{value}</p>
    </div>
);


export const RaceInfoModal: React.FC<RaceInfoModalProps> = ({ race, onClose }) => {
  const reqValue = Object.entries(race.requirements).map(([key, minScore]) => {
      const ability = key.replace('min_', '').toUpperCase();
      return `${ability} ${minScore}`;
  }).join(', ') || 'None';

  const modValue = Object.entries(race.ability_modifiers).map(([key, mod]) => {
      const ability = key.toUpperCase();
      return `${ability} ${mod > 0 ? `+${mod}` : mod}`;
  }).join(', ') || 'None';

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="race-info-modal-title"
    >
      <div
        className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between p-4 border-b border-gray-700">
          <div>
            <h2 id="race-info-modal-title" className="text-3xl font-bold text-yellow-400">
                <NameWithSource name={race.name} sourceId={race.sourceId} />
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 overflow-y-auto space-y-6">
            <p className="text-gray-300 italic">{race.description}</p>
            
            <section>
                <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">Racial Modifiers</h3>
                <div className="grid grid-cols-2 gap-3">
                    <DetailItem label="Requirements" value={reqValue} />
                    <DetailItem label="Ability Score Modifiers" value={modValue} />
                </div>
            </section>
            
             <section>
                <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">Racial Features</h3>
                <ul className="space-y-3">
                    {race.features.map(feature => (
                        <li key={feature.name}>
                            <p><strong className="text-yellow-300 font-semibold">{feature.name}:</strong> <span className="text-gray-300">{feature.text}</span></p>
                        </li>
                    ))}
                </ul>
            </section>

             <section>
                <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">Class & Level Limits</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                    {Object.entries(race.available_classes_max_level).map(([className, maxLevel]) => (
                        <div key={className} className={`bg-gray-900/50 p-2 rounded-md flex justify-between items-center ${className === 'All non-demihuman classes' ? 'col-span-full' : ''}`}>
                            <span className="text-gray-300">{className.replace('*','')}</span>
                            <span className="font-bold text-white">{maxLevel}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">*Cleric level limits may be affected by WIS score.</p>
            </section>

        </div>
      </div>
    </div>
  );
};
