import { useCallback, useState } from 'react';
import type { ClassInfo, AbilityScores, CharacterTraits, Theme, Item, Lifestyle, Race } from '../../types';
import { getBackstoryPrompt } from '../../prompt-data';
import type { AggregatedData } from '../useAggregatedData';
import type { KarameikosState } from '../useKarameikos';
import { useAiRuntime } from '../useAiRuntime';

export const useBackstoryGeneration = (
    selectedClass: ClassInfo | null,
    scores: AbilityScores | null,
    showToast: (msg: string) => void,
    aggregatedData: AggregatedData,
    karameikos?: KarameikosState,
) => {
    const [backstory, setBackstory] = useState<string | null>(null);
    const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
    const { generateText } = useAiRuntime();

    const onGenerateBackstory = useCallback(async (
        characterName: string,
        characterTraits: CharacterTraits,
        gender: 'male' | 'female' | null,
        theme: Theme,
        secondarySkills: string[] | null,
        level: number,
        equipmentItems: Item[],
        lifestyleDetails: Lifestyle | null,
        race: Race | null
    ) => {
        if (!selectedClass || !scores) {
            showToast('Class and scores must be set to generate a backstory.');
            return;
        }
        setIsGeneratingBackstory(true);
        setBackstory(null);
        try {
            const prompt = getBackstoryPrompt(
                characterName,
                selectedClass,
                scores,
                gender,
                theme,
                characterTraits,
                level,
                secondarySkills,
                equipmentItems,
                characterTraits.lifeStandard ?? null,
                lifestyleDetails,
                aggregatedData.THEMES,
                race,
                {
                    ethnos: karameikos?.ethnos?.origin,
                    socialStanding: karameikos?.socialStanding?.standing,
                    promptOverrides: aggregatedData.PROMPT_OVERRIDES,
                    raceName: race?.name,
                    classGroup: selectedClass.group,
                },
            );
            const text = await generateText({ prompt, purpose: 'creative' });
            setBackstory(text.trim());
        } catch (e) {
            console.error('Backstory generation failed:', e);
            showToast('Could not generate backstory. Please try again.');
        } finally {
            setIsGeneratingBackstory(false);
        }
    }, [selectedClass, scores, showToast, aggregatedData.THEMES, aggregatedData.PROMPT_OVERRIDES, generateText, karameikos]);

    const reset = useCallback(() => {
        setBackstory(null);
        setIsGeneratingBackstory(false);
    }, []);

    const restore = useCallback((state: { backstory?: string | null; isGeneratingBackstory?: boolean }) => {
        setBackstory(state.backstory ?? null);
        setIsGeneratingBackstory(Boolean(state.isGeneratingBackstory));
    }, []);

    return {
        backstory,
        isGeneratingBackstory,
        onGenerateBackstory,
        reset,
        restore,
    };
};
