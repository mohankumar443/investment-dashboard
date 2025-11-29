import React from 'react';
import { Paper, Typography, Box, Grid, Button, Chip } from '@mui/material';
import type { Recommendation } from '../types';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface AIRecommendationsProps {
    recommendations: Recommendation[];
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ recommendations }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AutoAwesomeIcon color="primary" />
                <Typography variant="h6">AI Recommendations</Typography>
            </Box>

            <Grid container spacing={2}>
                {recommendations.map((rec) => (
                    <Grid item xs={12} md={4} key={rec.symbol}>
                        <Paper sx={{ p: 2, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" fontWeight="bold">{rec.symbol}</Typography>
                                <Chip
                                    label={rec.suggested_action}
                                    color={rec.suggested_action === 'Buy' ? 'success' : 'warning'}
                                    size="small"
                                />
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                {rec.reason}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Chip label={`${rec.risk_level} Risk`} variant="outlined" size="small" />
                                <Button size="small" variant="contained">Analyze</Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AIRecommendations;
