import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'fidelity-green' | 'institutional-blue' | 'modern-light';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themes: { value: Theme; label: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'investdash-theme';

const themes = [
    { value: 'fidelity-green' as Theme, label: 'Fidelity Green' },
    { value: 'institutional-blue' as Theme, label: 'Institutional Blue' },
    { value: 'modern-light' as Theme, label: 'Modern Light' },
];

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Initialize from localStorage or default to fidelity-green
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return (stored as Theme) || 'fidelity-green';
    });

    useEffect(() => {
        // Apply theme to document root
        document.documentElement.setAttribute('data-theme', theme);
        // Persist to localStorage
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
