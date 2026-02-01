import { useCallback, useMemo, useState } from 'react';
import type { AbilityScores, ClassInfo, Item, Race, Theme } from '../../types';
import type { AggregatedData } from '../useAggregatedData';
import type { KarameikosState } from '../useKarameikos';

import { useBackstoryGeneration } from './ai/useBackstoryGeneration';
import { useLanguageManagement } from './ai/useLanguageManagement';
import { useNameGeneration } from './ai/useNameGeneration';
import { usePortraitGeneration } from './ai/usePortraitGeneration';
import { useSecondarySkills } from './ai/useSecondarySkills';
import { useTraitsGeneration } from './ai/useTraitsGeneration';

export const useAIGeneration = (
    selectedClass: ClassInfo | null,
    selectedRace: Race | null,
    scores: AbilityScores | null,
    level: number,
    showToast: (msg: string) => void,
    allItemKeys: string[],
    aggregatedData: AggregatedData,
    karameikos?: KarameikosState
) => {
    // Shared state managed by the main hook
    const [theme, setTheme] = useState<Theme>('ose');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const equipmentItems = useMemo(() => allItemKeys.map(key => aggregatedData.ITEMS[key]).filter((item): item is Item => !!item), [allItemKeys, aggregatedData.ITEMS]);

    // Composing smaller, focused hooks
    const nameGen = useNameGeneration(selectedClass, showToast, aggregatedData, karameikos);
    const secondarySkills = useSecondarySkills(theme, aggregatedData);
    const traitsGen = useTraitsGeneration(selectedClass, scores, showToast, aggregatedData);
    const portraitGen = usePortraitGeneration(selectedClass, scores, level, showToast, aggregatedData);
    const language = useLanguageManagement(selectedClass, scores, theme, showToast, aggregatedData);
    const backstory = useBackstoryGeneration(selectedClass, scores, showToast, aggregatedData);

    // Handlers that orchestrate calls between hooks
    const handleGenerateName = useCallback(() => {
        nameGen.onGenerateName(gender, theme);
    }, [nameGen, gender, theme]);

    const handleRollSecondarySkill = useCallback(() => {
        const newSkills = secondarySkills.onRollSecondarySkill();
        traitsGen.onGenerateLifeStandard(gender, theme, newSkills);
    }, [secondarySkills, traitsGen, gender, theme]);

    const handleGenerateTraits = useCallback(() => {
        traitsGen.onGenerateTraits(gender, theme);
    }, [traitsGen, gender, theme]);

    const handleGeneratePortrait = useCallback(() => {
        portraitGen.onGeneratePortrait(gender, theme, traitsGen.characterTraits, secondarySkills.secondarySkills, equipmentItems, traitsGen.characterTraits?.lifeStandard ?? null, selectedRace);
        // Reset backstory when portrait changes
        backstory.reset();
    }, [portraitGen, gender, theme, traitsGen.characterTraits, secondarySkills.secondarySkills, equipmentItems, backstory, selectedRace]);

    const handleCropHeadshot = useCallback(() => {
        portraitGen.onCropHeadshot();
        // Reset backstory when portrait changes
        backstory.reset();
    }, [portraitGen, backstory]);

    const handleGenerateBackstory = useCallback(() => {
        if (nameGen.characterName && traitsGen.characterTraits) {
            const lifestyleDetails = traitsGen.characterTraits.lifestyleKey ? aggregatedData.LIFESTYLES[traitsGen.characterTraits.lifestyleKey] : null;
            backstory.onGenerateBackstory(
                nameGen.characterName,
                traitsGen.characterTraits,
                gender,
                theme,
                secondarySkills.secondarySkills,
                level,
                equipmentItems,
                lifestyleDetails,
                selectedRace
            );
        }
    }, [backstory, nameGen.characterName, traitsGen.characterTraits, gender, theme, secondarySkills.secondarySkills, level, equipmentItems, aggregatedData.LIFESTYLES, selectedRace]);

    const reset = useCallback(() => {
        setTheme('ose');
        setGender('male');
        nameGen.reset();
        traitsGen.resetTraits();
        portraitGen.reset();
        language.reset();
        secondarySkills.reset();
        backstory.reset();
    }, [nameGen, traitsGen, portraitGen, language, secondarySkills, backstory]);

    const restoreState = useCallback((state: any) => {
        setTheme(state?.theme ?? 'ose');
        setGender(state?.gender ?? 'male');

        nameGen.restore(state?.characterName);
        traitsGen.restore(state?.characterTraits ?? null);
        secondarySkills.restore(state?.secondarySkills ?? null);
        portraitGen.restore({
            portrait: state?.portrait ?? null,
            headshot: state?.headshot ?? null,
            portraitView: state?.portraitView ?? 'full',
            portraitError: state?.portraitError ?? null,
            emotionalPortraits: state?.emotionalPortraits ?? {},
            generatingEmotion: state?.generatingEmotion ?? null,
            pdfPortraitSrc: state?.pdfPortraitSrc ?? null,
            characterDescription: state?.characterDescription ?? null,
        });
        language.restore({
            commonLanguage: state?.commonLanguage ?? null,
            selectedBonusLanguages: state?.selectedBonusLanguages ?? null,
        });
        backstory.restore({
            backstory: state?.backstory ?? null,
            isGeneratingBackstory: state?.isGeneratingBackstory ?? false,
        });
    }, [nameGen, traitsGen, portraitGen, language, secondarySkills, backstory]);

    return {
        // Shared state
        theme, setTheme,
        gender, setGender,

        // From useNameGeneration
        characterName: nameGen.characterName,
        isGeneratingName: nameGen.isGeneratingName,
        onGenerateName: handleGenerateName,

        // From useTraitsGeneration
        characterTraits: traitsGen.characterTraits,
        isGeneratingTraits: traitsGen.isGeneratingTraits,
        isGeneratingLifeStandard: traitsGen.isGeneratingLifeStandard,
        onGenerateTraits: handleGenerateTraits,

        // From useSecondarySkills
        secondarySkills: secondarySkills.secondarySkills,
        onRollSecondarySkill: handleRollSecondarySkill,

        // From usePortraitGeneration
        portrait: portraitGen.portrait,
        headshot: portraitGen.headshot,
        portraitView: portraitGen.portraitView,
        setPortraitView: portraitGen.setPortraitView,
        portraitError: portraitGen.portraitError,
        isGeneratingPortrait: portraitGen.isGeneratingPortrait,
        isCroppingHeadshot: portraitGen.isCroppingHeadshot,
        emotionalPortraits: portraitGen.emotionalPortraits,
        generatingEmotion: portraitGen.generatingEmotion,
        pdfPortraitSrc: portraitGen.pdfPortraitSrc,
        characterDescription: portraitGen.characterDescription,
        onGeneratePortrait: handleGeneratePortrait,
        onCropHeadshot: handleCropHeadshot,
        onGenerateEmotionalPortrait: portraitGen.onGenerateEmotionalPortrait,
        onSelectPdfPortrait: portraitGen.onSelectPdfPortrait,

        // From useLanguageManagement
        selectedBonusLanguages: language.selectedBonusLanguages,
        onSelectedBonusLanguagesChange: language.setSelectedBonusLanguages,
        commonLanguage: language.commonLanguage,
        onCommonLanguageChange: language.onCommonLanguageChange,
        onRandomLanguage: language.onRandomLanguage,
        racialLanguage: language.racialLanguage,

        // From useBackstoryGeneration
        backstory: backstory.backstory,
        isGeneratingBackstory: backstory.isGeneratingBackstory,
        onGenerateBackstory: handleGenerateBackstory,

        // Master Reset
        reset,
        restoreState,
    };
};
