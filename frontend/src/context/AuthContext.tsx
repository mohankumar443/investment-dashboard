import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Token } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: Token) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const userData = await authService.getMe();
                        setUser(userData);
                        setIsAuthenticated(true);
                    } catch (error) {
                        console.error("Failed to fetch user", error);
                        localStorage.removeItem('token');
                    }
                }
            } catch (error) {
                console.error("Auth initialization error", error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = (token: Token) => {
        localStorage.setItem('token', token.access_token);
        setIsAuthenticated(true);
        // Fetch user details immediately after login
        authService.getMe().then(setUser).catch(console.error);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
