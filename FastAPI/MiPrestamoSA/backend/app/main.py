from fastapi import FastAPI
from .routers import role, user

app = FastAPI()

app.include_router(role.router)
app.include_router(user.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a Mi Préstamo S.A."}


from .routers import role, user, prestamo

app.include_router(role.router)
app.include_router(user.router)
app.include_router(prestamo.router)


from .routers import role, user, prestamo, estado_prestamo

app = FastAPI()

app.include_router(role.router)
app.include_router(user.router)
app.include_router(prestamo.router)
app.include_router(estado_prestamo.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a Mi Préstamo S.A."}

