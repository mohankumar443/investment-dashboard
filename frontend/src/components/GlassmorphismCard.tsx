import React from 'react';
import { Box } from '@mui/material';

interface GlassmorphismCardProps {
    children: React.ReactNode;
    gradient?: string;
    blur?: number;
    opacity?: number;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
    children,
    gradient = 'linear-gradient(135deg, #1E3A8A 0%, #0D9488 100%)',
    blur = 10,
    opacity = 0.03,
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 5,
                background: gradient,
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            }}
        >
            {/* Glassmorphism overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `rgba(255,255,255,${opacity})`,
                    backdropFilter: `blur(${blur}px)`,
                    zIndex: 0,
                }}
            />

            {/* Content */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
        </Box>
    );
};

export default GlassmorphismCard;
