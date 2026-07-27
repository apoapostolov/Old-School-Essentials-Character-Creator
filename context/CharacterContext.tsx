import React, { createContext, useContext, useMemo } from 'react';
import type { useCharacter } from '../hooks/useCharacter';

/** Full character API (return type of useCharacter). */
export type CharacterApi = NonNullable<ReturnType<typeof useCharacter>>;

/** Class/race selection + ability rolls. */
export type CharacterIdentitySlice = Pick<
  CharacterApi,
  | 'selectedClass'
  | 'selectClass'
  | 'selectedRace'
  | 'selectRace'
  | 'modifiedScores'
  | 'characterRoll'
  | 'resetRollAndCharacter'
  | 'restoreRollAndCharacter'
  | 'aggregatedData'
  | 'karameikos'
>;

/** Level, HP, magic, skill progression. */
export type CharacterProgressionSlice = Pick<
  CharacterApi,
  | 'progression'
  | 'selectedClass'
  | 'characterRoll'
  | 'modifiedScores'
  | 'aggregatedData'
  | 'karameikos'
  | 'equipment'
>;

/** Kits, inventory, money. */
export type CharacterGearSlice = Pick<
  CharacterApi,
  | 'equipment'
  | 'selectedClass'
  | 'characterRoll'
  | 'progression'
  | 'aggregatedData'
  | 'grog'
>;
// progression included for equipment customization money/level coupling

/** AI final touches + grog + save. */
export type CharacterExtrasSlice = Pick<
  CharacterApi,
  | 'ai'
  | 'grog'
  | 'selectedClass'
  | 'selectedRace'
  | 'characterRoll'
  | 'aggregatedData'
  | 'loadFromSave'
  | 'karameikos'
  | 'progression'
  | 'equipment'
>;

const CharacterFullContext = createContext<CharacterApi | null>(null);
const CharacterIdentityContext = createContext<CharacterIdentitySlice | null>(null);
const CharacterProgressionContext = createContext<CharacterProgressionSlice | null>(null);
const CharacterGearContext = createContext<CharacterGearSlice | null>(null);
const CharacterExtrasContext = createContext<CharacterExtrasSlice | null>(null);

export const CharacterProvider: React.FC<{
  character: CharacterApi;
  children: React.ReactNode;
}> = ({ character, children }) => {
  const identity = useMemo<CharacterIdentitySlice>(() => ({
    selectedClass: character.selectedClass,
    selectClass: character.selectClass,
    selectedRace: character.selectedRace,
    selectRace: character.selectRace,
    modifiedScores: character.modifiedScores,
    characterRoll: character.characterRoll,
    resetRollAndCharacter: character.resetRollAndCharacter,
    restoreRollAndCharacter: character.restoreRollAndCharacter,
    aggregatedData: character.aggregatedData,
    karameikos: character.karameikos,
  }), [
    character.selectedClass,
    character.selectClass,
    character.selectedRace,
    character.selectRace,
    character.modifiedScores,
    character.characterRoll,
    character.resetRollAndCharacter,
    character.restoreRollAndCharacter,
    character.aggregatedData,
    character.karameikos,
  ]);

  const progression = useMemo<CharacterProgressionSlice>(() => ({
    progression: character.progression,
    selectedClass: character.selectedClass,
    characterRoll: character.characterRoll,
    modifiedScores: character.modifiedScores,
    aggregatedData: character.aggregatedData,
    karameikos: character.karameikos,
    equipment: character.equipment,
  }), [
    character.progression,
    character.selectedClass,
    character.characterRoll,
    character.modifiedScores,
    character.aggregatedData,
    character.karameikos,
    character.equipment,
  ]);

  const gear = useMemo<CharacterGearSlice>(() => ({
    equipment: character.equipment,
    selectedClass: character.selectedClass,
    characterRoll: character.characterRoll,
    progression: character.progression,
    aggregatedData: character.aggregatedData,
    grog: character.grog,
  }), [
    character.equipment,
    character.selectedClass,
    character.characterRoll,
    character.progression,
    character.aggregatedData,
    character.grog,
  ]);

  const extras = useMemo<CharacterExtrasSlice>(() => ({
    ai: character.ai,
    grog: character.grog,
    selectedClass: character.selectedClass,
    selectedRace: character.selectedRace,
    characterRoll: character.characterRoll,
    aggregatedData: character.aggregatedData,
    loadFromSave: character.loadFromSave,
    karameikos: character.karameikos,
    progression: character.progression,
    equipment: character.equipment,
  }), [
    character.ai,
    character.grog,
    character.selectedClass,
    character.selectedRace,
    character.characterRoll,
    character.aggregatedData,
    character.loadFromSave,
    character.karameikos,
    character.progression,
    character.equipment,
  ]);

  return (
    <CharacterFullContext.Provider value={character}>
      <CharacterIdentityContext.Provider value={identity}>
        <CharacterProgressionContext.Provider value={progression}>
          <CharacterGearContext.Provider value={gear}>
            <CharacterExtrasContext.Provider value={extras}>
              {children}
            </CharacterExtrasContext.Provider>
          </CharacterGearContext.Provider>
        </CharacterProgressionContext.Provider>
      </CharacterIdentityContext.Provider>
    </CharacterFullContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterFullContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};

export const useCharacterIdentity = () => {
  const ctx = useContext(CharacterIdentityContext);
  if (!ctx) throw new Error('useCharacterIdentity must be used within a CharacterProvider');
  return ctx;
};

export const useCharacterProgression = () => {
  const ctx = useContext(CharacterProgressionContext);
  if (!ctx) throw new Error('useCharacterProgression must be used within a CharacterProvider');
  return ctx;
};

export const useCharacterGear = () => {
  const ctx = useContext(CharacterGearContext);
  if (!ctx) throw new Error('useCharacterGear must be used within a CharacterProvider');
  return ctx;
};

export const useCharacterExtras = () => {
  const ctx = useContext(CharacterExtrasContext);
  if (!ctx) throw new Error('useCharacterExtras must be used within a CharacterProvider');
  return ctx;
};
