import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StockQuote } from '../../types';
import { Card } from '../common/Card';

interface StockCardProps {
    stock: StockQuote;
}

const BuyScoreGauge = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 16; // radius 16
    const offset = circumference - (score / 100) * circumference;

    let color = 'text-yellow-500';
    if (score >= 70) color = 'text-neon-cyan';
    if (score < 40) color = 'text-red-500';

    return (
        <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="24"
                    cy="24"
                    r="16"
                    className="stroke-white/10"
                    strokeWidth="4"
                    fill="none"
                />
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    cx="24"
                    cy="24"
                    r="16"
                    className={color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 2px currentColor)` }}
                />
            </svg>
            <span className="absolute text-xs font-bold text-white">{score}</span>
        </div>
    );
};

export const StockCard = ({ stock }: StockCardProps) => {
    const isPositive = stock.change_percent >= 0;

    // Calculate position in 52-week range
    const range = stock.week52_high - stock.week52_low;
    const position = ((stock.price - stock.week52_low) / range) * 100;

    let rangeText = "Mid Range";
    if (position < 20) rangeText = "Near Low";
    if (position > 80) rangeText = "Near High";

    return (
        <Card
            hoverEffect
            className="min-w-[280px] flex flex-col gap-4 group cursor-pointer"
        >
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-white group-hover:text-neon-cyan transition-colors">{stock.symbol}</h3>
                        <span className="text-xs text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                            {stock.market_cap}
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate max-w-[160px]">{stock.name}</p>
                </div>
                <BuyScoreGauge score={stock.buy_score} />
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <div className="text-2xl font-bold text-white tracking-tight">
                        ${stock.price.toLocaleString()}
                    </div>
                    <div className={`
                        flex items-center gap-1 text-sm font-medium
                        ${isPositive ? "text-neon-cyan" : "text-red-400"}
                    `}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(stock.change_percent)}%
                    </div>
                </div>
            </div>

            {/* 52-Week Range Bar */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                    <span>${stock.week52_low}</span>
                    <span>{rangeText}</span>
                    <span>${stock.week52_high}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${position}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`absolute left-0 top-0 h-full rounded-full shadow-[0_0_8px_currentColor] ${isPositive ? 'bg-neon-cyan text-neon-cyan' : 'bg-red-400 text-red-400'}`}
                    />
                </div>
            </div>
        </Card>
    );
};
