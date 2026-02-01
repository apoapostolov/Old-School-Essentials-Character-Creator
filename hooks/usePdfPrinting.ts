

import { PDFDocument } from 'pdf-lib';
import { useCallback, useState } from 'react';
import { getCharacterSheetFields } from '../pdf-form-fields';
import type { AbilityScores, CalculatedAcrobatSkills, CalculatedBarbarianSkills, CalculatedBardSkills, CalculatedRangerSkills, CalculatedThiefSkills, ClassInfo, FavoredTerrain, Grog, HpCalculationResult, Race, SourceID } from '../types';
import { getEncumbranceDetails } from '../utils/encumbrance';
import type { AggregatedData } from './useAggregatedData';
import type { KarameikosState } from './useKarameikos';

const sanitizeStringForPdf = (value: any): any => {
    if (typeof value === 'string') {
        return value
            .replace(/‑/g, '-') // Replace non-breaking hyphen with standard hyphen
            .replace(/[’‘]/g, "'") // Replace smart single quotes with standard apostrophe
            .replace(/[“”]/g, '"') // Replace smart double quotes with standard double quotes
            .replace(/≤/g, '<=') // Replace 'less than or equal to' with its ASCII equivalent
            .replace(/≥/g, '>='); // Replace 'greater than or equal to' with its ASCII equivalent
    }
    return value;
};


export const usePdfPrinting = (aggregatedData: AggregatedData) => {
    const [isPrinting, setIsPrinting] = useState<boolean>(false);
    const [pdfError, setPdfError] = useState<string | null>(null);

    const printSheet = useCallback(async (data: {
        classInfo: ClassInfo,
        scores: AbilityScores,
        characterName: string,
        level: number,
        hpResult: HpCalculationResult,
        allItemKeys: string[],
        equipmentWeight: number,
        calculatedThiefSkills: CalculatedThiefSkills | null,
        calculatedAcrobatSkills: CalculatedAcrobatSkills | null,
        calculatedBarbarianSkills: CalculatedBarbarianSkills | null,
        calculatedRangerSkills: CalculatedRangerSkills | null,
        calculatedBardSkills: CalculatedBardSkills | null,
        favoredTerrain: FavoredTerrain | null,
        pdfPortrait: string | null,
        finalMoney: number,
        characterDescription: { line1: string; line2: string } | null,
        knownSpells: string[],
        grog: Grog | null,
        languages: string[],
        secondarySkills: string[] | null,
        lifeStandard: string | null,
        race: Race | null,
        karameikos: KarameikosState | null,
    }) => {
        const { classInfo, scores, characterName, level, hpResult, allItemKeys, equipmentWeight, calculatedThiefSkills, calculatedAcrobatSkills, calculatedBarbarianSkills, calculatedRangerSkills, calculatedBardSkills, favoredTerrain, pdfPortrait, finalMoney, characterDescription, knownSpells, grog, languages, secondarySkills, lifeStandard, race, karameikos } = data;
        if (!scores || !hpResult) return;
        setIsPrinting(true);
        setPdfError(null);

        try {
            const sourceId: SourceID = classInfo.sourceId || 'ose';
            const sheetConfig = aggregatedData.SHEET_CONFIGS[sourceId];
            const PDF_FIELD_MAP = aggregatedData.PDF_FIELD_MAPS[sourceId];

            if (!sheetConfig || !PDF_FIELD_MAP) {
                throw new Error(`PDF configuration for source "${sourceId}" is missing.`);
            }

            const isSpellcaster = sheetConfig.spellcasterClasses?.includes(classInfo.name);
            const templatePath = isSpellcaster && sheetConfig.spellcasterSheet ? sheetConfig.spellcasterSheet : sheetConfig.defaultSheet;

            const existingPdfBytes = await fetch(templatePath).then(res => {
                if (!res.ok) throw new Error(`Failed to fetch PDF template at ${templatePath}. Status: ${res.statusText}`);
                return res.arrayBuffer();
            });
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();

            if (pdfPortrait) {
                try {
                    const base64 = pdfPortrait.split(',')[1];
                    const binary_string = window.atob(base64);
                    const len = binary_string.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        bytes[i] = binary_string.charCodeAt(i);
                    }
                    const pngImage = await pdfDoc.embedPng(bytes);
                    const imageField = form.getButton(PDF_FIELD_MAP.portrait);
                    imageField.setImage(pngImage);
                } catch (e) {
                    console.error("Failed to embed portrait image:", e);
                }
            }

            // FIX: Remove local calculation of movementSpeed as it's now handled by getCharacterSheetFields.
            const { speedValue: movementSpeed } = getEncumbranceDetails(equipmentWeight, scores.Strength);
            const fieldsToFill = getCharacterSheetFields({
                classInfo, scores, characterName, characterLevel: level, hpResult, allItemKeys, equipmentWeight, movementSpeed,
                calculatedThiefSkills, calculatedAcrobatSkills, calculatedBarbarianSkills, calculatedRangerSkills, calculatedBardSkills,
                favoredTerrain, finalMoney, characterDescription, knownSpells, grog, languages, secondarySkills, lifeStandard,
                PDF_FIELD_MAP,
                aggregatedItems: aggregatedData.ITEMS,
                aggregatedSpells: aggregatedData.SPELLS,
                race: race,
                karameikos,
            });

            const MULTILINE_FIELDS_WITH_FIXED_FONT = [
                PDF_FIELD_MAP.classAbilities,
                PDF_FIELD_MAP.spellDescriptions,
                PDF_FIELD_MAP.equipmentList,
                PDF_FIELD_MAP.hirelings,
            ];
            const FONT_SIZE = 8;

            for (const [fieldName, value] of Object.entries(fieldsToFill)) {
                try {
                    const sanitizedValue = sanitizeStringForPdf(value);
                    if (MULTILINE_FIELDS_WITH_FIXED_FONT.includes(fieldName)) {
                        const field = form.getTextField(fieldName);
                        field.setText(String(sanitizedValue));
                        field.setFontSize(FONT_SIZE);
                    } else if (typeof sanitizedValue === 'boolean') {
                        const checkBox = form.getCheckBox(fieldName);
                        if (sanitizedValue) checkBox.check(); else checkBox.uncheck();
                    } else if (sanitizedValue !== undefined && sanitizedValue !== null) {
                        form.getTextField(fieldName).setText(String(sanitizedValue));
                    }
                } catch (e) { /* Silently ignore missing fields */ }
            }

            form.flatten();

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Failed to fill PDF form:', error);
            setPdfError(error instanceof Error ? `Error: ${error.message}` : 'An unexpected error occurred.');
        } finally {
            setIsPrinting(false);
        }
    }, [aggregatedData]);

    return { isPrinting, pdfError, setPdfError, printSheet };
};
