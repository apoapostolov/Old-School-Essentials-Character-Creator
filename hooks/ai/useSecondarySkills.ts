import { useState, useCallback } from 'react';
import type { Theme } from '../../types';
import type { AggregatedData } from '../useAggregatedData';
import { resolveSecondarySkillTable, SECONDARY_SKILL_TWO } from '../../secondary-skills-data';

export const useSecondarySkills = (
    theme: Theme,
    className: string | null,
    aggregatedData: AggregatedData,
) => {
    const [secondarySkills, setSecondarySkills] = useState<string[] | null>(null);

    const rollSingleSkill = useCallback((): string => {
        const skillList = resolveSecondarySkillTable(
            aggregatedData.SECONDARY_SKILLS,
            theme,
            className || 'default',
        );
        const roll = Math.floor(Math.random() * 100) + 1;
        const result = skillList.find(s => roll >= s.min && roll <= s.max);
        return result ? result.skill : 'Farmer';
    }, [theme, className, aggregatedData.SECONDARY_SKILLS]);

    const onRollSecondarySkill = useCallback(() => {
        let skills: string[] = [];
        const firstSkill = rollSingleSkill();

        if (firstSkill === SECONDARY_SKILL_TWO) {
            let skill1 = rollSingleSkill();
            while (skill1 === SECONDARY_SKILL_TWO) {
                skill1 = rollSingleSkill();
            }

            let skill2 = rollSingleSkill();
            while (skill2 === SECONDARY_SKILL_TWO || skill2 === skill1) {
                skill2 = rollSingleSkill();
            }
            skills = [skill1, skill2];
        } else {
            skills = [firstSkill];
        }
        setSecondarySkills(skills);
        return skills;
    }, [rollSingleSkill]);

    const reset = useCallback(() => {
        setSecondarySkills(null);
    }, []);

    const restore = useCallback((skills?: string[] | null) => {
        setSecondarySkills(skills ? [...skills] : null);
    }, []);

    return {
        secondarySkills,
        onRollSecondarySkill,
        reset,
        restore,
    };
};
