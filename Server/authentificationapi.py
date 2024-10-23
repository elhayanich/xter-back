from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

#Initialisation de FastAPI
app = FastAPI()

#Contexte de hachage des mots de passe avec bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#Modèle pour l'inscription d'utilisateurs
class UserRegister(BaseModel):
    email: EmailStr
    password: str

#Simulons une base de données avec un dictionnaire
fake_db = {}

#Route de test
@app.get("/test")
async def read_root():
    return {"message": "Hello World"}

#Route pour l'inscription
@app.post("/register")
async def register(user: UserRegister):
    # Vérifie si l'utilisateur existe déjà dans la "base de données"
    if user.username in fake_db:
        raise HTTPException(status_code=400, detail="L'utilisateur existe déjà")

#Hachage du mot de passe
    hashed_password = pwd_context.hash(user.password)

#Sauvegarde des données utilisateur dans la base de données simulée
    fake_db[user.username] = {
        "email": user.email,
        "hashed_password": hashed_password
    }

    return {"message": "Inscription réussie"}
