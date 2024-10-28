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
    picture: Optional[str] = None
    is_admin: bool = False
    
# Modele pour l'utilisateur actuel
class User(BaseModel):
    id: int
    username: str
    is_admin: bool
    email: str
    date_inscription: datetime = datetime.now()
    picture : Optional[str]


# Modele pour les données renvoyées de la BDD
class UserLogin(BaseModel):
    id : int
    username: str

# Modele utilisé pour s'authentifier
class UserAuth(BaseModel):
    email: str
    password: str

# Utilisé pour afficher les messages d'un User
class UserMessages(BaseModel):
    username: str
    email: str
    picture: Optional[str] = None
    is_admin: bool = False
    messages: List[MessageCreate] = []