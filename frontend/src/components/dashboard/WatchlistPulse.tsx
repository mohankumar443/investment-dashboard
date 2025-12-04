
import { StockCard } from './StockCard';
import type { StockQuote } from '../../types';

interface WatchlistPulseProps {
    stocks: StockQuote[];
}

export const WatchlistPulse = ({ stocks }: WatchlistPulseProps) => {
    return (
        <div className="w-full overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex gap-4 w-max">
                {stocks.map((stock) => (
                    <StockCard key={stock.symbol} stock={stock} />
                ))}
            </div>
        </div>
    );
};
