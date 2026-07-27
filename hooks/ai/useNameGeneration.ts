import { useCallback, useState } from 'react';
import { getNamePrompt } from '../../prompt-data';
import type { ClassInfo, Theme } from '../../types';
import { parseJsonLike } from '../../lib/ai/json';
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
        if (!selectedClass) return;
        setIsGeneratingName(true);
        try {
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const ethnos = karameikos?.ethnos?.origin;
            const prompt = getNamePrompt(selectedGender, selectedClass, theme, aggregatedData.THEMES, ethnos);
            const raw = await generateText({ prompt, json: true, purpose: 'simple' });
            const result = parseJsonLike(raw) as { name?: string };
            if (!result?.name) throw new Error('No name returned');
            setCharacterName(result.name);
        } catch (e) {
            console.error('Name generation failed:', e);
            showToast('Could not generate a name. Please try again.');
        } finally {
            setIsGeneratingName(false);
        }
    }, [selectedClass, showToast, aggregatedData.THEMES, karameikos, generateText]);

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
