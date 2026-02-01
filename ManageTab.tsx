import React from 'react';
import { GrogManager } from './components/GrogManager';
import { CharacterProgression } from './components/manage/CharacterProgression';
import { EncumbranceDisplay } from './components/manage/EncumbranceDisplay';
import { EquipmentManager } from './components/manage/EquipmentManager';
import { KarameikosBackground } from './components/manage/KarameikosBackground';
import { SpecialAbilities } from './components/manage/SpecialAbilities';
import { useCharacterContext } from './context/CharacterContext';
import { useSourceContext } from './context/SourceContext';

interface ManageTabProps {
    onShowKitInfo: (kit: any) => void;
    onCustomizeEquipment: () => void;
    isGrogEligible: boolean;
}

export const ManageTab: React.FC<ManageTabProps> = ({ onShowKitInfo, onCustomizeEquipment, isGrogEligible }) => {
    const { selectedClass, characterRoll, progression, equipment, grog, ai } = useCharacterContext();
    const { selectedSources } = useSourceContext();

    if (!selectedClass || !characterRoll.scores) return null;

    const skillBasedClasses = ['Thief', 'Acrobat', 'Barbarian', 'Ranger', 'Bard'];
    const isSkillBased = skillBasedClasses.includes(selectedClass.name);

    const showMagicManager = selectedClass.spellcastingInfo?.randomStartingSpell &&
                             (selectedClass.spellcastingInfo?.starts_at_level ?? 99) <= progression.characterLevel;

    const hasSpecialAbilitiesStep = isSkillBased || showMagicManager;
    const showKarameikos = selectedSources.has('mystara');

    // When Karameikos is enabled, it becomes Step 1, and everything else shifts
    const progressionStepNumber = showKarameikos ? 2 : 1;
    const equipmentStepNumber = showKarameikos ? 3 : 2;
    const encumbranceStepNumber = showKarameikos ? 4 : 3;
    const specialAbilitiesStepNumber = showKarameikos ? 5 : 4;
    const karameikosStepNumber = 1; // Always Step 1 when shown
    const grogStepNumber = showKarameikos ? (hasSpecialAbilitiesStep ? 6 : 5) : (hasSpecialAbilitiesStep ? 5 : 4);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* When Karameikos is enabled, Social Standing becomes Step 1 */}
            {showKarameikos && (
                <KarameikosBackground stepNumber={karameikosStepNumber} />
            )}

            {/* FIX: Removed props from CharacterProgression. It now uses the CharacterContext to access its required data, resolving the 'level' property error. */}
            <CharacterProgression stepNumber={progressionStepNumber} />

            <EquipmentManager
                stepNumber={equipmentStepNumber}
                moneyResultTotal={progression.moneyResult?.total ?? 0}
                equipmentCost={equipment.equipmentCost}
                finalMoney={equipment.finalMoney}
                selectedMainKit={equipment.selectedMainKit}
                selectedSpecializedKit={equipment.selectedSpecializedKit}
                onSelectKit={equipment.handleSelectKit}
                onShowKitInfo={onShowKitInfo}
                onCustomizeEquipment={onCustomizeEquipment}
            />

            {/* FIX: Removed props from EncumbranceDisplay. It now uses the CharacterContext to access its required data, resolving the 'equipmentWeight' property error. */}
            <EncumbranceDisplay stepNumber={encumbranceStepNumber} />

            {/* FIX: Removed props from SpecialAbilities. It now uses the CharacterContext to access its required data, resolving the 'selectedClass' property error. */}
            <SpecialAbilities stepNumber={specialAbilitiesStepNumber} />

            {isGrogEligible && (
                <GrogManager
                    stepNumber={grogStepNumber}
                    grog={grog.grog}
                    isGeneratingDetails={grog.isGeneratingDetails}
                    onCreateGrog={grog.createGrog}
                    onGenerateDetails={grog.generateGrogDetails}
                    theme={ai.theme}
                />
            )}
        </div>
    );
};
