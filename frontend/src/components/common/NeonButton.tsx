import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface NeonButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    loading?: boolean;
    icon?: ReactNode;
    className?: string;
}

export const NeonButton = ({
    children,
    onClick,
    variant = 'primary',
    loading = false,
    icon,
    className = '',
}: NeonButtonProps) => {
    const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2';

    const variantClasses = {
        primary: 'bg-accent text-primary hover:shadow-lg hover:scale-105',
        secondary: 'bg-secondary border border-default text-secondary hover:bg-tertiary hover:text-primary',
        ghost: 'text-secondary hover:bg-tertiary hover:text-primary',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={loading}
            className={`${baseClasses} ${variantClasses[variant]} ${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
            {children}
        </motion.button>
    );
};
