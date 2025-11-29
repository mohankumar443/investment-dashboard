from pydantic import BaseModel
from typing import List, Optional

class Recommendation(BaseModel):
    symbol: str
    reason: str
    risk_level: str  # Low, Medium, High
    suggested_action: str # Buy, Watch, Reduce
    current_price: Optional[float] = None

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation]
    portfolio_risk_summary: str
    diversification_score: int # 1-100
