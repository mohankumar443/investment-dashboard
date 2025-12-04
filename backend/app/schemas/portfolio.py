from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class HoldingBase(BaseModel):
    symbol: str
    quantity: float
    avg_cost: float
    sector: Optional[str] = None
    name: Optional[str] = None

class HoldingCreate(HoldingBase):
    pass

class Holding(HoldingBase):
    id: int
    user_id: int
    updated_at: datetime
    
    # Computed fields for API response
    current_price: Optional[float] = None
    market_value: Optional[float] = None
    unrealized_pl: Optional[float] = None
    unrealized_pl_percent: Optional[float] = None
    
    # New fields for UI
    week52_low: Optional[float] = None
    week52_high: Optional[float] = None
    buy_score: Optional[int] = None

    class Config:
        from_attributes = True

class PortfolioSummary(BaseModel):
    total_value: float
    weekly_change_value: float
    weekly_change_percent: float
    trend_data: List[float]
    
    # Keep old fields if needed or remove if strictly following new reqs
    total_pl: Optional[float] = None
    total_pl_percent: Optional[float] = None
    sector_allocation: Optional[dict[str, float]] = None
