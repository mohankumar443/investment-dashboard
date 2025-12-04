from pydantic import BaseModel
from typing import List, Optional
from .market import StockQuote

class InsightZone(BaseModel):
    title: str
    description: str
    count: int
    stocks: List[StockQuote]

class MarketInsights(BaseModel):
    opportunity_zone: InsightZone
    overheated_zone: InsightZone
    neutral_zone: Optional[InsightZone] = None
