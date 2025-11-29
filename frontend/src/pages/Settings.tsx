import React from 'react';
import { Container, Paper, Typography, Box, Divider } from '@mui/material';

const Settings: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Portfolio Data Source
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Your portfolio is automatically loaded from the Fidelity statement PDF located in the backend resources folder.
                    </Typography>

                    <Box sx={{ p: 2, border: '1px solid #333', borderRadius: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Auto-loaded from PDF
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Holdings are automatically imported from: <code>backend/resources/Statement10312025.pdf</code>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Settings;
