import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme, themes } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);

    const currentTheme = themes.find(t => t.value === theme);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-default bg-card hover:bg-tertiary text-secondary hover:text-primary transition-all duration-150 text-sm"
            >
                <span className="font-medium">{currentTheme?.label}</span>
                <ChevronDown size={14} className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-default rounded-md shadow-lg z-20 overflow-hidden">
                        {themes.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => {
                                    setTheme(t.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 ${t.value === theme
                                        ? 'bg-brand-primary text-white font-medium'
                                        : 'text-secondary hover:bg-tertiary hover:text-primary'
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
