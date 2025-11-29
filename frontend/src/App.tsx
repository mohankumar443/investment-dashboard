import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#60A5FA', // Brighter blue
            light: '#93C5FD',
            dark: '#3B82F6',
        },
        secondary: {
            main: '#0D9488', // Teal accent
            light: '#14B8A6',
            dark: '#0F766E',
        },
        success: {
            main: '#10B981',
            light: '#34D399',
            dark: '#059669',
        },
        warning: {
            main: '#F59E0B',
            light: '#FBBF24',
            dark: '#D97706',
        },
        error: {
            main: '#EF4444',
            light: '#F87171',
            dark: '#DC2626',
        },
        background: {
            default: '#0D0D0F', // Premium dark background
            paper: '#1A1A1F', // Card background
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#9CA3AF',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h2: {
            fontWeight: 800,
            fontSize: '3.5rem',
        },
        h4: {
            fontWeight: 700,
            fontSize: '2rem',
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.5rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        subtitle1: {
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: 'none',
                    border: '1px solid rgba(255,255,255,0.05)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <AuthProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route
                                    index
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="settings"
                                    element={
                                        <ProtectedRoute>
                                            <Settings />
                                        </ProtectedRoute>
                                    }
                                />
                            </Route>
                        </Routes>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
