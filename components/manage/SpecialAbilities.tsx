import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { AcrobatSkillsManager } from '../AcrobatSkillsManager';
import { BarbarianSkillsManager } from '../BarbarianSkillsManager';
import { BardSkillsManager } from '../BardSkillsManager';
import { MagicManager } from '../MagicManager';
import { RangerSkillsManager } from '../RangerSkillsManager';
import { ThiefSkillsManager } from '../ThiefSkillsManager';

interface SpecialAbilitiesProps {
    stepNumber: number;
}

export const SpecialAbilities: React.FC<SpecialAbilitiesProps> = ({ stepNumber }) => {
    const { selectedClass, characterRoll, progression } = useCharacterContext();
    const { scores } = characterRoll;
    const { characterLevel: level } = progression;

    if (!selectedClass || !scores) return null;

    const casterType = selectedClass.spellcastingInfo?.caster_type;
    const showMagicManager = selectedClass.spellcastingInfo?.randomStartingSpell && (selectedClass.spellcastingInfo?.starts_at_level ?? 99) <= level;

    const hasSpecialAbilitiesStep = !!selectedClass.skill_type || showMagicManager;
    if (!hasSpecialAbilitiesStep) return null;

    const renderSkillManager = () => {
        switch (selectedClass.skill_type) {
            case 'thief':
                return (
                    <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Develop Thief Skills</h2>
                        <p className="text-gray-400 mb-6">Allocate points to improve your thieving abilities based on your character level.</p>
                        <ThiefSkillsManager level={level} increases={progression.thiefSkillIncreases} onIncreasesChange={progression.setThiefSkillIncreases} />
                    </div>
                );
            case 'acrobat':
                return (
                    <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Develop Acrobat Skills</h2>
                        <p className="text-gray-400 mb-6">Allocate points to improve your acrobatic abilities based on your character level.</p>
                        <AcrobatSkillsManager level={level} increases={progression.acrobatSkillIncreases} onIncreasesChange={progression.setAcrobatSkillIncreases} />
                    </div>
                );
            case 'barbarian':
                return (
                    <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Develop Wilderness Skills</h2>
                        <p className="text-gray-400 mb-6">Allocate points to improve your barbarian abilities based on your character level.</p>
                        <BarbarianSkillsManager level={level} increases={progression.barbarianSkillIncreases} onIncreasesChange={progression.setBarbarianSkillIncreases} />
                    </div>
                );
            case 'ranger':
                return (
                    <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Develop Ranger Skills</h2>
                        <p className="text-gray-400 mb-6">Choose your favored terrain and allocate points to improve your wilderness abilities.</p>
                        <RangerSkillsManager
                            level={level}
                            increases={progression.rangerSkillIncreases}
                            onIncreasesChange={progression.setRangerSkillIncreases}
                            favoredTerrain={progression.favoredTerrain}
                            onFavoredTerrainChange={progression.setFavoredTerrain}
                        />
                    </div>
                );
            case 'bard':
                return (
                    <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step {stepNumber}: Develop Bard Skills</h2>
                        <p className="text-gray-400 mb-6">Allocate points to improve your subtle abilities based on your character level.</p>
                        <BardSkillsManager level={level} increases={progression.bardSkillIncreases} onIncreasesChange={progression.setBardSkillIncreases} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderSkillManager()}
            {showMagicManager && casterType && (
                <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-1">Step 5: Starting Magic</h2>
                    <p className="text-gray-400 mb-6">As a new spellcaster, your starting spell is determined randomly. First, select four favorite spells from the list below. One will be chosen by fate. If you dislike the result, you can choose the default spell preferred by your class instead. You may also know bonus spells based on your Intelligence.</p>
                    <MagicManager casterType={casterType} knownSpells={progression.knownSpells} onKnownSpellsChange={progression.setKnownSpells} scores={scores} />
                </div>
            )}
        </>
    );
};
