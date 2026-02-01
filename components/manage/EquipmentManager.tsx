import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import type { EquipmentKit, SelectedKit } from '../../types';
import { EquipmentKitCard } from '../EquipmentKitCard';
import { EditIcon } from '../icons/EditIcon';

interface EquipmentManagerProps {
    stepNumber: number;
    moneyResultTotal: number;
    equipmentCost: number;
    finalMoney: number;
    selectedMainKit: SelectedKit;
    selectedSpecializedKit: SelectedKit;
    onSelectKit: (kit: EquipmentKit, variantName: string) => void;
    onShowKitInfo: (kit: EquipmentKit) => void;
    onCustomizeEquipment: () => void;
}

export const EquipmentManager: React.FC<EquipmentManagerProps> = ({
    stepNumber,
    moneyResultTotal,
    equipmentCost,
    finalMoney,
    selectedMainKit,
    selectedSpecializedKit,
    onSelectKit,
    onShowKitInfo,
    onCustomizeEquipment,
}) => {
    const { aggregatedData } = useCharacterContext();

    const mainKits = aggregatedData.EQUIPMENT_KITS.filter(k => k.type === 'Martial');
    const specializedKits = aggregatedData.EQUIPMENT_KITS.filter(k => k.type === 'Specialized')
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Starting Equipment</h2>
                    <p className="text-gray-400 mb-6">Choose kits or customize your gear. Your remaining gold is calculated below.</p>
                </div>
                <button
                    onClick={onCustomizeEquipment}
                    className="flex items-center gap-2 bg-sky-800/70 hover:bg-sky-700/70 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                    <EditIcon className="h-5 w-5" />
                    Customize
                </button>
            </div>

            <div className="sticky top-2 z-20 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 mb-8 flex flex-wrap items-center justify-around gap-4 shadow-lg">
                <div className="text-center">
                    <p className="text-sm uppercase text-gray-400 font-bold">Rolled Wealth</p>
                    <p className="text-2xl font-black text-yellow-300">{moneyResultTotal} gp</p>
                </div>
                <div className="text-2xl font-thin text-gray-600">-</div>
                <div className="text-center">
                    <p className="text-sm uppercase text-gray-400 font-bold">Equipment Cost</p>
                    <p className="text-2xl font-black text-red-400">{equipmentCost} gp</p>
                </div>
                 <div className="text-2xl font-thin text-gray-600">=</div>
                <div className="text-center">
                    <p className="text-sm uppercase text-gray-400 font-bold">Remaining Gold</p>
                    <p className="text-3xl font-black text-green-400">{finalMoney} gp</p>
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-xl font-semibold text-left mb-4 text-gray-300 border-b-2 border-slate-700 pb-2">Martial Kits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mainKits.map(kit => (
                        <EquipmentKitCard
                            key={kit.id}
                            kit={kit}
                            currentMoney={moneyResultTotal}
                            otherKitCost={selectedSpecializedKit?.cost ?? 0}
                            selectedVariantName={selectedMainKit?.kitId === kit.id ? selectedMainKit.variantName : null}
                            onSelect={(variantName) => onSelectKit(kit, variantName)}
                            onShowInfo={() => onShowKitInfo(kit)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-left mb-4 text-gray-300 border-b-2 border-teal-700 pb-2">Specialized Adventuring Kits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {specializedKits.map(kit => (
                        <EquipmentKitCard
                            key={kit.id}
                            kit={kit}
                            currentMoney={moneyResultTotal}
                            otherKitCost={selectedMainKit?.cost ?? 0}
                            selectedVariantName={selectedSpecializedKit?.kitId === kit.id ? selectedSpecializedKit.variantName : null}
                            onSelect={(variantName) => onSelectKit(kit, variantName)}
                            onShowInfo={() => onShowKitInfo(kit)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
