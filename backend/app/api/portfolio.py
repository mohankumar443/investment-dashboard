from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Holding
from app.schemas import Holding as HoldingSchema, PortfolioSummary
from app.services.auth_service import get_current_active_user
from app.services.market_service import market_service

router = APIRouter()

@router.get("/", response_model=List[HoldingSchema])
async def get_portfolio(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Always sync from PDF resource first (as source of truth)
    from app.services.pdf_service import pdf_service
    pdf_service.sync_holdings(db, current_user.id)
    
    # Fetch synced holdings from DB
    holdings = db.query(Holding).filter(Holding.user_id == current_user.id).all()
    
    # Enrich with current market data
    symbols = [h.symbol for h in holdings]
    quotes = await market_service.get_quotes(symbols)
    quote_map = {q.symbol: q for q in quotes}

    result = []
    for h in holdings:
        h_schema = HoldingSchema.model_validate(h)
        if h.symbol in quote_map:
            current_price = quote_map[h.symbol].current_price
            h_schema.current_price = current_price
            h_schema.market_value = current_price * h.quantity
            h_schema.unrealized_pl = h_schema.market_value - (h.avg_cost * h.quantity)
            h_schema.unrealized_pl_percent = (h_schema.unrealized_pl / (h.avg_cost * h.quantity)) * 100
        result.append(h_schema)
    
    return result

@router.get("/summary", response_model=PortfolioSummary)
async def get_portfolio_summary(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    holdings = await get_portfolio(current_user, db)
    
    total_value = 0
    total_cost = 0
    sector_allocation = {}

    for h in holdings:
        if h.market_value:
            total_value += h.market_value
            total_cost += h.avg_cost * h.quantity
            sector = h.sector or "Unknown"
            sector_allocation[sector] = sector_allocation.get(sector, 0) + h.market_value

    total_pl = total_value - total_cost
    total_pl_percent = (total_pl / total_cost * 100) if total_cost > 0 else 0

    # Normalize sector allocation to percentages
    if total_value > 0:
        for k in sector_allocation:
            sector_allocation[k] = (sector_allocation[k] / total_value) * 100

    return PortfolioSummary(
        total_value=total_value,
        total_pl=total_pl,
        total_pl_percent=total_pl_percent,
        sector_allocation=sector_allocation
    )

@router.post("/sync", response_model=List[HoldingSchema])
async def sync_portfolio(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Sync portfolio holdings from PDF statement"""
    from app.services.pdf_service import pdf_service
    holdings = pdf_service.sync_holdings(db, current_user.id)
    # Return enriched holdings
    return await get_portfolio(current_user, db)
