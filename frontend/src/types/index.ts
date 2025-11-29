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
  current_price?: number; // Added for UI display
  market_value?: number; // Added for UI display
  unrealized_pl?: number; // Added for UI display
  unrealized_pl_percent?: number; // Added for UI display
}

export interface StockQuote {
  symbol: string;
  current_price: number;
  high_price: number;
  low_price: number;
  open_price: number;
  previous_close: number;
  percent_change: number;
  change: number;
  fifty_two_week_high?: number;
  fifty_two_week_low?: number;
  volatility?: number;
  ai_score?: number;
  market_cap?: string;
}

export interface InsightsResponse {
  opportunity_zone: Array<{
    symbol: string;
    price: number;
    target: number;
    gap: number;
  }>;
  overheated_zone: Array<{
    symbol: string;
    price: number;
    target: number;
    gap: number;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: 'High' | 'Medium' | 'Low';
  }>;
  diversification_score: number;
}

export interface Recommendation {
  symbol: string;
  reason: string;
  risk_level: 'Low' | 'Medium' | 'High';
  suggested_action: 'Buy' | 'Sell' | 'Hold' | 'Watch';
}

export interface PortfolioSummary {
  total_value: number;
  total_gain_loss: number;
  total_gain_loss_percent: number;
}
