import { useState } from 'react';
import type { Holding } from '../../types';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { HoldingDetailDrawer } from './HoldingDetailDrawer';

interface HoldingsTableProps {
    holdings: Holding[];
}

export const HoldingsTable = ({ holdings }: HoldingsTableProps) => {
    const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);

    return (
        <>
            <Card className="!p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-gray-400 uppercase tracking-wider text-xs">
                                <th className="px-6 py-4 font-medium">Symbol</th>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium text-right">Qty</th>
                                <th className="px-6 py-4 font-medium text-right">Avg Cost</th>
                                <th className="px-6 py-4 font-medium text-right">Price</th>
                                <th className="px-6 py-4 font-medium text-right">Market Value</th>
                                <th className="px-6 py-4 font-medium text-right">P/L %</th>
                                <th className="px-6 py-4 font-medium">52W Range</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {holdings.map((holding, index) => {
                                const plPercent = holding.unrealized_pl_percent || 0;
                                const isPositive = plPercent >= 0;

                                // 52-week position
                                const range = (holding.week52_high || 0) - (holding.week52_low || 0);
                                const current = (holding.current_price || 0) - (holding.week52_low || 0);
                                const position = range > 0 ? (current / range) * 100 : 50;

                                return (
                                    <motion.tr
                                        key={holding.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setSelectedHolding(holding)}
                                        className="group cursor-pointer hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-bold text-white group-hover:text-neon-cyan transition-colors">
                                            {holding.symbol}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {holding.name}
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-300 font-mono">
                                            {holding.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-300 font-mono">
                                            ${holding.avg_cost.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right text-white font-medium font-mono">
                                            ${holding.current_price?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right text-white font-bold font-mono">
                                            ${holding.market_value?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`
                                                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                                ${isPositive
                                                    ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                }
                                            `}>
                                                {isPositive ? '+' : ''}{plPercent.toFixed(2)}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                                                <div
                                                    className={`absolute top-0 bottom-0 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${isPositive ? 'bg-neon-cyan text-neon-cyan' : 'bg-red-400 text-red-400'}`}
                                                    style={{ left: `${Math.min(Math.max(position, 0), 100)}%` }}
                                                />
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            <HoldingDetailDrawer
                holding={selectedHolding}
                onClose={() => setSelectedHolding(null)}
            />
        </>
    );
};
