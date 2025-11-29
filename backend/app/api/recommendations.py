from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import RecommendationResponse
from app.services.auth_service import get_current_active_user
from app.services.recommendation_service import recommendation_service

router = APIRouter()

@router.get("/", response_model=RecommendationResponse)
async def get_recommendations(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return await recommendation_service.generate_recommendations(db, current_user.id)
