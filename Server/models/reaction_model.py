#reaction_model.py
from pydantic import BaseModel

# Modèle pour la création d'une réaction
class ReactionCreate(BaseModel):
    user_id: int      
    message_id: int   
    reaction_id: int   # type de réaction l'autre table

    class Config:
        orm_mode = True



class ReactionGet(BaseModel):
    user_id: int      
    message_id: int   
    reaction_id: int   

    class Config:
        orm_mode = True 


