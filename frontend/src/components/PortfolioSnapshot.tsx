import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface PortfolioSnapshotProps {
    totalValue: number;
    dailyGain: number;
    dailyGainPercent: number;
}

const PortfolioSnapshot: React.FC<PortfolioSnapshotProps> = ({ totalValue, dailyGain, dailyGainPercent }) => {
    const isPositive = dailyGain >= 0;

    // Simple sparkline data (mock 7-day trend)
    const sparklineData = [22000, 22500, 23200, 23800, 24100, 24500, totalValue];
    const maxValue = Math.max(...sparklineData);
    const minValue = Math.min(...sparklineData);
    const range = maxValue - minValue;

    return (
        <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            elevation={0}
            sx={{
                p: 5,
                background: 'linear-gradient(135deg, #1E3A8A 0%, #0D9488 100%)',
                borderRadius: 5,
                position: 'relative',
                overflow: 'hidden',
                border: 'none',
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
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 0,
                }}
            />

            {/* Background glow */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: isPositive
                        ? 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(0,0,0,0) 70%)'
                        : 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    zIndex: 0,
                }}
            />

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left Section */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'rgba(255,255,255,0.7)',
                            mb: 1.5,
                            fontSize: '0.75rem',
                            letterSpacing: '0.15em'
                        }}
                    >
                        TOTAL PORTFOLIO VALUE
                    </Typography>

                    <Typography
                        variant="h2"
                        component="div"
                        sx={{
                            fontWeight: 800,
                            mb: 2.5,
                            display: 'flex',
                            alignItems: 'baseline',
                            color: 'white',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        $<CountUp end={totalValue} decimals={2} duration={2.5} separator="," />
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                            icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                            label={
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        {isPositive ? '+' : ''}<CountUp end={dailyGain} decimals={2} prefix="$" duration={2} />
                                    </Typography>
                                    <Typography variant="body1" fontWeight="600">
                                        ({isPositive ? '+' : ''}{dailyGainPercent.toFixed(2)}%)
                                    </Typography>
                                </Box>
                            }
                            color={isPositive ? 'success' : 'error'}
                            variant="filled"
                            sx={{
                                borderRadius: 2,
                                px: 2,
                                py: 2.5,
                                fontSize: '1rem',
                                boxShadow: isPositive
                                    ? '0 4px 20px rgba(16,185,129,0.4)'
                                    : '0 4px 20px rgba(239,68,68,0.4)',
                                '& .MuiChip-icon': {
                                    fontSize: '1.25rem'
                                }
                            }}
                        />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                            Today
                        </Typography>
                    </Box>
                </Box>

                {/* Right Section - Sparkline */}
                <Box sx={{ width: 280, height: 120, position: 'relative' }}>
                    <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="none">
                        {/* Gradient fill */}
                        <defs>
                            <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(96,165,250,0.4)" />
                                <stop offset="100%" stopColor="rgba(96,165,250,0)" />
                            </linearGradient>
                        </defs>

                        {/* Area fill */}
                        <path
                            d={`M 0 120 ${sparklineData.map((value, index) => {
                                const x = (index / (sparklineData.length - 1)) * 280;
                                const y = 120 - ((value - minValue) / range) * 100;
                                return `L ${x} ${y}`;
                            }).join(' ')} L 280 120 Z`}
                            fill="url(#sparklineGradient)"
                        />

                        {/* Line */}
                        <path
                            d={sparklineData.map((value, index) => {
                                const x = (index / (sparklineData.length - 1)) * 280;
                                const y = 120 - ((value - minValue) / range) * 100;
                                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="rgba(96,165,250,1)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* End point dot */}
                        <circle
                            cx={280}
                            cy={120 - ((totalValue - minValue) / range) * 100}
                            r="5"
                            fill="white"
                            stroke="rgba(96,165,250,1)"
                            strokeWidth="2"
                        />
                    </svg>
                    <Typography
                        variant="caption"
                        sx={{
                            position: 'absolute',
                            bottom: -20,
                            right: 0,
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '0.7rem'
                        }}
                    >
                        7-day trend
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default PortfolioSnapshot;
