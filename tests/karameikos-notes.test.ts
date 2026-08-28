import { describe, expect, it } from 'vitest';
import { formatFoundryNotesHtml, formatKarameikosStatblockNotes, lifestyleKeyForSocialStanding } from '../data/karameikos-data';
import { getLifeStandardPrompt, getNamePrompt } from '../prompt-data';
import { LIFESTYLES } from '../lifestyle-data';
import type { AbilityScores } from '../types';
import { THEMES as OSE_THEMES } from '../theme-data';
import { THEMES as MYSTARA_THEMES } from '../third-party/mystara/theme-data';
import { PROMPT_OVERRIDES } from '../third-party/mystara/prompt-overrides';
import type { ClassInfo } from '../types';

const fighter = { name: 'Fighter', group: 'Basic' } as ClassInfo;

describe('formatKarameikosStatblockNotes', () => {
    it('emits standing, ethnos, literacy, languages, and origin without semicolons', () => {
        const parts = formatKarameikosStatblockNotes({
            socialStanding: {
                roll: 12,
                standing: 'Penniless',
                literacyChecks: 1,
                goldModifier: -30,
                description: 'The family is dirt-poor. Most members spend their lives in labor.',
            },
            ethnos: {
                roll: 40,
                modifiedRoll: 46,
                origin: 'Slavani',
                description: 'Forest and mountain folk, farmers, woodsmen, herbalists. Reserved, spiritual.',
            },
            literacy: {
                successCount: 2,
                proficiencyLevel: 'Fluent Literacy',
                description: 'Reads and writes with full comprehension and a competent, stylish prose.',
            },
            hometown: {
                roll: 9,
                finalRoll: 9,
                hometown: 'City of Threshold',
                description: "Gateway to the frontier. Trading hub, adventurers' town, diverse population.",
            },
            villageName: null,
            selectedScripts: ['Elven Script'],
        });

        const joined = parts.join('. ');
        expect(joined).not.toContain(';');
        expect(joined).not.toMatch(/\broll\b/);
        expect(joined).not.toContain('successes');
        expect(joined).not.toContain('+mod=');
        expect(joined).toContain('Standing: Penniless (gold -30%)');
        expect(joined).toContain('Ethnos: Slavani');
        expect(joined).toContain('Literacy: Fluent Literacy');
        expect(joined).toContain('scripts Elven Script');
        expect(joined).not.toContain('known languages');
        expect(joined).toContain('Origin: City of Threshold');
        expect(joined).toContain('Forest and mountain folk');

        const html = formatFoundryNotesHtml(joined, ['Traladaran', 'Elven Script']);
        expect(html).toContain('<strong>traits:</strong>');
        expect(html).toContain('Standing: Penniless');
        expect(html).toContain('Languages: Traladaran, Elven Script');
        expect(html).not.toContain('<script');
    });

    it('uses the generated village name for Homestead origin', () => {
        const parts = formatKarameikosStatblockNotes({
            hometown: {
                roll: 18,
                finalRoll: 18,
                hometown: 'Homestead',
                description: 'A family farmstead outside the towns.',
            },
            villageName: 'Zlata Field',
        });
        expect(parts.join(' ')).toContain('Homestead of Zlata Field');
    });
});

describe('getNamePrompt Karameikos ethnos', () => {
    const themes = { ...OSE_THEMES, ...MYSTARA_THEMES };

    it('uses ethnic examples when ethnos is set even if the world picker is ose', () => {
        const prompt = getNamePrompt('male', fighter, 'ose', themes, {
            ethnos: 'Slavani',
            promptOverrides: [PROMPT_OVERRIDES],
        });
        expect(prompt).toContain('Slavani');
        expect(prompt).toContain('Branimar');
        expect(prompt).not.toContain('undefined');
    });

    it('maps Thyatians to the Thyatian name list', () => {
        const prompt = getNamePrompt('female', fighter, 'mystara', themes, {
            ethnos: 'Thyatians',
            promptOverrides: [PROMPT_OVERRIDES],
        });
        expect(prompt).toContain('Thyatians');
        expect(prompt).toContain('Theodora');
    });

    it('does not throw when the selected theme is missing from THEMES', () => {
        const prompt = getNamePrompt('male', fighter, 'gone', OSE_THEMES);
        expect(prompt).toContain('classic D&D/OSE');
        expect(prompt).not.toContain('undefined');
    });
});

describe('Karameikos social standing locks Life Before Adventuring', () => {
    const scores = {
        Strength: 10, Intelligence: 16, Wisdom: 16, Dexterity: 10, Constitution: 10, Charisma: 16,
    } as AbilityScores;

    it('maps gazetteer standings onto lifestyle keys', () => {
        expect(lifestyleKeyForSocialStanding('Penniless')).toBe('Squalid');
        expect(lifestyleKeyForSocialStanding('Struggling')).toBe('Poor');
        expect(lifestyleKeyForSocialStanding('Comfortable')).toBe('Comfortable');
        expect(lifestyleKeyForSocialStanding('Wealthy/Untitled')).toBe('Wealthy');
        expect(lifestyleKeyForSocialStanding('Wealthy/Titled Noble (minimum for Knight)')).toBe('Wealthy');
        expect(lifestyleKeyForSocialStanding('Very Wealthy/Untitled')).toBe('Wealthy');
        expect(lifestyleKeyForSocialStanding('Very Wealthy/Titled Noble')).toBe('Aristocratic');
        expect(lifestyleKeyForSocialStanding('Royal Family')).toBe('Aristocratic');
    });

    it('pins the life-standard prompt to the rolled station and drops climb/fail language', () => {
        const prompt = getLifeStandardPrompt(
            fighter, scores, 'male', 'mystara', ['Village farmer'], LIFESTYLES.Squalid, {
                tier: 'Poor',
                type: 'brutal',
            }, {
                socialStanding: 'Penniless',
                promptOverrides: [PROMPT_OVERRIDES],
            },
        );
        expect(prompt).toContain('Penniless');
        expect(prompt).toContain('already rolled on Manage');
        expect(prompt).toContain('Do not raise or lower social station');
        expect(prompt).not.toContain('Crucial Narrative Event');
        expect(prompt).not.toContain('became wealthier');
    });
});
