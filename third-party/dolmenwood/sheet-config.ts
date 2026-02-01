import type { SourceID } from '../../types';

export interface SheetConfig {
    id: SourceID;
    defaultSheet: string;
    spellcasterSheet?: string;
    spellcasterClasses?: string[];
}

export const SHEET_CONFIG: SheetConfig = {
    id: 'dolmenwood',
    // Placeholder - would point to a custom Dolmenwood PDF
    defaultSheet: '/sheet/ose_sheet.pdf', 
    spellcasterSheet: '/sheet/ose_sheet_magicuser.pdf',
    // Thematic spellcasters for this setting
    spellcasterClasses: ['Magician', 'Friar', 'Enchanter'] 
};