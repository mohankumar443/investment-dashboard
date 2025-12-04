import { useQuery } from '@tanstack/react-query';
import { marketService } from '../services/api';

export const useQuote = (symbol: string) => {
    return useQuery({
        queryKey: ['quote', symbol],
        queryFn: () => marketService.getQuote(symbol),
        enabled: !!symbol,
    });
};

export const useQuotes = (symbols: string[]) => {
    return useQuery({
        queryKey: ['quotes', symbols],
        queryFn: () => marketService.getQuotes(symbols),
        enabled: symbols.length > 0,
    });
};
