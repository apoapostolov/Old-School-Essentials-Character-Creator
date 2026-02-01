
import React, { useMemo } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import type { Item } from '../../types';
import { getAttackValuesForLevel, getModifier } from '../../utils/character';
import { ShieldIcon } from '../icons/ShieldIcon';

export const CombatVitals: React.FC = () => {
    const { selectedClass, characterRoll, progression, equipment, aggregatedData } = useCharacterContext();
    const { scores } = characterRoll;
    const { characterLevel: level } = progression;
    const { allItemKeys } = equipment;

    if (!selectedClass || !scores) return null;

    const attackValues = useMemo(() => getAttackValuesForLevel(selectedClass, level), [selectedClass, level]);

    const strMod = useMemo(() => getModifier(scores.Strength), [scores.Strength]);
    const dexMod = useMemo(() => getModifier(scores.Dexterity), [scores.Dexterity]);

    const hasRangedWeapon = useMemo(() => {
        return allItemKeys.some(key => aggregatedData.ITEMS[key]?.tag === 'ranged');
    }, [allItemKeys, aggregatedData.ITEMS]);

    const armorClass = useMemo(() => {
        const equipmentList = allItemKeys.map(key => aggregatedData.ITEMS[key]).filter((item): item is Item => !!item);
        const armors = equipmentList.filter(item => item.category === 'Armor' && typeof item.ascending_ac === 'number' && !item.name.toLowerCase().includes('shield'));
        const bestArmor = armors.reduce((best, current) => (!best || (current.ascending_ac ?? 0) > (best.ascending_ac ?? 0) ? current : best), null as Item | null);
        const hasShield = equipmentList.some(item => item.category === 'Armor' && item.name.toLowerCase().includes('shield'));

        let finalAC = 10; // Unarmored base AC
        if (bestArmor && typeof bestArmor.ascending_ac === 'number') {
            finalAC = bestArmor.ascending_ac;
        }
        if (hasShield) {
            const shield = aggregatedData.ITEMS['shield'];
            if (shield && typeof shield.ascending_ac === 'number') {
                finalAC += shield.ascending_ac;
            }
        }
        finalAC += dexMod;
        return finalAC;
    }, [allItemKeys, dexMod, aggregatedData.ITEMS]);

    const meleeAttackBonus = attackValues ? attackValues.bonus + strMod : 0;
    const rangedAttackBonus = attackValues ? attackValues.bonus + dexMod : 0;
    // THAC0 should reflect the total attack bonus. The difference between THAC0 and +attack bonus is 19.
    const meleeThac0 = attackValues ? 19 - meleeAttackBonus : null;
    const rangedThac0 = attackValues ? 19 - rangedAttackBonus : null;

    return (
        <div className="grid grid-cols-3 gap-4 text-center bg-black/30 p-4 rounded-lg border border-gray-700 mb-6">
            <div>
                <p className="text-sm uppercase text-gray-400 font-bold flex items-center justify-center gap-2"><ShieldIcon className="h-4 w-4"/> Armor Class</p>
                <p className="text-3xl font-black text-white">{armorClass}</p>
            </div>
            <div>
                <p className="text-sm uppercase text-gray-400 font-bold">THAC0</p>
                <div className="text-3xl font-black text-white flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1">
                        <i className="fa-solid fa-hand-fist text-2xl"></i>
                        <span>{meleeThac0 !== null ? meleeThac0 : '--'}</span>
                    </div>
                    {hasRangedWeapon && rangedThac0 !== null && (
                        <div className="text-gray-400 text-2xl">
                            (<span className="inline-flex items-center gap-1 mx-1">
                                <i className="fa-solid fa-bullseye text-xl"></i>
                                <span>{rangedThac0}</span>
                            </span>)
                        </div>
                    )}
                </div>
            </div>
            <div>
                <p className="text-sm uppercase text-gray-400 font-bold flex items-center justify-center gap-2">Attack Bonus</p>
                <div className="text-3xl font-black text-white flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1">
                        <i className="fa-solid fa-hand-fist text-2xl"></i>
                        <span>{meleeAttackBonus >= 0 ? `+${meleeAttackBonus}` : meleeAttackBonus}</span>
                    </div>
                    {hasRangedWeapon && (
                        <div className="text-gray-400 text-2xl">
                            (<span className="inline-flex items-center gap-1 mx-1">
                                <i className="fa-solid fa-bullseye text-xl"></i>
                                <span>{rangedAttackBonus >= 0 ? `+${rangedAttackBonus}` : rangedAttackBonus}</span>
                            </span>)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
