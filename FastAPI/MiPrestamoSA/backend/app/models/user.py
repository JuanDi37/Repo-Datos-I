from sqlalchemy import Column, Integer, String, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from ..database.database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    codigo_usuario = Column(String(50), unique=True, nullable=False)
    primer_nombre = Column(String(50), nullable=False)
    segundo_nombre = Column(String(50))
    tercer_nombre = Column(String(50))
    primer_apellido = Column(String(50), nullable=False)
    segundo_apellido = Column(String(50))
    apellido_casada = Column(String(50))
    genero = Column(String(10))
    cui = Column(String(25), unique=True, nullable=False)
    fecha_nacimiento = Column(Date)
    fecha_vencimiento_dpi = Column(Date)
    rol_id = Column(Integer, ForeignKey("rol.rol_id"), nullable=False)  # FK to Role
    supervisor_id = Column(Integer, ForeignKey("users.user_id"))
    email = Column(String(100), unique=True)
    telefono = Column(String(15))
    direccion = Column(String(255))
    estado = Column(Boolean, default=True)

    # Relationships
    rol = relationship("Role", back_populates="usuarios")  # Relationship with Role
    prestamos = relationship("Prestamo", back_populates="user")  # Relationship with Prestamo
    supervisor = relationship("User", remote_side=[user_id])  # Self-referential relationship
