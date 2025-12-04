import { useQuery } from '@tanstack/react-query';
import { insightsService } from '../services/api';

export const useInsights = () => {
    return useQuery({
        queryKey: ['insights'],
        queryFn: insightsService.getInsights,
    });
};
