import React from 'react';
import { Container, Grid, Box, Typography, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { portfolioService, recommendationService, insightsService, marketService } from '../services/api';
import Header from '../components/Header';
import PortfolioSnapshot from '../components/PortfolioSnapshot';
import Watchlist from '../components/Watchlist';
import HoldingsTable from '../components/HoldingsTable';
import AIRecommendations from '../components/AIRecommendations';
import AIInsights from '../components/AIInsights';

const Dashboard: React.FC = () => {
    // Fetch Portfolio
    const { data: holdings, isLoading: isLoadingPortfolio } = useQuery({
        queryKey: ['holdings'],
        queryFn: portfolioService.getHoldings,
    });

    // Fetch Recommendations
    const { data: recommendationsData } = useQuery({
        queryKey: ['recommendations'],
        queryFn: recommendationService.getRecommendations,
    });

    // Fetch Insights
    const { data: insights } = useQuery({
        queryKey: ['insights'],
        queryFn: insightsService.getInsights,
    });

    // Fetch Quotes for Watchlist (using holdings symbols for now)
    const { data: quotes } = useQuery({
        queryKey: ['quotes', holdings],
        queryFn: async () => {
            if (!holdings) return [];
            const symbols = holdings.map(h => h.symbol);
            return marketService.getQuotes(symbols);
        },
        enabled: !!holdings,
    });

    if (isLoadingPortfolio) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Calculate Portfolio Summary
    const totalValue = holdings?.reduce((sum, h) => sum + (h.market_value || 0), 0) || 0;
    const totalCost = holdings?.reduce((sum, h) => sum + (h.avg_cost * h.quantity), 0) || 0;
    const totalGain = totalValue - totalCost;
    const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

    // Create Quote Map for Table
    const quoteMap = quotes?.reduce((acc, q) => ({ ...acc, [q.symbol]: q }), {}) || {};

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
            <Header />

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                {/* Hero Section */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={8}>
                        <PortfolioSnapshot
                            totalValue={totalValue}
                            dailyGain={totalGain}
                            dailyGainPercent={totalGainPercent}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {insights && <AIInsights insights={insights} />}
                    </Grid>
                </Grid>

                {/* Watchlist Carousel */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ px: 1 }}>Watchlist & Market Pulse</Typography>
                    {quotes && <Watchlist quotes={quotes} />}
                </Box>

                <Grid container spacing={4}>
                    {/* Main Holdings Table */}
                    <Grid item xs={12} lg={8}>
                        <Typography variant="h6" gutterBottom>Current Holdings</Typography>
                        {holdings && <HoldingsTable holdings={holdings} quotes={quoteMap} />}
                    </Grid>

                    {/* Sidebar: AI Recommendations */}
                    <Grid item xs={12} lg={4}>
                        {recommendationsData?.recommendations && (
                            <AIRecommendations recommendations={recommendationsData.recommendations} />
                        )}
                    </Grid>
                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ mt: 8, py: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="caption" color="text.secondary">
                    This is educational information, not financial advice. Past performance is not indicative of future results.
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
