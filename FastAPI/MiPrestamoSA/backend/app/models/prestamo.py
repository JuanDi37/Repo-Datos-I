from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database.database import Base

class Prestamo(Base):
    __tablename__ = "prestamo"

    prestamo_id = Column(Integer, primary_key=True, index=True)
    monto = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)  # FK to users table

    # Relationships
    user = relationship("User", back_populates="prestamos")  # Back reference to User
