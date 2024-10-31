from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Modèle Pydantic pour la validation des données
class MessageCreate(BaseModel):
    user_id: int
    content: str
    tag_ids: Optional[List[int]] = None 
    picture_path: Optional[str] = None
    parent_id: Optional[int] = None 

class MessageGet(BaseModel):
    message_id : int
    user_id: int
    content: str
    picture: str
    date_post: datetime = datetime.now()
    reactions_id: int
    parent_id: Optional[int] = None 