import { describe, expect, it } from 'vitest';
import {
    inferSavedSources,
    karameikosHasContent,
    normalizeSavedSources,
    pickKarameikosSave,
} from '../lib/save-character';

const karameikosState = {
    socialStanding: { standing: 'Wealthy/Untitled', goldModifier: 0.2, roll: 84 },
    ethnos: { origin: 'Slavani', roll: 33, modifiedRoll: 51 },
    literacy: { label: 'Scholarly Literacy', successCount: 3 },
    hometown: { origin: 'City of Kelvin', roll: 9, finalRoll: 7 },
    villageName: 'Zlatapolje',
    isGeneratingVillage: true,
    selectedScripts: ['Dwarven Runes (Dethek)'],
    family: { ignored: true },
    handleRollEthnos: () => undefined,
};

describe('pickKarameikosSave', () => {
    it('keeps sheet fields and drops UI flags and handlers', () => {
        const saved = pickKarameikosSave(karameikosState);
        const json = JSON.parse(JSON.stringify(saved));

        expect(json.socialStanding.standing).toBe('Wealthy/Untitled');
        expect(json.ethnos.origin).toBe('Slavani');
        expect(json.literacy.label).toBe('Scholarly Literacy');
        expect(json.hometown.origin).toBe('City of Kelvin');
        expect(json.villageName).toBe('Zlatapolje');
        expect(json.selectedScripts).toEqual(['Dwarven Runes (Dethek)']);
        expect(json).not.toHaveProperty('isGeneratingVillage');
        expect(json).not.toHaveProperty('family');
        expect(json).not.toHaveProperty('handleRollEthnos');
    });

    it('round-trips through a SaveSlot envelope', () => {
        const slot = {
            characterName: 'Radu',
            system: 'ose',
            timestamp: 1,
            data: {
                version: '1.0.0',
                system: 'ose',
                timestamp: 1,
                characterData: {
                    ai: {
                        theme: 'mystara',
                        characterName: 'Radu',
                        characterTraits: {
                            positivePhysical: 'Broad shoulders',
                            positiveMental: 'Dutiful',
                            negative: 'Proud',
                            lifeStandard: 'A mill-hand under Wealthy/Untitled station.',
                            lifestyleKey: 'Wealthy',
                        },
                        secondarySkills: ['Village miller'],
                    },
                    karameikos: pickKarameikosSave(karameikosState),
                    selectedSources: ['ose', 'mystara'],
                },
            },
        };

        const parsed = JSON.parse(JSON.stringify(slot));
        expect(parsed.data.characterData.karameikos.ethnos.origin).toBe('Slavani');
        expect(parsed.data.characterData.ai.characterTraits.lifestyleKey).toBe('Wealthy');
        expect(parsed.data.characterData.ai.secondarySkills).toEqual(['Village miller']);
        expect(inferSavedSources(parsed.data.characterData)).toEqual(['ose', 'mystara']);
    });
});

describe('inferSavedSources', () => {
    it('normalizes saved source lists and ignores junk ids', () => {
        expect(normalizeSavedSources(['mystara', 'ose', 'nope', 'mystara'])).toEqual(['mystara', 'ose']);
        expect(normalizeSavedSources(['mystara'])).toEqual(['ose', 'mystara']);
        expect(normalizeSavedSources('mystara')).toEqual([]);
    });

    it('infers mystara from Karameikos content on old saves', () => {
        expect(karameikosHasContent(pickKarameikosSave(karameikosState))).toBe(true);
        expect(inferSavedSources({
            karameikos: pickKarameikosSave(karameikosState),
            ai: { theme: 'ose' },
        })).toEqual(['ose', 'mystara']);
    });

    it('leaves old generic saves alone', () => {
        expect(inferSavedSources({
            ai: { theme: 'ose' },
            karameikos: pickKarameikosSave({}),
        })).toBeNull();
    });
});
