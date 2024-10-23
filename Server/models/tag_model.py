from pydantic import BaseModel

# Modèle Pydantic pour la validation des données
class TagCreate(BaseModel):
    name: str