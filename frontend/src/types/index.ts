export type Theme = 'fidelity-green' | 'institutional-blue' | 'modern-light';

export interface User {
  id: number;
  email: string;
  full_name?: string;
  is_active: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface Holding {
  id: number;
  symbol: string;
  name: string;
  quantity: number;
  avg_cost: number;
  sector: string;
  current_price: number;
  market_value: number;
  unrealized_pl: number;
  unrealized_pl_percent: number;
  week52_low: number;
  week52_high: number;
  buy_score: number;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change_percent: number;
  week52_low: number;
  week52_high: number;
  buy_score: number;
  market_cap: string;
  volume?: string;
  change?: number;
}

export interface InsightZone {
  title: string;
  description: string;
  count: number;
  stocks: StockQuote[];
}

export interface MarketInsights {
  opportunity_zone: InsightZone;
  overheated_zone: InsightZone;
  neutral_zone?: InsightZone;
}

export interface PortfolioSummary {
  total_value: number;
  weekly_change_value: number;
  weekly_change_percent: number;
  trend_data: number[];
  total_pl?: number;
  total_pl_percent?: number;
  sector_allocation?: Record<string, number>;
}

export interface Recommendation {
  symbol: string;
  reason: string;
  risk_level: 'Low' | 'Medium' | 'High';
  suggested_action: 'Buy' | 'Sell' | 'Hold' | 'Watch';
}

