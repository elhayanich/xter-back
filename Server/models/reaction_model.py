#reaction_model.py
from pydantic import BaseModel

# Modèle pour la création d'une réaction
class ReactionCreate(BaseModel):
    user_id: int  # ID de l'utilisateur
    reaction_id: int  # ID du type de réaction (référence à reactiontype)

    class Config:
        orm_mode = True  # Permet de convertir les objets de la base de données en objets Pydantic

# Modèle pour récupérer une réaction complète
class ReactionGet(BaseModel):
    id: int  # ID de la réaction
    user_id: int  # ID de l'utilisateur ayant réagi
    message_id: int  # ID du message auquel la réaction est associée
    reaction_name: str  # Nom du type de réaction associée à l'ID (via la table reactiontype)

    class Config:
        orm_mode = True  # Permet de convertir les objets de la base de données en objets Pydantic



