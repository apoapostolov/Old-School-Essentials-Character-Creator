import React, { useMemo } from 'react';
import type { Theme, ThemeConfig } from '../../types';

interface ThemeSelectorProps {
    themes: Record<string, ThemeConfig>;
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, theme, onThemeChange }) => {
    const sortedThemeKeys = useMemo(() => {
        return Object.keys(themes).sort((a, b) => 
            themes[a].displayName.localeCompare(themes[b].displayName)
        );
    }, [themes]);

    return (
        <div className="flex flex-wrap gap-2">
            {sortedThemeKeys.map((themeKey) => {
                const isActive = theme === themeKey;
                const themeConfig = themes[themeKey];
                return (
                    <button
                        key={themeKey}
                        onClick={() => onThemeChange(themeKey)}
                        className={`flex-1 py-2 px-3 rounded-lg border-2 font-bold transition-all duration-200 text-center min-w-[120px] ${
                            isActive 
                                ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 ring-2 ring-yellow-400/50' 
                                : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-white'
                        }`}
                    >
                        {themeConfig.displayName}
                    </button>
                );
            })}
        </div>
    );
};