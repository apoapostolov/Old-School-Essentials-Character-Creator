import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useSourceContext } from '../context/SourceContext';
import { GrogManager } from './GrogManager';
import { CharacterProgression } from './manage/CharacterProgression';
import { EncumbranceDisplay } from './manage/EncumbranceDisplay';
import { EquipmentManager } from './manage/EquipmentManager';
import { KarameikosBackground } from './manage/KarameikosBackground';
import { SpecialAbilities } from './manage/SpecialAbilities';

interface ManageTabProps {
    onShowKitInfo: (kit: any) => void;
    onCustomizeEquipment: () => void;
    isGrogEligible: boolean;
}

export const ManageTab: React.FC<ManageTabProps> = ({ onShowKitInfo, onCustomizeEquipment, isGrogEligible }) => {
    const { selectedClass, characterRoll, progression, equipment, grog, ai } = useCharacterContext();
    const { selectedSources } = useSourceContext();

    if (!selectedClass || !characterRoll.scores) return null;

    const showMagicManager = selectedClass.spellcastingInfo?.randomStartingSpell &&
        (selectedClass.spellcastingInfo?.starts_at_level ?? 99) <= progression.characterLevel;

    const hasSpecialAbilitiesStep = !!selectedClass.skill_type || showMagicManager;
    const showKarameikos = selectedSources.has('mystara');

    const stepOffset = showKarameikos ? 1 : 0;
    const progressionStepNumber = 1 + stepOffset;
    const equipmentStepNumber = 2 + stepOffset;
    const encumbranceStepNumber = 3 + stepOffset;
    const specialAbilitiesStepNumber = 4 + stepOffset;
    const karameikosStepNumber = 1;

    let grogStepNumber = 4 + stepOffset;
    if (hasSpecialAbilitiesStep) {
        grogStepNumber = 5 + stepOffset;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {showKarameikos && (
                <KarameikosBackground stepNumber={karameikosStepNumber} />
            )}

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

            <EncumbranceDisplay stepNumber={encumbranceStepNumber} />

            {hasSpecialAbilitiesStep && (
                <SpecialAbilities stepNumber={specialAbilitiesStepNumber} />
            )}

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
