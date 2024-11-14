#recationtype_model.py
from pydantic import BaseModel
from typing import Optional

# Modèle pour récupérer un type de réaction
class ReactionTypeGet(BaseModel):
    id: int
    name: str
    rate: float
    picture: Optional[str] = None 

    class Config:
        from_attributes = True  