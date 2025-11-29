from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class BrokerageConnection(Base):
    __tablename__ = "brokerage_connections"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    provider = Column(String, default="robinhood")
    access_token = Column(String, nullable=True) # In real app, this should be encrypted
    refresh_token = Column(String, nullable=True)
    is_connected = Column(Boolean, default=False)
    connected_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="brokerage_connection")
