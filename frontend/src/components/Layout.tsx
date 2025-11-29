import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Layout: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <AccountBalanceWalletIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        InvestDash
                    </Typography>
                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>
                            <Button color="inherit" onClick={() => navigate('/settings')}>Settings</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Outlet />
            </Container>
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[900], textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Investment Dashboard. For educational purposes only.
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;
