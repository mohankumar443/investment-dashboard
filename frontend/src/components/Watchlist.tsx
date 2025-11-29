import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import type { StockQuote } from '../types';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface WatchlistProps {
    quotes: StockQuote[];
}

const BuyingScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    let color = '#EF4444'; // Red < 40
    if (score >= 40) color = '#F59E0B'; // Yellow 40-70
    if (score >= 70) color = '#10B981'; // Green > 70

    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (circumference * score) / 100;

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <svg width="80" height="80" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="6"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={color}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" component="div" fontWeight="bold" sx={{ color }}>
                    {score}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                    BUY
                </Typography>
            </Box>
        </Box>
    );
};

const StockCard: React.FC<{ quote: StockQuote }> = ({ quote }) => {
    const isPositive = quote.percent_change >= 0;
    const range = (quote.fifty_two_week_high || 0) - (quote.fifty_two_week_low || 0);
    const position = range > 0 ? ((quote.current_price - (quote.fifty_two_week_low || 0)) / range) * 100 : 50;

    return (
        <Paper
            component={motion.div}
            whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.4)' }}
            transition={{ duration: 0.2 }}
            sx={{
                p: 3,
                minWidth: 320,
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
        >
            {/* Top Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                        {quote.symbol}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        {quote.market_cap || 'N/A'}
                    </Typography>
                </Box>
                <BuyingScoreGauge score={quote.ai_score || 50} />
            </Box>

            {/* Price Section */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    ${quote.current_price.toFixed(2)}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1.5,
                        bgcolor: isPositive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                    }}
                >
                    {isPositive ? <TrendingUpIcon fontSize="small" sx={{ color: 'success.main' }} /> : <TrendingDownIcon fontSize="small" sx={{ color: 'error.main' }} />}
                    <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{ color: isPositive ? 'success.main' : 'error.main' }}
                    >
                        {isPositive ? '+' : ''}{Math.abs(quote.percent_change).toFixed(2)}%
                    </Typography>
                </Box>
            </Box>

            {/* 52-Week Range */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                        52W Low
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                        52W High
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative', height: 8, mb: 0.5 }}>
                    <LinearProgress
                        variant="determinate"
                        value={position}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(255,255,255,0.05)',
                            '& .MuiLinearProgress-bar': {
                                bgcolor: position < 20 ? '#60A5FA' : position > 80 ? '#EF4444' : '#F59E0B',
                                borderRadius: 4,
                            }
                        }}
                    />
                    {/* Current price indicator */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: `${position}%`,
                            transform: 'translate(-50%, -50%)',
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            bgcolor: position < 20 ? '#60A5FA' : position > 80 ? '#EF4444' : '#F59E0B',
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                        ${quote.fifty_two_week_low?.toFixed(0)}
                    </Typography>
                    <Typography variant="caption" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                        ${quote.fifty_two_week_high?.toFixed(0)}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

const Watchlist: React.FC<WatchlistProps> = ({ quotes }) => {
    return (
        <Box sx={{ overflowX: 'auto', pb: 2, pt: 1 }}>
            <Box sx={{ display: 'flex', gap: 3, minWidth: 'min-content' }}>
                {quotes.map((quote) => (
                    <StockCard key={quote.symbol} quote={quote} />
                ))}
            </Box>
        </Box>
    );
};

export default Watchlist;
