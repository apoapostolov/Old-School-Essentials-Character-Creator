import { useCallback, useState } from 'react';
import type {
    EthnosResult,
    HometownResult,
    LiteracyResult,
    SocialStandingResult
} from '../data/karameikos-data';
import {
    determineLiteracy,
    rollEthnos,
    rollHometown,
    rollSocialStanding
} from '../data/karameikos-data';

export interface KarameikosState {
    socialStanding: SocialStandingResult | null;
    ethnos: EthnosResult | null;
    literacy: LiteracyResult | null;
    hometown: HometownResult | null;
    villageName: string | null;
    isGeneratingVillage: boolean;
    selectedScripts: string[];
}

/**
 * Hook for managing Grand Duchy of Karameikos character background features.
 * Includes social standing, ethnos, literacy, and hometown generation.
 */
export const useKarameikos = (generateVillageName: (socialStanding: string, ethnos: string) => Promise<string>) => {
    const [socialStanding, setSocialStanding] = useState<SocialStandingResult | null>(null);
    const [ethnos, setEthnos] = useState<EthnosResult | null>(null);
    const [literacy, setLiteracy] = useState<LiteracyResult | null>(null);
    const [hometown, setHometown] = useState<HometownResult | null>(null);
    const [villageName, setVillageName] = useState<string | null>(null);
    const [isGeneratingVillage, setIsGeneratingVillage] = useState(false);
    const [selectedScripts, setSelectedScripts] = useState<string[]>([]);

    /**
     * Roll for social standing (d100)
     */
    const handleRollSocialStanding = useCallback(() => {
        const roll = Math.floor(Math.random() * 100) + 1;
        const result = rollSocialStanding(roll);
        setSocialStanding(result);

        // Reset dependent rolls
        setEthnos(null);
        setLiteracy(null);
        setHometown(null);
        setVillageName(null);
        setSelectedScripts([]);
    }, []);

    /**
     * Roll for ethnos (d100 + half of social standing roll)
     */
    const handleRollEthnos = useCallback(() => {
        if (!socialStanding) return;

        const roll = Math.floor(Math.random() * 100) + 1;
        const result = rollEthnos(roll, socialStanding.roll);
        setEthnos(result);
    }, [socialStanding]);

    /**
     * Roll for literacy (multiple INT checks based on social standing)
     */
    const handleRollLiteracy = useCallback((
        intelligenceScore: number,
        className: string,
        socialStandingResult: SocialStandingResult
    ) => {
        let checks = socialStandingResult.literacyChecks;

        // Adjust for class
        if (className === "Barbarian" || className === "Druid") {
            checks = Math.max(0, checks - 1);
        }

        // Roll INT checks
        let successes = 0;
        for (let i = 0; i < checks; i++) {
            const roll = Math.floor(Math.random() * 20) + 1;
            if (roll <= intelligenceScore) {
                successes++;
            }
        }

        // Add free success for magic users/clerics
        if (className === "Cleric" || className === "Magic-User" || className === "Illusionist") {
            successes++;
        }

        const result = determineLiteracy(successes);
        setLiteracy(result);
        // Reset any previously selected scripts when literacy is re-rolled
        setSelectedScripts([]);
    }, []);

    /**
     * DEBUG: Force a specific number of literacy successes.
     */
    const forceLiteracySuccesses = useCallback((successes: number) => {
        const result = determineLiteracy(successes);
        setLiteracy(result);
        setSelectedScripts([]);
    }, []);

    /**
     * Roll for hometown (d20 + modifiers)
     */
    const handleRollHometown = useCallback((className: string, socialStandingText: string) => {
        const roll = Math.floor(Math.random() * 20) + 1;
        const result = rollHometown(roll, className, socialStandingText);
        setHometown(result);
        setVillageName(null); // Reset village name
    }, []);

    /**
     * Generate a village/homestead name using AI
     */
    const handleGenerateVillageName = useCallback(async () => {
        if (!socialStanding || !ethnos || !hometown) return;
        if (hometown.hometown !== "Homestead" && hometown.hometown !== "Village/Town") return;

        setIsGeneratingVillage(true);
        try {
            const name = await generateVillageName(socialStanding.standing, ethnos.origin);
            setVillageName(name);
        } catch (error) {
            console.error("Failed to generate village name:", error);
            setVillageName("Failed to generate");
        } finally {
            setIsGeneratingVillage(false);
        }
    }, [socialStanding, ethnos, hometown, generateVillageName]);

    /**
     * Reset all Karameikos background state
     */
    const reset = useCallback(() => {
        setSocialStanding(null);
        setEthnos(null);
        setLiteracy(null);
        setHometown(null);
        setVillageName(null);
        setIsGeneratingVillage(false);
        setSelectedScripts([]);
    }, []);

    const restoreState = useCallback((state: Partial<KarameikosState>) => {
        setSocialStanding(state.socialStanding ?? null);
        setEthnos(state.ethnos ?? null);
        setLiteracy(state.literacy ?? null);
        setHometown(state.hometown ?? null);
        setVillageName(state.villageName ?? null);
        setIsGeneratingVillage(Boolean(state.isGeneratingVillage));
        setSelectedScripts(state.selectedScripts ? [...state.selectedScripts] : []);
    }, []);

    /**
     * Toggle selection of an additional literacy script/language.
     * Enforces the cap of (successCount - 2) when available.
     */
    const toggleScript = useCallback((script: string) => {
        setSelectedScripts(prev => {
            const has = prev.includes(script);
            if (has) return prev.filter(s => s !== script);
            const allowed = Math.max(0, (literacy?.successCount ?? 0) - 2);
            if (prev.length >= allowed) return prev; // do not exceed allowed
            return [...prev, script];
        });
    }, [literacy?.successCount]);

    return {
        // State
        socialStanding,
        ethnos,
        literacy,
        hometown,
        villageName,
        isGeneratingVillage,
        selectedScripts,

        // Actions
        handleRollSocialStanding,
        handleRollEthnos,
        handleRollLiteracy,
        handleRollHometown,
        handleGenerateVillageName,
        forceLiteracySuccesses,
        toggleScript,
        reset,
        restoreState,
    };
};
