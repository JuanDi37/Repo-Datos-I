from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database.database import Base

class Role(Base):
    __tablename__ = "rol"  # Matches the expected table name in the database

    # Columns
    rol_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False, unique=True)

    # Relationships
    usuarios = relationship("User", back_populates="rol")  # Relationship with User model
