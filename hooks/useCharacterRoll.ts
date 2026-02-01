import { useState, useCallback } from 'react';
import type { AbilityScores, Ability } from '../types';
import { ABILITIES } from '../constants';

export const useCharacterRoll = () => {
    const [scores, setScores] = useState<AbilityScores | null>(null);
    const [baseScores, setBaseScores] = useState<AbilityScores | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [adjustments, setAdjustments] = useState(0);
    const [rollHistory, setRollHistory] = useState<AbilityScores[]>([]);
    const [decrementedAbilities, setDecrementedAbilities] = useState<Set<Ability>>(new Set());

    const rollStat = (): number => {
        return Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1).reduce((a, b) => a + b, 0);
    };

    const handleRollStats = useCallback(() => {
        setIsRolling(true);
        setScores(null);
        setBaseScores(null);
        setAdjustments(0);
        setDecrementedAbilities(new Set());

        setTimeout(() => {
            const newScores: AbilityScores = ABILITIES.reduce((acc, ability) => {
                acc[ability] = rollStat();
                return acc;
            }, {} as AbilityScores);
            setScores(newScores);
            setBaseScores(newScores);
            setRollHistory(prev => [newScores, ...prev].slice(0, 9));
            setIsRolling(false);
        }, 500);
    }, []);

    const handleRestoreRoll = useCallback((rollToRestore: AbilityScores) => {
        setScores(rollToRestore);
        setBaseScores(rollToRestore);
        setAdjustments(0);
        setDecrementedAbilities(new Set());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const restoreState = useCallback((state: {
        scores?: AbilityScores | null;
        baseScores?: AbilityScores | null;
        isRolling?: boolean;
        adjustments?: number;
        rollHistory?: AbilityScores[];
        decrementedAbilities?: Ability[] | Set<Ability> | Record<string, unknown> | null;
    }) => {
        setScores(state.scores ?? null);
        setBaseScores(state.baseScores ?? state.scores ?? null);
        setIsRolling(Boolean(state.isRolling));
        setAdjustments(state.adjustments ?? 0);
        setRollHistory(Array.isArray(state.rollHistory) ? state.rollHistory : []);

        if (state.decrementedAbilities instanceof Set) {
            setDecrementedAbilities(new Set(state.decrementedAbilities));
        } else if (Array.isArray(state.decrementedAbilities)) {
            setDecrementedAbilities(new Set(state.decrementedAbilities));
        } else if (state.decrementedAbilities && typeof state.decrementedAbilities === 'object') {
            setDecrementedAbilities(new Set(Object.keys(state.decrementedAbilities) as Ability[]));
        } else {
            setDecrementedAbilities(new Set());
        }
    }, []);
    
    const handleDecrement = useCallback((ability: Ability) => {
        if (decrementedAbilities.has(ability)) return;

        setScores(prevScores => {
            if (!prevScores || prevScores[ability] <= 4) return prevScores;
            const newScores = { ...prevScores };
            newScores[ability] -= 2;
            return newScores;
        });
        setAdjustments(prev => prev + 1);
        setDecrementedAbilities(prev => new Set(prev).add(ability));
    }, [decrementedAbilities]);

    const handleIncrement = useCallback((ability: Ability) => {
        if (!scores || !baseScores) return;

        // Check if this is a reset operation for a decremented score.
        if (decrementedAbilities.has(ability)) {
            if (adjustments < 1) return; // Can't undo if point was spent

            // Perform the reset operation.
            setScores(prevScores => {
                if (!prevScores) return prevScores;
                const newScores = { ...prevScores };
                newScores[ability] = baseScores[ability]; // Reset to original
                return newScores;
            });
            setAdjustments(prev => prev - 1);
            setDecrementedAbilities(prev => {
                const newSet = new Set(prev);
                newSet.delete(ability);
                return newSet;
            });
            return; // Exit after handling reset.
        }

        // Standard increment operation
        if (adjustments < 1) return;
        if (scores[ability] >= 18) return;

        setScores(prevScores => {
            if (!prevScores) return prevScores;
            const newScores = { ...prevScores };
            newScores[ability]++;
            return newScores;
        });
        setAdjustments(prev => prev - 1);
    }, [adjustments, scores, baseScores, decrementedAbilities]);

    const reset = useCallback(() => {
        setScores(null);
        setBaseScores(null);
        setAdjustments(0);
        setDecrementedAbilities(new Set());
    }, []);

    return {
        scores, baseScores, isRolling, adjustments, rollHistory, decrementedAbilities,
        handleRollStats, handleRestoreRoll, handleDecrement, handleIncrement,
        reset,
        restoreState
    };
};
