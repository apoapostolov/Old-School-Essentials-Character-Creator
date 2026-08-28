import { describe, expect, it } from 'vitest';
import {
    lifestyleForSkill,
    mergeSecondarySkillWorlds,
    resolveSecondarySkillTable,
    SECONDARY_SKILLS,
    SECONDARY_SKILL_TWO,
} from '../secondary-skills-data';
import { SECONDARY_SKILLS_MYSTARA } from '../third-party/mystara/secondary-skills-data';
import { SECONDARY_SKILLS_DOLMENWOOD } from '../third-party/dolmenwood/secondary-skills-data';

const coversD100 = (rows: { min: number; max: number }[]) => {
    let expectMin = 1;
    for (const row of rows) {
        if (row.min !== expectMin) return false;
        expectMin = row.max + 1;
    }
    return expectMin === 101;
};

describe('class profession tables', () => {
    it('covers 1-100 for every OSE class table', () => {
        for (const [cls, rows] of Object.entries(SECONDARY_SKILLS.ose)) {
            expect(coversD100(rows), cls).toBe(true);
        }
    });

    it('covers 1-100 for every Mystara class table', () => {
        for (const [cls, rows] of Object.entries(SECONDARY_SKILLS_MYSTARA)) {
            expect(coversD100(rows), cls).toBe(true);
        }
    });

    it('uses the Mystara Fighter table instead of generic OSE when that world is loaded', () => {
        const tables = mergeSecondarySkillWorlds(SECONDARY_SKILLS, { mystara: SECONDARY_SKILLS_MYSTARA });
        const fighter = resolveSecondarySkillTable(tables, 'mystara', 'Fighter');
        expect(fighter.some((row) => row.skill === 'Sarapi garrison mercenary')).toBe(true);
        expect(fighter.some((row) => row.skill === 'Village levy')).toBe(true);
        const oseFighter = resolveSecondarySkillTable(tables, 'ose', 'Fighter');
        expect(oseFighter.some((row) => row.skill === 'Sarapi garrison mercenary')).toBe(false);
    });

    it('falls back to a world default, then OSE class, then OSE default', () => {
        const tables = mergeSecondarySkillWorlds(SECONDARY_SKILLS, {
            mystara: SECONDARY_SKILLS_MYSTARA,
            dolmenwood: SECONDARY_SKILLS_DOLMENWOOD,
        });
        const drowOnMystara = resolveSecondarySkillTable(tables, 'mystara', 'Drow');
        expect(drowOnMystara.some((row) => row.skill === 'Village farmer')).toBe(true);
        const fighterOnDolmenwood = resolveSecondarySkillTable(tables, 'dolmenwood', 'Fighter');
        expect(fighterOnDolmenwood.some((row) => row.skill === 'Apiarist (Bee Keeper)')).toBe(true);
        const unknown = resolveSecondarySkillTable(tables, 'ose', 'Not A Class');
        expect(unknown.some((row) => row.skill === 'Farmer')).toBe(true);
    });

    it('keeps Karameikos religion as sun-church and omits Immortals', () => {
        const blob = JSON.stringify(SECONDARY_SKILLS_MYSTARA);
        expect(blob).toContain('Sun-church');
        expect(blob).not.toMatch(/Immortal/i);
        expect(blob).not.toContain('Church of Karameikos');
    });

    it('maps lifestyle from the class table that produced the skill', () => {
        const table = resolveSecondarySkillTable(
            { mystara: SECONDARY_SKILLS_MYSTARA },
            'mystara',
            'Thief',
        );
        expect(lifestyleForSkill(table, 'Luln smuggler')).toBe('Poor');
        expect(lifestyleForSkill(table, SECONDARY_SKILL_TWO)).toBe('Modest');
    });
});
