#recationtype_model.py
from pydantic import BaseModel
from typing import Optional

# Modèle pour récupérer un type de réaction
class ReactionTypeGet(BaseModel):
    id: int
    name: str
    rate: float
    picture: Optional[str] = None  # URL optionnelle pour l'image de la réaction

    class Config:
        orm_mode = True  # Permet de convertir les objets de la base de données en objets Pydantic
