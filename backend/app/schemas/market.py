from pydantic import BaseModel
from typing import Optional

class StockQuote(BaseModel):
    symbol: str
    name: str
    price: float
    change_percent: float
    week52_low: float
    week52_high: float
    buy_score: int  # 0-100
    market_cap: str
    
    # Optional fields for backward compatibility or extra data
    change: Optional[float] = None
    volume: Optional[str] = None

