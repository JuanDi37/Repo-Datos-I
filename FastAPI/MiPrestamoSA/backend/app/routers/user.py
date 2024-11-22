from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.database import SessionLocal
from ..models.user import User as UserModel
from ..models.role import Role as RoleModel  # Import Role model for validation
from ..schemas.user import User, UserCreate


router = APIRouter(prefix="/users", tags=["Users"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Validate that the role exists
    if not db.query(RoleModel).filter(RoleModel.rol_id == user.rol_id).first():
        raise HTTPException(status_code=400, detail="The specified role does not exist")
    
    # Validate that the supervisor exists, if provided
    if user.supervisor_id:
        if not db.query(UserModel).filter(UserModel.user_id == user.supervisor_id).first():
            raise HTTPException(status_code=400, detail="The specified supervisor does not exist")
    
    # Create the user
    db_user = UserModel(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/", response_model=List[User])
def get_users(db: Session = Depends(get_db)):
    return db.query(UserModel).all()


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
