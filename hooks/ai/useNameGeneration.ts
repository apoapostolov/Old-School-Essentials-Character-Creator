import { useCallback, useState } from 'react';
import { getNamePrompt } from '../../prompt-data';
import type { ClassInfo, Theme } from '../../types';
import { extractNamedText } from '../../lib/ai/json';
import type { AggregatedData } from '../useAggregatedData';
import type { KarameikosState } from '../useKarameikos';
import { useAiRuntime } from '../useAiRuntime';

export const useNameGeneration = (
    selectedClass: ClassInfo | null,
    showToast: (msg: string) => void,
    aggregatedData: AggregatedData,
    karameikos: KarameikosState | undefined
) => {
    const [characterName, setCharacterName] = useState('');
    const [isGeneratingName, setIsGeneratingName] = useState(false);
    const { generateText } = useAiRuntime();

    const onGenerateName = useCallback(async (gender: 'male' | 'female' | null, theme: Theme) => {
        if (!selectedClass) {
            showToast('Select a class before generating a name.');
            return;
        }
        setIsGeneratingName(true);
        try {
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const prompt = getNamePrompt(selectedGender, selectedClass, theme, aggregatedData.THEMES, {
                ethnos: karameikos?.ethnos?.origin,
                socialStanding: karameikos?.socialStanding?.standing,
                promptOverrides: aggregatedData.PROMPT_OVERRIDES,
                classGroup: selectedClass.group,
            });
            const raw = await generateText({ prompt, json: true, purpose: 'simple' });
            const name = extractNamedText(raw, ['name']);
            if (!name) throw new Error('The simple writing slot returned no usable name.');
            setCharacterName(name);
        } catch (e) {
            console.error('Name generation failed:', e);
            const detail = e instanceof Error && e.message ? e.message : 'Please try again.';
            showToast(`Could not generate a name. ${detail}`);
        } finally {
            setIsGeneratingName(false);
        }
    }, [selectedClass, showToast, aggregatedData.THEMES, aggregatedData.PROMPT_OVERRIDES, karameikos, generateText]);

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
