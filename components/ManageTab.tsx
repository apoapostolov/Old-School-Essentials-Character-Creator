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

    console.log('🔍 ManageTab called - has class?', !!selectedClass, 'has scores?', !!characterRoll.scores);
    console.log('🔍 ManageTab - selectedSources:', Array.from(selectedSources), 'has mystara?', selectedSources.has('mystara'));

    if (!selectedClass || !characterRoll.scores) return null;

    const showMagicManager = selectedClass.spellcastingInfo?.randomStartingSpell &&
                             (selectedClass.spellcastingInfo?.starts_at_level ?? 99) <= progression.characterLevel;

    const hasSpecialAbilitiesStep = !!selectedClass.skill_type || showMagicManager;
    const showKarameikos = selectedSources.has('mystara');

    console.log('🔍 ManageTab render - selectedSources:', Array.from(selectedSources));
    console.log('🔍 Karameikos check - has mystara?', showKarameikos);

    // Calculate step numbers dynamically
    // If Karameikos is enabled, it becomes step 1, and everything else shifts by +1
    const stepOffset = showKarameikos ? 1 : 0;
    const progressionStepNumber = 1 + stepOffset;
    const equipmentStepNumber = 2 + stepOffset;
    const encumbranceStepNumber = 3 + stepOffset;
    const specialAbilitiesStepNumber = 4 + stepOffset;
    const karameikosStepNumber = 1; // Always step 1 when visible

    // Calculate final step number for Grog (depends on whether special abilities step exists)
    let grogStepNumber = 4 + stepOffset; // Base: after encumbrance
    if (hasSpecialAbilitiesStep) {
        grogStepNumber = 5 + stepOffset; // After special abilities
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* DEBUG: Remove this after testing */}
            <div style={{
                backgroundColor: '#ff0000',
                color: '#ffffff',
                padding: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center',
                border: '5px solid yellow',
                marginBottom: '20px'
            }}>
                🔧 DEBUG BANNER - THIS MUST BE VISIBLE 🔧<br/>
                Sources: [{Array.from(selectedSources).join(', ') || 'NONE'}]<br/>
                Has 'mystara'? {selectedSources.has('mystara') ? '✅ YES' : '❌ NO'}<br/>
                showKarameikos = {showKarameikos ? '✅ TRUE' : '❌ FALSE'}
            </div>

            {showKarameikos && (
                <>
                    {console.log('✅ Rendering KarameikosBackground component as Step 1')}
                    <KarameikosBackground stepNumber={karameikosStepNumber} />
                </>
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
                    stepNumber={grogStepNumber} // Always the last step
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
