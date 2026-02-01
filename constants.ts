import { Ability, ThiefSkill, AcrobatSkill, BarbarianSkill, RangerSkill, BardSkill, FavoredTerrain } from './types';

export const ABILITIES: Ability[] = [
  Ability.Strength,
  Ability.Dexterity,
  Ability.Constitution,
  Ability.Intelligence,
  Ability.Wisdom,
  Ability.Charisma,
];

export const THIEF_SKILLS_ORDER: ThiefSkill[] = [
  ThiefSkill.HearNoise,
  ThiefSkill.MoveSilently,
  ThiefSkill.HideInShadows,
  ThiefSkill.ClimbSheerSurfaces,
  ThiefSkill.FindRemoveTraps,
  ThiefSkill.OpenLocks,
  ThiefSkill.PickPockets,
];

export const THIEF_SKILL_DESCRIPTIONS: Record<ThiefSkill, string> = {
  [ThiefSkill.OpenLocks]: 'Pick or bypass locks.',
  [ThiefSkill.FindRemoveTraps]: 'Detect and disable small mechanical traps.',
  [ThiefSkill.PickPockets]: 'Steal unnoticed.',
  [ThiefSkill.MoveSilently]: 'Move without making noise.',
  [ThiefSkill.ClimbSheerSurfaces]: 'Scale vertical surfaces without gear.',
  [ThiefSkill.HideInShadows]: 'Blend into darkness.',
  [ThiefSkill.HearNoise]: 'Detect faint sounds.',
};

export const ACROBAT_SKILLS_ORDER: AcrobatSkill[] = [
    AcrobatSkill.ClimbSheerSurfaces,
    AcrobatSkill.Falling,
    AcrobatSkill.TightropeWalking,
    AcrobatSkill.HideInShadows,
    AcrobatSkill.MoveSilently,
];

export const ACROBAT_SKILL_DESCRIPTIONS: Record<AcrobatSkill, string> = {
    [AcrobatSkill.ClimbSheerSurfaces]: 'Scale vertical surfaces without gear.',
    [AcrobatSkill.Falling]: 'Tumble to reduce or avoid damage from falls.',
    [AcrobatSkill.HideInShadows]: 'Blend into darkness.',
    [AcrobatSkill.MoveSilently]: 'Move without making noise.',
    [AcrobatSkill.TightropeWalking]: 'Maintain balance while walking on narrow surfaces.',
};

export const BARBARIAN_SKILLS_ORDER: BarbarianSkill[] = [
    BarbarianSkill.ClimbSheerSurfaces,
    BarbarianSkill.HideInUndergrowth,
    BarbarianSkill.MoveSilently,
];

export const BARBARIAN_SKILL_DESCRIPTIONS: Record<BarbarianSkill, string> = {
    [BarbarianSkill.ClimbSheerSurfaces]: 'Scale vertical surfaces without gear.',
    [BarbarianSkill.HideInUndergrowth]: 'Blend into natural undergrowth like bushes and forests.',
    [BarbarianSkill.MoveSilently]: 'Move without making noise, especially in natural terrain.',
};

export const RANGER_SKILLS_ORDER: RangerSkill[] = [
    RangerSkill.HearNoise,
    RangerSkill.HideInShadows,
    RangerSkill.MoveSilently,
];

export const RANGER_SKILL_DESCRIPTIONS: Record<RangerSkill, string> = {
    [RangerSkill.HearNoise]: 'Detect faint sounds within your favored terrain.',
    [RangerSkill.HideInShadows]: 'Blend into darkness within your favored terrain.',
    [RangerSkill.MoveSilently]: 'Move without making noise within your favored terrain.',
};

export const BARD_SKILLS_ORDER: BardSkill[] = [
    BardSkill.HearNoise,
    BardSkill.MoveSilently,
    BardSkill.HideInShadows,
    BardSkill.PickPockets,
];

export const BARD_SKILL_DESCRIPTIONS: Record<BardSkill, string> = {
    [BardSkill.HearNoise]: 'Detect faint sounds.',
    [BardSkill.MoveSilently]: 'Move without making noise.',
    [BardSkill.HideInShadows]: 'Blend into darkness.',
    [BardSkill.PickPockets]: 'Steal from others unnoticed.',
};


export const FAVORED_TERRAINS: { name: FavoredTerrain; description: string }[] = [
    { name: 'Forests & Woodlands', description: 'Temperate forests, jungles, taiga, dense woods.' },
    { name: 'Hills & Mountains', description: 'Rocky uplands, alpine slopes, crags, and caves.' },
    { name: 'Plains & Grasslands', description: 'Savannas, steppes, prairies, and open farmland.' },
    { name: 'Swamps & Marshes', description: 'Bogs, wetlands, mangrove thickets, and reed beds.' },
    { name: 'Deserts & Wastelands', description: 'Hot deserts, arid badlands, scrub, salt flats.' },
    { name: 'Coastal & Riverlands', description: 'Shores, river valleys, deltas, and estuaries.' },
];