from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.services.auth_service import get_current_active_user
from app.services.market_service import market_service
from app.services.pdf_service import pdf_service
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/")
async def get_insights(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Get current holdings to analyze
    # Always sync from PDF first
    pdf_service.sync_holdings(db, current_user.id)
    holdings = pdf_service.parse_pdf_holdings()
    
    symbols = [h["symbol"] for h in holdings]
    quotes = await market_service.get_quotes(symbols)
    quote_map = {q.symbol: q for q in quotes}

    near_lows = []
    near_highs = []
    sector_counts = {}
    
    for h in holdings:
        symbol = h["symbol"]
        if symbol in quote_map:
            quote = quote_map[symbol]
            current = quote.current_price
            low = quote.fifty_two_week_low or current * 0.8
            high = quote.fifty_two_week_high or current * 1.2
            
            # Check if near 52-week low (within 10%)
            if current <= low * 1.1:
                near_lows.append({
                    "symbol": symbol,
                    "price": current,
                    "target": low,
                    "gap": round((current - low) / low * 100, 1)
                })
            
            # Check if near 52-week high (within 5%)
            if current >= high * 0.95:
                near_highs.append({
                    "symbol": symbol,
                    "price": current,
                    "target": high,
                    "gap": round((high - current) / high * 100, 1)
                })
        
        # Sector analysis
        sector = h.get("sector", "Unknown")
        sector_counts[sector] = sector_counts.get(sector, 0) + 1

    # Portfolio concentration alerts
    concentration_alerts = []
    total_holdings = len(holdings)
    if total_holdings > 0:
        for sector, count in sector_counts.items():
            pct = count / total_holdings
            if pct > 0.4: # More than 40% in one sector
                concentration_alerts.append({
                    "type": "Sector Concentration",
                    "message": f"High exposure to {sector} ({int(pct*100)}% of holdings)",
                    "severity": "High" if pct > 0.6 else "Medium"
                })

    return {
        "opportunity_zone": near_lows,
        "overheated_zone": near_highs,
        "alerts": concentration_alerts,
        "diversification_score": min(100, len(sector_counts) * 15) # Simple score based on sector count
    }
