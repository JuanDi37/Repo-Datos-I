from pydantic import BaseModel
from typing import Optional
from datetime import date

class PrestamoBase(BaseModel):
    codigo_prestamo: str
    monto_solicitado: float
    cuotas_pactadas: int
    motivo: Optional[str] = None
    estatus_id: int
    porcentaje_interes: float
    iva: float
    cargos_administrativos: float
    total: float
    fecha_creacion: date
    fecha_aprobacion: Optional[date] = None
    user_id: int

class PrestamoCreate(PrestamoBase):
    pass

class Prestamo(PrestamoBase):
    prestamo_id: int

    class Config:
        from_attributes = True
