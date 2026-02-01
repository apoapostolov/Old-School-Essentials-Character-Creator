
import type { ClassInfo, AbilityScores } from '../types';
import { getModifier } from './character';

export const getBonusSpellSlots = (classInfo: ClassInfo, scores: AbilityScores): { [spellLevel: string]: number } => {
  const bonuses: { [spellLevel: string]: number } = {};
  const ability = classInfo.spellcastingInfo?.bonus_spell_ability;

  if (ability === 'WIS') {
    const wis = scores.Wisdom;
    if (wis >= 13 && wis <= 15) {
      bonuses['1'] = (bonuses['1'] || 0) + 1;
    } else if (wis >= 16 && wis <= 17) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
    } else if (wis >= 18) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
      bonuses['2'] = (bonuses['2'] || 0) + 1;
    }
  } else if (ability === 'INT') {
    const int = scores.Intelligence;
    if (int >= 13 && int <= 15) {
      bonuses['1'] = (bonuses['1'] || 0) + 1;
    } else if (int >= 16 && int <= 17) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
    } else if (int >= 18) {
      bonuses['1'] = (bonuses['1'] || 0) + 2;
      bonuses['2'] = (bonuses['2'] || 0) + 1;
    }
  }
  
  return bonuses;
};
