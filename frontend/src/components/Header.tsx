import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar, Menu, MenuItem, Badge } from '@mui/material';
import type { User } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/login');
    };

    const handleTabClick = (page: string) => {
        setActiveTab(page);
        navigate(page === 'Dashboard' ? '/' : `/${page.toLowerCase().replace(' ', '-')}`);
    };

    const navItems = ['Dashboard', 'Insights', 'Watchlist', 'Portfolio', 'AI Advisor', 'Settings'];

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: '#1A1A1F',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: 4, py: 1.5 }}>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #60A5FA 0%, #0D9488 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TrendingUpIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '.05rem',
                            background: 'linear-gradient(135deg, #60A5FA 0%, #0D9488 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleTabClick('Dashboard')}
                    >
                        InvestDash+
                    </Typography>
                </Box>

                {/* Center Navigation */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {navItems.map((page) => (
                        <Button
                            key={page}
                            onClick={() => handleTabClick(page)}
                            sx={{
                                px: 2.5,
                                py: 1,
                                color: activeTab === page ? 'primary.main' : 'text.secondary',
                                fontWeight: activeTab === page ? 600 : 400,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                position: 'relative',
                                '&:hover': {
                                    color: 'primary.main',
                                    bgcolor: 'rgba(96, 165, 250, 0.05)'
                                },
                                '&::after': activeTab === page ? {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60%',
                                    height: 2,
                                    bgcolor: 'primary.main',
                                    borderRadius: 1,
                                } : {}
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                {/* Right Side */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        size="medium"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main', bgcolor: 'rgba(96, 165, 250, 0.05)' }
                        }}
                    >
                        <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <>
                            <IconButton
                                size="small"
                                onClick={handleMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: 'transparent',
                                        background: 'linear-gradient(135deg, #60A5FA 0%, #0D9488 100%)',
                                        width: 36,
                                        height: 36,
                                        fontWeight: 600,
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {user.full_name?.[0] || user.email[0].toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        bgcolor: '#1A1A1F',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => navigate('/login')}
                            sx={{ borderRadius: 2 }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
