from fastapi import APIRouter
from app.schemas.insights import MarketInsights

router = APIRouter()

@router.get("", response_model=MarketInsights)
async def get_insights():
    return {
        "opportunity_zone": {
            "title": "Opportunity Zone",
            "description": "Stocks near 52-week low",
            "count": 3,
            "stocks": [
                {
                    "symbol": "PYPL",
                    "name": "PayPal Holdings",
                    "price": 58.0,
                    "change_percent": -1.2,
                    "week52_low": 55.0,
                    "week52_high": 90.0,
                    "buy_score": 88,
                    "market_cap": "65B"
                },
                {
                    "symbol": "DIS",
                    "name": "Walt Disney Co",
                    "price": 82.5,
                    "change_percent": 0.5,
                    "week52_low": 79.0,
                    "week52_high": 118.0,
                    "buy_score": 82,
                    "market_cap": "150B"
                },
                {
                    "symbol": "T",
                    "name": "AT&T Inc.",
                    "price": 14.2,
                    "change_percent": -0.3,
                    "week52_low": 13.5,
                    "week52_high": 20.0,
                    "buy_score": 78,
                    "market_cap": "101B"
                }
            ]
        },
        "overheated_zone": {
            "title": "Overheated Zone",
            "description": "Stocks near 52-week high",
            "count": 2,
            "stocks": [
                {
                    "symbol": "NVDA",
                    "name": "NVIDIA Corp",
                    "price": 485.0,
                    "change_percent": 2.1,
                    "week52_low": 108.0,
                    "week52_high": 502.0,
                    "buy_score": 45,
                    "market_cap": "1.2T"
                },
                {
                    "symbol": "LLY",
                    "name": "Eli Lilly",
                    "price": 590.0,
                    "change_percent": 1.5,
                    "week52_low": 310.0,
                    "week52_high": 600.0,
                    "buy_score": 30,
                    "market_cap": "560B"
                }
            ]
        },
        "neutral_zone": {
            "title": "Neutral Zone",
            "description": "Stocks in mid-range",
            "count": 5,
            "stocks": []
        }
    }
