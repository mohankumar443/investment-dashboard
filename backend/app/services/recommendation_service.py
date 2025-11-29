from typing import List
from sqlalchemy.orm import Session
from app.models import Holding
from app.schemas import Recommendation, RecommendationResponse
from app.services.market_service import market_service

class RecommendationService:
    """
    Simple rules-based recommendation engine.
    """

    async def generate_recommendations(self, db: Session, user_id: int) -> RecommendationResponse:
        holdings = db.query(Holding).filter(Holding.user_id == user_id).all()
        
        recommendations = []
        portfolio_risk = "Low"
        diversification_score = 100

        # 1. Check for diversification (Sector concentration)
        sectors = {}
        total_value = 0
        for h in holdings:
            # We need current price to calculate real weight, but for speed we'll use cost basis or fetch price
            # For this simple engine, let's use quantity * avg_cost as a proxy for value
            val = h.quantity * h.avg_cost
            total_value += val
            sectors[h.sector] = sectors.get(h.sector, 0) + val

        if total_value > 0:
            for sector, val in sectors.items():
                weight = val / total_value
                if weight > 0.4:
                    recommendations.append(Recommendation(
                        symbol="VTI", # Total market ETF
                        reason=f"High concentration in {sector} ({int(weight*100)}%). Consider diversifying with a broad market ETF.",
                        risk_level="Low",
                        suggested_action="Buy",
                        current_price=0 # Frontend will fetch or we can fetch here
                    ))
                    portfolio_risk = "High"
                    diversification_score -= 30

        # 2. Check for specific stock concentration
        for h in holdings:
            if total_value > 0:
                weight = (h.quantity * h.avg_cost) / total_value
                if weight > 0.25:
                    recommendations.append(Recommendation(
                        symbol=h.symbol,
                        reason=f"Single stock {h.symbol} makes up {int(weight*100)}% of portfolio. Consider reducing position size.",
                        risk_level="High",
                        suggested_action="Reduce"
                    ))
                    diversification_score -= 10

        # 3. Generic "Growth" suggestions if portfolio is small
        if len(holdings) < 3:
             recommendations.append(Recommendation(
                symbol="QQQ",
                reason="Portfolio has few holdings. Consider adding tech exposure for growth.",
                risk_level="Medium",
                suggested_action="Watch"
            ))
             diversification_score -= 20

        # 4. Value suggestion
        if "Technology" in sectors and sectors["Technology"] / total_value > 0.5:
             recommendations.append(Recommendation(
                symbol="SCHD",
                reason="Heavy tech exposure. Consider a dividend ETF for balance.",
                risk_level="Low",
                suggested_action="Buy"
            ))

        # Fetch current prices for recommendations
        for rec in recommendations:
            quote = await market_service.get_quote(rec.symbol)
            if quote:
                rec.current_price = quote.current_price

        return RecommendationResponse(
            recommendations=recommendations,
            portfolio_risk_summary=f"Portfolio Risk is {portfolio_risk}. Diversification Score: {max(0, diversification_score)}/100",
            diversification_score=max(0, diversification_score)
        )

recommendation_service = RecommendationService()
