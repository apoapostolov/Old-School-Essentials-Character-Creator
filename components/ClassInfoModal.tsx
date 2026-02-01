
import React, { useMemo } from 'react';
import type { ClassInfo, Race } from '../types';
import { HomebrewIcon } from './icons/HomebrewIcon';
import { NameWithSource } from './NameWithSource';
import { isClassRestrictedByRace } from '../utils/character';

interface ClassInfoModalProps {
  classInfo: ClassInfo;
  onClose: () => void;
  selectedRace: Race | null;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="bg-gray-900/50 p-2 rounded-md">
        <p className="text-xs font-bold uppercase text-gray-500">{label}</p>
        <p className="text-gray-200 font-semibold">{value}</p>
    </div>
);


export const ClassInfoModal: React.FC<ClassInfoModalProps> = ({ classInfo, onClose, selectedRace }) => {
  const isRestricted = useMemo(() => isClassRestrictedByRace(classInfo, selectedRace), [classInfo, selectedRace]);

  const primeReqs = Array.isArray(classInfo.primeRequisite) ? classInfo.primeRequisite.join(', ') : classInfo.primeRequisite;
  const reqValue = Object.entries(classInfo.requirements).map(([ability, minScore]) => `${ability} ${minScore}`).join(', ');
  
  const racialHpDieInfo = useMemo(() => {
    const classDie = classInfo.features?.racialHpDie ?? 4;
    const raceDie = selectedRace?.racialHpDie ?? 4;
    const finalDie = Math.max(classDie, raceDie);
    let source = '';
    if (finalDie > classDie && selectedRace) {
        source = selectedRace.name;
    }
    return { die: finalDie, source };
  }, [classInfo, selectedRace]);

  const defaultSpell = classInfo.spellcastingInfo?.default_spell || 'N/A';
  
  const maxLevelDisplay = useMemo(() => {
    let currentMax: number | 'Unlimited' | 'Not Available' = classInfo.maxLevel;
    let limitedByRace = false;

    if (selectedRace) {
        const raceMax = selectedRace.available_classes_max_level[classInfo.name] ?? selectedRace.available_classes_max_level[`${classInfo.name}*`];
        
        if (raceMax !== undefined) {
            currentMax = raceMax;
            limitedByRace = true;
        } else if (selectedRace.available_classes_max_level['All non-demihuman classes'] === 'Unlimited' && classInfo.group !== 'Demihuman') {
            currentMax = 'Unlimited';
            limitedByRace = true;
        } else {
            if (isRestricted) {
                 currentMax = 'Not Available';
            }
        }
    }
    
    const levelString = currentMax === 99 ? 'Unlimited' : `${currentMax}`;
    
    if (limitedByRace && selectedRace && levelString !== 'Not Available') {
        return `${levelString} (${selectedRace.name})`;
    }
    
    return levelString;
  }, [classInfo, selectedRace, isRestricted]);

  const maxLevelForTables = useMemo(() => {
    if (isRestricted) return 0;
    
    let raceMax: number | 'Unlimited' = 'Unlimited';
    if (selectedRace) {
        const value = selectedRace.available_classes_max_level[classInfo.name] ?? 
                      selectedRace.available_classes_max_level[`${classInfo.name}*`] ??
                      (selectedRace.available_classes_max_level['All non-demihuman classes'] === 'Unlimited' && classInfo.group !== 'Demihuman' ? 'Unlimited' : undefined);
        if (value !== undefined) {
            raceMax = value;
        }
    }

    const numericRaceMax = (raceMax === 'Unlimited') ? Infinity : (raceMax as number);
    return Math.min(classInfo.maxLevel, numericRaceMax);
  }, [classInfo, selectedRace, isRestricted]);


  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="class-info-modal-title"
    >
      <div
        className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between p-4 border-b border-gray-700">
          <div>
            <h2 id="class-info-modal-title" className="text-3xl font-bold text-yellow-400">
                <NameWithSource name={classInfo.name} sourceId={classInfo.sourceId} />
            </h2>
            <p className="text-lg text-gray-400 font-semibold">{classInfo.group} Class</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 overflow-y-auto space-y-6">
            {isRestricted && selectedRace && (
                <div className="bg-red-900/40 border border-red-500/50 text-red-300 p-4 rounded-lg text-center font-semibold">
                    This class is restricted for the {selectedRace.name} race.
                </div>
            )}
            <section>
                <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">Core Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <DetailItem label="Prime Requisite(s)" value={primeReqs} />
                    <DetailItem label="Requirements" value={reqValue} />
                    <DetailItem label="Racial Hit Die" value={`1d${racialHpDieInfo.die}${racialHpDieInfo.source ? ` (${racialHpDieInfo.source})` : ''}`} />
                    <DetailItem label="Hit Die" value={`1d${classInfo.hitDie}`} />
                    <DetailItem label="Max Level" value={maxLevelDisplay} />
                    <DetailItem label="Alignment" value={classInfo.alignment} />
                </div>
            </section>
            
             <section>
                <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">Combat Proficiencies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <DetailItem label="Armor Allowed" value={classInfo.armorAllowed} />
                    <DetailItem label="Weapons Allowed" value={classInfo.weaponsAllowed} />
                </div>
            </section>

            {classInfo.spellcastingInfo && (
                <section>
                     <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2 flex items-center gap-3">
                        <span>Spellcasting</span>
                        {classInfo.spellcastingInfo.homebrew && <HomebrewIcon className="text-amber-400 text-xl" title="Homebrew Spellcasting Rules" />}
                     </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <DetailItem label="Spell List" value={classInfo.spellcastingInfo.list} />
                        <DetailItem label="Starts at Level" value={classInfo.spellcastingInfo.starts_at_level} />
                        <DetailItem label="Highest Spell Level" value={classInfo.spellcastingInfo.highest_spell_level ?? 'N/A'} />
                        <DetailItem label="Default Starting Spell" value={defaultSpell} />
                    </div>
                    {classInfo.spellcastingInfo.notes && (
                        <div className="bg-gray-900/50 p-3 rounded-md text-gray-300">
                             <p className="italic text-sm">{classInfo.spellcastingInfo.notes}</p>
                        </div>
                    )}
                </section>
            )}

            <section>
                <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">Class Abilities</h3>
                <ul className="space-y-4">
                    {classInfo.abilities.map(ability => (
                        <li key={ability.name} className="bg-gray-900/50 p-3 rounded-md">
                            <div className="flex items-center gap-3">
                                <h4 className="text-lg font-bold text-yellow-300">{ability.name}</h4>
                                <span className="text-xs font-semibold bg-gray-700 px-2 py-0.5 rounded-full text-gray-300">Lvl {ability.level}</span>
                                {ability.homebrew && <HomebrewIcon className="text-amber-400 text-lg" title="Homebrew Ability" />}
                            </div>
                            <p className="text-gray-300 mt-1">{ability.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>
            
            {!isRestricted && (
                <section>
                    <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">XP Progression</h3>
                    <div>
                        <table className="w-full text-left text-sm table-fixed">
                            <thead className="sticky top-0 bg-gray-800">
                                <tr>
                                    <th className="p-2 font-semibold text-gray-400 w-1/4">Level</th>
                                    <th className="p-2 font-semibold text-gray-400">XP Required</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {Array.from({ length: maxLevelForTables }, (_, i) => {
                                    const level = i + 1;
                                    const xp = classInfo.xp[i];
                                    const xpDisplay = xp?.toLocaleString() ?? 'N/A';
                                    return (
                                        <tr key={level} className="hover:bg-gray-700/50">
                                            <td className="p-2 font-bold text-white">{level}</td>
                                            <td className="p-2 text-gray-300">{xpDisplay}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {!isRestricted && classInfo.spellSlots && (
                <section>
                    <h3 className="text-xl font-bold text-gray-300 mb-3 border-b-2 border-gray-700 pb-2">Spell Slots per Level</h3>
                    <div>
                        <table className="w-full text-left text-sm table-fixed">
                            <thead className="sticky top-0 bg-gray-800">
                                <tr>
                                    <th className="p-2 font-semibold text-gray-400 w-[50px]">Lvl</th>
                                    {Object.keys(classInfo.spellSlots).sort().map(spellLevel => (
                                        <th key={spellLevel} className="p-2 font-semibold text-gray-400 text-center">L{spellLevel}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {Array.from({ length: maxLevelForTables }, (_, i) => {
                                    const level = i + 1;
                                    const hasAnySlotsThisLevel = Object.values(classInfo.spellSlots!).some(slots => slots[i] > 0);
                                    if (!hasAnySlotsThisLevel && classInfo.spellcastingInfo && level < classInfo.spellcastingInfo.starts_at_level) {
                                      return (
                                        <tr key={level} className="hover:bg-gray-700/50">
                                            <td className="p-2 font-bold text-white">{level}</td>
                                            {Object.keys(classInfo.spellSlots!).sort().map(spellLevel => (
                                                <td key={`${level}-${spellLevel}`} className="p-2 text-gray-300 text-center">—</td>
                                            ))}
                                        </tr>
                                      );
                                    }
                                    return (
                                        <tr key={level} className="hover:bg-gray-700/50">
                                            <td className="p-2 font-bold text-white">{level}</td>
                                            {Object.keys(classInfo.spellSlots!).sort().map(spellLevel => (
                                                <td key={`${level}-${spellLevel}`} className="p-2 text-gray-300 text-center">
                                                    {classInfo.spellSlots![spellLevel][i] || '—'}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

        </div>
      </div>
    </div>
  );
};
