/**
 * Modular prompt-payload overrides.
 *
 * Core generators stay setting-agnostic. Each enabled source pack may export
 * `PROMPT_OVERRIDES` from `third-party/<pack>/prompt-overrides.ts`. This module
 * only resolves and renders those packs.
 */

export type PromptKind =
    | 'name'
    | 'portrait'
    | 'backstory'
    | 'village'
    | 'traits'
    | 'lifeStandard';

export interface PromptOverrideContext {
    kind: PromptKind;
    gender?: string | null;
    raceName?: string | null;
    classGroup?: string | null;
    ethnos?: string | null;
    socialStanding?: string | null;
}

export interface EthnicNameLists {
    real: string[];
    fantasy: string[];
    imperial?: string[];
}

export interface EthnicPromptProfile {
    id: string;
    aliases?: string[];
    displayName: string;
    realWorldAnalogues: string;
    context: string;
    names: {
        male: EthnicNameLists;
        female: EthnicNameLists;
        instructions: string;
    };
    appearance?: {
        appliesTo: 'human' | 'all';
        male: string;
        female: string;
        clothing?: string;
        hardBans?: string[];
    };
    village?: {
        examples: string[];
        instructions: string;
    };
    backstory?: {
        instructions: string;
    };
}

export interface SourcePromptOverrides {
    sourceId: string;
    always?: Partial<Record<PromptKind, string>>;
    ethnicProfiles?: EthnicPromptProfile[];
}

export interface PromptPayloadOptions {
    ethnos?: string;
    socialStanding?: string;
    raceName?: string | null;
    classGroup?: string | null;
    promptOverrides?: SourcePromptOverrides[];
}

const normalize = (value: string): string =>
    value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');

export const findEthnicProfile = (
    packs: SourcePromptOverrides[] | undefined,
    ethnos: string | null | undefined,
): EthnicPromptProfile | null => {
    if (!packs?.length || !ethnos) return null;
    const key = normalize(ethnos);
    if (!key) return null;
    let found: EthnicPromptProfile | null = null;
    for (const pack of packs) {
        for (const profile of pack.ethnicProfiles ?? []) {
            const ids = [profile.id, profile.displayName, ...(profile.aliases ?? [])];
            if (ids.some(id => normalize(id) === key)) found = profile;
        }
    }
    return found;
};

const isHumanAppearance = (ctx: PromptOverrideContext): boolean => {
    if (ctx.classGroup === 'Demihuman') return false;
    if (ctx.raceName && ctx.raceName !== 'Human') return false;
    return true;
};

const joinNames = (label: string, names: string[] | undefined): string => {
    if (!names?.length) return '';
    return `${label}: ${names.join(', ')}`;
};

const nameListsForGender = (profile: EthnicPromptProfile, gender: string | null | undefined): EthnicNameLists => {
    return gender === 'female' ? profile.names.female : profile.names.male;
};

export const renderEthnicNameBlock = (
    profile: EthnicPromptProfile,
    gender: string | null | undefined,
    socialStanding?: string | null,
): string => {
    const lists = nameListsForGender(profile, gender);
    const who = gender === 'female' ? 'female' : gender === 'male' ? 'male' : 'given';
    const standing = socialStanding
        ? `\nSocial standing: ${socialStanding}. Higher standing leans more often to the imperial overlay.`
        : '';
    return [
        `**Ethnic name override — ${profile.displayName}**`,
        `Real-world analogues: ${profile.realWorldAnalogues}.`,
        profile.context,
        '',
        'Produce ONE given name (optional short family/clan name) with this process:',
        '1. Start from a real name used by those analogue peoples.',
        '2. Keep it as-is, OR make a fantasy variation (Petar → Petran or P\'tran).',
        '3. Optional imperial overlay (Petreus, -ios, -eus) for status, cities, or mixed parentage.',
        profile.names.instructions,
        standing,
        '',
        joinNames(gender === 'female' ? 'Example Names for Females' : `Real ${who} names`, lists.real),
        joinNames('Fantasy variations', lists.fantasy),
        joinNames('Imperial-influenced', lists.imperial),
        'Do not use generic English fantasy names.',
    ].filter(line => line !== '').join('\n');
};

export const renderEthnicPortraitBlock = (
    profile: EthnicPromptProfile,
    gender: string | null | undefined,
): string | null => {
    const look = profile.appearance;
    if (!look) return null;
    const body = gender === 'female' ? look.female : look.male;
    const clothing = look.clothing ? `\nClothing & kit: ${look.clothing}` : '';
    const bans = look.hardBans?.length ? `\nHARD BANS: ${look.hardBans.join('; ')}.` : '';
    return `**Ethnic appearance override (human, ${profile.displayName} — ${profile.realWorldAnalogues}):**
${body}${clothing}${bans}
This overrides generic "varied human" ancestry and any conflicting theme note for this character.`;
};

const renderEthnicVillageBlock = (profile: EthnicPromptProfile, socialStanding?: string | null): string => {
    const village = profile.village;
    const standing = socialStanding ? ` Family standing: ${socialStanding}.` : '';
    const examples = village?.examples?.length ? `\nExamples: ${village.examples.join(', ')}.` : '';
    const extra = village?.instructions ? `\n${village.instructions}` : '';
    return `Generate a single authentic village or homestead name for a ${profile.displayName} community (${profile.realWorldAnalogues}) in this setting.${standing}${extra}${examples}
One token only: hyphens allowed, no spaces.`;
};

const renderEthnicKind = (profile: EthnicPromptProfile, ctx: PromptOverrideContext): string => {
    switch (ctx.kind) {
        case 'name':
            return renderEthnicNameBlock(profile, ctx.gender, ctx.socialStanding);
        case 'portrait': {
            if (profile.appearance?.appliesTo === 'human' && !isHumanAppearance(ctx)) return '';
            return renderEthnicPortraitBlock(profile, ctx.gender) ?? '';
        }
        case 'backstory':
            return profile.backstory?.instructions
                ? `**Ethnic backstory override — ${profile.displayName}:** ${profile.backstory.instructions}`
                : '';
        case 'village':
            return renderEthnicVillageBlock(profile, ctx.socialStanding);
        default:
            return '';
    }
};

/** Concatenate always-on source extras plus a matching ethnic profile block. */
export const collectPromptOverrideText = (
    packs: SourcePromptOverrides[] | undefined,
    ctx: PromptOverrideContext,
): string => {
    if (!packs?.length) return '';
    const always = packs
        .map(pack => pack.always?.[ctx.kind])
        .filter((block): block is string => Boolean(block && block.trim()));
    const profile = findEthnicProfile(packs, ctx.ethnos);
    const ethnic = profile ? renderEthnicKind(profile, ctx) : '';
    return [...always, ethnic].filter(block => block && block.trim()).join('\n\n');
};
