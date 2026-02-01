import type { SourceID } from '../../types';

export interface SheetConfig {
    id: SourceID;
    defaultSheet: string;
    spellcasterSheet?: string;
    spellcasterClasses?: string[];
}

export const SHEET_CONFIG: SheetConfig = {
    id: 'shrike',
    // Placeholder - would point to a custom PDF
    defaultSheet: '/sheet/ose_sheet.pdf', 
    spellcasterSheet: '/sheet/ose_sheet_magicuser.pdf',
    // Thematic spellcasters for this setting
    spellcasterClasses: ['Sea-Witch', 'Tide-Priest'] 
};