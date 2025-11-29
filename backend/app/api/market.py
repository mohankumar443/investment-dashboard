from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from app.schemas import StockQuote
from app.services.auth_service import get_current_active_user
from app.services.market_service import market_service

router = APIRouter()

@router.get("/quote", response_model=StockQuote)
async def get_quote(
    symbol: str,
    current_user = Depends(get_current_active_user)
):
    quote = await market_service.get_quote(symbol)
    if not quote:
        raise HTTPException(status_code=404, detail="Symbol not found")
    return quote

@router.get("/quotes", response_model=List[StockQuote])
async def get_quotes(
    symbols: str = Query(..., description="Comma separated list of symbols"),
    current_user = Depends(get_current_active_user)
):
    symbol_list = [s.strip() for s in symbols.split(",")]
    return await market_service.get_quotes(symbol_list)
