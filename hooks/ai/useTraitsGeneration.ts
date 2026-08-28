import { useCallback, useState } from 'react';
import type { ClassInfo, AbilityScores, CharacterTraits, Theme, LifestyleKey } from '../../types';
import { getTraitsPrompt, getLifeStandardPrompt } from '../../prompt-data';
import { LIFESTYLES } from '../../lifestyle-data';
import { calculateFinalLifestyle } from '../../lifestyle-simulation';
import { extractNamedText, extractTraits } from '../../lib/ai/json';
import { lifestyleKeyForSocialStanding } from '../../data/karameikos-data';
import { lifestyleForSkill, resolveSecondarySkillTable } from '../../secondary-skills-data';
import type { AggregatedData } from '../useAggregatedData';
import type { KarameikosState } from '../useKarameikos';
import { useAiRuntime } from '../useAiRuntime';

export const useTraitsGeneration = (
    selectedClass: ClassInfo | null,
    scores: AbilityScores | null,
    showToast: (msg: string) => void,
    aggregatedData: AggregatedData,
    karameikos?: KarameikosState,
) => {
    const [characterTraits, setCharacterTraits] = useState<CharacterTraits | null>(null);
    const [isGeneratingTraits, setIsGeneratingTraits] = useState(false);
    const [isGeneratingLifeStandard, setIsGeneratingLifeStandard] = useState(false);
    const { generateText } = useAiRuntime();

    const onGenerateLifeStandard = useCallback(async (
        gender: 'male' | 'female' | null,
        theme: Theme,
        secondarySkills: string[] | null
    ) => {
        if (!selectedClass || !scores || !secondarySkills) {
            showToast('Cannot generate life standard without class, scores, and profession.');
            return;
        }
        setIsGeneratingLifeStandard(true);
        setCharacterTraits(null);

        try {
            let baseLifestyleKey: LifestyleKey = 'Modest';
            if (secondarySkills.length > 0) {
                const skillList = resolveSecondarySkillTable(
                    aggregatedData.SECONDARY_SKILLS,
                    theme,
                    selectedClass.name,
                );
                baseLifestyleKey = lifestyleForSkill(skillList, secondarySkills[0]);
            }

            const standing = karameikos?.socialStanding?.standing;
            const locked = standing ? lifestyleKeyForSocialStanding(standing) : null;
            const { finalLifestyleKey, failureEvent } = locked
                ? { finalLifestyleKey: locked, failureEvent: null }
                : calculateFinalLifestyle(baseLifestyleKey, scores);
            const lifestyleDetails = LIFESTYLES[finalLifestyleKey];
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const prompt = getLifeStandardPrompt(
                selectedClass, scores, selectedGender, theme, secondarySkills, lifestyleDetails, failureEvent,
                {
                    ethnos: karameikos?.ethnos?.origin,
                    socialStanding: karameikos?.socialStanding?.standing,
                    promptOverrides: aggregatedData.PROMPT_OVERRIDES,
                    classGroup: selectedClass.group,
                },
            );
            const raw = await generateText({ prompt, json: true, purpose: 'simple' });
            const lifeStandard = extractNamedText(raw, ['lifeStandard', 'life_standard']);
            if (!lifeStandard) throw new Error('The simple writing slot returned no usable life standard.');

            setCharacterTraits({
                lifeStandard,
                lifestyleKey: finalLifestyleKey,
                positivePhysical: '',
                positiveMental: '',
                negative: '',
            });
        } catch (e) {
            console.error('Life Standard generation failed:', e);
            showToast('Could not generate Life Standard. Please try again.');
        } finally {
            setIsGeneratingLifeStandard(false);
        }
    }, [selectedClass, scores, showToast, aggregatedData.SECONDARY_SKILLS, aggregatedData.PROMPT_OVERRIDES, generateText, karameikos]);

    const onGenerateTraits = useCallback(async (
        gender: 'male' | 'female' | null,
        theme: Theme
    ) => {
        if (!selectedClass || !scores || !characterTraits?.lifeStandard) {
            showToast('Roll profession first (step 4). Traits need Life Before Adventuring.');
            return;
        }
        setIsGeneratingTraits(true);
        try {
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const prompt = getTraitsPrompt(
                selectedClass, selectedGender, theme, characterTraits.lifeStandard, aggregatedData.THEMES,
                {
                    ethnos: karameikos?.ethnos?.origin,
                    socialStanding: karameikos?.socialStanding?.standing,
                    promptOverrides: aggregatedData.PROMPT_OVERRIDES,
                    classGroup: selectedClass.group,
                },
            );
            const raw = await generateText({ prompt, json: true, purpose: 'simple' });
            const result = extractTraits(raw);
            if (!result.positivePhysical && !result.positiveMental && !result.negative) {
                const snippet = typeof raw === 'string' ? raw.replace(/\s+/g, ' ').slice(0, 160) : '';
                throw new Error(snippet
                    ? `No trait fields in the reply (${snippet})`
                    : 'The simple writing slot returned no usable traits.');
            }
            setCharacterTraits(prev => ({
                ...(prev!),
                positivePhysical: result.positivePhysical,
                positiveMental: result.positiveMental,
                negative: result.negative,
            }));
        } catch (e) {
            console.error('Trait generation failed:', e);
            const detail = e instanceof Error && e.message ? e.message : 'Please try again.';
            showToast(`Could not generate traits. ${detail}`);
        } finally {
            setIsGeneratingTraits(false);
        }
    }, [selectedClass, scores, characterTraits, showToast, aggregatedData.THEMES, aggregatedData.PROMPT_OVERRIDES, generateText, karameikos]);

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
