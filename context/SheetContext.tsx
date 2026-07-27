import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { SourceID } from '../types';
import { SHEET_CONFIG as OSE_SHEET_CONFIG } from '../third-party/ose/sheet-config';

export type SheetSourceType = 'internal' | 'external' | 'self-hosted';

export type SheetExternalUrls = Partial<Record<SourceID, {
    defaultSheet?: string;
    spellcasterSheet?: string;
}>>;

interface SheetContextType {
    sourceType: SheetSourceType;
    setSourceType: (type: SheetSourceType) => void;
    externalUrls: SheetExternalUrls;
    setExternalUrl: (sourceId: SourceID, type: 'defaultSheet' | 'spellcasterSheet', url: string) => void;
    selfHostedUrl: string;
    setSelfHostedUrl: (url: string) => void;
    getSheetPath: (sourceId: SourceID, isSpellcaster: boolean, sheetConfig: any) => string;
}

/** Optional CDN overrides; OSE defaults ship under /public/sheets. */
const DEFAULT_EXTERNAL_URLS: SheetExternalUrls = {
    ose: {
        defaultSheet: '',
        spellcasterSheet: '',
    },
};

const SheetContext = createContext<SheetContextType | null>(null);

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sourceType, setSourceTypeState] = useState<SheetSourceType>(() => {
        const saved = localStorage.getItem('sheetSourceType') as SheetSourceType | null;
        if (saved === 'internal' || saved === 'external' || saved === 'self-hosted') return saved;
        return window.location.hostname.endsWith('run.app') ? 'external' : 'internal';
    });
    const [externalUrls, setExternalUrlsState] = useState<SheetExternalUrls>(() => {
        try {
            const saved = localStorage.getItem('sheetExternalUrls');
            const parsed = saved ? JSON.parse(saved) : {};
            return { ...DEFAULT_EXTERNAL_URLS, ...parsed };
        } catch {
            return { ...DEFAULT_EXTERNAL_URLS };
        }
    });
    const [selfHostedUrl, setSelfHostedUrlState] = useState<string>(() => {
        return localStorage.getItem('sheetSelfHostedUrl') || '';
    });

    useEffect(() => { localStorage.setItem('sheetSourceType', sourceType); }, [sourceType]);
    useEffect(() => { localStorage.setItem('sheetExternalUrls', JSON.stringify(externalUrls)); }, [externalUrls]);
    useEffect(() => { localStorage.setItem('sheetSelfHostedUrl', selfHostedUrl); }, [selfHostedUrl]);

    const setSourceType = (type: SheetSourceType) => setSourceTypeState(type);
    const setSelfHostedUrl = (url: string) => setSelfHostedUrlState(url);
    const setExternalUrl = (sourceId: SourceID, type: 'defaultSheet' | 'spellcasterSheet', url: string) => {
        setExternalUrlsState(prev => ({
            ...prev,
            [sourceId]: { ...prev[sourceId], [type]: url },
        }));
    };

    const getSheetPath = (sourceId: SourceID, isSpellcaster: boolean, sheetConfig: any): string => {
        const config = sheetConfig || OSE_SHEET_CONFIG;
        const internalDefault = String(config.defaultSheet || OSE_SHEET_CONFIG.defaultSheet);
        const internalSpell = String(config.spellcasterSheet || internalDefault);
        const internalPath = isSpellcaster ? internalSpell : internalDefault;

        switch (sourceType) {
            case 'external': {
                const urls = externalUrls[sourceId];
                if (isSpellcaster) {
                    const spellUrl = urls?.spellcasterSheet?.trim();
                    if (spellUrl) return spellUrl;
                    // Prefer correct magic sheet from internal config if CDN URL not set
                    return internalSpell;
                }
                const def = urls?.defaultSheet?.trim();
                return def || internalDefault;
            }
            case 'self-hosted': {
                if (!selfHostedUrl.trim()) return internalPath;
                const base = selfHostedUrl.endsWith('/') ? selfHostedUrl : `${selfHostedUrl}/`;
                const filename = internalPath.split('/').pop() || `${sourceId}_sheet.pdf`;
                return `${base}${filename}`;
            }
            case 'internal':
            default:
                return internalPath;
        }
    };

    const value = useMemo(() => ({
        sourceType,
        setSourceType,
        externalUrls,
        setExternalUrl,
        selfHostedUrl,
        setSelfHostedUrl,
        getSheetPath,
    }), [sourceType, externalUrls, selfHostedUrl]);

    return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
};

export const useSheetContext = () => {
    const context = useContext(SheetContext);
    if (!context) throw new Error('useSheetContext must be used within a SheetProvider');
    return context;
};
