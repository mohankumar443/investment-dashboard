import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import type { MarketInsights as MarketInsightsType } from '../../types';
import { Card } from '../common/Card';

interface MarketInsightsProps {
    insights: MarketInsightsType;
}

const InsightItem = ({
    title,
    count,
    description,
    type,
    delay
}: {
    title: string;
    count: number;
    description: string;
    type: 'opportunity' | 'overheated' | 'neutral';
    delay: number;
}) => {
    const styles = {
        opportunity: {
            icon: 'bg-positive/10 text-positive',
            border: 'border-positive/20',
        },
        overheated: {
            icon: 'bg-negative/10 text-negative',
            border: 'border-negative/20',
        },
        neutral: {
            icon: 'bg-neutral/10 text-neutral',
            border: 'border-default',
        }
    };

    const icons = {
        opportunity: TrendingDown,
        overheated: TrendingUp,
        neutral: Minus
    };

    const Icon = icons[type];
    const style = styles[type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.2 }}
            className={`
                p-4 rounded-md border bg-card transition-all duration-150 hover:shadow-md
                ${style.border}
            `}
        >
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md ${style.icon}`}>
                    <Icon size={18} />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-primary text-sm">{title}</h3>
                    <p className="text-xs text-secondary mt-1">{description}</p>
                    <div className="mt-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-tertiary text-primary uppercase tracking-wide">
                            {count} Stocks
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const MarketInsights = ({ insights }: MarketInsightsProps) => {
    return (
        <Card className="h-full">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-md bg-brand-primary/10 text-brand">
                    <Sparkles size={18} />
                </div>
                <h2 className="text-muted font-medium text-xs tracking-wide uppercase">AI Insights</h2>
            </div>

            <div className="flex flex-col gap-3">
                <InsightItem
                    title="Opportunity Zone"
                    count={insights.opportunity_zone.count}
                    description={insights.opportunity_zone.description}
                    type="opportunity"
                    delay={0.1}
                />
                <InsightItem
                    title="Overheated Zone"
                    count={insights.overheated_zone.count}
                    description={insights.overheated_zone.description}
                    type="overheated"
                    delay={0.2}
                />
                {insights.neutral_zone && (
                    <InsightItem
                        title="Neutral Zone"
                        count={insights.neutral_zone.count}
                        description={insights.neutral_zone.description}
                        type="neutral"
                        delay={0.3}
                    />
                )}
            </div>
        </Card>
    );
};
