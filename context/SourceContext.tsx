import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { SourceID } from '../types';
import { SOURCES } from '../third-party/manifest';

interface SourceContextType {
    selectedSources: Set<SourceID>;
    setSelectedSources: (sources: Set<SourceID>) => void;
}

const SourceContext = createContext<SourceContextType | null>(null);

const getInitialSources = (): Set<SourceID> => {
    try {
        const item = window.localStorage.getItem('selectedSources');
        if (item) {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return new Set(parsed as SourceID[]);
            }
        }
    } catch (error) {
        console.error("Error reading sources from localStorage", error);
    }
    return new Set(['ose'] as SourceID[]); // Default
};

export const SourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedSources, setSelectedSourcesState] = useState<Set<SourceID>>(getInitialSources);

    useEffect(() => {
        try {
            window.localStorage.setItem('selectedSources', JSON.stringify(Array.from(selectedSources)));
        } catch (error) {
            console.error("Error writing sources to localStorage", error);
        }
    }, [selectedSources]);
    
    const value = useMemo(() => ({
        selectedSources,
        setSelectedSources: setSelectedSourcesState
    }), [selectedSources]);

    return (
        <SourceContext.Provider value={value}>
            {children}
        </SourceContext.Provider>
    );
};

export const useSourceContext = () => {
    const context = useContext(SourceContext);
    if (!context) {
        throw new Error('useSourceContext must be used within a SourceProvider');
    }
    return context;
};