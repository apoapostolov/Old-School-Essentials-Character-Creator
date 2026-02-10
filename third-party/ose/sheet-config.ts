import type { SourceID } from '../../types';

export interface SheetConfig {
    id: SourceID;
    defaultSheet: string;
    spellcasterSheet?: string;
    spellcasterClasses?: string[];
}

export const SHEET_CONFIG: SheetConfig = {
    id: 'ose',
    defaultSheet: '/sheets/ose_sheet.pdf',
    spellcasterSheet: '/sheets/ose_sheet_magicuser.pdf',
    spellcasterClasses: ['Magic-User', 'Cleric', 'Drow', 'Elf', 'Illusionist', 'Druid', 'Paladin', 'Ranger', 'Gnome', 'Half-Elf']
};