import axios from 'axios';
import type { Token, User, Holding, StockQuote, Recommendation } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: async (formData: FormData) => {
        const response = await api.post<Token>('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },
    register: async (data: any) => {
        const response = await api.post<User>('/auth/register', data);
        return response.data;
    },
    getMe: async () => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },
};

export const portfolioService = {
    getHoldings: async () => {
        const response = await api.get<Holding[]>('/portfolio');
        return response.data;
    },
    importFromPDF: async () => {
        const response = await api.post('/brokerage/import/pdf');
        return response.data;
    },
    syncPortfolio: async () => {
        const response = await api.post<Holding[]>('/portfolio/sync');
        return response.data;
    }
};

export const marketService = {
    getQuote: async (symbol: string) => {
        const response = await api.get<StockQuote>(`/market/quote?symbol=${symbol}`);
        return response.data;
    },
    getQuotes: async (symbols: string[]) => {
        const response = await api.get<StockQuote[]>(`/market/quotes?symbols=${symbols.join(',')}`);
        return response.data;
    },
};

export const recommendationService = {
    getRecommendations: async () => {
        const response = await api.get<{ recommendations: Recommendation[] }>('/recommendations');
        return response.data;
    },
};

export const insightsService = {
    getInsights: async () => {
        const response = await api.get<any>('/insights');
        return response.data;
    },
};

export default api;
