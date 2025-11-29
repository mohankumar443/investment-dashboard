import React from 'react';
import { Paper, Typography, Box, Grid, Alert, AlertTitle } from '@mui/material';
import type { InsightsResponse } from '../types';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface AIInsightsProps {
    insights: InsightsResponse;
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LightbulbIcon color="warning" />
                <Typography variant="h6">Market Insights</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 3, height: '100%' }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="success.main">
                            Opportunity Zone (Near 52W Low)
                        </Typography>
                        {insights.opportunity_zone.length > 0 ? (
                            insights.opportunity_zone.map((item) => (
                                <Box key={item.symbol} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Typography fontWeight="bold">{item.symbol}</Typography>
                                    <Typography color="success.main">{item.gap}% from low</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">No stocks near 52-week lows.</Typography>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 3, height: '100%' }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="error.main">
                            Overheated Zone (Near 52W High)
                        </Typography>
                        {insights.overheated_zone.length > 0 ? (
                            insights.overheated_zone.map((item) => (
                                <Box key={item.symbol} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Typography fontWeight="bold">{item.symbol}</Typography>
                                    <Typography color="error.main">{item.gap}% from high</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">No stocks near 52-week highs.</Typography>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    {insights.alerts.map((alert, index) => (
                        <Alert severity={alert.severity.toLowerCase() as any} key={index} sx={{ mb: 1, borderRadius: 2 }}>
                            <AlertTitle>{alert.type}</AlertTitle>
                            {alert.message}
                        </Alert>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default AIInsights;
