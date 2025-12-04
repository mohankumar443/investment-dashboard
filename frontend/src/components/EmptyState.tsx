import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    actionLabel,
    onAction,
    icon,
}) => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 4,
                textAlign: 'center',
            }}
        >
            {/* Icon */}
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                {icon || <SearchOffIcon sx={{ fontSize: 60, color: 'text.secondary' }} />}
            </Box>

            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {title}
            </Typography>

            {/* Description */}
            <Typography
                variant="body1"
                sx={{ color: 'text.secondary', maxWidth: 400, mb: 3 }}
            >
                {description}
            </Typography>

            {/* Action Button */}
            {actionLabel && onAction && (
                <Button variant="contained" size="large" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;
