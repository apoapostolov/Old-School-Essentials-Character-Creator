
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AbilityScores, AcrobatSkillIncreases, BarbarianSkillIncreases, BardSkillIncreases, ClassInfo, FavoredTerrain, HpCalculationResult, HpRollResult, MoneyCalculationResult, Race, RangerSkillIncreases, ThiefSkillIncreases } from '../types';
import { calculateHP, generateHpRollForLevel, rollDie } from '../utils/hp';
import { calculateMoney, generateRawMoneyRollsForLevel } from '../utils/money';

export const useCharacterProgression = (selectedClass: ClassInfo | null, selectedRace: Race | null, scores: AbilityScores | null, goldModifier: number = 0) => {
    const [characterLevel, setCharacterLevel] = useState(1);
    const [hpRolls, setHpRolls] = useState<{ racial: number | null, levels: Record<number, HpRollResult> }>({ racial: null, levels: {} });
    const [moneyRolls, setMoneyRolls] = useState<Record<number, number[]>>({});
    const [hpResultOverride, setHpResultOverride] = useState<HpCalculationResult | null>(null);
    const [moneyResultOverride, setMoneyResultOverride] = useState<MoneyCalculationResult | null>(null);
    const [knownSpells, setKnownSpells] = useState<string[]>([]);
    const [thiefSkillIncreases, setThiefSkillIncreases] = useState<ThiefSkillIncreases>({});
    const [acrobatSkillIncreases, setAcrobatSkillIncreases] = useState<AcrobatSkillIncreases>({});
    const [barbarianSkillIncreases, setBarbarianSkillIncreases] = useState<BarbarianSkillIncreases>({});
    const [rangerSkillIncreases, setRangerSkillIncreases] = useState<RangerSkillIncreases>({});
    const [bardSkillIncreases, setBardSkillIncreases] = useState<BardSkillIncreases>({});
    const [favoredTerrain, setFavoredTerrain] = useState<FavoredTerrain | null>(null);
    const [selectedSpellList, setSelectedSpellList] = useState<'Magic-User' | 'Illusionist' | null>(null);

    const handleLevelChange = useCallback((newLevel: number) => {
        if (!selectedClass || !scores) return;

        const updatedHpRolls = { racial: hpRolls.racial, levels: { ...hpRolls.levels } };
        let hpRollsUpdated = false;

        if (updatedHpRolls.racial === null) {
            const classHpDie = selectedClass.features?.racialHpDie ?? 4;
            const raceHpDie = selectedRace?.racialHpDie ?? 4;
            const finalHpDie = Math.max(classHpDie, raceHpDie);
            updatedHpRolls.racial = rollDie(finalHpDie);
            hpRollsUpdated = true;
        }

        const maxRolledHpLevel = Object.keys(updatedHpRolls.levels).length > 0 ? Math.max(...Object.keys(updatedHpRolls.levels).map(Number)) : 1;
        if (newLevel > maxRolledHpLevel) {
            for (let i = maxRolledHpLevel + 1; i <= newLevel; i++) {
                updatedHpRolls.levels[i] = generateHpRollForLevel(selectedClass);
            }
            hpRollsUpdated = true;
        }
        if (hpRollsUpdated) setHpRolls(updatedHpRolls);

        const updatedMoneyRolls = { ...moneyRolls };
        let moneyRollsUpdated = false;
        const maxRolledMoneyLevel = Object.keys(updatedMoneyRolls).length > 0 ? Math.max(...Object.keys(updatedMoneyRolls).map(Number)) : 0;
        if (newLevel > maxRolledMoneyLevel) {
            for (let i = maxRolledMoneyLevel + 1; i <= newLevel; i++) {
                updatedMoneyRolls[i] = generateRawMoneyRollsForLevel(selectedClass, i, scores);
            }
            moneyRollsUpdated = true;
        }
        if (moneyRollsUpdated) setMoneyRolls(updatedMoneyRolls);

        setCharacterLevel(newLevel);
    }, [selectedClass, selectedRace, scores, hpRolls, moneyRolls]);

    const hpResult: HpCalculationResult | null = useMemo(() => {
        if (!selectedClass || !scores || hpRolls.racial === null) return hpResultOverride;
        return calculateHP(selectedClass, selectedRace, scores, characterLevel, hpRolls.racial, hpRolls.levels);
    }, [selectedClass, selectedRace, scores, characterLevel, hpRolls, hpResultOverride]);

    const moneyResult: MoneyCalculationResult | null = useMemo(() => {
        if (!selectedClass || !scores || Object.keys(moneyRolls).length === 0) return moneyResultOverride;
        return calculateMoney(selectedClass, scores, characterLevel, moneyRolls, goldModifier);
    }, [selectedClass, scores, characterLevel, moneyRolls, goldModifier, moneyResultOverride]);

    const reset = useCallback(() => {
        setCharacterLevel(1);
        setHpRolls({ racial: null, levels: {} });
        setMoneyRolls({});
        setHpResultOverride(null);
        setMoneyResultOverride(null);
        setKnownSpells([]);
        setThiefSkillIncreases({});
        setAcrobatSkillIncreases({});
        setBarbarianSkillIncreases({});
        setRangerSkillIncreases({});
        setBardSkillIncreases({});
        setFavoredTerrain(null);
        setSelectedSpellList(null);
    }, []);

    const restoreState = useCallback((state: {
        characterLevel?: number;
        hpRolls?: { racial: number | null; levels: Record<number, HpRollResult> };
        moneyRolls?: Record<number, number[]>;
        hpResult?: HpCalculationResult | null;
        moneyResult?: MoneyCalculationResult | null;
        knownSpells?: string[];
        thiefSkillIncreases?: ThiefSkillIncreases;
        acrobatSkillIncreases?: AcrobatSkillIncreases;
        barbarianSkillIncreases?: BarbarianSkillIncreases;
        rangerSkillIncreases?: RangerSkillIncreases;
        bardSkillIncreases?: BardSkillIncreases;
        favoredTerrain?: FavoredTerrain | null;
        selectedSpellList?: 'Magic-User' | 'Illusionist' | null;
    }) => {
        setCharacterLevel(state.characterLevel ?? 1);
        setHpRolls(state.hpRolls ?? { racial: null, levels: {} });
        setMoneyRolls(state.moneyRolls ?? {});
        setHpResultOverride(state.hpResult ?? null);
        setMoneyResultOverride(state.moneyResult ?? null);
        setKnownSpells(state.knownSpells ?? []);
        setThiefSkillIncreases(state.thiefSkillIncreases ?? {});
        setAcrobatSkillIncreases(state.acrobatSkillIncreases ?? {});
        setBarbarianSkillIncreases(state.barbarianSkillIncreases ?? {});
        setRangerSkillIncreases(state.rangerSkillIncreases ?? {});
        setBardSkillIncreases(state.bardSkillIncreases ?? {});
        setFavoredTerrain(state.favoredTerrain ?? null);
        setSelectedSpellList(state.selectedSpellList ?? null);
    }, []);

    useEffect(() => {
        if (selectedClass && scores && hpRolls.racial === null) {
          handleLevelChange(characterLevel);
        }
      }, [selectedClass, scores, characterLevel, hpRolls.racial, handleLevelChange]);


    return {
        characterLevel, handleLevelChange, hpRolls,
        hpResult, moneyResult,
        moneyRolls,
        knownSpells, setKnownSpells,
        thiefSkillIncreases, setThiefSkillIncreases,
        acrobatSkillIncreases, setAcrobatSkillIncreases,
        barbarianSkillIncreases, setBarbarianSkillIncreases,
        rangerSkillIncreases, setRangerSkillIncreases,
        bardSkillIncreases, setBardSkillIncreases,
        favoredTerrain, setFavoredTerrain,
        selectedSpellList, setSelectedSpellList,
        reset,
        restoreState,
    };
};
