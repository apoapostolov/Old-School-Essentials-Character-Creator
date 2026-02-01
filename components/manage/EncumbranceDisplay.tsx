import React, { useMemo } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { getEncumbranceDetails, roundToNearest5 } from '../../utils/encumbrance';

const EncumbranceMeter: React.FC<{
    title: string;
    weight: number;
    maxWeight: number;
    speed: string;
    level: string;
    color: string;
    textColor: string;
}> = ({ title, weight, maxWeight, speed, level, color, textColor }) => (
    <div className="flex-1 text-center border-t-2 md:border-t-0 md:border-l-2 border-gray-700 pt-4 md:pt-0 md:pl-6">
        <p className="text-gray-400 uppercase tracking-widest text-lg">{title}</p>
        <p className="text-5xl font-black text-white my-1">{weight}<span className="text-2xl font-semibold text-gray-500"> / {maxWeight} cn</span></p>
        <div className={`px-4 py-1 rounded-lg ${color} mt-2 inline-block`}>
            <p className={`text-2xl font-black ${textColor}`}>{speed}</p>
            <p className={`text-xs font-semibold ${textColor}`}>{level}</p>
        </div>
    </div>
);

interface EncumbranceDisplayProps {
    stepNumber: number;
}

export const EncumbranceDisplay: React.FC<EncumbranceDisplayProps> = ({ stepNumber }) => {
    const { equipment, characterRoll, aggregatedData } = useCharacterContext();
    const { equipmentWeight: totalCarriedWeight, allItemKeys } = equipment;
    const { scores } = characterRoll;

    if (!scores) return null;

    const combatWeight = useMemo(() => {
        return allItemKeys.reduce((total, key) => {
            const item = aggregatedData.ITEMS[key];
            if (item && item.carry_type === 'worn') {
                return total + item.weight;
            }
            return total;
        }, 0);
    }, [allItemKeys, aggregatedData.ITEMS]);

    const carriedDetails = getEncumbranceDetails(totalCarriedWeight, scores.Strength);
    const combatDetails = getEncumbranceDetails(combatWeight, scores.Strength);
    // Combat speed should be one-third of the carried speed value (rounded to nearest 5')
    const combatSpeedValue = roundToNearest5(carriedDetails.speedValue / 3);
    const combatSpeedStr = `${combatSpeedValue}'`;

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
            <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Calculate Encumbrance</h2>
            <p className="text-gray-400 mb-6">Your total equipment weight determines your movement speed, based on your <span className="font-bold text-yellow-300">Strength ({scores.Strength})</span>. All adventuring gear counts as a single 80cn investment. Dropping your pack in combat reduces your weight significantly.</p>

            <div className="flex flex-col md:flex-row items-center justify-around gap-6 bg-black/30 p-6 rounded-lg border border-gray-700">
                <EncumbranceMeter
                    title="Carried Weight"
                    weight={totalCarriedWeight}
                    maxWeight={carriedDetails.maxEncumbrance}
                    speed={carriedDetails.speed}
                    level={carriedDetails.level}
                    color={carriedDetails.color}
                    textColor={carriedDetails.textColor}
                />
                <EncumbranceMeter
                    title="Combat Weight (Pack Dropped)"
                    weight={combatWeight}
                    maxWeight={combatDetails.maxEncumbrance}
                    speed={combatSpeedStr}
                    level={combatDetails.level}
                    color={combatDetails.color}
                    textColor={combatDetails.textColor}
                />
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
                <div className={`p-2 rounded ${carriedDetails.speedValue >= 120 ? 'bg-green-900/50 border border-green-600' : 'bg-gray-800/50'}`}>
                    <p className="font-bold text-green-400">120'</p>
                    <p className="text-gray-400">≤ {carriedDetails.thresholds.normal} cn</p>
                </div>
                <div className={`p-2 rounded ${carriedDetails.speedValue === 90 ? 'bg-yellow-900/50 border border-yellow-600' : 'bg-gray-800/50'}`}>
                    <p className="font-bold text-yellow-400">90'</p>
                    <p className="text-gray-400">≤ {carriedDetails.thresholds.slowed} cn</p>
                </div>
                 <div className={`p-2 rounded ${carriedDetails.speedValue === 60 ? 'bg-orange-800/50 border border-orange-600' : 'bg-gray-800/50'}`}>
                    <p className="font-bold text-orange-400">60'</p>
                    <p className="text-gray-400">≤ {carriedDetails.thresholds.verySlow} cn</p>
                </div>
                 <div className={`p-2 rounded ${carriedDetails.speedValue === 30 ? 'bg-red-900/50 border border-red-600' : 'bg-gray-800/50'}`}>
                    <p className="font-bold text-red-400">30'</p>
                    <p className="text-gray-400">≤ {carriedDetails.thresholds.max} cn</p>
                </div>
            </div>
        </div>
    );
};
