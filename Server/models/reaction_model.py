from pydantic import BaseModel

# Modèle Pydantic pour la validation des données
class ReactionCreate(BaseModel):
    type: str
    value: float

