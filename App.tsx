import React, { useCallback, useEffect, useState } from 'react';
import { AbilityScoreDisplay } from './components/AbilityScoreDisplay';
import { ClassCard } from './components/ClassCard';
import { ClassInfoModal } from './components/ClassInfoModal';
import { EquipmentCustomizationModal } from './components/EquipmentCustomizationModal';
import { EquipmentKitModal } from './components/EquipmentKitModal';
import { FinalTouchesTab } from './components/FinalTouchesTab';
import { CheckIcon } from './components/icons/CheckIcon';
import { DiceIcon } from './components/icons/DiceIcon';
import { EditIcon } from './components/icons/EditIcon';
import { OseLogo } from './components/icons/OseLogo';
import { PrintIcon } from './components/icons/PrintIcon';
import { SpinnerIcon } from './components/icons/SpinnerIcon';
import { ManualAbilityScoreEntryModal } from './components/ManualAbilityScoreEntryModal';
import { ManualAbilityScoreWarningModal } from './components/ManualAbilityScoreWarningModal';
import { PromptInfoModal } from './components/PromptInfoModal';
import { RaceCard } from './components/RaceCard';
import { RaceInfoModal } from './components/RaceInfoModal';
import { RollHistoryCard } from './components/RollHistoryCard';
import { SaveSlotDrawer } from './components/SaveSlotDrawer';
import { SourcesModal } from './components/SourcesModal';
import { Toast } from './components/Toast';
import { ManageTab } from './ManageTab';
import type { AbilityScores, ClassInfo } from './types';

import { CharacterProvider } from './context/CharacterContext';
import { SourceProvider, useSourceContext } from './context/SourceContext';
import { useAggregatedData } from './hooks/useAggregatedData';
import { useCharacter } from './hooks/useCharacter';
import { usePdfPrinting } from './hooks/usePdfPrinting';
import { useUIState } from './hooks/useUIState';

import { ABILITIES } from './constants';
import { getBackstoryPrompt, getLifeStandardPrompt, getNamePrompt, getPortraitPrompt, getTraitsPrompt } from './prompt-data';
import { calculateAcrobatSkills, calculateBarbarianSkills, calculateBardSkills, calculateRangerSkills, calculateThiefSkills } from './utils/skills';

interface TabButtonProps {
    isActive: boolean; isCompleted: boolean; onClick: () => void; children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, isCompleted, onClick, children }) => (
    <button onClick={onClick} className={`flex items-center justify-center py-3 px-4 sm:px-6 rounded-t-lg font-black text-lg uppercase tracking-wider transform transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400/80 focus:z-10 ${isActive ? 'text-gray-900 bg-yellow-500 shadow-lg shadow-yellow-500/20' : isCompleted ? 'text-green-300 bg-green-900/40 hover:bg-green-900/60' : 'text-gray-500 bg-gray-800/60 hover:bg-gray-700/80'}`} style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }} role="tab" aria-selected={isActive}>
        {isCompleted && !isActive && <CheckIcon className="h-5 w-5 mr-2 text-green-400" />}
        {children}
    </button>
);

const PlaceholderContent: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="text-center py-20 px-6 bg-gray-800/50 rounded-lg border-2 border-gray-700/50 border-dashed">
        <h2 className="text-3xl font-bold text-yellow-400">{title}</h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">{children}</p>
    </div>
);

const AppContent: React.FC = () => {
    const { selectedSources } = useSourceContext();
    const aggregatedData = useAggregatedData(selectedSources);
    const uiState = useUIState();
    const pdf = usePdfPrinting(aggregatedData);
    const character = useCharacter(uiState.setToastMessage, aggregatedData);

    const {
        selectedClass, selectClass, selectedRace, selectRace, characterRoll, modifiedScores,
        progression, equipment, ai, grog,
        resetRollAndCharacter, restoreRollAndCharacter
    } = character;

    const [showRaces, setShowRaces] = useState(false);
    const [showManualScoreWarning, setShowManualScoreWarning] = useState(false);
    const [showManualScoreEntry, setShowManualScoreEntry] = useState(false);

    const handleSelectClass = useCallback((classInfo: ClassInfo) => {
        selectClass(classInfo);
        uiState.setCompletedTabs(prev => new Set(prev).add('roll'));
        uiState.setActiveTab('manage');
    }, [selectClass, uiState]);

    const handleManualScoreIconClick = useCallback(() => {
        setShowManualScoreWarning(true);
    }, []);

    const handleManualScoreWarningProceed = useCallback(() => {
        setShowManualScoreWarning(false);
        setShowManualScoreEntry(true);
    }, []);

    const handleManualScoreApply = useCallback((newScores: AbilityScores) => {
        // Directly set the scores in the character roll hook
        characterRoll.handleRestoreRoll(newScores);
        setShowManualScoreEntry(false);
        uiState.setToastMessage('Manual ability scores applied successfully!');
    }, [characterRoll, uiState]);

    useEffect(() => {
        if (!selectedClass) {
            uiState.setCompletedTabs(prev => { const newTabs = new Set(prev); newTabs.delete('manage'); return newTabs; });
            return;
        }

        const hasKit = equipment.selectedMainKit !== null || equipment.selectedSpecializedKit !== null;
        if (!hasKit) {
            uiState.setCompletedTabs(prev => { const newTabs = new Set(prev); newTabs.delete('manage'); return newTabs; });
            return;
        }

        let isComplete = true; // Assume complete by default

        if (selectedClass.spellcastingInfo?.randomStartingSpell) {
            if (progression.knownSpells.length === 0) isComplete = false;
        }

        if (selectedClass.skill_type === 'ranger') {
            if (progression.favoredTerrain === null) isComplete = false;
        }

        uiState.setCompletedTabs(prev => {
            const newTabs = new Set(prev);
            if (isComplete) newTabs.add('manage'); else newTabs.delete('manage');
            return newTabs;
        });
    }, [selectedClass, equipment.selectedMainKit, equipment.selectedSpecializedKit, progression.knownSpells, progression.favoredTerrain, uiState.setCompletedTabs]);

    useEffect(() => {
        uiState.setCompletedTabs(prev => {
            const newTabs = new Set(prev);
            if (ai.portrait) newTabs.add('final'); else newTabs.delete('final');
            return newTabs;
        });
    }, [ai.portrait, uiState.setCompletedTabs]);

    const handlePrint = () => {
        if (!selectedClass || !modifiedScores || !progression.hpResult) return;
        const allLanguages = [ai.commonLanguage, ai.racialLanguage?.name, ...ai.selectedBonusLanguages].filter(Boolean) as string[];
        const uniqueLanguages = [...new Set(allLanguages)];
        const pdfPortrait = ai.pdfPortraitSrc;
        pdf.printSheet({
            classInfo: selectedClass, scores: modifiedScores, characterName: ai.characterName, level: progression.characterLevel, hpResult: progression.hpResult,
            allItemKeys: equipment.allItemKeys, equipmentWeight: equipment.equipmentWeight,
            calculatedThiefSkills: selectedClass.skill_type === 'thief' ? calculateThiefSkills(progression.characterLevel, progression.thiefSkillIncreases) : null,
            calculatedAcrobatSkills: selectedClass.skill_type === 'acrobat' ? calculateAcrobatSkills(progression.characterLevel, progression.acrobatSkillIncreases) : null,
            calculatedBarbarianSkills: selectedClass.skill_type === 'barbarian' ? calculateBarbarianSkills(progression.characterLevel, progression.barbarianSkillIncreases) : null,
            calculatedRangerSkills: selectedClass.skill_type === 'ranger' ? calculateRangerSkills(progression.characterLevel, progression.rangerSkillIncreases) : null,
            calculatedBardSkills: selectedClass.skill_type === 'bard' ? calculateBardSkills(progression.characterLevel, progression.bardSkillIncreases) : null,
            favoredTerrain: progression.favoredTerrain, pdfPortrait: pdfPortrait, finalMoney: equipment.finalMoney, characterDescription: ai.characterDescription,
            knownSpells: progression.knownSpells, grog: grog.grog, languages: uniqueLanguages, secondarySkills: ai.secondarySkills,
            lifeStandard: ai.characterTraits?.lifeStandard ?? null,
            race: selectedRace,
            karameikos: character.karameikos,
        });
    };

    const generateFullPortraitPrompt = () => {
        if (!selectedClass || !modifiedScores) return 'Please select a class and roll ability scores to generate a prompt.';
        const equipmentItems = equipment.allItemKeys.map(key => aggregatedData.ITEMS[key]).filter(Boolean);
        const lifestyleDetails = ai.characterTraits?.lifestyleKey ? aggregatedData.LIFESTYLES[ai.characterTraits.lifestyleKey] : null;
        // FIX: Added missing 'selectedRace' argument to 'getPortraitPrompt' call to match function signature.
        return getPortraitPrompt(selectedClass, modifiedScores, ai.gender, ai.theme, ai.characterTraits, progression.characterLevel, ai.secondarySkills, equipmentItems, ai.characterTraits?.lifeStandard ?? null, lifestyleDetails, aggregatedData.THEMES, selectedRace);
    };

    const generateBackstoryPrompt = () => {
        if (!selectedClass || !modifiedScores || !ai.characterTraits || !ai.characterName) return 'Please generate all character details (name, traits, etc.) before viewing the backstory prompt.';
        const equipmentItems = equipment.allItemKeys.map(key => aggregatedData.ITEMS[key]).filter(Boolean);
        const lifestyleDetails = ai.characterTraits.lifestyleKey ? aggregatedData.LIFESTYLES[ai.characterTraits.lifestyleKey] : null;
        // FIX: Added missing 'selectedRace' argument to 'getBackstoryPrompt' call to match function signature.
        return getBackstoryPrompt(ai.characterName, selectedClass, modifiedScores, ai.gender, ai.theme, ai.characterTraits, progression.characterLevel, ai.secondarySkills, equipmentItems, ai.characterTraits.lifeStandard ?? null, lifestyleDetails, aggregatedData.THEMES, selectedRace);
    };

    const generateNamePrompt = () => {
        if (!selectedClass) return 'Please select a class before viewing the name prompt.';
        const ethnos = character.karameikos?.ethnos?.origin;
        return getNamePrompt(ai.gender, selectedClass, ai.theme, aggregatedData.THEMES, ethnos);
    };

    const generateTraitsPrompt = () => {
        if (!selectedClass) return 'Please select a class before viewing the traits prompt.';
        return getTraitsPrompt(selectedClass, ai.gender, ai.theme, ai.characterTraits?.lifeStandard ?? null, aggregatedData.THEMES);
    };

    const generateLifeStandardPrompt = () => {
        if (!selectedClass || !modifiedScores || !ai.secondarySkills) return 'Please roll a profession first to view the life standard prompt.';
        const skillList = aggregatedData.SECONDARY_SKILLS[ai.theme] || aggregatedData.SECONDARY_SKILLS['ose'];
        const skillName = ai.secondarySkills[0];
        const skillData = skillList.find(s => s.skill === skillName);
        const lifestyleDetails = skillData ? aggregatedData.LIFESTYLES[skillData.lifestyle] : aggregatedData.LIFESTYLES['Modest'];
        return getLifeStandardPrompt(selectedClass, modifiedScores, ai.gender, ai.theme, ai.secondarySkills, lifestyleDetails, null);
    };

    const isGrogEligible = !!selectedClass?.grog_eligible;
    const basicClasses = aggregatedData.CLASSES.filter(c => c.group === 'Basic');
    const demihumanClasses = aggregatedData.CLASSES.filter(c => c.group === 'Demihuman');
    const advancedClasses = aggregatedData.CLASSES.filter(c => c.group === 'Advanced');

    return (
        <CharacterProvider character={character}>
            <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-8 bg-cover bg-center" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"}}>
                <Toast message={uiState.toastMessage} onDismiss={() => uiState.setToastMessage(null)} />
                {uiState.isPromptModalVisible && <PromptInfoModal title="Full Portrait AI Prompt" prompt={generateFullPortraitPrompt()} onClose={() => uiState.setIsPromptModalVisible(false)} />}
                {uiState.isBackstoryPromptModalVisible && <PromptInfoModal title="The Two-Page™ Backstory AI Prompt" prompt={generateBackstoryPrompt()} onClose={() => uiState.setIsBackstoryPromptModalVisible(false)} />}
                {uiState.isNamePromptModalVisible && <PromptInfoModal title="Name Generation AI Prompt" prompt={generateNamePrompt()} onClose={() => uiState.setIsNamePromptModalVisible(false)} />}
                {uiState.isTraitsPromptModalVisible && <PromptInfoModal title="Character Traits AI Prompt" prompt={generateTraitsPrompt()} onClose={() => uiState.setIsTraitsPromptModalVisible(false)} />}
                {uiState.isLifeStandardPromptModalVisible && <PromptInfoModal title="Life Before Adventuring AI Prompt" prompt={generateLifeStandardPrompt()} onClose={() => uiState.setIsLifeStandardPromptModalVisible(false)} />}
                {uiState.kitModalData && <EquipmentKitModal kit={uiState.kitModalData} onClose={() => uiState.setKitModalData(null)} />}
                {uiState.isCustomizingEquipment && <EquipmentCustomizationModal onClose={() => uiState.setIsCustomizingEquipment(false)} />}
                {uiState.classInfoModalData && <ClassInfoModal classInfo={uiState.classInfoModalData} onClose={() => uiState.setClassInfoModalData(null)} selectedRace={selectedRace} />}
                {uiState.raceInfoModalData && <RaceInfoModal race={uiState.raceInfoModalData} onClose={() => uiState.setRaceInfoModalData(null)} />}
                {uiState.isSourcesModalVisible && <SourcesModal onClose={() => uiState.setIsSourcesModalVisible(false)} />}
                {showManualScoreWarning && <ManualAbilityScoreWarningModal onProceed={handleManualScoreWarningProceed} onClose={() => setShowManualScoreWarning(false)} />}
                {showManualScoreEntry && <ManualAbilityScoreEntryModal currentScores={characterRoll.scores} onApply={handleManualScoreApply} onClose={() => setShowManualScoreEntry(false)} />}
                {pdf.pdfError && <div className="fixed bottom-4 right-4 bg-red-800 border border-red-600 text-white px-4 py-3 rounded-lg shadow-xl z-50"><div className="flex items-start justify-between"><div><strong className="font-bold">PDF Issue!</strong><span className="block text-sm mt-1">{pdf.pdfError}</span></div><button onClick={() => pdf.setPdfError(null)} className="ml-4 -mr-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white"><svg className="fill-current h-6 w-6 text-red-200" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg></button></div></div>}

                <div className="max-w-7xl mx-auto">
                    <header className="text-center mb-4"><OseLogo className="w-full max-w-3xl mx-auto h-auto px-4" /></header>
                    <div className="mb-8 flex justify-center items-center gap-4">
                        <button onClick={() => uiState.setIsSourcesModalVisible(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Select Content Sources">
                            <i className="fa-solid fa-book-journal-whills h-5 w-5"></i>
                            <span className="hidden sm:inline ml-2">SOURCES</span>
                        </button>
                        <nav className="flex justify-center space-x-1" aria-label="Tabs">
                            <TabButton isActive={uiState.activeTab === 'roll'} isCompleted={uiState.completedTabs.has('roll')} onClick={() => uiState.setActiveTab('roll')}><span className="sm:hidden">ROLL</span><span className="hidden sm:inline">1. Roll Character</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'manage'} isCompleted={uiState.completedTabs.has('manage')} onClick={() => uiState.setActiveTab('manage')}><span className="sm:hidden">MANAGE</span><span className="hidden sm:inline">2. Manage & Outfit</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'final'} isCompleted={uiState.completedTabs.has('final')} onClick={() => uiState.setActiveTab('final')}><span className="sm:hidden">ART</span><span className="hidden sm:inline">3. Final Touches</span></TabButton>
                        </nav>
                        <button onClick={handlePrint} disabled={!selectedClass || pdf.isPrinting} className={`bg-sky-700 hover:bg-sky-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-400 ${uiState.completedTabs.has('final') ? 'animate-pulse-glow' : ''}`} aria-label="Print Character Sheet">
                            {pdf.isPrinting ? <SpinnerIcon className="h-5 w-5" /> : <PrintIcon className="h-5 w-5" />}
                            <span className="hidden sm:inline ml-2">PRINT</span>
                        </button>
                    </div>

                    <main>
                        {uiState.activeTab === 'roll' && (
                            <>
                                <div className="text-center mb-8"><button onClick={resetRollAndCharacter} disabled={characterRoll.isRolling} className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto"><DiceIcon className="mr-2 h-6 w-6"/>{characterRoll.isRolling ? 'Rolling...' : (characterRoll.scores ? 'Roll Again' : 'Roll Stats')}</button></div>

                                {characterRoll.scores && (
                                    <div className="mb-8 bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50 shadow-lg max-w-lg mx-auto">
                                        <div className="flex justify-between items-center gap-4">
                                            <p className="text-gray-400 text-sm text-left flex-1">
                                                Decrease a score by 2 to gain 1 adjustment point; each score can be decreased only once. It costs 1 point to increase a score by +1.
                                            </p>
                                            <div className="text-center border-l-2 border-gray-700/50 pl-4 flex-shrink-0">
                                                <p className="text-lg font-bold text-gray-300">Adjustments</p>
                                                <p className="text-5xl font-extrabold text-green-400">{characterRoll.adjustments}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-10">
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <h2 className="text-2xl font-semibold text-gray-300">Ability Scores</h2>
                                        <button
                                            onClick={handleManualScoreIconClick}
                                            className="text-gray-400 hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                                            aria-label="Manual ability score entry"
                                            title="Enter ability scores manually (requires DM approval)"
                                        >
                                            <EditIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-opacity duration-500 ${characterRoll.scores ? 'opacity-100' : 'opacity-40'}`}>
                                        {ABILITIES.map((ability) => (
                                            <AbilityScoreDisplay
                                                key={ability}
                                                ability={ability}
                                                score={modifiedScores ? modifiedScores[ability] : 0}
                                                preRaceScore={characterRoll.scores ? characterRoll.scores[ability] : 0}
                                                onIncrement={() => characterRoll.handleIncrement(ability)}
                                                onDecrement={() => characterRoll.handleDecrement(ability)}
                                                canIncrement={!!characterRoll.scores && characterRoll.scores[ability] < 18 && characterRoll.adjustments >= 1}
                                                canDecrement={!!characterRoll.scores && characterRoll.scores[ability] > 4 && !characterRoll.decrementedAbilities.has(ability)}
                                                isInteractive={!!characterRoll.scores}
                                                isBelowBase={!!(characterRoll.scores && characterRoll.baseScores && characterRoll.scores[ability] < characterRoll.baseScores[ability])}
                                            />
                                        ))}
                                    </div>
                                    {!characterRoll.scores && !characterRoll.isRolling && (
                                        <div className="text-center text-gray-500 mt-6">Click "Roll Stats" to begin your adventure!</div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-center mb-6 text-yellow-300">Available Choices</h2>
                                    <div className="mb-12">
                                        <div className="flex items-center justify-between mb-4 border-b-2 border-red-800 pb-2">
                                            <h3 className="text-2xl font-semibold text-left text-gray-300">Races</h3>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-sm font-bold ${showRaces ? 'text-red-400' : 'text-gray-500'}`}>{showRaces ? 'ON' : 'OFF'}</span>
                                                <label htmlFor="race-toggle" className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" id="race-toggle" className="sr-only peer" checked={showRaces} onChange={() => setShowRaces(!showRaces)} disabled={!characterRoll.scores} />
                                                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-900 disabled:opacity-50"></div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out ${showRaces ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 mb-4 pt-2">
                                                {aggregatedData.RACES.map((r) => <RaceCard key={r.name + r.sourceId} race={r} scores={characterRoll.scores} onSelect={selectRace} isSelected={selectedRace?.name === r.name} onShowInfo={uiState.setRaceInfoModalData} />)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-12"><h3 className="text-2xl font-semibold text-left mb-4 text-gray-300 border-b-2 border-slate-700 pb-2">Basic Classes</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 mb-4">{basicClasses.map((c) => <ClassCard key={c.name + c.sourceId} classInfo={c} scores={modifiedScores} onSelect={handleSelectClass} isSelected={selectedClass?.name === c.name} onShowInfo={uiState.setClassInfoModalData} selectedRace={selectedRace} />)}</div></div><div className="mb-12"><h3 className="text-2xl font-semibold text-left mb-4 text-gray-300 border-b-2 border-teal-700 pb-2">Demihuman Classes</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 mb-4">{demihumanClasses.map((c) => <ClassCard key={c.name + c.sourceId} classInfo={c} scores={modifiedScores} onSelect={handleSelectClass} isSelected={selectedClass?.name === c.name} onShowInfo={uiState.setClassInfoModalData} selectedRace={selectedRace} />)}</div></div><div><h3 className="text-2xl font-semibold text-left mb-4 text-gray-300 border-b-2 border-indigo-700 pb-2">Advanced Classes</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 mb-4">{advancedClasses.map((c) => <ClassCard key={c.name + c.sourceId} classInfo={c} scores={modifiedScores} onSelect={handleSelectClass} isSelected={selectedClass?.name === c.name} onShowInfo={uiState.setClassInfoModalData} selectedRace={selectedRace} />)}</div></div>
                                </div>
                                {characterRoll.rollHistory.length > 0 && (<div className="mt-12"><h2 className="text-2xl font-semibold text-center mb-4 text-gray-300">Roll History</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{characterRoll.rollHistory.map((roll, index) => (<RollHistoryCard key={index} roll={roll} onRestore={() => restoreRollAndCharacter(roll)} />))}</div></div>)}
                            </>
                        )}
                        {uiState.activeTab === 'manage' && (selectedClass && modifiedScores ? <ManageTab onShowKitInfo={uiState.setKitModalData} onCustomizeEquipment={() => uiState.setIsCustomizingEquipment(true)} isGrogEligible={isGrogEligible} /> : <PlaceholderContent title="Manage & Outfit">Select a class on the "Roll Character" tab to begin managing your character.</PlaceholderContent>)}
                        {/* FIX: Corrected the event handler to set modal visibility to 'true' instead of 'false', enabling the backstory prompt modal to open as intended. */}
                        {uiState.activeTab === 'final' && (selectedClass && modifiedScores ? (<FinalTouchesTab onShowPromptInfo={() => uiState.setIsPromptModalVisible(true)} onShowBackstoryPromptInfo={() => uiState.setIsBackstoryPromptModalVisible(true)} onShowNamePromptInfo={() => uiState.setIsNamePromptModalVisible(true)} onShowTraitsPromptInfo={() => uiState.setIsTraitsPromptModalVisible(true)} onShowLifeStandardPromptInfo={() => uiState.setIsLifeStandardPromptModalVisible(true)} />) : (<PlaceholderContent title="Select a Class First">Please go back to the "Roll Character" tab and select a class for your character before generating a portrait.</PlaceholderContent>))}
                    </main>
                    <footer className="text-center mt-12 text-gray-600 text-sm"><p><a href="./OSE_HOUSE_RULES.md" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 underline transition-colors duration-200">Based on the Advanced OSE Ruleset, Homebrew by Apostol Apostolov</a></p></footer>
                    <SaveSlotDrawer />
                </div>
            </div>
        </CharacterProvider>
    );
};

const App: React.FC = () => (
    <SourceProvider>
        <AppContent />
    </SourceProvider>
);

export default App;
