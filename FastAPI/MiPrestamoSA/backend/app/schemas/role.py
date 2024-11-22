from pydantic import BaseModel

class RoleBase(BaseModel):
    descripcion: str

class RoleCreate(RoleBase):
    pass

class Role(RoleBase):
    rol_id: int

    class Config:
        orm_mode = True
