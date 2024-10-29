from pydantic import BaseModel
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from .message_model import MessageCreate

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    picture: Optional[str] = None
    is_admin: bool = True
    