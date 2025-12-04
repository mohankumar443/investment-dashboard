import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import type { Holding } from '../../types';

interface HoldingDetailDrawerProps {
    holding: Holding | null;
    onClose: () => void;
}

export const HoldingDetailDrawer = ({ holding, onClose }: HoldingDetailDrawerProps) => {
    if (!holding) return null;

    const isPositive = (holding.unrealized_pl_percent || 0) >= 0;
    const buyScore = holding.buy_score || 50;

    let recommendation = "Hold";
    if (buyScore > 70) recommendation = "Strong Buy";
    if (buyScore < 40) recommendation = "Consider Selling";

    return (
        <AnimatePresence>
            {holding && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-charcoal/90 border-l border-white/10 shadow-2xl z-50 overflow-y-auto backdrop-blur-xl"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">{holding.symbol}</h2>
                                    <p className="text-gray-400">{holding.name}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Key Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider font-medium">Market Value</div>
                                    <div className="text-xl font-bold text-white font-mono">
                                        ${holding.market_value?.toLocaleString()}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider font-medium">Total Return</div>
                                    <div className={`
                                        text-xl font-bold flex items-center gap-1 font-mono
                                        ${isPositive ? "text-neon-cyan" : "text-red-400"}
                                    `}>
                                        {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                        {Math.abs(holding.unrealized_pl_percent || 0).toFixed(2)}%
                                    </div>
                                </div>
                            </div>

                            {/* Buy Score & Analysis */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-neon-cyan rounded-full" />
                                    AI Analysis
                                </h3>
                                <div className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-300 font-medium">Buy Score</span>
                                        <span className={`
                                            text-2xl font-bold
                                            ${buyScore > 70 ? "text-neon-cyan" : buyScore < 40 ? "text-red-400" : "text-yellow-400"}
                                        `}>{buyScore}/100</span>
                                    </div>

                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                                        <div
                                            className={`
                                                h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_currentColor]
                                                ${buyScore > 70 ? "bg-neon-cyan text-neon-cyan" : buyScore < 40 ? "bg-red-500 text-red-500" : "bg-yellow-500 text-yellow-500"}
                                            `}
                                            style={{ width: `${buyScore}%` }}
                                        />
                                    </div>

                                    <div className="flex items-start gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                        <AlertCircle size={18} className="text-neon-cyan shrink-0 mt-0.5" />
                                        <p className="leading-relaxed">
                                            Currently trading at <span className="text-white font-bold">{holding.current_price && holding.week52_low
                                                ? `${Math.round(((holding.current_price - holding.week52_low) / holding.week52_low) * 100)}%`
                                                : '0%'}</span> above 52-week low. <span className="text-white font-bold">{recommendation}</span> rating based on technical indicators.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Placeholder Chart */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-neon-cyan rounded-full" />
                                    Price History
                                </h3>
                                <div className="h-48 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 font-medium">
                                    Chart Visualization Coming Soon
                                </div>
                            </div>

                            {/* Position Details */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-neon-cyan rounded-full" />
                                    Position Details
                                </h3>
                                <div className="space-y-1">
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-400">Shares Owned</span>
                                        <span className="text-white font-medium font-mono">{holding.quantity}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-400">Average Cost</span>
                                        <span className="text-white font-medium font-mono">${holding.avg_cost.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-400">Current Price</span>
                                        <span className="text-white font-medium font-mono">${holding.current_price?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-400">Sector</span>
                                        <span className="text-white font-medium">{holding.sector}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
