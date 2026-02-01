import React, { useMemo } from 'react';
import type { Grog, Theme, Item } from '../types';
import { ABILITIES } from '../constants';
import { getModifierString, getModifier } from '../utils';
import { ITEMS } from '../item-data';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { PortraitIcon } from './icons/PortraitIcon';

interface GrogManagerProps {
    grog: Grog | null;
    isGeneratingDetails: boolean;
    onCreateGrog: () => void;
    onGenerateDetails: (theme: Theme) => void;
    theme: Theme;
    stepNumber: number;
}

const GrogAbilityScore: React.FC<{ability: string, score: number}> = ({ ability, score }) => (
    <div className="bg-gray-900/50 p-2 rounded-md text-center border border-gray-700">
        <p className="text-xs font-bold uppercase text-gray-500">{ability.substring(0,3)}</p>
        <p className="text-2xl font-bold text-white">{score}</p>
        <p className="text-sm font-semibold text-gray-400">{getModifierString(score)}</p>
    </div>
);

export const GrogManager: React.FC<GrogManagerProps> = ({ grog, isGeneratingDetails, onCreateGrog, onGenerateDetails, theme, stepNumber }) => {
    
    const combatStats = useMemo(() => {
        if (!grog) return null;

        const { scores, equipment: equipmentKeys } = grog;
        const equipment = equipmentKeys.map(key => ITEMS[key]).filter((item): item is Item => !!item);

        // Mods
        const strMod = getModifier(scores.Strength);
        const dexMod = getModifier(scores.Dexterity);

        // AC
        const armors = equipment.filter(item => item.category === 'Armor' && !item.name.toLowerCase().includes('shield'));
        const bestArmor = armors.reduce((best, current) => (!best || (current.ascending_ac ?? 0) > (best.ascending_ac ?? 0) ? current : best), null as Item | null);
        const hasShield = equipment.some(item => item.category === 'Armor' && item.name.toLowerCase().includes('shield'));

        let ac = 10; // Unarmored
        if (bestArmor && typeof bestArmor.ascending_ac === 'number') {
            ac = bestArmor.ascending_ac;
        }
        if (hasShield) {
            ac += 1;
        }
        ac += dexMod;
        
        // Attack Bonus (Lvl 1 Fighter has +0 base)
        const meleeBonus = strMod;
        const rangedBonus = dexMod;
        const hasRangedWeapon = equipment.some(item => item.isMissile);

        // Equipment List with Damage
        const formattedEquipmentList = equipment.map(item => {
            if (item.category === 'Weapon' && item.damage) {
                let damageString = item.damage;
                let damageMod = 0;
                if (item.isMelee) { // Melee and thrown weapons use STR
                    damageMod = strMod;
                } else if (item.isMissile) { // Pure missile weapons use DEX (app-specific rule)
                    damageMod = dexMod;
                }
                
                if (damageMod !== 0) {
                    damageString += damageMod > 0 ? `+${damageMod}` : `${damageMod}`;
                }
                return `${item.name} (${damageString})`;
            }
            return item.name;
        }).join(', ');
        
        return {
            ac,
            meleeBonus,
            rangedBonus,
            hasRangedWeapon,
            formattedEquipmentList
        };
    }, [grog]);

    if (!grog) {
        return (
            <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50 text-center">
                <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Recruit a Personal Grog</h2>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">As a fragile spellcaster, you begin your career with a loyal "grog" - a mercenary hireling sworn to protect you. They are a Level 1 Fighter who serves you for free, but requires fair treatment and a share of treasure.</p>
                <button 
                    onClick={onCreateGrog}
                    className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    Recruit Your Grog
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Step {stepNumber}: Your Personal Grog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side: Stats and Info */}
                <div>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
                        {ABILITIES.map(ability => (
                            <GrogAbilityScore key={ability} ability={ability} score={grog.scores[ability]} />
                        ))}
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-700 space-y-2">
                        <div className="flex justify-between items-center"><span className="font-bold text-gray-400">Class:</span> <span className="text-white font-semibold">Fighter, Level 1</span></div>
                        <div className="flex justify-between items-center"><span className="font-bold text-gray-400">Hit Points:</span> <span className="text-white font-semibold">{grog.hp}</span></div>
                        {combatStats && (
                            <>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-400">Armor Class:</span>
                                    <span className="text-white font-semibold">{combatStats.ac}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-400">Attack Bonus:</span>
                                    <span className="text-white font-semibold text-right">
                                        {combatStats.meleeBonus >= 0 ? `+${combatStats.meleeBonus}` : combatStats.meleeBonus} (Melee)
                                        {combatStats.hasRangedWeapon && `, ${combatStats.rangedBonus >= 0 ? `+${combatStats.rangedBonus}` : combatStats.rangedBonus} (Ranged)`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="font-bold text-gray-400 flex-shrink-0 mr-2">Equipment:</span>
                                    <span className="text-white font-semibold text-right">{combatStats.formattedEquipmentList}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Side: AI Generation */}
                <div className="bg-black/30 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center min-h-[250px]">
                    {!grog.name ? (
                        <>
                            <p className="text-gray-400 mb-4 text-center">Your grog is ready for duty. Give them a name, a face, and a personality.</p>
                             <button 
                                onClick={() => onGenerateDetails(theme)}
                                disabled={isGeneratingDetails}
                                className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
                            >
                                {isGeneratingDetails ? <SpinnerIcon className="mr-2 h-6 w-6"/> : <PortraitIcon className="mr-2 h-6 w-6"/>}
                                {isGeneratingDetails ? 'Generating...' : 'Flesh out Grog'}
                            </button>
                        </>
                    ) : (
                        <div className="text-center w-full">
                            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gray-600 mb-4 bg-black">
                                {grog.portrait ? (
                                    <img src={grog.portrait} alt="Grog's portrait" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500"><PortraitIcon className="h-16 w-16" /></div>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-white">{grog.name}</h3>
                            {grog.traits && (
                                <div className="text-sm mt-2 text-left bg-gray-900/50 p-3 rounded-md">
                                    <p><strong className="text-green-400">Physical:</strong> {grog.traits.positivePhysical}</p>
                                    <p><strong className="text-sky-400">Mental:</strong> {grog.traits.positiveMental}</p>
                                    <p><strong className="text-red-400">Flaw:</strong> {grog.traits.negative}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};