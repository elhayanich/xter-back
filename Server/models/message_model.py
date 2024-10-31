from pydantic import BaseModel
from typing import List, Optional

# Modèle Pydantic pour la validation des données
class MessageCreate(BaseModel):
    user_id: int
    content: str
    tag_ids: Optional[List[int]] = None 
    picture_path: Optional[str] = None
    parent_id: Optional[int] = None 