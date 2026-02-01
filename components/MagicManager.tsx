
import React, { useState, useMemo } from 'react';
import type { Spell, AbilityScores } from '../types';
import { getModifier } from '../utils/character';
import { CheckIcon } from './icons/CheckIcon';
import { DiceIcon } from './icons/DiceIcon';
import { EditIcon } from './icons/EditIcon';
import { useCharacterContext } from '../context/CharacterContext';

interface SpellCardProps {
    spell: Spell;
    isSelected: boolean;
    onSelect: () => void;
    isDisabled: boolean;
}

const SpellCard: React.FC<SpellCardProps> = ({ spell, isSelected, onSelect, isDisabled }) => {
    const disabledClasses = isDisabled && !isSelected ? 'opacity-50 cursor-not-allowed bg-gray-800/30' : 'hover:bg-gray-700/50 hover:border-gray-500';

    return (
        <button
            onClick={onSelect}
            disabled={isDisabled && !isSelected}
            className={`
                p-4 rounded-lg border-2 text-left w-full h-full transition-all duration-200
                ${isSelected 
                    ? 'bg-yellow-500/20 border-yellow-400 ring-2 ring-yellow-400/50' 
                    : 'bg-gray-800/50 border-gray-600'
                }
                ${disabledClasses}
            `}
        >
            <div className="flex items-center justify-between">
                <h4 className={`font-bold text-lg ${isSelected ? 'text-yellow-300' : 'text-gray-200'}`}>{spell.name}</h4>
                {isSelected && <CheckIcon className="h-6 w-6 text-yellow-400 flex-shrink-0" />}
            </div>
            <p className="text-sm text-gray-400 mt-1">{spell.description}</p>
        </button>
    );
};

interface MagicManagerProps {
  casterType: 'Arcane' | 'Divine';
  knownSpells: string[];
  onKnownSpellsChange: (spells: string[]) => void;
  scores: AbilityScores;
}

export const MagicManager: React.FC<MagicManagerProps> = ({ casterType, knownSpells, onKnownSpellsChange, scores }) => {
  const { aggregatedData, selectedClass, progression } = useCharacterContext();
  const SPELLS = aggregatedData.SPELLS;
  
  const [favoriteSpells, setFavoriteSpells] = useState<Set<string>>(new Set());
  const [rolledSpell, setRolledSpell] = useState<string | null>(null);
  const [initialSpell, setInitialSpell] = useState<string | null>(null);
  const [selectedBonusSpells, setSelectedBonusSpells] = useState<Set<string>>(new Set());
  const [isEditingBonusSpells, setIsEditingBonusSpells] = useState(false);
  
  const defaultSpell = useMemo(() => {
    return selectedClass?.spellcastingInfo?.default_spell || "Error: No default spell defined";
  }, [selectedClass]);

  const availableSpells = useMemo(() => {
    let spellListKeys = selectedClass?.spellcastingInfo?.spell_list_keys || [];

    if (selectedClass?.name === 'Gnome') {
        if (progression.selectedSpellList) {
            spellListKeys = [progression.selectedSpellList];
        } else {
            return []; // Don't show any spells until a list is chosen
        }
    }
    
    if (spellListKeys.length === 0) return [];
    
    return SPELLS.filter(spell => spellListKeys.includes(spell.class) && spell.level === 1);
  }, [selectedClass, SPELLS, progression.selectedSpellList]);


  const bonusSpellSlots = useMemo(() => {
      const intModifier = getModifier(scores.Intelligence);
      const intBonus = Math.max(0, intModifier);

      if (selectedClass?.name === 'Elf') {
          return intBonus + 2;
      }
      return intBonus;
  }, [scores.Intelligence, selectedClass]);

  const bonusSpellsExplanation = useMemo(() => {
    const intModifier = getModifier(scores.Intelligence);
    const intBonus = Math.max(0, intModifier);
    if (selectedClass?.name === 'Elf') {
        if (intBonus > 0) {
            return <>Your high Intelligence ({scores.Intelligence}) and Elven heritage grant you <span className="font-bold text-yellow-300">{bonusSpellSlots}</span> additional 1st-level spell(s).</>;
        }
        return <>Your Elven heritage grants you <span className="font-bold text-yellow-300">{bonusSpellSlots}</span> additional 1st-level spell(s).</>;
    }
    // Default for Gnome or other M-Us
    return <>Your high Intelligence ({scores.Intelligence}) grants you <span className="font-bold text-yellow-300">{bonusSpellSlots}</span> additional 1st-level spell(s).</>;
  }, [scores.Intelligence, selectedClass, bonusSpellSlots]);

  const handleToggleFavorite = (spellName: string) => {
    setFavoriteSpells(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(spellName)) {
        newFavorites.delete(spellName);
      } else if (newFavorites.size < 4) {
        newFavorites.add(spellName);
      }
      return newFavorites;
    });
  };

  const handleRollSpell = () => {
    if (favoriteSpells.size !== 4) return;
    const favoritesArray = Array.from(favoriteSpells);
    const randomIndex = Math.floor(Math.random() * 4);
    setRolledSpell(favoritesArray[randomIndex]);
  };

  const handleFinalizeInitialSpell = (spellName: string) => {
    setInitialSpell(spellName);
    if (bonusSpellSlots === 0) {
      onKnownSpellsChange([spellName]);
    }
  };
  
  const handleToggleBonusSpell = (spellName: string) => {
    setSelectedBonusSpells(prev => {
        const newBonusSpells = new Set(prev);
        if (newBonusSpells.has(spellName)) {
            newBonusSpells.delete(spellName);
        } else if (newBonusSpells.size < bonusSpellSlots) {
            newBonusSpells.add(spellName);
        }
        return newBonusSpells;
    });
  };

  const handleConfirmSpellbook = () => {
      if (!initialSpell) return;
      const finalSpells = [initialSpell, ...Array.from(selectedBonusSpells)];
      onKnownSpellsChange(finalSpells);
      setIsEditingBonusSpells(false);
  };

  const handleEditBonusSpells = () => {
    const currentInitialSpell = knownSpells[0];
    const currentBonusSpells = knownSpells.slice(1);
    
    setInitialSpell(currentInitialSpell);
    setSelectedBonusSpells(new Set(currentBonusSpells));
    setIsEditingBonusSpells(true);
  };

  const handleCancelEdit = () => {
    setIsEditingBonusSpells(false);
  };

  if (selectedClass?.name === 'Gnome' && !progression.selectedSpellList) {
      return (
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 text-center">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Choose Your Arcane Path</h3>
              <p className="text-gray-400 mb-6">As a Gnome, you must choose to study the spells of either a Magic-User or an Illusionist. This choice is permanent.</p>
              <div className="flex justify-center gap-4">
                  <button 
                      onClick={() => progression.setSelectedSpellList('Magic-User')}
                      className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg"
                  >
                      Magic-User Spells
                  </button>
                  <button 
                      onClick={() => progression.setSelectedSpellList('Illusionist')}
                      className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg"
                  >
                      Illusionist Spells
                  </button>
              </div>
          </div>
      );
  }

  // Finalized View
  if (knownSpells.length > 0 && !isEditingBonusSpells) {
    return (
      <div className="bg-black/30 p-6 rounded-lg border border-gray-700">
        <div>
          <h3 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-600 pb-2">Your Starting Spellbook</h3>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {knownSpells.map(spellName => {
              const spellDetails = SPELLS.find(s => s.name === spellName);
              if (!spellDetails) return null;
              return (
                <li key={spellName} className="bg-gray-900/50 p-3 rounded-md">
                  <p className="font-bold text-yellow-300">{spellDetails.name}</p>
                  <p className="text-sm text-gray-400 mt-1">{spellDetails.description}</p>
                </li>
              );
            })}
          </ul>
          {bonusSpellSlots > 0 && (
            <div className="text-center mt-4 pt-4 border-t border-gray-600">
                <button 
                    onClick={handleEditBonusSpells}
                    className="flex items-center justify-center gap-2 bg-sky-800/70 hover:bg-sky-700/70 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                    <EditIcon className="h-5 w-5" />
                    Change Bonus Spells
                </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Bonus Spell Selection View
  if (initialSpell && bonusSpellSlots > 0) {
    const spellDetails = SPELLS.find(s => s.name === initialSpell);
    const bonusSpellsPool = availableSpells.filter(s => s.name !== initialSpell);

    return (
        <div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-lg font-bold text-yellow-300 text-center">Complete Your Spellbook</h3>
                <p className="text-sm text-gray-400 text-center">{bonusSpellsExplanation}</p>
                <p className="text-center font-bold text-lg mt-2">Selected: {selectedBonusSpells.size} / {bonusSpellSlots}</p>
            </div>

            <div className="mb-6">
                <h4 className="font-bold text-gray-300 mb-2">Your First Spell (Locked):</h4>
                <div className="bg-gray-900/50 p-3 rounded-md border-2 border-green-500/50 opacity-70">
                    <p className="font-bold text-green-300">{spellDetails?.name}</p>
                    <p className="text-sm text-gray-400 mt-1">{spellDetails?.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {bonusSpellsPool.map(spell => (
                    <SpellCard
                        key={spell.name}
                        spell={spell}
                        isSelected={selectedBonusSpells.has(spell.name)}
                        onSelect={() => handleToggleBonusSpell(spell.name)}
                        isDisabled={selectedBonusSpells.size >= bonusSpellSlots && !selectedBonusSpells.has(spell.name)}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center gap-4">
                {isEditingBonusSpells && (
                    <button
                        onClick={handleCancelEdit}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
                    >
                        Cancel
                    </button>
                )}
                <button
                    onClick={handleConfirmSpellbook}
                    disabled={selectedBonusSpells.size !== bonusSpellSlots}
                    className="bg-green-700 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                    <CheckIcon className="mr-2 h-6 w-6" />
                    {isEditingBonusSpells ? 'Confirm Changes' : 'Confirm Spellbook'}
                </button>
            </div>
        </div>
    );
  }

  // Result View
  if (rolledSpell) {
    const spellDetails = SPELLS.find(s => s.name === rolledSpell);
    return (
      <div className="text-center">
        <p className="text-gray-400 mb-4">Fate has chosen your spell:</p>
        <div className="bg-gray-900/50 p-6 rounded-lg border-2 border-yellow-400 my-4 max-w-md mx-auto shadow-lg shadow-yellow-500/10">
          <h3 className="text-3xl font-bold text-yellow-300">{spellDetails?.name}</h3>
          <p className="text-gray-300 mt-2">{spellDetails?.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button 
            onClick={() => handleFinalizeInitialSpell(rolledSpell)} 
            className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Keep this Spell
          </button>
          <button 
            onClick={() => handleFinalizeInitialSpell(defaultSpell)} 
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Take "{defaultSpell}" Instead
          </button>
        </div>
      </div>
    );
  }

  // Selection View
  return (
    <div>
      <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 mb-6 text-center">
        <h3 className="text-lg font-bold text-yellow-300">
          {favoriteSpells.size} / 4 Spells Selected
        </h3>
        <p className="text-sm text-gray-400">Choose your four favorite first-level spells.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {availableSpells.map(spell => (
          <SpellCard
            key={spell.name}
            spell={spell}
            isSelected={favoriteSpells.has(spell.name)}
            onSelect={() => handleToggleFavorite(spell.name)}
            isDisabled={favoriteSpells.size >= 4 && !favoriteSpells.has(spell.name)}
          />
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={handleRollSpell} 
          disabled={favoriteSpells.size !== 4} 
          className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto"
        >
          <DiceIcon className="mr-2 h-6 w-6"/>
          Determine Starting Spell
        </button>
      </div>
    </div>
  );
};
