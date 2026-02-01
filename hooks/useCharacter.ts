import { GoogleGenAI, Type } from '@google/genai';
import { useCallback, useMemo, useState } from 'react';
import type { AbilityScores, ClassInfo, Race, CharacterSaveData } from '../types';
import { Ability } from '../types';
import type { AggregatedData } from './useAggregatedData';
import { getGeminiApiKey } from '../utils/gemini';

import { useAIGeneration } from './useAIGeneration';
import { useCharacterProgression } from './useCharacterProgression';
import { useCharacterRoll } from './useCharacterRoll';
import { useEquipment } from './useEquipment';
import { useGrog } from './useGrog';
import { useKarameikos } from './useKarameikos';

/**
 * A master hook that composes all character-related state management hooks.
 * This centralizes character data and actions, simplifying the main App component.
 */
export const useCharacter = (showToast: (msg: string) => void, aggregatedData: AggregatedData) => {
    const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
    const [selectedRace, setSelectedRace] = useState<Race | null>(null);

    // Function to generate village/homestead names using AI
    const generateVillageName = useCallback(async (socialStanding: string, ethnos: string): Promise<string> => {
        try {
            const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });
            const prompt = `Generate a single authentic Slavic fantasy village or homestead name for the Grand Duchy of Karameikos setting (based on Mystara D&D). The character is from a family with ${socialStanding} social standing and ${ethnos} ethnicity. The name should sound like it belongs in Eastern European folklore with Slavic linguistic patterns. Reference the style from Grand Duchy of Karameikos Gazetteer (GAZ1). Return ONLY the village name, nothing else.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            villageName: { type: Type.STRING }
                        }
                    },
                },
            });
            const result = JSON.parse(response.text.trim());
            return result.villageName;
        } catch (error) {
            console.error("Village name generation failed:", error);
            throw error;
        }
    }, []);

    // Compose the individual hooks
    const characterRoll = useCharacterRoll();
    const karameikos = useKarameikos(generateVillageName);
    const progression = useCharacterProgression(selectedClass, selectedRace, characterRoll.scores, karameikos.socialStanding?.goldModifier ?? 0);
    const equipment = useEquipment(progression.moneyResult?.total ?? 0, showToast, aggregatedData);
    const ai = useAIGeneration(selectedClass, selectedRace, characterRoll.scores, progression.characterLevel, showToast, equipment.allItemKeys, aggregatedData, karameikos);
    const grog = useGrog(showToast);

    const modifiedScores = useMemo<AbilityScores | null>(() => {
        if (!characterRoll.scores) return null;
        if (!selectedRace) return characterRoll.scores;

        const newScores = { ...characterRoll.scores };
        for (const [key, mod] of Object.entries(selectedRace.ability_modifiers)) {
            const abilityMap: Record<string, Ability> = {
                str: Ability.Strength, dex: Ability.Dexterity, con: Ability.Constitution,
                int: Ability.Intelligence, wis: Ability.Wisdom, cha: Ability.Charisma,
            };
            const ability = abilityMap[key];
            if (ability && mod) {
                newScores[ability] = Math.max(1, Math.min(20, newScores[ability] + mod));
            }
        }
        return newScores;
    }, [characterRoll.scores, selectedRace]);

    /**
     * Resets all state hooks that depend on the selected class or roll.
     */
    const resetDependencies = useCallback(() => {
        progression.reset();
        equipment.reset();
        ai.reset();
        grog.reset();
        karameikos.reset();
        setSelectedRace(null);
    }, [progression, equipment, ai, grog, karameikos]);

    const selectRace = useCallback((race: Race) => {
        setSelectedClass(null); // Always deselect class when race changes
        setSelectedRace(prev => (prev?.name === race.name ? null : race));
    }, []);

    const selectClass = useCallback((classInfo: ClassInfo) => {
        if (selectedClass?.name === classInfo.name) {
            setSelectedClass(null);
            progression.reset();
            equipment.reset();
        } else {
            progression.reset();
            equipment.reset();
            setSelectedClass(classInfo);
        }
    }, [selectedClass, progression, equipment]);

    const resetRollAndCharacter = useCallback(() => {
        characterRoll.handleRollStats();
        setSelectedClass(null);
        resetDependencies();
    }, [characterRoll, resetDependencies]);

    const restoreRollAndCharacter = useCallback((roll: AbilityScores) => {
        characterRoll.handleRestoreRoll(roll);
        setSelectedClass(null);
        resetDependencies();
    }, [characterRoll, resetDependencies]);

    const loadFromSave = useCallback((saveData: CharacterSaveData) => {
        if (!saveData || typeof saveData !== 'object') {
            throw new Error('Invalid save data');
        }

        const data = (saveData as CharacterSaveData).characterData as Record<string, any> | undefined;
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid save data payload');
        }

        setSelectedClass(data.selectedClass ?? null);
        setSelectedRace(data.selectedRace ?? null);

        if (data.characterRoll) {
            characterRoll.restoreState(data.characterRoll);
        } else {
            characterRoll.reset();
        }

        if (data.progression) {
            progression.restoreState(data.progression);
        } else {
            progression.reset();
        }

        if (data.equipment) {
            equipment.restoreState(data.equipment);
        } else {
            equipment.reset();
        }

        if (data.ai) {
            ai.restoreState(data.ai);
        } else {
            ai.reset();
        }

        if (data.grog) {
            grog.restoreState(data.grog);
        } else {
            grog.reset();
        }

        if (data.karameikos) {
            karameikos.restoreState(data.karameikos);
        } else {
            karameikos.reset();
        }
    }, [characterRoll, progression, equipment, ai, grog, karameikos]);

    return {
        selectedClass, selectClass,
        selectedRace, selectRace,
        modifiedScores,
        characterRoll,
        progression,
        equipment,
        ai,
        grog,
        karameikos,
        resetRollAndCharacter,
        restoreRollAndCharacter,
        loadFromSave,
        aggregatedData,
    };
};
