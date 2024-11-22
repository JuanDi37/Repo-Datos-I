from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.database import get_db
from ..models.estado_prestamo import EstadoPrestamo as EstadoPrestamoModel
from ..schemas.estado_prestamo import EstadoPrestamo, EstadoPrestamoCreate

router = APIRouter(prefix="/estado_prestamo", tags=["Estados de Préstamo"])

@router.post("/", response_model=EstadoPrestamo)
def create_estado_prestamo(
    estado: EstadoPrestamoCreate, db: Session = Depends(get_db)
):
    db_estado = db.query(EstadoPrestamoModel).filter(EstadoPrestamoModel.descripcion == estado.descripcion).first()
    if db_estado:
        raise HTTPException(status_code=400, detail="El estado ya existe")
    nuevo_estado = EstadoPrestamoModel(**estado.dict())
    db.add(nuevo_estado)
    db.commit()
    db.refresh(nuevo_estado)
    return nuevo_estado

@router.get("/", response_model=List[EstadoPrestamo])
def get_estados_prestamo(db: Session = Depends(get_db)):
    return db.query(EstadoPrestamoModel).all()

@router.get("/{estatus_id}", response_model=EstadoPrestamo)
def get_estado_prestamo(estatus_id: int, db: Session = Depends(get_db)):
    estado = db.query(EstadoPrestamoModel).filter(EstadoPrestamoModel.estatus_id == estatus_id).first()
    if not estado:
        raise HTTPException(status_code=404, detail="Estado no encontrado")
    return estado
