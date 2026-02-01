import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { ClassInfo, AbilityScores, CharacterTraits, Theme, LifestyleKey } from '../../types';
import { getTraitsPrompt, getLifeStandardPrompt } from '../../prompt-data';
import { LIFESTYLES } from '../../lifestyle-data';
import { calculateFinalLifestyle } from '../../lifestyle-simulation';
import type { AggregatedData } from '../useAggregatedData';
import { getGeminiApiKey, getGeminiTextModel } from '../../utils/gemini';

export const useTraitsGeneration = (
    selectedClass: ClassInfo | null,
    scores: AbilityScores | null,
    showToast: (msg: string) => void,
    aggregatedData: AggregatedData
) => {
    const [characterTraits, setCharacterTraits] = useState<CharacterTraits | null>(null);
    const [isGeneratingTraits, setIsGeneratingTraits] = useState(false);
    const [isGeneratingLifeStandard, setIsGeneratingLifeStandard] = useState(false);

    const onGenerateLifeStandard = useCallback(async (
        gender: 'male' | 'female' | null, 
        theme: Theme, 
        secondarySkills: string[] | null
    ) => {
        if (!selectedClass || !scores || !secondarySkills) {
            showToast("Cannot generate life standard without class, scores, and profession.");
            return;
        }
        setIsGeneratingLifeStandard(true);
        setCharacterTraits(null); // Full reset

        try {
            // Determine Baseline Lifestyle from profession
            let baseLifestyleKey: LifestyleKey = 'Modest';
            if (secondarySkills.length > 0) {
                const skillList = aggregatedData.SECONDARY_SKILLS[theme] || aggregatedData.SECONDARY_SKILLS['ose'];
                const skillName = secondarySkills[0];
                const skillData = skillList.find(s => s.skill === skillName);
                if (skillData) baseLifestyleKey = skillData.lifestyle;
            }

            // Use the new centralized simulation function to get the result
            const { finalLifestyleKey, failureEvent } = calculateFinalLifestyle(baseLifestyleKey, scores);
            
            const lifestyleDetails = LIFESTYLES[finalLifestyleKey];

            // AI Call to generate the narrative sentence
            const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const prompt = getLifeStandardPrompt(selectedClass, scores, selectedGender, theme, secondarySkills, lifestyleDetails, failureEvent);
    
            const response = await ai.models.generateContent({
                model: getGeminiTextModel(),
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: { lifeStandard: { type: Type.STRING } },
                        required: ["lifeStandard"],
                    },
                },
            });
            const result = JSON.parse(response.text.trim());
            
            setCharacterTraits({
                lifeStandard: result.lifeStandard,
                lifestyleKey: finalLifestyleKey,
                positivePhysical: '',
                positiveMental: '',
                negative: '',
            });

        } catch (e) {
            console.error("Life Standard generation failed:", e);
            showToast("Could not generate Life Standard. Please try again.");
        } finally {
            setIsGeneratingLifeStandard(false);
        }
    }, [selectedClass, scores, showToast, aggregatedData.SECONDARY_SKILLS]);
    
    const onGenerateTraits = useCallback(async (
        gender: 'male' | 'female' | null, 
        theme: Theme
    ) => {
        if (!selectedClass || !scores || !characterTraits?.lifeStandard) {
             showToast("Please determine a profession first to generate a life standard.");
             return;
        }
        setIsGeneratingTraits(true);
        try {
            const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const prompt = getTraitsPrompt(selectedClass, selectedGender, theme, characterTraits.lifeStandard, aggregatedData.THEMES);
    
            const response = await ai.models.generateContent({
                model: getGeminiTextModel(),
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            positivePhysical: { type: Type.STRING },
                            positiveMental: { type: Type.STRING },
                            negative: { type: Type.STRING },
                        },
                        required: ["positivePhysical", "positiveMental", "negative"],
                    },
                },
            });
            const result = JSON.parse(response.text.trim());
            
            setCharacterTraits(prev => ({
                ...(prev!),
                positivePhysical: result.positivePhysical,
                positiveMental: result.positiveMental,
                negative: result.negative,
            }));
        } catch (e) {
            console.error("Trait generation failed:", e);
            showToast("Could not generate traits. Please try again.");
        } finally {
            setIsGeneratingTraits(false);
        }
    }, [selectedClass, scores, characterTraits, showToast, aggregatedData.THEMES]);

    const reset = useCallback(() => {
        setCharacterTraits(null);
        setIsGeneratingLifeStandard(false);
        setIsGeneratingTraits(false);
    }, []);

    const restore = useCallback((traits?: CharacterTraits | null) => {
        setCharacterTraits(traits ?? null);
        setIsGeneratingLifeStandard(false);
        setIsGeneratingTraits(false);
    }, []);

    return {
        characterTraits,
        isGeneratingTraits,
        onGenerateTraits,
        isGeneratingLifeStandard,
        onGenerateLifeStandard,
        resetTraits: reset,
        restore,
    };
};
