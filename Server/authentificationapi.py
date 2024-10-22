from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

app = FastAPI()  # Instance FastAPI
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRegister(BaseModel):
    email: EmailStr
    password: str

# Route pour /
@app.get("/")
async def root():
    return {"message": "Bienvenue sur la page d'accueil"}

# Route pour /test
@app.get("/test")
async def read_root():
    return {"Hello": "World"}

# Route pour /register
@app.post("/register")
async def register(user: UserRegister):
    return {"message": "Inscription réussie"}
