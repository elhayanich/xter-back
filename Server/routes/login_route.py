from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from models.user_model import UserCreate, UserInDB
from models.user_crud import create_user, authenticate_user
from models.security import create_access_token, get_current_user
from routes.database_route import get_db
from datetime import timedelta
from fastapi import FastAPI

app = FastAPI()  


router = APIRouter()


ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Inscription d'un utilisateur
@router.post("/register", response_model=UserInDB)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = create_user(db, user)
    return db_user

# Route pour obtenir un token JWT
@router.post("/token")
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# Récupérer l'utilisateur actuel
@router.get("/users/me", response_model=UserInDB)
def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return current_user
