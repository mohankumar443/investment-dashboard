import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    hoverEffect?: boolean; // Support both prop names for compatibility
}

export const Card = ({ children, className = '', hover = false, hoverEffect = false }: CardProps) => {
    const shouldHover = hover || hoverEffect;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`card p-6 ${shouldHover ? 'cursor-pointer' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};
