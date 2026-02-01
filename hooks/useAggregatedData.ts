

import { useMemo } from 'react';
import type { ClassInfo, Item, EquipmentKit, ThemeConfig, SourceID, LanguageSetting, SecondarySkillEntry, ClassFeatureData, SavingThrowRange, Theme, Spell, Race } from '../types';
import { Ability } from '../types';
import type { SheetConfig } from '../third-party/ose/sheet-config';

// Import the manifest, which now handles all third-party data
import { thirdPartyData } from '../third-party/manifest';

// Base Data (OSE)
import { CLASS_FEATURES_DATA as BASE_CLASS_FEATURES } from '../class-features';
import { RACES_DATA as BASE_RACES } from '../races-data';
import { ITEMS as BASE_ITEMS } from '../item-data';
import { EQUIPMENT_KITS as BASE_KITS } from '../equipment-kits';
import { SPELLS as BASE_SPELLS } from '../spells-data';
import { THEMES as BASE_THEMES } from '../theme-data';
import { LANGUAGE_SETTINGS as BASE_LANGUAGES } from '../language-data';
import { SECONDARY_SKILLS as BASE_SECONDARY_SKILLS } from '../secondary-skills-data';
import { LIFESTYLES } from '../lifestyle-data';
import { PDF_FIELD_MAP as OSE_PDF_MAP } from '../third-party/ose/pdf-fields-config';
import { SHEET_CONFIG as OSE_SHEET_CONFIG } from '../third-party/ose/sheet-config';
import * as OSE_CLASS_DATA from '../class-data';

const addSourceIdToItems = (items: Record<string, Item>, sourceId: SourceID): Record<string, Item> => {
  const newItems: Record<string, Item> = {};
  for (const key in items) {
    newItems[key] = { ...items[key], sourceId };
  }
  return newItems;
};

const addSourceIdToKits = (kits: EquipmentKit[], sourceId: SourceID): EquipmentKit[] => {
  return kits.map(kit => ({ ...kit, sourceId }));
};

const addSourceIdToSpells = (spells: Spell[], sourceId: SourceID): Spell[] => {
    return spells.map(spell => ({...spell, sourceId}));
};

const addSourceIdToRaces = (races: Race[], sourceId: SourceID): Race[] => {
    return races.map(race => ({...race, sourceId}));
};

const abilityStringToEnum = (str: string): Ability | undefined => {
    const mapping: Record<string, Ability> = { 'STR': Ability.Strength, 'DEX': Ability.Dexterity, 'CON': Ability.Constitution, 'INT': Ability.Intelligence, 'WIS': Ability.Wisdom, 'CHA': Ability.Charisma };
    return mapping[str.toUpperCase()];
};


export interface AggregatedData {
    CLASSES: ClassInfo[];
    RACES: Race[];
    ITEMS: Record<string, Item>;
    EQUIPMENT_KITS: EquipmentKit[];
    SPELLS: Spell[];
    THEMES: Record<string, ThemeConfig>;
    LANGUAGE_SETTINGS: Record<string, LanguageSetting>;
    SECONDARY_SKILLS: Record<Theme, SecondarySkillEntry[]>;
    LIFESTYLES: typeof LIFESTYLES;
    SHEET_CONFIGS: Partial<Record<SourceID, SheetConfig>>;
    PDF_FIELD_MAPS: Partial<Record<SourceID, any>>;
}

export const useAggregatedData = (selectedSources: Set<SourceID>): AggregatedData => {
    const aggregatedData = useMemo(() => {
        // Initialize with base OSE data
        let allClassFeatures: ClassFeatureData[] = [];
        let allRaces: Race[] = [];
        let allItems: Record<string, Item> = {};
        let allKits: EquipmentKit[] = [];
        let allSpells: Spell[] = [];
        let allThemes: Record<string, ThemeConfig> = {};
        let allLanguages: Record<string, LanguageSetting> = {};
        let allSecondarySkills: Record<Theme, SecondarySkillEntry[]> = { ...BASE_SECONDARY_SKILLS };
        let allSheetConfigs: Partial<Record<SourceID, SheetConfig>> = { 'ose': OSE_SHEET_CONFIG };
        let allPdfFieldMaps: Partial<Record<SourceID, any>> = { 'ose': OSE_PDF_MAP };

        // AGGREGATE CLASS DATA
        let aggregatedClassTitles = {...OSE_CLASS_DATA.CLASS_TITLES};
        let aggregatedSpellSlots = {...OSE_CLASS_DATA.SPELL_SLOTS_DATA};
        let aggregatedXpData = {...OSE_CLASS_DATA.XP_DATA};
        let aggregatedSavingThrows = {...OSE_CLASS_DATA.SAVING_THROWS_DATA};
        let aggregatedAttackData = {...OSE_CLASS_DATA.ATTACK_DATA};
        let aggregatedSupplementalData = {...OSE_CLASS_DATA.SUPPLEMENTAL_CLASS_DATA};

        if (selectedSources.has('ose')) {
            allClassFeatures.push(...BASE_CLASS_FEATURES.map(c => ({...c, sourceId: 'ose' as SourceID})));
            allRaces.push(...addSourceIdToRaces(BASE_RACES, 'ose'));
            allItems = { ...allItems, ...addSourceIdToItems(BASE_ITEMS, 'ose') };
            allKits.push(...addSourceIdToKits(BASE_KITS, 'ose'));
            allSpells.push(...addSourceIdToSpells(BASE_SPELLS, 'ose'));
            allThemes = { ...allThemes, ...BASE_THEMES };
            allLanguages = { ...allLanguages, ...BASE_LANGUAGES };
        }
        
        // Dynamically aggregate data from selected third-party sources using the manifest
        for (const sourceId of selectedSources) {
            if (sourceId === 'ose') continue;
            
            const sourceData = thirdPartyData[sourceId];
            if (sourceData) {
                allClassFeatures.push(...sourceData.features);
                allRaces.push(...addSourceIdToRaces(sourceData.races, sourceId));
                allItems = { ...allItems, ...addSourceIdToItems(sourceData.items, sourceId) };
                allKits.push(...addSourceIdToKits(sourceData.kits, sourceId));
                allSpells.push(...addSourceIdToSpells(sourceData.spells, sourceId));
                allThemes = { ...allThemes, ...sourceData.themes };
                allLanguages = { ...allLanguages, ...sourceData.languages };
                allSecondarySkills = { ...allSecondarySkills, ...sourceData.secondarySkills };
                allSheetConfigs[sourceId] = sourceData.sheetConfig;
                allPdfFieldMaps[sourceId] = sourceData.pdfMap;

                // Merge class data from the source
                aggregatedClassTitles = { ...aggregatedClassTitles, ...sourceData.classData.CLASS_TITLES };
                aggregatedSpellSlots.classes = { ...aggregatedSpellSlots.classes, ...sourceData.classData.SPELL_SLOTS_DATA.classes };
                aggregatedXpData = { ...aggregatedXpData, ...sourceData.classData.XP_DATA };
                aggregatedSavingThrows = { ...aggregatedSavingThrows, ...sourceData.classData.SAVING_THROWS_DATA };
                aggregatedAttackData.classes = { ...aggregatedAttackData.classes, ...sourceData.classData.ATTACK_DATA.classes };
                aggregatedSupplementalData = { ...aggregatedSupplementalData, ...sourceData.classData.SUPPLEMENTAL_CLASS_DATA };
            }
        }

        const buildClasses = (features: ClassFeatureData[]): ClassInfo[] => {
            const resolveSaves = (className: string): SavingThrowRange[] => {
                let data = aggregatedSavingThrows[className];
                let depth = 0;
                while (data && 'alias_of' in data && depth < 10) {
                    data = aggregatedSavingThrows[data.alias_of];
                    depth++;
                }
                if (data && 'saves_by_level_ranges' in data) {
                    return data.saves_by_level_ranges;
                }
                return (aggregatedSavingThrows['Fighter'] as { saves_by_level_ranges: SavingThrowRange[] }).saves_by_level_ranges;
            };

            return features.map(classData => {
                const supplemental = aggregatedSupplementalData[classData.name] || { startingWealth: '3d6*10', moneyGroup: 'Martial' };
                const xpInfo = aggregatedXpData[classData.name] || { xp_to_level: [], per_level_after_9: null };
                const savingThrowsInfo = resolveSaves(classData.name);
                const spellSlotsInfo = aggregatedSpellSlots.classes[classData.name as keyof typeof aggregatedSpellSlots.classes];
                const titles = aggregatedClassTitles[classData.name];
                
                const requirements: Partial<Record<Ability, number>> = {};
                for (const reqAbbr in classData.requirements) {
                    const abilityEnum = abilityStringToEnum(reqAbbr);
                    if (abilityEnum) {
                        requirements[abilityEnum] = classData.requirements[reqAbbr];
                    }
                }

                const primeRequisitesEnum = classData.prime_requisites.map(pr => abilityStringToEnum(pr)).filter((ab): ab is Ability => !!ab);

                return {
                    name: classData.name,
                    group: classData.category,
                    requirements: requirements,
                    primeRequisite: primeRequisitesEnum.length === 1 ? primeRequisitesEnum[0] : primeRequisitesEnum,
                    hitDie: parseInt(classData.hit_die.substring(2), 10),
                    startingWealth: supplemental.startingWealth,
                    moneyGroup: supplemental.moneyGroup,
                    features: supplemental.features,
                    alignment: classData.alignment,
                    xp: xpInfo.xp_to_level,
                    xpPerLevelAfter9: xpInfo.per_level_after_9,
                    savingThrows: savingThrowsInfo,
                    attackBonusProgression: aggregatedAttackData.classes[classData.name] || 'NonMartial',
                    maxLevel: classData.max_level,
                    spellSlots: spellSlotsInfo ? spellSlotsInfo.slots_by_level : undefined,
                    armorAllowed: classData.armor_allowed,
                    weaponsAllowed: classData.weapons_allowed,
                    spellcastingInfo: classData.spellcasting,
                    abilities: classData.abilities,
                    titles: titles,
                    sourceId: classData.sourceId,
                    grog_eligible: classData.grog_eligible,
                    skill_type: classData.skill_type,
                    prefers_warhorse: classData.prefers_warhorse,
                    physicalDescription: classData.physicalDescription,
                };
            });
        };

        const allClasses = buildClasses(allClassFeatures);

        return {
            CLASSES: allClasses,
            RACES: allRaces,
            ITEMS: allItems,
            EQUIPMENT_KITS: allKits,
            SPELLS: allSpells,
            THEMES: allThemes,
            LANGUAGE_SETTINGS: allLanguages,
            SECONDARY_SKILLS: allSecondarySkills,
            LIFESTYLES: LIFESTYLES,
            SHEET_CONFIGS: allSheetConfigs,
            PDF_FIELD_MAPS: allPdfFieldMaps,
        };
    }, [selectedSources]);

    return aggregatedData;
};