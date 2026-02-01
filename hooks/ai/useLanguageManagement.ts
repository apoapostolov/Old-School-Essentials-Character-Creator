
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { Theme, AbilityScores, ClassInfo, Language } from '../../types';
import { getModifier } from '../../utils/character';
import type { AggregatedData } from '../useAggregatedData';

const themeToLanguageSettingMap: Record<string, string> = {
    'ose': 'Generic OSE',
    'mystara': 'Karameikos',
    'dolmenwood': 'Dolmenwood',
    'shrike': 'The Shrike',
    'gods': 'Forbidden North',
    'northland': 'Northland Saga',
};

export const useLanguageManagement = (
    selectedClass: ClassInfo | null,
    scores: AbilityScores | null,
    theme: Theme,
    showToast: (msg: string) => void,
    aggregatedData: AggregatedData
) => {
    const [selectedBonusLanguages, setSelectedBonusLanguages] = useState<string[]>([]);
    const languageSettingKey = useMemo(() => themeToLanguageSettingMap[theme] || 'Generic OSE', [theme]);
    const [commonLanguage, setCommonLanguage] = useState<string>(aggregatedData.LANGUAGE_SETTINGS[languageSettingKey]?.defaultCommon || 'Common Tongue');
    const suppressResetRef = useRef(false);

    const racialLanguage = useMemo<Language | null>(() => {
        if (!selectedClass || selectedClass.group !== 'Demihuman') {
            return null;
        }
        const className = selectedClass.name;
        const setting = aggregatedData.LANGUAGE_SETTINGS[languageSettingKey];
        if (!setting) return null;

        // Direct mapping first (e.g., Dwarf -> Dwarvish)
        let lang = setting.languages.find(l => l.assignedRace === className);
        if (lang) return lang;

        // Handle composite/related races
        if (['Half-Elf', 'Drow'].includes(className)) {
            lang = setting.languages.find(l => l.assignedRace === 'Elf');
            if (lang) return lang;
        }
        if (className === 'Half-Orc') {
            lang = setting.languages.find(l => l.assignedRace === 'Orc');
            if (lang) return lang;
        }
        if (className === 'Duergar') {
            lang = setting.languages.find(l => l.assignedRace === 'Dwarf');
            if (lang) return lang;
        }
        if (className === 'Svirfneblin') {
            lang = setting.languages.find(l => l.assignedRace === 'Gnome');
            if (lang) return lang;
        }

        return null;
    }, [selectedClass, languageSettingKey, aggregatedData.LANGUAGE_SETTINGS]);

    useEffect(() => {
        if (suppressResetRef.current) {
            suppressResetRef.current = false;
            return;
        }
        setCommonLanguage(aggregatedData.LANGUAGE_SETTINGS[languageSettingKey]?.defaultCommon || 'Common Tongue');
        setSelectedBonusLanguages([]);
    }, [theme, languageSettingKey, aggregatedData.LANGUAGE_SETTINGS]);

    const onCommonLanguageChange = useCallback((language: string) => {
        setCommonLanguage(language);
        setSelectedBonusLanguages(prev => prev.filter(lang => lang !== language));
    }, []);

    const onRandomLanguage = useCallback(() => {
        if (!scores) return;
        const intModifier = getModifier(scores.Intelligence);
        const bonusSlots = Math.max(0, intModifier);

        if (selectedBonusLanguages.length >= bonusSlots) {
            showToast("All bonus language slots are filled.");
            return;
        }

        const setting = aggregatedData.LANGUAGE_SETTINGS[languageSettingKey];
        if (!setting) return;

        const availableLanguages = setting.languages.filter(lang => 
            !selectedBonusLanguages.includes(lang.name) && 
            lang.name !== commonLanguage &&
            lang.name !== racialLanguage?.name
        );
        if (availableLanguages.length === 0) {
            showToast("No more unique languages to select from this list.");
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * availableLanguages.length);
        const randomLanguage = availableLanguages[randomIndex];
        
        setSelectedBonusLanguages(prev => [...prev, randomLanguage.name]);
    }, [scores, selectedBonusLanguages, languageSettingKey, showToast, commonLanguage, racialLanguage, aggregatedData.LANGUAGE_SETTINGS]);

    const reset = useCallback(() => {
        setSelectedBonusLanguages([]);
        setCommonLanguage(aggregatedData.LANGUAGE_SETTINGS['Generic OSE']?.defaultCommon || 'Common Tongue');
    }, [aggregatedData.LANGUAGE_SETTINGS]);

    const restore = useCallback((state: {
        commonLanguage?: string | null;
        selectedBonusLanguages?: string[] | null;
    }) => {
        suppressResetRef.current = true;
        setCommonLanguage(state.commonLanguage || aggregatedData.LANGUAGE_SETTINGS[languageSettingKey]?.defaultCommon || 'Common Tongue');
        setSelectedBonusLanguages(state.selectedBonusLanguages ? [...state.selectedBonusLanguages] : []);
    }, [aggregatedData.LANGUAGE_SETTINGS, languageSettingKey]);

    return {
        selectedBonusLanguages,
        setSelectedBonusLanguages,
        commonLanguage,
        onCommonLanguageChange,
        onRandomLanguage,
        racialLanguage,
        reset,
        restore,
    };
};
