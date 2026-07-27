import { useCallback, useState } from 'react';
import { getDescriptionPrompt, getEmotionalPortraitPrompt, getHeadshotPrompt, getPortraitPrompt } from '../../prompt-data';
import type { AbilityScores, CharacterTraits, ClassInfo, Emotion, Item, Race, Theme } from '../../types';
import { cropImage } from '../../utils/image';
import { parseJsonLike } from '../../lib/ai/json';
import type { AggregatedData } from '../useAggregatedData';
import { useAiRuntime } from '../useAiRuntime';

export const usePortraitGeneration = (
    selectedClass: ClassInfo | null,
    scores: AbilityScores | null,
    level: number,
    showToast: (msg: string) => void,
    aggregatedData: AggregatedData
) => {
    const [portrait, setPortrait] = useState<string | null>(null);
    const [headshot, setHeadshot] = useState<string | null>(null);
    const [portraitView, setPortraitView] = useState<'full' | 'headshot'>('full');
    const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
    const [isCroppingHeadshot, setIsCroppingHeadshot] = useState(false);
    const [portraitError, setPortraitError] = useState<string | null>(null);
    const [emotionalPortraits, setEmotionalPortraits] = useState<Record<string, string | null>>({});
    const [generatingEmotion, setGeneratingEmotion] = useState<string | null>(null);
    const [pdfPortraitSrc, setPdfPortraitSrc] = useState<string | null>(null);
    const [characterDescription, setCharacterDescription] = useState<{ line1: string; line2: string } | null>(null);
    const { generateText, generateImage } = useAiRuntime();

    const onSelectPdfPortrait = useCallback((src: string) => {
        setPdfPortraitSrc(src);
    }, []);

    const generateDescription = useCallback(async (portraitBase64: string, traits: CharacterTraits | null) => {
        if (!selectedClass) return;
        try {
            const textPrompt = getDescriptionPrompt(traits);
            const raw = await generateText({
                prompt: textPrompt,
                imageDataUrl: portraitBase64,
                json: true,
            });
            const result = parseJsonLike(raw) as { line1?: string; line2?: string };
            setCharacterDescription({
                line1: result.line1 || '',
                line2: result.line2 || '',
            });
        } catch (e) {
            console.error('Description generation failed:', e);
            showToast('Could not generate character description from portrait.');
            setCharacterDescription(null);
        }
    }, [selectedClass, showToast, generateText]);

    const onGeneratePortrait = useCallback(async (
        gender: 'male' | 'female' | null,
        theme: Theme,
        traits: CharacterTraits | null,
        secondarySkills: string[] | null,
        equipmentItems: Item[],
        lifeStandard: string | null,
        race: Race | null
    ) => {
        if (!selectedClass || !scores) {
            setPortraitError('A character class must be selected, and scores must be rolled first.');
            return;
        }

        setIsGeneratingPortrait(true);
        setPortrait(null);
        setHeadshot(null);
        setPdfPortraitSrc(null);
        setPortraitError(null);
        setEmotionalPortraits({});
        setCharacterDescription(null);
        setPortraitView('full');

        try {
            const lifestyleDetails = traits?.lifestyleKey ? aggregatedData.LIFESTYLES[traits.lifestyleKey] : null;
            const prompt = getPortraitPrompt(
                selectedClass, scores, gender, theme, traits, level, secondarySkills,
                equipmentItems, lifeStandard, lifestyleDetails, aggregatedData.THEMES, race,
            );
            const newPortrait = await generateImage({ prompt, aspectRatio: '1:1' });
            setPortrait(newPortrait);
            setPdfPortraitSrc(newPortrait);
            await generateDescription(newPortrait, traits);
        } catch (error) {
            console.error('Failed to generate portrait:', error);
            setPortraitError(error instanceof Error ? error.message : 'An unexpected error occurred while generating the portrait.');
            setCharacterDescription(null);
        } finally {
            setIsGeneratingPortrait(false);
        }
    }, [selectedClass, scores, level, generateDescription, aggregatedData.THEMES, aggregatedData.LIFESTYLES, generateImage]);

    const onCropHeadshot = useCallback(async () => {
        if (!portrait) {
            showToast('Please generate a main portrait first.');
            return;
        }
        setIsCroppingHeadshot(true);
        setPortraitError(null);
        try {
            const prompt = getHeadshotPrompt();
            const raw = await generateText({
                prompt,
                imageDataUrl: portrait,
                json: true,
            });
            const box = parseJsonLike(raw) as { x?: number; y?: number; width?: number; height?: number };
            if (typeof box.x !== 'number' || typeof box.y !== 'number' || typeof box.width !== 'number' || typeof box.height !== 'number') {
                throw new Error('Invalid coordinates received from AI.');
            }
            if (Math.abs(box.width - box.height) > 0.01) {
                throw new Error('AI failed to return a 1:1 aspect ratio bounding box.');
            }

            const croppedImageBase64 = await cropImage(portrait, box as { x: number; y: number; width: number; height: number });
            setHeadshot(croppedImageBase64);
            setPdfPortraitSrc(croppedImageBase64);
            setEmotionalPortraits({});
            setPortraitView('headshot');
        } catch (e) {
            console.error('Failed to crop headshot:', e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            showToast(`Could not crop the headshot: ${errorMessage}`);
            setPortraitError(`Cropping failed: ${errorMessage}`);
        } finally {
            setIsCroppingHeadshot(false);
        }
    }, [portrait, showToast, generateText]);

    const onGenerateEmotionalPortrait = useCallback(async (emotion: Emotion) => {
        const baseImage = headshot || portrait;
        if (!baseImage) {
            showToast('Please generate a main portrait first.');
            return;
        }
        setGeneratingEmotion(emotion.name);
        try {
            const prompt = getEmotionalPortraitPrompt(emotion);
            const newEmotionalPortraitSrc = await generateImage({
                prompt,
                referenceImageDataUrl: baseImage,
                aspectRatio: '1:1',
            });
            setEmotionalPortraits(prev => ({ ...prev, [emotion.name]: newEmotionalPortraitSrc }));
            onSelectPdfPortrait(newEmotionalPortraitSrc);
        } catch (e) {
            console.error(`Failed to generate ${emotion.name} portrait:`, e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            showToast(`Could not generate the '${emotion.name}' portrait: ${errorMessage}`);
        } finally {
            setGeneratingEmotion(null);
        }
    }, [portrait, headshot, showToast, onSelectPdfPortrait, generateImage]);

    const reset = useCallback(() => {
        setPortrait(null);
        setHeadshot(null);
        setPdfPortraitSrc(null);
        setPortraitError(null);
        setEmotionalPortraits({});
        setGeneratingEmotion(null);
        setCharacterDescription(null);
        setPortraitView('full');
    }, []);

    const restore = useCallback((state: {
        portrait?: string | null;
        headshot?: string | null;
        portraitView?: 'full' | 'headshot';
        portraitError?: string | null;
        emotionalPortraits?: Record<string, string | null>;
        generatingEmotion?: string | null;
        pdfPortraitSrc?: string | null;
        characterDescription?: { line1: string; line2: string } | null;
    }) => {
        setPortrait(state.portrait ?? null);
        setHeadshot(state.headshot ?? null);
        setPortraitView(state.portraitView ?? 'full');
        setPortraitError(state.portraitError ?? null);
        setEmotionalPortraits(state.emotionalPortraits ?? {});
        setGeneratingEmotion(state.generatingEmotion ?? null);
        setPdfPortraitSrc(state.pdfPortraitSrc ?? null);
        setCharacterDescription(state.characterDescription ?? null);
        setIsGeneratingPortrait(false);
        setIsCroppingHeadshot(false);
    }, []);

    return {
        portrait,
        headshot,
        portraitView,
        setPortraitView,
        isGeneratingPortrait,
        isCroppingHeadshot,
        portraitError,
        emotionalPortraits,
        generatingEmotion,
        pdfPortraitSrc,
        characterDescription,
        onGeneratePortrait,
        onCropHeadshot,
        onGenerateEmotionalPortrait,
        onSelectPdfPortrait,
        reset,
        restore,
    };
};
