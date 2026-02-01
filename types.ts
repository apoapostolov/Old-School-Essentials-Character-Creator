
// FIX: Replaced entire file content with proper type definitions and exports to resolve circular dependencies and missing type errors.
export enum Ability {
  Strength = 'Strength',
  Dexterity = 'Dexterity',
  Constitution = 'Constitution',
  Intelligence = 'Intelligence',
  Wisdom = 'Wisdom',
  Charisma = 'Charisma',
}

export type AbilityScores = Record<Ability, number>;

export interface Alignment {
  lawful: boolean;
  neutral: boolean;
  chaotic: boolean;
}

export interface SavingThrowRange {
  levels: string;
  D: number;
  W: number;
  P: number;
  B: number;
  S: number;
}

// FIX: Added missing 'AttackBonusProgressionRange' type.
export interface AttackBonusProgressionRange {
  levels: string;
  THAC0: number;
  attack_bonus: number;
}

// NEW TYPES FOR CLASS FEATURES
export interface ClassAbility {
  name: string;
  level: number;
  desc: string;
  homebrew?: boolean;
  grants_skills?: { skill: 'find_secret_doors' | 'find_traps' | 'listen_at_doors'; value: number }[];
  'find-secret-door-value'?: number;
  'find-room-trap-value'?: number;
  'listen-at-doors-value'?: number;
  hide_from_list?: boolean;
}

export interface ClassSpellcasting {
  list: string;
  starts_at_level: number;
  highest_spell_level?: number;
  notes?: string;
  homebrew?: boolean;
  default_spell?: string;
  knowsAllSpells?: boolean;
  randomStartingSpell?: boolean;
  bonus_spell_ability?: 'WIS' | 'INT';
  caster_type?: 'Arcane' | 'Divine';
  spell_list_keys?: ('Cleric' | 'Magic-User' | 'Druid' | 'Illusionist')[];
}

export interface ClassFeatureData {
  name: string;
  category: 'Basic' | 'Demihuman' | 'Advanced';
  requirements: Record<string, number>;
  prime_requisites: string[];
  alignment: string;
  hit_die: string;
  max_level: number;
  armor_allowed: string;
  weapons_allowed: string;
  spellcasting: ClassSpellcasting | null;
  turn_undead?: boolean;
  followers?: { gained_at_level: number; notes: string };
  abilities: ClassAbility[];
  // FIX: Added optional sourceId to allow third-party class data to specify its origin.
  sourceId?: SourceID;
  grog_eligible?: boolean;
  skill_type?: 'thief' | 'acrobat' | 'barbarian' | 'ranger' | 'bard';
  prefers_warhorse?: boolean;
  physicalDescription?: {
    male?: string;
    female?: string;
  };
}


export interface ClassInfo {
  name: string;
  group: 'Basic' | 'Demihuman' | 'Advanced';
  requirements: Partial<Record<Ability, number>>;
  primeRequisite: Ability | Ability[];
  hitDie: number;
  startingWealth: string;
  moneyGroup: 'Casters' | 'Skill' | 'Martial' | 'Prestige Martial';
  features?: {
    hpRollRule?: 'dwarf';
    hpBonusPerLevel?: number;
    racialHpDie?: number;
  };
  alignment: string;
  xp: (number | null)[];
  xpPerLevelAfter9: number | null;
  savingThrows: SavingThrowRange[];
  attackBonusProgression: 'Warrior' | 'WarriorFighter' | 'Adventurer' | 'Mage';
  maxLevel: number;
  spellSlots?: { [spellLevel: string]: number[] };
  // NEW PROPERTIES
  armorAllowed: string;
  weaponsAllowed: string;
  spellcastingInfo: ClassSpellcasting | null;
  abilities: ClassAbility[];
  titles?: string[];
  sourceId?: SourceID;
  grog_eligible?: boolean;
  skill_type?: 'thief' | 'acrobat' | 'barbarian' | 'ranger' | 'bard';
  prefers_warhorse?: boolean;
  physicalDescription?: {
    male?: string;
    female?: string;
  };
}


export interface HpRollResult {
  roll: number;
  calculation: string;
}

export interface HpBreakdownEntry {
  source: string;
  calculation:string;
  result: number;
}

export interface HpCalculationResult {
  total: number;
  breakdown: HpBreakdownEntry[];
}

export interface MoneyBreakdownEntry {
    source: string;
    calculation: string;
    result: number;
}

export interface MoneyCalculationResult {
    total: number;
    breakdown: MoneyBreakdownEntry[];
}

export interface Item {
  name: string;
  cost: number;
  description: string;
  thac0_ac?: number;
  ascending_ac?: number;
  weight: number; // in coins (cn)
  category: 'Weapon' | 'Armor' | 'Ammunition' | 'Gear' | 'Poison';
  tag?: 'ranged';
  damage?: string;
  qualities?: string[];
  isMelee?: boolean;
  isMissile?: boolean;
  ranges?: number[];
  sourceId?: SourceID;
  carry_type?: 'worn' | 'stowed';
}

export interface EquipmentKitVariant {
  name: string;
  cost: number;
  items: string[]; // item keys
}

export interface EquipmentKit {
  id: string;
  name: string;
  type: 'Martial' | 'Specialized';
  description: string;
  variants: EquipmentKitVariant[];
  sourceId?: SourceID;
}

export type LifestyleKey = 'Wretched' | 'Squalid' | 'Poor' | 'Modest' | 'Comfortable' | 'Wealthy' | 'Aristocratic';

export interface Lifestyle {
    name: LifestyleKey;
    cost: string;
    description: string;
    weaponQuality: string;
    armorQuality: string;
    clothingQuality: string;
    hygieneQuality: string;
    backgroundStyle: string;
}

export interface CharacterTraits {
  positivePhysical: string;
  positiveMental: string;
  negative: string;
  lifeStandard?: string;
  lifestyleKey?: LifestyleKey;
}

// FIX: Defined and exported the 'Emotion' interface to break the circular dependency.
export interface Emotion {
  name: string;
  prompt: string;
}

export type Theme = string; // Now a string to be dynamic

export interface ThemeConfig {
  displayName: string;
  portrait: {
    theme: string;
    setting: string;
    atmosphere: string;
    visualStyle: string;
    additionalDetails: string;
  };
  name: {
    promptDescription: string;
  };
  traits: {
    promptDescription: string;
  };
}

export interface Spell {
  name: string;
  level: number;
  description: string;
  class: 'Cleric' | 'Magic-User' | 'Druid' | 'Illusionist';
  sourceId?: SourceID;
}

export enum ThiefSkill {
  OpenLocks = 'Open Locks',
  FindRemoveTraps = 'Find/Remove Traps',
  PickPockets = 'Pick Pockets',
  MoveSilently = 'Move Silently',
  ClimbSheerSurfaces = 'Climb Sheer Surfaces',
  HideInShadows = 'Hide in Shadows',
  HearNoise = 'Hear Noise',
}

export type ThiefSkillIncreases = Record<number, Partial<Record<ThiefSkill, number>>>;
export type CalculatedThiefSkills = Record<ThiefSkill, { value: number; display: string; }>;


export enum AcrobatSkill {
    ClimbSheerSurfaces = 'Climb Sheer Surfaces',
    Falling = 'Falling',
    HideInShadows = 'Hide in Shadows',
    MoveSilently = 'Move Silently',
    TightropeWalking = 'Tightrope Walking',
}

export type AcrobatSkillIncreases = Record<number, Partial<Record<AcrobatSkill, number>>>;
export type CalculatedAcrobatSkills = Record<AcrobatSkill, { value: number; display: string; }>;

export enum BarbarianSkill {
    ClimbSheerSurfaces = 'Climb Sheer Surfaces',
    HideInUndergrowth = 'Hide in Undergrowth',
    MoveSilently = 'Move Silently',
}

export type BarbarianSkillIncreases = Record<number, Partial<Record<BarbarianSkill, number>>>;
export type CalculatedBarbarianSkills = Record<BarbarianSkill, { value: number; display: string; }>;

export enum RangerSkill {
    HearNoise = 'Hear Noise',
    HideInShadows = 'Hide in Shadows',
    MoveSilently = 'Move Silently',
}

export type RangerSkillIncreases = Record<number, Partial<Record<RangerSkill, number>>>;
export type CalculatedRangerSkills = Record<RangerSkill, { value: number; display: string; }>;

export enum BardSkill {
    PickPockets = 'Pick Pockets',
    MoveSilently = 'Move Silently',
    HideInShadows = 'Hide in Shadows',
    HearNoise = 'Hear Noise',
}

export type BardSkillIncreases = Record<number, Partial<Record<BardSkill, number>>>;
export type CalculatedBardSkills = Record<BardSkill, { value: number; display: string; }>;

export type FavoredTerrain = 'Forests & Woodlands' | 'Hills & Mountains' | 'Plains & Grasslands' | 'Swamps & Marshes' | 'Deserts & Wastelands' | 'Coastal & Riverlands';


export type Tab = 'roll' | 'manage' | 'final';

export type CustomItem = { id: string; itemKey: string };

export type SelectedKit = {
  kitId: string;
  variantName: string;
  cost: number;
  items: string[]; // item keys
} | null;

export interface Language {
  roll: number | string;
  name: string;
  description?: string;
  assignedRace?: string;
}

export interface Grog {
  scores: AbilityScores;
  hp: number;
  equipment: string[]; // item keys
  name: string | null;
  traits: CharacterTraits | null;
  portrait: string | null;
  trinkets: string | null;
  secondarySkills: string[] | null;
}

export type SourceID = 'ose' | 'shrike' | 'dolmenwood' | 'gods' | 'mystara' | 'northland';
export interface Source {
    id: SourceID;
    name: string;
    isDefault?: boolean;
    publisher?: string;
    theme?: string;
    setting?: string;
}

// FIX: Added LanguageSetting interface export for use in useAggregatedData hook.
export interface LanguageSetting {
  name: string;
  description: string;
  defaultCommon: string;
  commonOptions: string[];
  languages: Language[];
}

// FIX: Added SecondarySkillEntry interface export for use in useAggregatedData hook.
export interface SecondarySkillEntry {
  min: number;
  max: number;
  skill: string;
  lifestyle: LifestyleKey;
}

export interface RaceFeature {
  name: string;
  text: string;
  shown_on_sheet?: boolean;
}

export interface Race {
  name: string;
  sourceId?: SourceID;
  description: string;
  physicalDescription?: {
    male?: string;
    female?: string;
  };
  available_classes_max_level: Record<string, number | 'Unlimited'>;
  // FIX: Added 'min_str' and 'min_cha' to support additional racial requirements.
  requirements: Partial<Record<'min_int' | 'min_con' | 'min_dex' | 'min_str' | 'min_cha', number>>;
  ability_modifiers: Partial<Record<'con' | 'dex' | 'cha' | 'str' | 'int' | 'wis', number>>;
  languages: string[];
  features: RaceFeature[];
  racialHpDie?: number;
  listen_at_doors_value?: number;
  find_secret_doors_value?: number;
  find_room_traps_value?: number;
}

// Save System Types (System Agnostic)
export interface CharacterSaveData {
  version: string; // Save format version for future-proofing
  system: string; // e.g., 'delta-green', 'call-of-cthulhu', 'ose'
  timestamp: number;
  characterData: Record<string, any>; // Generic character data object
  metadata?: {
    characterName?: string;
    customName?: string;
    notes?: string;
  };
}

export interface SaveSlot {
  characterName: string;
  customName?: string;
  system: string;
  timestamp: number;
  data: CharacterSaveData;
}
