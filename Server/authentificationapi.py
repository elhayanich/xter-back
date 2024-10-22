from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

app = FastAPI()  # Une seule instance de FastAPI
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

@app.get("/test")
async def read_root():
    return {"Hello": "World"}

@app.post("/register")
async def register(user: UserRegister):
    # Ici, tu pourrais ajouter la logique d'inscription
    # Par exemple, hacher le mot de passe et l'ajouter à une base de données simulée
    return {"message": "Inscription réussie"}
