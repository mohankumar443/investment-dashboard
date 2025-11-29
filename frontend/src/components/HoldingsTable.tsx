import React, { useState } from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Box, Drawer, IconButton, Chip, LinearProgress
} from '@mui/material';
import type { Holding, StockQuote } from '../types';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

interface HoldingsTableProps {
    holdings: Holding[];
    quotes: Record<string, StockQuote>;
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings, quotes }) => {
    const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);

    const getPLColor = (plPercent: number) => {
        if (plPercent >= 20) return 'rgba(16, 185, 129, 0.15)'; // High profit
        if (plPercent > 0) return 'rgba(16, 185, 129, 0.08)'; // Profit
        if (plPercent <= -20) return 'rgba(239, 68, 68, 0.15)'; // Large loss
        if (plPercent < 0) return 'rgba(239, 68, 68, 0.08)'; // Loss
        return 'transparent'; // Neutral
    };

    const totalPortfolioValue = holdings.reduce((sum, h) => sum + (h.market_value || 0), 0);

    return (
        <>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                                Symbol
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                                Quantity
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                                Avg Cost
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                                Current Price
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                                Total Value
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                                P/L
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary', width: 200 }}>
                                52W Range
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {holdings.map((row) => {
                            const quote = quotes[row.symbol];
                            const plPercent = row.unrealized_pl_percent || 0;
                            const allocation = ((row.market_value || 0) / totalPortfolioValue) * 100;

                            // 52W range calculation
                            const fiftyTwoWeekHigh = quote?.fifty_two_week_high || row.current_price || 0;
                            const fiftyTwoWeekLow = quote?.fifty_two_week_low || row.current_price || 0;
                            const range = fiftyTwoWeekHigh - fiftyTwoWeekLow;
                            const position = range > 0 ? ((row.current_price || 0) - fiftyTwoWeekLow) / range * 100 : 50;

                            return (
                                <TableRow
                                    key={row.symbol}
                                    component={motion.tr}
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                    onClick={() => setSelectedHolding(row)}
                                    sx={{
                                        cursor: 'pointer',
                                        bgcolor: getPLColor(plPercent),
                                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                                        '&:last-child': { borderBottom: 'none' }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography fontWeight="700" fontSize="0.95rem">{row.symbol}</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                            {row.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight="500">{row.quantity}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight="500">${row.avg_cost.toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight="600">${row.current_price?.toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight="600">${row.market_value?.toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box>
                                            <Typography
                                                fontWeight="700"
                                                sx={{ color: plPercent >= 0 ? 'success.main' : 'error.main' }}
                                            >
                                                {plPercent >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                                                ${row.unrealized_pl?.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ position: 'relative', height: 6, mb: 0.5 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={position}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 3,
                                                    bgcolor: 'rgba(255,255,255,0.05)',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: position < 20 ? '#60A5FA' : position > 80 ? '#EF4444' : '#F59E0B',
                                                        borderRadius: 3,
                                                    }
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: `${position}%`,
                                                    transform: 'translate(-50%, -50%)',
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: position < 20 ? '#60A5FA' : position > 80 ? '#EF4444' : '#F59E0B',
                                                    border: '2px solid white',
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                                                ${fiftyTwoWeekLow.toFixed(0)}
                                            </Typography>
                                            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                                                ${fiftyTwoWeekHigh.toFixed(0)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Drawer
                anchor="right"
                open={Boolean(selectedHolding)}
                onClose={() => setSelectedHolding(null)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 420 },
                        bgcolor: 'background.paper',
                        borderLeft: '1px solid rgba(255,255,255,0.05)',
                    }
                }}
            >
                {selectedHolding && (
                    <Box sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h4" fontWeight="bold">{selectedHolding.symbol}</Typography>
                            <IconButton onClick={() => setSelectedHolding(null)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary', mb: 3 }}>
                            {selectedHolding.name}
                        </Typography>

                        <Box sx={{ my: 3, p: 3, bgcolor: 'rgba(96,165,250,0.05)', borderRadius: 3, border: '1px solid rgba(96,165,250,0.2)' }}>
                            <Typography variant="h6" gutterBottom fontWeight="600">AI Guidance</Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip label="HOLD" color="warning" size="small" />
                                <Chip label="Medium Risk" variant="outlined" size="small" />
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {quotes[selectedHolding.symbol]?.ai_score
                                    ? `AI Score: ${quotes[selectedHolding.symbol].ai_score}/100. Based on current volatility of ${quotes[selectedHolding.symbol].volatility?.toFixed(2)}%, we recommend holding.`
                                    : 'AI analysis pending...'}
                            </Typography>
                        </Box>

                        <Typography variant="h6" gutterBottom fontWeight="600">Position Details</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mt: 2 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                    Total Value
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    ${selectedHolding.market_value?.toFixed(2)}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                    Total Return
                                </Typography>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ color: selectedHolding.unrealized_pl && selectedHolding.unrealized_pl >= 0 ? 'success.main' : 'error.main' }}
                                >
                                    ${selectedHolding.unrealized_pl?.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Drawer>
        </>
    );
};

export default HoldingsTable;
