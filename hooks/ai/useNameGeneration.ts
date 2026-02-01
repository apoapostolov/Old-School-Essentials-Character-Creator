import { GoogleGenAI, Type } from '@google/genai';
import { useCallback, useState } from 'react';
import { getNamePrompt } from '../../prompt-data';
import type { ClassInfo, Theme } from '../../types';
import type { AggregatedData } from '../useAggregatedData';
import type { KarameikosState } from '../useKarameikos';
import { getGeminiApiKey, getGeminiTextModel } from '../../utils/gemini';

export const useNameGeneration = (
    selectedClass: ClassInfo | null,
    showToast: (msg: string) => void,
    aggregatedData: AggregatedData,
    karameikos: KarameikosState | undefined
) => {
    const [characterName, setCharacterName] = useState('');
    const [isGeneratingName, setIsGeneratingName] = useState(false);

    const onGenerateName = useCallback(async (gender: 'male' | 'female' | null, theme: Theme) => {
        if (!selectedClass) return;
        setIsGeneratingName(true);
        try {
            const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const ethnos = karameikos?.ethnos?.origin;
            const prompt = getNamePrompt(selectedGender, selectedClass, theme, aggregatedData.THEMES, ethnos);

            const response = await ai.models.generateContent({
                model: getGeminiTextModel(),
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: { type: Type.OBJECT, properties: { name: { type: Type.STRING } } },
                },
            });
            const result = JSON.parse(response.text.trim());
            setCharacterName(result.name);
        } catch (e) {
            console.error("Name generation failed:", e);
            showToast("Could not generate a name. Please try again.");
        } finally {
            setIsGeneratingName(false);
        }
    }, [selectedClass, showToast, aggregatedData.THEMES, karameikos]);

    const reset = useCallback(() => {
        setCharacterName('');
    }, []);

    const restore = useCallback((name?: string | null) => {
        setCharacterName(name ?? '');
        setIsGeneratingName(false);
    }, []);

    return {
        characterName,
        isGeneratingName,
        onGenerateName,
        reset,
        restore,
    };
};
