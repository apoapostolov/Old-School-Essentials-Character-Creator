import { describe, it, expect } from 'vitest';
import { calculateSageSkills } from '../utils/skills';
import { SageSkill } from '../types';
import { SAGE_SKILLS_ORDER, SAGE_SKILL_DESCRIPTIONS } from '../constants';

describe('Sage class skills', () => {
    it('has all five Sage skills defined with descriptions', () => {
        expect(SAGE_SKILLS_ORDER).toHaveLength(5);
        expect(SAGE_SKILLS_ORDER).toContain(SageSkill.Lore);
        expect(SAGE_SKILLS_ORDER).toContain(SageSkill.Observation);
        expect(SAGE_SKILLS_ORDER).toContain(SageSkill.Medicine);
        expect(SAGE_SKILLS_ORDER).toContain(SageSkill.Appraisal);
        expect(SAGE_SKILLS_ORDER).toContain(SageSkill.Craft);
        for (const skill of SAGE_SKILLS_ORDER) {
            expect(SAGE_SKILL_DESCRIPTIONS[skill]).toBeTruthy();
        }
    });

    it('returns base values at level 1 with no increases', () => {
        const result = calculateSageSkills(1, {});
        expect(result[SageSkill.Lore].value).toBe(25);
        expect(result[SageSkill.Observation].value).toBe(20);
        expect(result[SageSkill.Medicine].value).toBe(20);
        expect(result[SageSkill.Appraisal].value).toBe(10);
        expect(result[SageSkill.Craft].value).toBe(10);
        expect(result[SageSkill.Lore].display).toBe('25%');
    });

    it('applies level 1 increases (+15% each)', () => {
        const result = calculateSageSkills(1, {
            1: { [SageSkill.Lore]: 2, [SageSkill.Medicine]: 2 },
        });
        expect(result[SageSkill.Lore].value).toBe(55);
        expect(result[SageSkill.Medicine].value).toBe(50);
    });

    it('stacks increases across levels and caps at 85%', () => {
        // 5 increases on Lore = 25 + 75 = 100 -> capped at 85
        const result = calculateSageSkills(6, {
            1: { [SageSkill.Lore]: 2 },
            2: { [SageSkill.Lore]: 1 },
            3: { [SageSkill.Lore]: 1 },
            4: { [SageSkill.Lore]: 1 },
        });
        expect(result[SageSkill.Lore].value).toBe(85);
        // Craft base 10 + 3*15 = 55
        expect(result[SageSkill.Craft].value).toBe(10);
    });

    it('ignores increases recorded for levels above current level', () => {
        const result = calculateSageSkills(2, {
            5: { [SageSkill.Lore]: 2 },
        });
        expect(result[SageSkill.Lore].value).toBe(25);
    });
});
