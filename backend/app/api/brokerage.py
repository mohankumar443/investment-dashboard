from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.auth_service import get_current_active_user
from app.services.pdf_service import pdf_service

router = APIRouter()

@router.post("/import/pdf")
def import_from_pdf(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Import portfolio from PDF statement
    connection = pdf_service.connect_account(db, current_user.id)
    # Auto-sync holdings on import
    pdf_service.sync_holdings(db, current_user.id)
    return {"status": "connected", "provider": "pdf_import"}

@router.delete("/disconnect")
def disconnect_brokerage(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    success = pdf_service.disconnect_account(db, current_user.id)
    if not success:
        raise HTTPException(status_code=400, detail="No active connection found")
    return {"status": "disconnected"}

@router.get("/status")
def get_connection_status(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if current_user.brokerage_connection and current_user.brokerage_connection.is_connected:
        return {"connected": True, "provider": current_user.brokerage_connection.provider}
    return {"connected": False}
