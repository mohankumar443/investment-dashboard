import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    icon?: ReactNode;
    className?: string;
    disabled?: boolean;
}

export const Button = ({
    children,
    onClick,
    variant = 'primary',
    loading = false,
    icon,
    className = '',
    disabled = false,
}: ButtonProps) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-150 flex items-center gap-2 justify-center';

    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
    };

    return (
        <motion.button
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            onClick={onClick}
            disabled={loading || disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className} ${(loading || disabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
            {children}
        </motion.button>
    );
};
