import { GoogleGenAI, Modality, Type } from '@google/genai';
import { useCallback, useState } from 'react';
import { ABILITIES } from '../constants';
import { ITEMS } from '../item-data';
import { getGrogDetailsPrompt, getGrogPortraitPrompt } from '../prompt-data';
import { Ability, type AbilityScores, type Grog, type Theme } from '../types';
import { getModifier } from '../utils/character';
import { rollDie } from '../utils/hp';
import { describeGeminiImageFailure, getGeminiApiKey } from '../utils/gemini';

const rollStat = (): number => {
    return Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1).reduce((a, b) => a + b, 0);
};

// Helper function for weighted random selection based on inverse cost
const getWeightedRandomItemKey = (itemKeys: string[]): string | null => {
    if (itemKeys.length === 0) return null;
    const itemsWithCost = itemKeys.map(key => ({ key, cost: ITEMS[key]?.cost ?? 1 })).filter(item => item.cost >= 0);

    // Create weights (inverse cost, with a floor for free items to give them some weight)
    const weightedItems = itemsWithCost.map(item => ({
        key: item.key,
        weight: 1 / (item.cost + 1) // Add 1 to avoid division by zero and give cheaper items higher weight
    }));

    const totalWeight = weightedItems.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight === 0) return itemKeys[Math.floor(Math.random() * itemKeys.length)];

    let random = Math.random() * totalWeight;

    for (const item of weightedItems) {
        if (random < item.weight) {
            return item.key;
        }
        random -= item.weight;
    }

    // Fallback in case of floating point issues
    return weightedItems[weightedItems.length - 1]?.key || null;
};

// Helper function for strength-based weapon selection
const getStrengthBasedRandomWeaponKey = (weaponKeys: string[], strength: number): string | null => {
    if (weaponKeys.length === 0) return null;

    const parseDamage = (damageString?: string): number => {
        if (!damageString) return 1;
        const match = damageString.match(/d(\d+)/);
        return match ? parseInt(match[1], 10) : 1;
    };

    const weightedItems = weaponKeys.map(key => {
        const item = ITEMS[key];
        if (!item) return { key, weight: 0 };

        const damageValue = parseDamage(item.damage);
        const itemWeight = item.weight > 0 ? item.weight : 1;

        // Base weight combines damage and item's physical weight
        let weight = (damageValue * 2) + (itemWeight / 20);

        // Apply strength-based multiplier
        if (strength >= 13) {
            if (damageValue >= 8) weight *= 4; // Strong preference for d8+
            else if (damageValue >= 6) weight *= 2;
        } else if (strength >= 11) {
            if (damageValue >= 8) weight *= 2; // Medium preference for d8+
            else if (damageValue >= 6) weight *= 1.5;
        }

        return { key, weight };
    }).filter(item => item.weight > 0);

    if (weightedItems.length === 0) {
        return weaponKeys[Math.floor(Math.random() * weaponKeys.length)];
    }

    const totalWeight = weightedItems.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight === 0) return weaponKeys[Math.floor(Math.random() * weaponKeys.length)];

    let random = Math.random() * totalWeight;
    for (const item of weightedItems) {
        if (random < item.weight) {
            return item.key;
        }
        random -= item.weight;
    }

    return weightedItems[weightedItems.length - 1]?.key || null;
};


export const useGrog = (showToast: (msg: string) => void) => {
    const [grog, setGrog] = useState<Grog | null>(null);
    const [isGeneratingDetails, setIsGeneratingDetails] = useState(false);

    const createGrog = useCallback(() => {
        const scores: AbilityScores = ABILITIES.reduce((acc, ability) => {
            acc[ability] = rollStat();
            return acc;
        }, {} as AbilityScores);

        // --- Grog Strength Buff Logic ---
        if (scores.Strength < 9) {
            const mentalScores = {
                [Ability.Wisdom]: scores.Wisdom,
                [Ability.Intelligence]: scores.Intelligence,
                [Ability.Charisma]: scores.Charisma,
            };
            const highestMentalAbility = Object.keys(mentalScores).reduce((a, b) =>
                mentalScores[a as Ability] > mentalScores[b as Ability] ? a : b
            ) as Ability;
            const highestMentalScore = mentalScores[highestMentalAbility];

            if (scores.Strength < highestMentalScore) {
                const originalStr = scores.Strength;
                scores.Strength = highestMentalScore;
                scores[highestMentalAbility] = originalStr;
            }
        }

        if (scores.Strength < 9) {
            scores.Strength = 9;
        }
        // --- End of Grog Strength Buff Logic ---

        const conModifier = getModifier(scores.Constitution);
        const racialHp = rollDie(4);
        const classHpRoll = rollDie(8); // Per rule: "rolls once and he doesn't reroll on 1 or 2"
        const totalHp = racialHp + Math.max(1, classHpRoll + conModifier);

        const cheapWeapons = Object.keys(ITEMS).filter(key => {
            const item = ITEMS[key];
            return item.category === 'Weapon' && item.cost < 20 && item.isMelee;
        });
        const cheapArmors = Object.keys(ITEMS).filter(key => {
            const item = ITEMS[key];
            return item.category === 'Armor' && item.cost < 40 && !item.name.toLowerCase().includes('shield');
        });

        const equipment: string[] = [];

        let weaponKey: string | null;
        if (scores.Strength >= 11) {
            // New logic for strong Grogs: prefer heavier, more damaging weapons
            weaponKey = getStrengthBasedRandomWeaponKey(cheapWeapons, scores.Strength);
        } else {
            // Original logic for weaker Grogs: prefer cheaper weapons
            weaponKey = getWeightedRandomItemKey(cheapWeapons);
        }

        if (weaponKey) equipment.push(weaponKey);

        const armorKey = getWeightedRandomItemKey(cheapArmors);
        if (armorKey) equipment.push(armorKey);

        if (Math.random() < 0.5) {
            equipment.push('shield');
        }

        // Add secondary ranged weapon based on Dexterity
        if (scores.Dexterity >= 9) {
            const dex = scores.Dexterity;
            // Chance scales from 25% at DEX 9 to 95% at DEX 13+
            const chance = Math.min(0.95, 0.25 + (dex - 9) * 0.175);
            if (Math.random() < chance) {
                const cheapRangedWeapons = Object.keys(ITEMS).filter(key => {
                    const item = ITEMS[key];
                    return item.isMissile && item.cost < 20 && !equipment.includes(key);
                });
                const rangedWeaponKey = getWeightedRandomItemKey(cheapRangedWeapons);
                if (rangedWeaponKey) {
                    equipment.push(rangedWeaponKey);
                    // Add corresponding ammo
                    if (rangedWeaponKey === 'sling') equipment.push('sling-stones');
                }
            }
        }


        setGrog({
            scores,
            hp: totalHp,
            equipment,
            name: null,
            traits: null,
            portrait: null,
            trinkets: null,
            secondarySkills: null,
        });
    }, []);

    const generateGrogDetails = useCallback(async (theme: Theme) => {
        if (!grog) return;
        setIsGeneratingDetails(true);

        try {
            const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });

            // Generate Name, Traits, and Trinkets
            const detailsPrompt = getGrogDetailsPrompt(theme);

            const detailsResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: detailsPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            traits: {
                                type: Type.OBJECT,
                                properties: {
                                    positivePhysical: { type: Type.STRING },
                                    positiveMental: { type: Type.STRING },
                                    negative: { type: Type.STRING },
                                },
                                required: ["positivePhysical", "positiveMental", "negative"],
                            },
                            trinkets: { type: Type.STRING, description: "A short, comma-separated list of 2-3 personal belongings or trinkets." }
                        },
                        required: ["name", "traits", "trinkets"]
                    },
                },
            });
            const { name, traits, trinkets } = JSON.parse(detailsResponse.text.trim());

            // Add a 1-second delay to avoid hitting API rate limits.
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Generate Portrait using the new details (Nano Banana)
            const portraitPrompt = getGrogPortraitPrompt(name, traits, theme);

            const imageResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: portraitPrompt,
                config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
            });

            const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find((part: any) => part?.inlineData?.data);
            let imageData = imagePart?.inlineData?.data;

            if (!imageData) {
                const fallbackResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image-preview',
                    contents: portraitPrompt,
                    config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
                });
                const fallbackPart = fallbackResponse.candidates?.[0]?.content?.parts?.find((part: any) => part?.inlineData?.data);
                imageData = fallbackPart?.inlineData?.data;
                if (!imageData) {
                    const details = describeGeminiImageFailure(fallbackResponse);
                    throw new Error(`The AI did not return an image. ${details}`);
                }
            }

            const portrait = `data:image/png;base64,${imageData}`;

            setGrog(prevGrog => prevGrog ? { ...prevGrog, name, traits, portrait, trinkets } : null);

        } catch (e) {
            console.error("Grog detail generation failed:", e);
            let errorMessage = "Could not generate grog details. Please try again.";
            // Provide a more specific error message for quota issues.
            if (e instanceof Error && (e.message.toLowerCase().includes('quota') || e.message.toLowerCase().includes('resource_exhausted'))) {
                errorMessage = "API quota exceeded. Please check your plan and billing details.";
            }
            showToast(errorMessage);
        } finally {
            setIsGeneratingDetails(false);
        }
    }, [grog, showToast]);

    const reset = useCallback(() => {
        setGrog(null);
        setIsGeneratingDetails(false);
    }, []);

    const restoreState = useCallback((state: { grog?: Grog | null; isGeneratingDetails?: boolean }) => {
        setGrog(state.grog ?? null);
        setIsGeneratingDetails(Boolean(state.isGeneratingDetails));
    }, []);

    return {
        grog,
        isGeneratingDetails,
        createGrog,
        generateGrogDetails,
        reset,
        restoreState,
    };
};
