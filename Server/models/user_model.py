from pydantic import BaseModel
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from .message_model import MessageCreate

# Modèle Pydantic pour la validation des données
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    picture_path: Optional[str] = None
    is_admin: bool = False
    

# Schéma pour les données renvoyées de la BDD
class UserInDB(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str
    is_admin: bool
    date_inscription: datetime = datetime.now()

    class Config:
        from_attributes = True

# Utilisé pour afficher les messages d'un User
class UserMessages(BaseModel):
    username: str
    email: str
    password: str
    picture_path: Optional[str] = None
    is_admin: bool = False
    messages: List[MessageCreate] = []