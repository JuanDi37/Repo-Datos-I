from pydantic import BaseModel

class EstadoPrestamoBase(BaseModel):
    descripcion: str

class EstadoPrestamoCreate(EstadoPrestamoBase):
    pass

class EstadoPrestamo(EstadoPrestamoBase):
    estatus_id: int

    class Config:
        from_attributes = True
