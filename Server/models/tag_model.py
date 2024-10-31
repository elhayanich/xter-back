from pydantic import BaseModel

# Modèle Pydantic pour valider un tag
class TagCreate(BaseModel):
    tagname: str
