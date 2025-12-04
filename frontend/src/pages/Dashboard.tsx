import { PortfolioSummaryCard } from '../components/dashboard/PortfolioSummaryCard';
import { MarketInsights } from '../components/dashboard/MarketInsights';
import { WatchlistPulse } from '../components/dashboard/WatchlistPulse';
import { HoldingsTable } from '../components/dashboard/HoldingsTable';
import { TopBar } from '../components/layout/TopBar';
import { usePortfolio, usePortfolioSummary } from '../hooks/usePortfolio';
import { useInsights } from '../hooks/useInsights';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
    const { data: portfolio, isLoading: isLoadingPortfolio } = usePortfolio();
    const { data: summary, isLoading: isLoadingSummary } = usePortfolioSummary();
    const { data: insights, isLoading: isLoadingInsights } = useInsights();

    const isLoading = isLoadingPortfolio || isLoadingSummary || isLoadingInsights;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
        );
    }

    // Combine insights stocks for watchlist pulse
    const watchlistStocks = [
        ...(insights?.opportunity_zone.stocks || []),
        ...(insights?.overheated_zone.stocks || [])
    ];

    return (
        <div className="space-y-8">
            {/* Top Bar */}
            <TopBar
                title="Dashboard"
                subtitle="Your complete portfolio at a glance"
            />

            {/* Top Row: Hero + Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hero Card (2/3 width) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2"
                >
                    {summary && (
                        <PortfolioSummaryCard
                            totalValue={summary.total_value}
                            weeklyChangeValue={summary.weekly_change_value}
                            weeklyChangePercent={summary.weekly_change_percent}
                            trendData={summary.trend_data}
                        />
                    )}
                </motion.div>

                {/* Market Insights (1/3 width) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-1"
                >
                    {insights && <MarketInsights insights={insights} />}
                </motion.div>
            </div>

            {/* Middle Row: Watchlist & Pulse */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-neon-cyan rounded-full" />
                    Market Pulse
                </h2>
                <WatchlistPulse stocks={watchlistStocks} />
            </motion.div>

            {/* Bottom Row: Holdings Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-neon-cyan rounded-full" />
                    Current Holdings
                </h2>
                {portfolio && <HoldingsTable holdings={portfolio} />}
            </motion.div>
        </div>
    );
};
