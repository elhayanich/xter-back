from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


# Modèle Pydantic pour la validation des données
class MessageCreate(BaseModel):
    content: str
    date_post: datetime
    picture_path: Optional[str] = None
    message_parent: Optional[int] = None
