import type { KarameikosState } from './hooks/useKarameikos';
import type { AbilityScores, CalculatedAcrobatSkills, CalculatedBarbarianSkills, CalculatedBardSkills, CalculatedRangerSkills, CalculatedThiefSkills, ClassInfo, FavoredTerrain, Grog, HpCalculationResult, Item, Race, Spell } from './types';
import { getAttackValuesForLevel, getFindRoomTrapChance, getFindSecretDoorChance, getListenAtDoorsChance, getModifier, getModifierString, getOpenDoorsChance, getSavingThrowsForLevel, getStartingXPForLevel, getTitleForLevel, getXPForNextLevel, getXPModifierString } from './utils/character';
import { getEncumbranceDetails, roundToNearest5 } from './utils/encumbrance';
import { getBonusSpellSlots } from './utils/spells';

interface CharacterSheetData {
    classInfo: ClassInfo;
    scores: AbilityScores;
    characterName: string;
    characterLevel: number;
    hpResult: HpCalculationResult;
    allItemKeys: string[];
    equipmentWeight: number;
    // FIX: Added movementSpeed to the interface to resolve type error.
    movementSpeed: number;
    calculatedThiefSkills: CalculatedThiefSkills | null;
    calculatedAcrobatSkills: CalculatedAcrobatSkills | null;
    calculatedBarbarianSkills: CalculatedBarbarianSkills | null;
    calculatedRangerSkills: CalculatedRangerSkills | null;
    calculatedBardSkills: CalculatedBardSkills | null;
    favoredTerrain: FavoredTerrain | null;
    finalMoney: number;
    characterDescription: { line1: string; line2: string } | null;
    knownSpells: string[];
    grog: Grog | null;
    languages: string[];
    secondarySkills: string[] | null;
    lifeStandard: string | null;
    PDF_FIELD_MAP: any;
    aggregatedItems: Record<string, Item>;
    aggregatedSpells: Spell[];
    race: Race | null;
    karameikos: KarameikosState | null;
}

export const getCharacterSheetFields = (data: CharacterSheetData): { [key: string]: any } => {
  const {
    classInfo, scores, characterName, characterLevel, hpResult, allItemKeys,
    equipmentWeight, movementSpeed, calculatedThiefSkills, calculatedAcrobatSkills,
    calculatedBarbarianSkills, calculatedRangerSkills, calculatedBardSkills,
    favoredTerrain, finalMoney, characterDescription, knownSpells, grog,
    languages, secondarySkills, lifeStandard, PDF_FIELD_MAP, aggregatedItems,
        aggregatedSpells, race, karameikos
  } = data;

  const saves = getSavingThrowsForLevel(classInfo, characterLevel);
  const attackValues = getAttackValuesForLevel(classInfo, characterLevel);
  const title = getTitleForLevel(classInfo, characterLevel);
  const wisMod = getModifierString(scores.Wisdom);
  const dexModString = getModifierString(scores.Dexterity);
  const dexMod = getModifier(scores.Dexterity);
  const chaMod = getModifierString(scores.Charisma);
  const strMod = getModifierString(scores.Strength);
  const strModValue = getModifier(scores.Strength);
  const conMod = getModifierString(scores.Constitution);

  const fields: { [key: string]: any } = {};

  fields[PDF_FIELD_MAP.characterName] = characterName;
  fields[PDF_FIELD_MAP.characterLevel] = characterLevel.toString();
  fields[PDF_FIELD_MAP.characterClass] = classInfo.name;
  fields[PDF_FIELD_MAP.title] = title;
  if (race) {
    fields[PDF_FIELD_MAP.race] = race.name;
  }

  fields[PDF_FIELD_MAP.strength] = scores.Strength.toString();
  fields[PDF_FIELD_MAP.strengthMod] = strMod;
  fields[PDF_FIELD_MAP.dexterity] = scores.Dexterity.toString();
  fields[PDF_FIELD_MAP.dexterityMod] = dexModString;
  fields[PDF_FIELD_MAP.constitution] = scores.Constitution.toString();
  fields[PDF_FIELD_MAP.constitutionMod] = conMod;
  fields[PDF_FIELD_MAP.intelligence] = scores.Intelligence.toString();
  fields[PDF_FIELD_MAP.intelligenceMod] = getModifierString(scores.Intelligence);
  fields[PDF_FIELD_MAP.wisdom] = scores.Wisdom.toString();
  fields[PDF_FIELD_MAP.wisdomMod] = wisMod;
  fields[PDF_FIELD_MAP.charisma] = scores.Charisma.toString();
  fields[PDF_FIELD_MAP.charismaMod] = chaMod;

  const equipment = allItemKeys.map(key => aggregatedItems[key]).filter((item): item is Item => !!item);
  const armors = equipment.filter(item => item.category === 'Armor' && typeof item.ascending_ac === 'number' && !item.name.toLowerCase().includes('shield'));
  const bestArmor = armors.reduce((best, current) => (!best || (current.ascending_ac ?? 0) > (best.ascending_ac ?? 0) ? current : best), null as Item | null);
  const hasShield = equipment.some(item => item.category === 'Armor' && item.name.toLowerCase().includes('shield'));
  let finalAC = 10;
  if (bestArmor && typeof bestArmor.ascending_ac === 'number') {
      finalAC = bestArmor.ascending_ac;
  }
  if (hasShield) {
      const shield = aggregatedItems['shield'];
      if (shield && typeof shield.ascending_ac === 'number') {
          finalAC += shield.ascending_ac;
      }
  }
  finalAC += dexMod;

  const unarmoredAcValue = 10 + dexMod;

  fields[PDF_FIELD_MAP.hp] = hpResult.total.toString();
  fields[PDF_FIELD_MAP.ac] = finalAC.toString();
  fields[PDF_FIELD_MAP.initiative] = dexModString;
  fields[PDF_FIELD_MAP.initiativeMod] = dexModString;
  fields[PDF_FIELD_MAP.reactionsMod] = chaMod;
  fields[PDF_FIELD_MAP.acUnarmored] = unarmoredAcValue.toString();
  fields[PDF_FIELD_MAP.attackMelee] = strMod;
  fields[PDF_FIELD_MAP.attackMissile] = dexModString;
  fields[PDF_FIELD_MAP.maxHp] = hpResult.total.toString();
  fields[PDF_FIELD_MAP.conHpMod] = conMod;
  fields[PDF_FIELD_MAP.unarmoredAc2] = unarmoredAcValue.toString();
  fields[PDF_FIELD_MAP.dexAcMod] = dexModString;
  fields[PDF_FIELD_MAP.strMeleeMod] = strMod;
  fields[PDF_FIELD_MAP.dexMissileMod] = dexModString;
  if (attackValues) {
    fields[PDF_FIELD_MAP.thac0] = attackValues.thac0.toString();
    fields[PDF_FIELD_MAP.attackBonus] = `+${attackValues.bonus}`;
  }


  if (saves) {
    fields[PDF_FIELD_MAP.saveDeath] = saves.D.toString();
    fields[PDF_FIELD_MAP.saveWands] = saves.W.toString();
    fields[PDF_FIELD_MAP.saveParalysis] = saves.P.toString();
    fields[PDF_FIELD_MAP.saveBreath] = saves.B.toString();
    fields[PDF_FIELD_MAP.saveSpells] = saves.S.toString();
  }
  fields[PDF_FIELD_MAP.saveMagicMod] = wisMod;
  fields[PDF_FIELD_MAP.magicSaveMod2] = wisMod;

  fields[PDF_FIELD_MAP.xp] = getStartingXPForLevel(classInfo, characterLevel).toString();
  fields[PDF_FIELD_MAP.xpForNextLevel] = getXPForNextLevel(classInfo, characterLevel);
  fields[PDF_FIELD_MAP.xpBonus] = getXPModifierString(classInfo, scores);

  const wornWeight = allItemKeys.reduce((total, key) => {
      const item = aggregatedItems[key];
      if (item && item.carry_type === 'worn') {
          return total + item.weight;
      }
      return total;
  }, 0);

  // FIX: Use passed movementSpeed instead of recalculating.
  const carriedSpeedValue = movementSpeed;
  const { speedValue: combatSpeedValue } = getEncumbranceDetails(wornWeight, scores.Strength);

  fields[PDF_FIELD_MAP.explorationMovement] = `${carriedSpeedValue}'`;
  fields[PDF_FIELD_MAP.encounterMovement] = `${roundToNearest5(combatSpeedValue / 3)}'`;
  fields[PDF_FIELD_MAP.overlandMovement] = `${roundToNearest5(carriedSpeedValue / 5)}`;

  fields[PDF_FIELD_MAP.equipmentEncumbrance] = equipmentWeight.toString();
  fields[PDF_FIELD_MAP.totalEncumbrance] = equipmentWeight.toString();
  fields[PDF_FIELD_MAP.goldPieces] = finalMoney.toString();

  const equipmentItems = allItemKeys.map(key => aggregatedItems[key]).filter(Boolean) as Item[];
  const weaponItems = equipmentItems.filter(i => i.category === 'Weapon');
  const armorItems = equipmentItems.filter(i => i.category === 'Armor');
  const gearItems = equipmentItems.filter(i => i.category !== 'Weapon' && i.category !== 'Armor').sort((a, b) => a.name.localeCompare(b.name));

  const weaponStrings = weaponItems.map(weapon => {
    let damageString = weapon.damage || '';
    if (damageString) {
        let damageMod = 0;
        if (weapon.isMelee) damageMod = strModValue;
        else if (weapon.isMissile) damageMod = dexMod;

        if (damageMod !== 0) damageString += damageMod > 0 ? `+${damageMod}` : `${damageMod}`;
    }

    const allQualities = [];
    if (weapon.isMissile && weapon.ranges && weapon.ranges.length > 0) allQualities.push(`range ${weapon.ranges[0]} feet`);
    if (weapon.qualities && weapon.qualities.length > 0) allQualities.push(...weapon.qualities);

    const details = [];
    if (damageString) details.push(damageString);
    if (allQualities.length > 0) details.push(...allQualities);

    return details.length > 0 ? `${weapon.name} (${details.join(', ')})` : weapon.name;
  });

  const orderedItemNames = [
    ...weaponStrings, ...armorItems.map(i => i.name), ...gearItems.map(i => i.name)
  ];

  const equipmentString = orderedItemNames.join(', ');
  fields[PDF_FIELD_MAP.equipmentList] = equipmentString;

  if (characterDescription) {
    fields[PDF_FIELD_MAP.description1] = characterDescription.line1;
    fields[PDF_FIELD_MAP.description2] = characterDescription.line2;
  }

  fields[PDF_FIELD_MAP.literacy] = scores.Intelligence >= 9;

  const openDoors = getOpenDoorsChance(scores.Strength);
  let listen = getListenAtDoorsChance(race);
  let findSecret = getFindSecretDoorChance(race);
  let findTrap = getFindRoomTrapChance(race);

  classInfo.abilities.forEach(ability => {
      if (ability.level <= characterLevel) {
          // New direct value properties
          if (ability['listen-at-doors-value']) {
              listen = Math.max(listen, ability['listen-at-doors-value']);
          }
          if (ability['find-secret-door-value']) {
              findSecret = Math.max(findSecret, ability['find-secret-door-value']);
          }
          if (ability['find-room-trap-value']) {
              findTrap = Math.max(findTrap, ability['find-room-trap-value']);
          }

          // Legacy grants_skills
          if (ability.grants_skills) {
              ability.grants_skills.forEach(granted => {
                  if (granted.skill === 'listen_at_doors') {
                      listen = Math.max(listen, granted.value);
                  }
                  if (granted.skill === 'find_secret_doors') {
                      findSecret = Math.max(findSecret, granted.value);
                  }
                  if (granted.skill === 'find_traps') {
                      findTrap = Math.max(findTrap, granted.value);
                  }
              });
          }
      }
  });

  // Overridden by specific class skills
  if (calculatedThiefSkills) listen = calculatedThiefSkills['Hear Noise'].value;
  if (calculatedRangerSkills) listen = calculatedRangerSkills['Hear Noise'].value;
  if (calculatedBardSkills) listen = calculatedBardSkills['Hear Noise'].value;

  fields[PDF_FIELD_MAP.listenAtDoor] = listen.toString();
  fields[PDF_FIELD_MAP.openStuckDoor] = openDoors.toString();
  fields[PDF_FIELD_MAP.findSecretDoor] = findSecret.toString();
  fields[PDF_FIELD_MAP.findRoomTrap] = findTrap.toString();

  fields[PDF_FIELD_MAP.languages] = languages.join(', ');

  const abilitiesSections: string[] = [];

  // Add Karameikos background section to notes if available
  if (karameikos && (karameikos.socialStanding || karameikos.ethnos || karameikos.literacy || karameikos.hometown)) {
      const bgLines: string[] = [];
      if (karameikos.socialStanding) {
          const ss = karameikos.socialStanding;
          const gold = ss.goldModifier === 0 ? '+0%' : (ss.goldModifier > 0 ? `+${ss.goldModifier}%` : `${ss.goldModifier}%`);
          // Do not include roll results in Social Standing entry per user request
          bgLines.push(`Social Standing: ${ss.standing} (Starting Gold Modifier ${gold})`);
      }
      if (karameikos.ethnos) {
          const e = karameikos.ethnos;
          bgLines.push(`Ethnos: ${e.origin} (roll ${e.roll} + ${Math.floor((karameikos.socialStanding?.roll ?? 0)/2)} = ${e.modifiedRoll})`);
      }
      if (karameikos.literacy) {
          const l = karameikos.literacy;
          let literacyLine = `Literacy: ${l.proficiencyLevel}`;
          if (karameikos.selectedScripts && karameikos.selectedScripts.length > 0) {
              literacyLine += ` — Additional Scripts: ${karameikos.selectedScripts.join(', ')}`;
          }
          bgLines.push(literacyLine);
      }
      if (karameikos.hometown) {
          const h = karameikos.hometown;
          let town = h.hometown;
          if (karameikos.villageName && (h.hometown === 'Homestead' || h.hometown === 'Village/Town')) {
              const prefix = h.hometown === 'Homestead' ? 'Homestead of ' : 'Village of ';
              town = `${prefix}${karameikos.villageName}`;
          }
          bgLines.push(`Origin: ${town} (roll ${h.roll} + modifiers = ${h.finalRoll})`);
      }
      const bgBlock = `BACKGROUND (KARAMEIKOS)\n\n${bgLines.join('\n')}`;
      abilitiesSections.push(bgBlock);
  }

  if (race) {
      const racialFeatures = race.features
          .filter(f => f.shown_on_sheet)
          .map(f => `${f.name.toUpperCase()}: ${f.text}`)
          .join('\n\n');
      if (racialFeatures) abilitiesSections.push(`RACIAL FEATURES\n\n${racialFeatures}`);
  }

  if (favoredTerrain) abilitiesSections.push(`FAVORED TERRAIN: ${favoredTerrain}`);

  type AnyCalculatedSkills = CalculatedThiefSkills | CalculatedAcrobatSkills | CalculatedBarbarianSkills | CalculatedRangerSkills | CalculatedBardSkills;
  const formatSkills = (skills: AnyCalculatedSkills): string => {
    return Object.entries(skills).map(([skill, data]) => `${skill} ${data.display}`).join(', ');
  };

  const skillLines: string[] = [];
  if (calculatedThiefSkills) skillLines.push(`THIEF SKILLS: ${formatSkills(calculatedThiefSkills)}`);
  if (calculatedAcrobatSkills) skillLines.push(`ACROBAT SKILLS: ${formatSkills(calculatedAcrobatSkills)}`);
  if (calculatedBarbarianSkills) skillLines.push(`WILDERNESS SKILLS: ${formatSkills(calculatedBarbarianSkills)}`);
  if (calculatedRangerSkills && favoredTerrain) skillLines.push(`RANGER SKILLS (in ${favoredTerrain}): ${formatSkills(calculatedRangerSkills)}`);
  if (calculatedBardSkills) skillLines.push(`BARD SKILLS: ${formatSkills(calculatedBardSkills)}`);

  const skillsBlock = skillLines.join('\n\n');
  if (skillsBlock) abilitiesSections.push(skillsBlock);

  const relevantAbilities = classInfo.abilities
      .filter(ability => ability.level <= characterLevel && !ability.hide_from_list)
      .map(ability => `${ability.name.toUpperCase()}${ability.homebrew ? ' (HB)' : ''}: ${ability.desc}`)
      .join('\n\n');
  if (relevantAbilities) abilitiesSections.push(`CLASS ABILITIES\n\n${relevantAbilities}`);

  if (classInfo.spellcastingInfo) {
      let spellcastingDesc = `SPELLCASTING (${classInfo.spellcastingInfo.list}): Starts at level ${classInfo.spellcastingInfo.starts_at_level}.`;
      if (classInfo.spellcastingInfo.notes) spellcastingDesc += ` ${classInfo.spellcastingInfo.notes}`;
      abilitiesSections.push(spellcastingDesc);
  }

  fields[PDF_FIELD_MAP.classAbilities] = abilitiesSections.filter(Boolean).join('\n\n---\n\n');

  const bonusSlots = getBonusSpellSlots(classInfo, scores);
  let allKnownSpellNames: string[] = [...knownSpells];

  if (classInfo.spellcastingInfo?.knowsAllSpells) {
    allKnownSpellNames = [];
    const spellListKeys = classInfo.spellcastingInfo.spell_list_keys || [];
    if (classInfo.spellSlots) {
        for (let i = 1; i <= 6; i++) {
            const spellLevelKey = i.toString();
            const slotsArray = classInfo.spellSlots[spellLevelKey];
            let numSlots = 0;

            if (slotsArray && characterLevel <= slotsArray.length) numSlots = slotsArray[characterLevel - 1];
            const totalSlots = numSlots + (bonusSlots[spellLevelKey] || 0);

            if (totalSlots > 0) {
                const spellsOfLevel = aggregatedSpells
                    .filter(spell => spellListKeys.includes(spell.class) && spell.level === i)
                    .map(spell => spell.name);
                allKnownSpellNames.push(...spellsOfLevel);
            }
        }
    }
  }

  const knownSpellDetails = allKnownSpellNames
      .map(name => aggregatedSpells.find(s => s.name === name))
      .filter((s): s is Spell => !!s);

  if (knownSpellDetails.length > 0) {
      const spellsByLevel: { [level: number]: typeof knownSpellDetails } = {};
      knownSpellDetails.forEach(spell => {
          if (!spellsByLevel[spell.level]) spellsByLevel[spell.level] = [];
          spellsByLevel[spell.level].push(spell);
      });

      let spellDescriptionString = '';
      Object.keys(spellsByLevel).sort((a,b) => parseInt(a) - parseInt(b)).forEach(level => {
          spellDescriptionString += `SPELL LEVEL ${level}\n\n`;
          spellsByLevel[parseInt(level, 10)].forEach(spell => {
              spellDescriptionString += `${spell.name.toUpperCase()}: ${spell.description}\n`;
          });
          spellDescriptionString += '\n';
      });
      fields[PDF_FIELD_MAP.spellDescriptions] = spellDescriptionString.trim();
  }

  if (classInfo.spellSlots) {
      for (let i = 1; i <= 6; i++) {
          const spellLevelKey = i.toString();
          const slotsArray = classInfo.spellSlots[spellLevelKey];
          let numSlots = 0;

          if (slotsArray && characterLevel <= slotsArray.length) numSlots = slotsArray[characterLevel - 1];
          const totalSlots = numSlots + (bonusSlots[spellLevelKey] || 0);

          if (totalSlots > 0) {
              const fieldName = `spellSlot${i}` as keyof typeof PDF_FIELD_MAP;
              if (PDF_FIELD_MAP[fieldName]) fields[PDF_FIELD_MAP[fieldName]] = totalSlots.toString();
          }
      }
  }

    let grogBlock = '';
    if (grog) {
        const grogDexMod = getModifier(grog.scores.Dexterity);
        const grogStrMod = getModifier(grog.scores.Strength);

        const grogEquipment = grog.equipment.map(key => aggregatedItems[key]).filter(Boolean) as Item[];
        const grogArmors = grogEquipment.filter(item => item.category === 'Armor' && !item.name.toLowerCase().includes('shield'));
        const grogBestArmor = grogArmors.reduce((best, current) => (!best || (current.ascending_ac ?? 0) > (best.ascending_ac ?? 0) ? current : best), null as Item | null);
        const grogHasShield = grogEquipment.some(item => item.name.toLowerCase().includes('shield'));

        let grogAC = 10;
        let armorName = 'Unarmored';
        if (grogBestArmor && typeof grogBestArmor.ascending_ac === 'number') {
            grogAC = grogBestArmor.ascending_ac;
            armorName = grogBestArmor.name;
        }
        if (grogHasShield) {
            grogAC += 1;
            armorName = armorName === 'Unarmored' ? 'Shield' : `${armorName} + Shield`;
        }
        grogAC += grogDexMod;

        const grogWeapons = grogEquipment.filter(i => i.category === 'Weapon');
        const weaponStrings = grogWeapons.map(weapon => {
            const bonus = weapon.isMissile ? grogDexMod : grogStrMod;
            const bonusString = bonus >= 0 ? `+${bonus}` : `${bonus}`;
            return `${weapon.name} ${bonusString} (${weapon.damage || 'N/A'})`;
        }).join(', ');

        const equipmentLine = grogEquipment.map(i => i.name).join(', ');
        const abilityString = `STR ${grog.scores.Strength} DEX ${grog.scores.Dexterity} CON ${grog.scores.Constitution} INT ${grog.scores.Intelligence} WIS ${grog.scores.Wisdom} CHA ${grog.scores.Charisma}`;

        const statParts = [
            `${grog.name || 'Grog'}, Fighter1`, abilityString, `HP ${grog.hp}`, `AC ${grogAC} (${armorName})`,
        ];

        if(weaponStrings) statParts.push(weaponStrings);

        const mainStatBlock = statParts.join(', ');
        const equipmentBlock = `Equipment: ${equipmentLine}`;
        const belongingsBlock = `Belongings: ${grog.trinkets || 'None'}`;
        grogBlock = `${mainStatBlock}; ${equipmentBlock}; ${belongingsBlock}`;
    }

    let professionBlock = '';
    if (secondarySkills && secondarySkills.length > 0) {
        professionBlock = `PROFESSION: ${secondarySkills.join(', ')}`;
        if (lifeStandard) professionBlock += `\n${lifeStandard}`;
    }

    const hirelingsAndProfessionContent = [grogBlock, professionBlock].filter(Boolean).join('\n\n');
    if (hirelingsAndProfessionContent) fields[PDF_FIELD_MAP.hirelings] = hirelingsAndProfessionContent;

  return fields;
};
