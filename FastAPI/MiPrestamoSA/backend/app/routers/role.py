from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.database import SessionLocal
from ..models.role import Role as RoleModel  # Renombrar para evitar confusión
from ..schemas.role import RoleCreate, Role

router = APIRouter(prefix="/roles", tags=["Roles"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[Role])
def get_roles(db: Session = Depends(get_db)):
    return db.query(RoleModel).all()

@router.post("/", response_model=Role)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    # Crear instancia del modelo SQLAlchemy
    db_role = RoleModel(descripcion=role.descripcion)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role
