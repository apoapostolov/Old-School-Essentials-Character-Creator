import { useState, useCallback, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import type { CharacterSaveData, SaveSlot } from '../types';

const SAVE_VERSION = '1.0.0';
const MAX_SLOTS = 5;
const STORAGE_KEY = 'ose-character-saves';
const SYSTEM_NAME = 'ose';

/**
 * Custom hook for managing character save/load system
 * Provides save slots, import/export, and localStorage persistence
 *
 * This is a system-agnostic implementation that can serialize any character state.
 * The character data is stored as a generic Record<string, any> to accommodate
 * different RPG system data structures.
 */
export const useSaveSystem = () => {
    const [slots, setSlots] = useState<(SaveSlot | null)[]>(Array(MAX_SLOTS).fill(null));
    const character = useCharacterContext();

    // Load slots from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSlots(parsed);
            }
        } catch (error) {
            console.error('Failed to load save slots:', error);
        }
    }, []);

    // Persist slots to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
        } catch (error) {
            console.error('Failed to persist save slots:', error);
        }
    }, [slots, character]);

    /**
     * Create a save data object from current character state
     * This captures ALL character state for perfect restoration
     */
    const createSaveData = useCallback((): CharacterSaveData => {
        // Serialize the entire character object
        // This includes all state from useCharacter hook
        // Future-proof: If new fields are added, they'll automatically be saved
        const charData = character as any; // Type assertion for dynamic access

        // Extract character name from AI data if available
        const characterName = charData.ai?.characterName || charData.ai?.name || 'Unnamed Character';

        return {
            version: SAVE_VERSION,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            characterData: { ...charData }, // Deep copy of all character state
            metadata: {
                characterName,
            }
        };
    }, [character]);

    /**
     * Save current character to a slot
     * Naming priority:
     * 1. AI-generated character name (character.ai.name)
     * 2. Custom name provided during save
     * 3. "Character X" where X is slot number + 1
     */
    const saveCharacter = useCallback((slotIndex: number, customName?: string) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const saveData = createSaveData();
        // Priority: AI-generated name > custom name > placeholder
        const aiGeneratedName = (character as any)?.ai?.characterName || (character as any)?.ai?.name;
        const finalName = aiGeneratedName || customName || `Character ${slotIndex + 1}`;

        const slot: SaveSlot = {
            characterName: finalName,
            customName: customName && customName !== aiGeneratedName ? customName : undefined,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            data: saveData
        };

        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = slot;
            return newSlots;
        });
    }, [createSaveData, character]);

    /**
     * Load character from a slot
     *
     * NOTE: Currently displays save data in console
     * Actual restoration would require exposing setters from useCharacter
     * OR implementing a loadCharacter function in useCharacter hook
     * OR restructuring state management to use React Context setters
     *
     * For now, this serves as data persistence/export functionality
     * Full load/restore can be implemented by:
     * 1. Adding a loadFromSave(data) function to useCharacter
     * 2. OR exposing all setters from useCharacter
     * 3. OR using a state management library like Zustand/Redux
     */
    const loadCharacter = useCallback((slotIndex: number) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const slot = slots[slotIndex];
        if (!slot) {
            throw new Error('Slot is empty');
        }

        if (typeof (character as any).loadFromSave !== 'function') {
            console.warn('loadFromSave not available on character context.');
            alert(`Loading character "${slot.characterName}"...\n\nNote: This build cannot fully restore saves yet.`);
            return;
        }

        (character as any).loadFromSave(slot.data);
    }, [slots]);

    /**
     * Delete a save slot
     */
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

    /**
     * Export a slot as JSON string
     */
    const exportSlot = useCallback((slotIndex: number): string => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const slot = slots[slotIndex];
        if (!slot) {
            throw new Error('Slot is empty');
        }

        return JSON.stringify(slot, null, 2);
    }, [slots]);

    /**
     * Import a character from JSON string
     */
    const importSlot = useCallback((jsonString: string) => {
        try {
            const imported = JSON.parse(jsonString);
            
            // Check if this is a SaveSlot (from exportSlot) or CharacterSaveData (from exportCurrentCharacter)
            let slot: SaveSlot;
            
            if (imported?.data && imported.characterName !== undefined) {
                // This is a SaveSlot from exportSlot
                slot = {
                    characterName: imported.characterName || 'Imported Character',
                    customName: imported.customName,
                    system: imported.system || SYSTEM_NAME,
                    timestamp: Date.now(),
                    data: imported.data
                };
            } else if (imported?.characterData && imported?.version) {
                // Direct CharacterSaveData object
                const characterName = imported.metadata?.characterName || 'Imported Character';
                slot = {
                    characterName,
                    system: imported.system || SYSTEM_NAME,
                    timestamp: Date.now(),
                    data: imported
                };
            } else if (imported?.version && imported?.system && imported?.timestamp) {
                // This is CharacterSaveData from exportCurrentCharacter
                const characterName = imported.metadata?.characterName || 'Imported Character';
                slot = {
                    characterName,
                    system: imported.system,
                    timestamp: Date.now(),
                    data: imported
                };
            } else {
                throw new Error('Invalid save file format');
            }

            // Find first empty slot or use slot 0
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
            data: saveData
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
        exportCurrentCharacter
    };
};
