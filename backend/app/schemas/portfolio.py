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

    class Config:
        from_attributes = True

class PortfolioSummary(BaseModel):
    total_value: float
    total_pl: float
    total_pl_percent: float
    sector_allocation: dict[str, float]
