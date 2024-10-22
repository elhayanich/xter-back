from pydantic import BaseModel
from typing import List, Optional

# Modèle Pydantic pour la validation des données
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    picture_path: Optional[str] = None
    is_admin: bool = False