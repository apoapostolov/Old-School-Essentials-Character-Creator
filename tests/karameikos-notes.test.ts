import { describe, expect, it } from 'vitest';
import { formatFoundryNotesHtml, formatKarameikosStatblockNotes } from '../data/karameikos-data';
import { getNamePrompt } from '../prompt-data';
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
