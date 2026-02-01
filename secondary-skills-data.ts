import type { LifestyleKey, SecondarySkillEntry } from './types';

// FIX: Renamed to be an internal constant.
const oseSkillList: SecondarySkillEntry[] = [
  { min: 1, max: 3, skill: 'Animal trainer', lifestyle: 'Modest' },
  { min: 4, max: 5, skill: 'Armourer', lifestyle: 'Comfortable' },
  { min: 6, max: 9, skill: 'Baker', lifestyle: 'Modest' },
  { min: 10, max: 12, skill: 'Blacksmith', lifestyle: 'Modest' },
  { min: 13, max: 13, skill: 'Bookbinder', lifestyle: 'Comfortable' },
  { min: 14, max: 16, skill: 'Bowyer / fletcher', lifestyle: 'Modest' },
  { min: 17, max: 20, skill: 'Brewer', lifestyle: 'Modest' },
  { min: 21, max: 23, skill: 'Butcher', lifestyle: 'Modest' },
  { min: 24, max: 26, skill: 'Carpenter', lifestyle: 'Modest' },
  { min: 27, max: 28, skill: 'Chandler', lifestyle: 'Modest' },
  { min: 29, max: 33, skill: 'Cooper', lifestyle: 'Modest' },
  { min: 34, max: 35, skill: 'Coppersmith', lifestyle: 'Comfortable' },
  { min: 36, max: 46, skill: 'Farmer', lifestyle: 'Poor' },
  { min: 47, max: 50, skill: 'Fisher', lifestyle: 'Poor' },
  { min: 51, max: 54, skill: 'Furrier', lifestyle: 'Modest' },
  { min: 55, max: 55, skill: 'Glassblower', lifestyle: 'Wealthy' },
  { min: 56, max: 59, skill: 'Huntsman', lifestyle: 'Modest' },
  { min: 60, max: 62, skill: 'Lapidary / jeweller', lifestyle: 'Wealthy' },
  { min: 63, max: 66, skill: 'Lorimer', lifestyle: 'Comfortable' },
  { min: 67, max: 67, skill: 'Mapmaker', lifestyle: 'Comfortable' },
  { min: 68, max: 69, skill: 'Mason', lifestyle: 'Modest' },
  { min: 70, max: 73, skill: 'Miner', lifestyle: 'Poor' },
  { min: 74, max: 76, skill: 'Potter', lifestyle: 'Modest' },
  { min: 77, max: 78, skill: 'Roper', lifestyle: 'Poor' },
  { min: 79, max: 81, skill: 'Seafarer', lifestyle: 'Modest' },
  { min: 82, max: 84, skill: 'Shipwright', lifestyle: 'Comfortable' },
  { min: 85, max: 87, skill: 'Tailor', lifestyle: 'Modest' },
  { min: 88, max: 90, skill: 'Tanner', lifestyle: 'Poor' },
  { min: 91, max: 93, skill: 'Thatcher / roofer', lifestyle: 'Poor' },
  { min: 94, max: 96, skill: 'Woodcutter', lifestyle: 'Poor' },
  { min: 97, max: 98, skill: 'Vintner', lifestyle: 'Comfortable' },
  { min: 99, max: 100, skill: 'Roll for two skills', lifestyle: 'Modest' },
];

// FIX: Changed export to be a theme-keyed object to match consumer expectations.
export const SECONDARY_SKILLS: Record<string, SecondarySkillEntry[]> = {
  'ose': oseSkillList,
};
