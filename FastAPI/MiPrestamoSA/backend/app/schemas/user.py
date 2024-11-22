from pydantic import BaseModel
from typing import Optional
from datetime import date  # Asegúrate de importar `date`

class UserBase(BaseModel):
    codigo_usuario: str
    primer_nombre: str
    segundo_nombre: Optional[str] = None
    tercer_nombre: Optional[str] = None
    primer_apellido: str
    segundo_apellido: Optional[str] = None
    apellido_casada: Optional[str] = None
    genero: Optional[str] = None
    cui: str
    fecha_nacimiento: Optional[date] = None  # Cambiamos a `date`
    fecha_vencimiento_dpi: Optional[date] = None  # Cambiamos a `date`
    rol_id: int
    supervisor_id: Optional[int] = None
    email: Optional[str] = None
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    estado: Optional[bool] = True

    class Config:
        from_attributes = True

class UserCreate(UserBase):
    pass

class User(UserBase):
    user_id: int
