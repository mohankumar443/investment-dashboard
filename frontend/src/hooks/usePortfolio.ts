import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '../services/api';

export const usePortfolio = () => {
    return useQuery({
        queryKey: ['portfolio'],
        queryFn: portfolioService.getHoldings,
    });
};

export const usePortfolioSummary = () => {
    return useQuery({
        queryKey: ['portfolio-summary'],
        queryFn: portfolioService.getSummary,
    });
};

export const useSyncPortfolio = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: portfolioService.syncPortfolio,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            queryClient.invalidateQueries({ queryKey: ['portfolio-summary'] });
            queryClient.invalidateQueries({ queryKey: ['insights'] });
        },
    });
};
