from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.database import get_db
from ..models.prestamo import Prestamo as PrestamoModel
from ..schemas.prestamo import Prestamo, PrestamoCreate
from ..models.user import User as UserModel

router = APIRouter(prefix="/prestamos", tags=["Prestamos"])

@router.post("/", response_model=Prestamo)
def create_prestamo(prestamo: PrestamoCreate, db: Session = Depends(get_db)):
    # Validar que el usuario existe
    if not db.query(UserModel).filter(UserModel.user_id == prestamo.user_id).first():
        raise HTTPException(status_code=400, detail="El usuario especificado no existe")
    
    # Crear el préstamo
    db_prestamo = PrestamoModel(**prestamo.dict())
    db.add(db_prestamo)
    db.commit()
    db.refresh(db_prestamo)
    return db_prestamo

@router.get("/", response_model=List[Prestamo])
def get_prestamos(db: Session = Depends(get_db)):
    return db.query(PrestamoModel).all()

@router.get("/{prestamo_id}", response_model=Prestamo)
def get_prestamo(prestamo_id: int, db: Session = Depends(get_db)):
    db_prestamo = db.query(PrestamoModel).filter(PrestamoModel.prestamo_id == prestamo_id).first()
    if not db_prestamo:
        raise HTTPException(status_code=404, detail="Prestamo no encontrado")
    return db_prestamo
