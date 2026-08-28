import { describe, expect, it } from 'vitest';
import { GENERIC_WORLD_THEME, preferredWorldTheme, THEMES as OSE_THEMES } from '../theme-data';
import { THEMES as MYSTARA_THEMES } from '../third-party/mystara/theme-data';
import { THEMES as DOLMENWOOD_THEMES } from '../third-party/dolmenwood/theme-data';
import type { ThemeConfig } from '../types';

describe('preferredWorldTheme', () => {
    it('stays on generic D&D when only OSE is loaded', () => {
        expect(preferredWorldTheme(OSE_THEMES)).toBe(GENERIC_WORLD_THEME);
        expect(preferredWorldTheme(OSE_THEMES, 'ose')).toBe(GENERIC_WORLD_THEME);
    });

    it('defaults to the source world when a pack is loaded', () => {
        const themes = { ...OSE_THEMES, ...MYSTARA_THEMES };
        expect(preferredWorldTheme(themes)).toBe('mystara');
        expect(preferredWorldTheme(themes, 'ose')).toBe('mystara');
    });

    it('keeps an already chosen source world', () => {
        const themes: Record<string, ThemeConfig> = {
            ...OSE_THEMES,
            ...MYSTARA_THEMES,
            ...DOLMENWOOD_THEMES,
        };
        expect(preferredWorldTheme(themes, 'dolmenwood')).toBe('dolmenwood');
        expect(preferredWorldTheme(themes, 'mystara')).toBe('mystara');
    });

    it('falls back to another loaded source when the current world is gone', () => {
        const themes = { ...OSE_THEMES, ...DOLMENWOOD_THEMES };
        expect(preferredWorldTheme(themes, 'mystara')).toBe('dolmenwood');
    });
});
