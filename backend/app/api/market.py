from typing import List
from fastapi import APIRouter, Query
from app.schemas.market import StockQuote
import random

router = APIRouter()

@router.get("/quotes", response_model=List[StockQuote])
async def get_quotes(symbols: str = Query(..., description="Comma separated list of symbols")):
    symbol_list = [s.strip() for s in symbols.split(",")]
    quotes = []
    
    # Mock data generator
    for sym in symbol_list:
        base_price = random.uniform(50, 500)
        change_pct = random.uniform(-5, 5)
        week52_low = base_price * 0.7
        week52_high = base_price * 1.3
        
        quotes.append({
            "symbol": sym.upper(),
            "name": f"{sym.upper()} Corp",
            "price": round(base_price, 2),
            "change_percent": round(change_pct, 2),
            "week52_low": round(week52_low, 2),
            "week52_high": round(week52_high, 2),
            "buy_score": random.randint(10, 95),
            "market_cap": f"{random.randint(10, 2000)}B",
            "volume": f"{random.randint(1, 50)}M"
        })
        
    return quotes

@router.get("/quote", response_model=StockQuote)
async def get_quote(symbol: str = Query(..., description="Stock symbol")):
    # Reuse the logic from get_quotes for consistency
    quotes = await get_quotes(symbols=symbol)
    if quotes:
        return quotes[0]
    
    # Fallback if something goes wrong (shouldn't happen with current mock logic)
    import random
    base_price = random.uniform(50, 500)
    return {
        "symbol": symbol.upper(),
        "name": f"{symbol.upper()} Corp",
        "price": round(base_price, 2),
        "change_percent": round(random.uniform(-5, 5), 2),
        "week52_low": round(base_price * 0.7, 2),
        "week52_high": round(base_price * 1.3, 2),
        "buy_score": random.randint(10, 95),
        "market_cap": f"{random.randint(10, 2000)}B",
        "volume": f"{random.randint(1, 50)}M"
    }
