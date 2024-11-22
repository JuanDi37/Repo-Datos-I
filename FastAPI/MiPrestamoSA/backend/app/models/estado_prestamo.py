from sqlalchemy import Column, Integer, String
from ..database.database import Base

class EstadoPrestamo(Base):
    __tablename__ = "estado_prestamo"

    estatus_id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(50), unique=True, nullable=False)