import { useState, useCallback } from 'react';
import type { Theme } from '../../types';
import type { AggregatedData } from '../useAggregatedData';

export const useSecondarySkills = (theme: Theme, aggregatedData: AggregatedData) => {
    const [secondarySkills, setSecondarySkills] = useState<string[] | null>(null);

    const rollSingleSkill = useCallback((): string => {
        const skillList = aggregatedData.SECONDARY_SKILLS[theme] || aggregatedData.SECONDARY_SKILLS['ose'];
        const roll = Math.floor(Math.random() * 100) + 1;
        const result = skillList.find(s => roll >= s.min && roll <= s.max);
        return result ? result.skill : 'Farmer'; // Fallback
    }, [theme, aggregatedData.SECONDARY_SKILLS]);
    
    const onRollSecondarySkill = useCallback(() => {
        let skills: string[] = [];
        const firstSkill = rollSingleSkill();
    
        if (firstSkill === 'Roll for two skills') {
            let skill1 = rollSingleSkill();
            while (skill1 === 'Roll for two skills') {
                skill1 = rollSingleSkill();
            }
            
            let skill2 = rollSingleSkill();
            while (skill2 === 'Roll for two skills' || skill2 === skill1) {
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
