from typing import List
from fastapi import APIRouter
from app.schemas.portfolio import Holding, PortfolioSummary
from app.services.pdf_service import pdf_service
from app.services.market_service import market_service
from datetime import datetime

router = APIRouter()

@router.get("", response_model=List[Holding])
async def get_portfolio():
    # Get base holdings from PDF service (hardcoded list from statement)
    base_holdings = pdf_service.parse_pdf_holdings()
    
    holdings_response = []
    
    for idx, item in enumerate(base_holdings):
        symbol = item["symbol"]
        quantity = item["quantity"]
        avg_cost = item["avg_cost"]
        
        # Get market data
        quote = await market_service.get_quote(symbol)
        
        current_price = quote.price if quote else avg_cost
        market_value = quantity * current_price
        unrealized_pl = market_value - (quantity * avg_cost)
        unrealized_pl_percent = (unrealized_pl / (quantity * avg_cost)) * 100 if avg_cost > 0 else 0
        
        holding = Holding(
            id=idx + 1,
            user_id=1,
            symbol=symbol,
            name=item["name"],
            quantity=quantity,
            avg_cost=avg_cost,
            current_price=current_price,
            market_value=market_value,
            unrealized_pl=unrealized_pl,
            unrealized_pl_percent=unrealized_pl_percent,
            sector=item["sector"],
            week52_low=quote.week52_low if quote else 0,
            week52_high=quote.week52_high if quote else 0,
            buy_score=quote.buy_score if quote else 50,
            updated_at=datetime.now()
        )
        holdings_response.append(holding)
        
    return holdings_response

@router.get("/summary", response_model=PortfolioSummary)
async def get_portfolio_summary():
    # Calculate summary based on real holdings
    holdings = await get_portfolio()
    
    total_value = sum(h.market_value for h in holdings)
    total_cost = sum(h.quantity * h.avg_cost for h in holdings)
    total_pl = total_value - total_cost
    total_pl_percent = (total_pl / total_cost) * 100 if total_cost > 0 else 0
    
    # Mock trend data based on total value
    import random
    trend_data = [
        total_value * (1 - random.uniform(0.01, 0.05)) for _ in range(6)
    ] + [total_value]
    
    return {
        "total_value": total_value,
        "weekly_change_value": total_pl * 0.1, # Mock weekly change
        "weekly_change_percent": total_pl_percent * 0.1,
        "trend_data": trend_data,
        "total_pl": total_pl,
        "total_pl_percent": total_pl_percent,
        "sector_allocation": {
            "Technology": 60.0,
            "Consumer Cyclical": 20.0,
            "Healthcare": 10.0,
            "Other": 10.0
        }
    }

@router.post("/sync", response_model=List[Holding])
async def sync_portfolio():
    """
    Simulates syncing portfolio data.
    Since we are using hardcoded/PDF data, this just returns the fresh portfolio
    with updated market data.
    """
    return await get_portfolio()
