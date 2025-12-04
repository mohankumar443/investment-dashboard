import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card } from '../common/Card';
import CountUp from 'react-countup';

interface PortfolioSummaryCardProps {
    totalValue: number;
    weeklyChangeValue: number;
    weeklyChangePercent: number;
    trendData: number[];
}

export const PortfolioSummaryCard = ({
    totalValue,
    weeklyChangeValue,
    weeklyChangePercent,
    trendData
}: PortfolioSummaryCardProps) => {
    const isPositive = weeklyChangePercent >= 0;

    return (
        <Card className="h-full flex flex-col justify-between">

            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-md bg-brand-primary/10 text-brand">
                        <DollarSign size={18} />
                    </div>
                    <h2 className="text-muted font-medium text-xs tracking-wide uppercase">Total Balance</h2>
                </div>

                <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-5xl font-bold tracking-tighter text-white text-glow">
                        <CountUp
                            end={Math.round(totalValue * 100) / 100}
                            prefix="$"
                            decimals={2}
                            duration={2}
                            separator=","
                        />
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <div className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border backdrop-blur-sm
                        ${isPositive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }
                    `}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{isPositive ? '+' : ''}{weeklyChangePercent}%</span>
                    </div>
                    <span className="text-gray-400 text-sm">
                        {isPositive ? '+' : ''}${weeklyChangeValue.toLocaleString()} this week
                    </span>
                </div>
            </div>

            {/* Enhanced Sparkline */}
            <div className="mt-8 h-24 flex items-end gap-1.5 opacity-80 mask-image-gradient">
                {trendData.map((value, i) => {
                    const min = Math.min(...trendData);
                    const max = Math.max(...trendData);
                    const range = max - min;
                    const height = ((value - min) / range) * 100;

                    return (
                        <div
                            key={i}
                            className={`flex-1 rounded-t-sm transition-all duration-300 hover:opacity-100
                                ${isPositive ? 'bg-neon-cyan' : 'bg-red-400'}
                            `}
                            style={{
                                height: `${Math.max(height, 10)}%`,
                                opacity: 0.2 + (i / trendData.length) * 0.6
                            }}
                        />
                    );
                })}
            </div>
        </Card>
    );
};
