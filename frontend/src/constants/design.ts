// Design System Constants for InvestDash+

export const COLORS = {
    // Background
    background: {
        default: '#0D0D0F',
        paper: '#1A1A1F',
        elevated: '#242429',
    },

    // Primary (Neon Blue)
    primary: {
        main: '#60A5FA',
        light: '#93C5FD',
        dark: '#3B82F6',
    },

    // Secondary (Teal)
    secondary: {
        main: '#0D9488',
        light: '#14B8A6',
        dark: '#0F766E',
    },

    // Accent Colors
    accent: {
        lime: '#84CC16',
        amber: '#F59E0B',
        purple: '#A855F7',
    },

    // Semantic Colors
    success: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669',
    },

    warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
    },

    error: {
        main: '#EF4444',
        light: '#F87171',
        dark: '#DC2626',
    },

    // Text
    text: {
        primary: '#FFFFFF',
        secondary: '#9CA3AF',
        disabled: '#6B7280',
    },

    // Borders
    border: {
        subtle: 'rgba(255,255,255,0.05)',
        light: 'rgba(255,255,255,0.1)',
        medium: 'rgba(255,255,255,0.2)',
    },
};

export const SPACING = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
};

export const SHADOWS = {
    sm: '0 2px 8px rgba(0,0,0,0.2)',
    md: '0 4px 16px rgba(0,0,0,0.3)',
    lg: '0 10px 40px rgba(0,0,0,0.4)',
    xl: '0 20px 60px rgba(0,0,0,0.5)',
    glow: {
        blue: '0 4px 20px rgba(96,165,250,0.4)',
        green: '0 4px 20px rgba(16,185,129,0.4)',
        red: '0 4px 20px rgba(239,68,68,0.4)',
        amber: '0 4px 20px rgba(245,158,11,0.4)',
    },
};

export const GRADIENTS = {
    primary: 'linear-gradient(135deg, #60A5FA 0%, #0D9488 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    purple: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
};

export const ANIMATIONS = {
    duration: {
        fast: 150,
        normal: 300,
        slow: 500,
    },
    easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
};

export const GLASSMORPHISM = {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.05)',
};

// Buy Score Color Mapping
export const getBuyScoreColor = (score: number): string => {
    if (score >= 80) return COLORS.success.main;
    if (score >= 60) return COLORS.accent.lime;
    if (score >= 40) return COLORS.accent.amber;
    if (score >= 20) return COLORS.warning.main;
    return COLORS.error.main;
};

// Risk Level Color Mapping
export const getRiskColor = (risk: 'Low' | 'Medium' | 'High'): string => {
    switch (risk) {
        case 'Low':
            return COLORS.success.main;
        case 'Medium':
            return COLORS.warning.main;
        case 'High':
            return COLORS.error.main;
    }
};
