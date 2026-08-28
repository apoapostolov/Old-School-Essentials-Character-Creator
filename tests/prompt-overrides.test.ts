import { describe, expect, it } from 'vitest';
import { collectPromptOverrideText, findEthnicProfile } from '../lib/ai/prompt-overrides';
import { getNamePrompt, getPortraitPrompt, getVillageNamePrompt } from '../prompt-data';
import { PROMPT_OVERRIDES } from '../third-party/mystara/prompt-overrides';
import { THEMES as OSE_THEMES } from '../theme-data';
import type { AbilityScores, ClassInfo, Race } from '../types';

const fighter = { name: 'Fighter', group: 'Basic' } as ClassInfo;
const scores = {
    Strength: 12, Intelligence: 10, Wisdom: 10, Dexterity: 10, Constitution: 10, Charisma: 10,
} as AbilityScores;
const human = { name: 'Human' } as Race;
const packs = [PROMPT_OVERRIDES];

describe('Mystara prompt override pack', () => {
    it('resolves Polanitsi table spelling to Polanici', () => {
        expect(findEthnicProfile(packs, 'Polanitsi')?.id).toBe('Polanitsi');
        expect(findEthnicProfile(packs, 'Polanici')?.displayName).toBe('Polanici');
        expect(findEthnicProfile(packs, 'Stiganos')?.id).toBe('Stigani');
    });

    it('injects real, fantasy, and imperial name layers for Slavani', () => {
        const prompt = getNamePrompt('male', fighter, 'ose', OSE_THEMES, {
            ethnos: 'Slavani',
            promptOverrides: packs,
        });
        expect(prompt).toContain('Slavani');
        expect(prompt).toContain('Petar');
        expect(prompt).toContain('Petran');
        expect(prompt).toContain("P'tran");
        expect(prompt).toContain('Petreus');
        expect(prompt).toContain('Branimar');
        expect(prompt).not.toContain('undefined');
    });

    it('maps Thyatians even when the world picker is OSE', () => {
        const prompt = getNamePrompt('female', fighter, 'ose', OSE_THEMES, {
            ethnos: 'Thyatians',
            promptOverrides: packs,
        });
        expect(prompt).toContain('Theodora');
        expect(prompt).toContain('Byzantine');
    });

    it('lists a large female example-name bank', () => {
        const prompt = getNamePrompt('female', fighter, 'ose', OSE_THEMES, {
            ethnos: 'Slavani',
            promptOverrides: packs,
        });
        const line = prompt.split('\n').find((row) => row.startsWith('Example Names for Females:'));
        expect(line).toBeTruthy();
        const count = line!.split(',').length;
        expect(count).toBeGreaterThanOrEqual(70);
        expect(prompt).not.toContain('Real female names');
    });

    it('forces bronze-dark Stigani humans and bans pale Russian Romani', () => {
        const prompt = getPortraitPrompt(
            fighter, scores, 'male', 'ose', null, 1, null, [], null, null, OSE_THEMES, human,
            { ethnos: 'Stigani', promptOverrides: packs, raceName: 'Human' },
        );
        expect(prompt).toContain('bronze-dark');
        expect(prompt).toContain('black moustache');
        expect(prompt).toContain('pale or white skin');
        expect(prompt).toContain('Russian fair-skinned Romani');
        expect(prompt).toContain('Esmeralda / Disney traveler costume');
        expect(prompt).toContain('HARD BANS');
    });

    it('does not apply human ethnic appearance to demihumans', () => {
        const dwarfClass = { name: 'Dwarf', group: 'Demihuman' } as ClassInfo;
        const prompt = getPortraitPrompt(
            dwarfClass, scores, 'male', 'ose', null, 1, null, [], null, null, OSE_THEMES, null,
            { ethnos: 'Stigani', promptOverrides: packs, classGroup: 'Demihuman' },
        );
        expect(prompt).not.toContain('bronze-dark');
    });

    it('emits space-free village tokens', () => {
        const prompt = getVillageNamePrompt('Penniless', 'Slavani', {
            ethnos: 'Slavani',
            socialStanding: 'Penniless',
            promptOverrides: packs,
        });
        expect(prompt).toContain('Zlatapolje');
        expect(prompt).toContain('no spaces');
        expect(prompt).not.toMatch(/Zlata Field/);
    });

    it('does not mention Immortals', () => {
        const text = collectPromptOverrideText(packs, { kind: 'traits', ethnos: 'Slavani' });
        expect(text.toLowerCase()).not.toContain('immortal');
    });
});
