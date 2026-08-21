import { useState, useCallback, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import type { CharacterSaveData, SaveSlot } from '../types';

const SAVE_VERSION = '1.0.0';
const MAX_SLOTS = 5;
const STORAGE_KEY = 'ose-character-saves';
const SYSTEM_NAME = 'ose';

/** JSON-safe deep clone (drops functions / non-enumerables). */
const cloneData = <T,>(value: T): T => JSON.parse(JSON.stringify(value ?? null));

/**
 * Character save/load: 5 slots, localStorage, import/export JSON.
 */
export const useSaveSystem = () => {
    const [slots, setSlots] = useState<(SaveSlot | null)[]>(Array(MAX_SLOTS).fill(null));
    const character = useCharacterContext();

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setSlots(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load save slots:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
        } catch (error) {
            console.error('Failed to persist save slots:', error);
        }
    }, [slots]);

    const createSaveData = useCallback((): CharacterSaveData => {
        const c = character as any;
        const characterName = c.ai?.characterName || 'Unnamed Character';
        const roll = c.characterRoll || {};
        const prog = c.progression || {};
        const equip = c.equipment || {};
        const ai = c.ai || {};
        const kar = c.karameikos || {};

        return {
            version: SAVE_VERSION,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            characterData: {
                selectedClass: cloneData(c.selectedClass),
                selectedRace: cloneData(c.selectedRace),
                characterRoll: cloneData({
                    scores: roll.scores ?? null,
                    baseScores: roll.baseScores ?? null,
                    adjustments: roll.adjustments ?? 0,
                    rollHistory: roll.rollHistory ?? [],
                    decrementedAbilities: roll.decrementedAbilities
                        ? Array.from(roll.decrementedAbilities)
                        : [],
                }),
                progression: cloneData({
                    characterLevel: prog.characterLevel,
                    hpRolls: prog.hpRolls,
                    moneyRolls: prog.moneyRolls,
                    hpResult: prog.hpResult,
                    moneyResult: prog.moneyResult,
                    knownSpells: prog.knownSpells,
                    thiefSkillIncreases: prog.thiefSkillIncreases,
                    acrobatSkillIncreases: prog.acrobatSkillIncreases,
                    barbarianSkillIncreases: prog.barbarianSkillIncreases,
                    rangerSkillIncreases: prog.rangerSkillIncreases,
                    bardSkillIncreases: prog.bardSkillIncreases,
                    sageSkillIncreases: prog.sageSkillIncreases,
                    favoredTerrain: prog.favoredTerrain,
                    selectedSpellList: prog.selectedSpellList,
                }),
                equipment: cloneData({
                    selectedMainKit: equip.selectedMainKit,
                    selectedSpecializedKit: equip.selectedSpecializedKit,
                    customItems: equip.customItems,
                }),
                ai: cloneData({
                    characterName: ai.characterName,
                    theme: ai.theme,
                    gender: ai.gender,
                    characterTraits: ai.characterTraits,
                    secondarySkills: ai.secondarySkills,
                    portrait: ai.portrait,
                    headshot: ai.headshot,
                    portraitView: ai.portraitView,
                    portraitError: ai.portraitError,
                    emotionalPortraits: ai.emotionalPortraits,
                    pdfPortraitSrc: ai.pdfPortraitSrc,
                    characterDescription: ai.characterDescription,
                    commonLanguage: ai.commonLanguage,
                    selectedBonusLanguages: ai.selectedBonusLanguages,
                    backstory: ai.backstory,
                }),
                grog: cloneData({
                    grog: c.grog?.grog ?? null,
                }),
                karameikos: cloneData({
                    ethnos: kar.ethnos,
                    socialStanding: kar.socialStanding,
                    family: kar.family,
                    villageName: kar.villageName,
                    // keep any other plain state fields if present
                    ...Object.fromEntries(
                        Object.entries(kar).filter(([, v]) => typeof v !== 'function'),
                    ),
                }),
            },
            metadata: {
                characterName,
            },
        };
    }, [character]);

    const saveCharacter = useCallback((slotIndex: number, customName?: string) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const saveData = createSaveData();
        const aiGeneratedName = (character as any)?.ai?.characterName;
        const finalName = aiGeneratedName || customName || `Character ${slotIndex + 1}`;

        const slot: SaveSlot = {
            characterName: finalName,
            customName: customName && customName !== aiGeneratedName ? customName : undefined,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            data: saveData,
        };

        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = slot;
            return newSlots;
        });
    }, [createSaveData, character]);

    const loadCharacter = useCallback((slotIndex: number) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const slot = slots[slotIndex];
        if (!slot) {
            throw new Error('Slot is empty');
        }

        const loader = (character as any).loadFromSave;
        if (typeof loader !== 'function') {
            throw new Error('Character loader is not available');
        }
        loader(slot.data);
    }, [slots, character]);

    const deleteSlot = useCallback((slotIndex: number) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }
        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = null;
            return newSlots;
        });
    }, []);

    const exportSlot = useCallback((slotIndex: number): string => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }
        const slot = slots[slotIndex];
        if (!slot) throw new Error('Slot is empty');
        return JSON.stringify(slot, null, 2);
    }, [slots]);

    const importSlot = useCallback((jsonString: string) => {
        try {
            const imported = JSON.parse(jsonString);
            let slot: SaveSlot;

            if (imported?.data && imported.characterName !== undefined) {
                slot = {
                    characterName: imported.characterName || 'Imported Character',
                    customName: imported.customName,
                    system: imported.system || SYSTEM_NAME,
                    timestamp: Date.now(),
                    data: imported.data,
                };
            } else if (imported?.characterData && imported?.version) {
                const characterName = imported.metadata?.characterName || 'Imported Character';
                slot = {
                    characterName,
                    system: imported.system || SYSTEM_NAME,
                    timestamp: Date.now(),
                    data: imported,
                };
            } else if (imported?.version && imported?.system && imported?.timestamp) {
                const characterName = imported.metadata?.characterName || 'Imported Character';
                slot = {
                    characterName,
                    system: imported.system,
                    timestamp: Date.now(),
                    data: imported,
                };
            } else {
                throw new Error('Invalid save file format');
            }

            const emptySlotIndex = slots.findIndex(s => s === null);
            const targetSlot = emptySlotIndex >= 0 ? emptySlotIndex : 0;

            setSlots(prev => {
                const newSlots = [...prev];
                newSlots[targetSlot] = slot;
                return newSlots;
            });

            return targetSlot;
        } catch (error) {
            throw new Error('Failed to import character: ' + (error as Error).message);
        }
    }, [slots]);

    const exportCurrentCharacter = useCallback(() => {
        const saveData = createSaveData();
        const characterName = saveData.metadata?.characterName || 'Unnamed Character';
        const slot: SaveSlot = {
            characterName,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            data: saveData,
        };
        return JSON.stringify(slot, null, 2);
    }, [createSaveData]);

    return {
        slots,
        saveCharacter,
        loadCharacter,
        deleteSlot,
        exportSlot,
        importSlot,
        exportCurrentCharacter,
    };
};
