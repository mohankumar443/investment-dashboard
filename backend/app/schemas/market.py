from pydantic import BaseModel
from typing import Optional

class StockQuote(BaseModel):
    symbol: str
    current_price: float
    high_price: Optional[float] = None
    low_price: Optional[float] = None
    open_price: Optional[float] = None
    previous_close: Optional[float] = None
    percent_change: Optional[float] = None
    change: Optional[float] = None
    fifty_two_week_high: Optional[float] = None
    fifty_two_week_low: Optional[float] = None
    volatility: Optional[float] = None
    ai_score: Optional[int] = None
    market_cap: Optional[str] = None
