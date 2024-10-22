from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from typing import List, Optional
from datetime import datetime

app = FastAPI()

# Configuration de la connexion à la base de données
db_config = {
    'user': 'colas',
    'password': '1212',
    'host': 'localhost',
    'database': 'xter'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

# Modèles Pydantic pour la validation des données

class UserCreate(BaseModel):
    user_name: str
    email: str
    picture_path: Optional[str] = None
    is_admin: bool = False

class MessageCreate(BaseModel):
    content: str
    date_post: datetime
    picture_path: Optional[str] = None
    message_parent: Optional[int] = None

class ReactionCreate(BaseModel):
    type: str
    value: float

class TagCreate(BaseModel):
    name: str


# Classe User
class User:
    def __init__(self, user_name, email, picture_url=None, is_admin=False):
        self.user_name = user_name
        self.email = email
        self.picture_url = picture_url
        self.is_admin = is_admin

#    @staticmethod
#    def create_user(user_name, email, picture_path=None, is_admin=False):
#        connection = get_db_connection()
#        cursor = connection.cursor()
#        cursor.execute("""
#            INSERT INTO users (user_name, email, picture_path, is_admin)
#            VALUES (%s, %s, %s, %s)
#        """, (user_name, email, picture_path, is_admin))
#        connection.commit()
#        cursor.close()
#        connection.close()

#    @staticmethod
#    def get_user_by_id(user_id):
#        connection = get_db_connection()
#        cursor = connection.cursor(dictionary=True)
#        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
#        user = cursor.fetchone()
#        cursor.close()
#        connection.close()
#        return user
    

# Classe Message
class Message:
    def __init__(self, content, date_post, picture_url=None, message_parent=None):
        self.content = content
        self.date_post = date_post
        self.picture_url = picture_url
        self.message_parent = message_parent

#    @staticmethod
#    def create_message(content, date_post, picture_path=None, message_parent=None):
#        connection = get_db_connection()
#        cursor = connection.cursor()
#        cursor.execute("""
#            INSERT INTO messages (content, date_post, picture_path, message_parent)
#            VALUES (%s, %s, %s, %s)
#        """, (content, date_post, picture_path, message_parent))
#        connection.commit()
#        cursor.close()
#        connection.close()

# Classe Reaction
class Reaction:
    def __init__(self, message_id, type, value):
        self.message_id = message_id
        self.type = type
        self.value = value

#    @staticmethod
#    def add_reaction(message_id, type, value):
#        connection = get_db_connection()
#        cursor = connection.cursor()
#        cursor.execute("""
#            INSERT INTO reactions (message_id, type, value)
#            VALUES (%s, %s, %s)
#        """, (message_id, type, value))
#        connection.commit()
#        cursor.close()
#        connection.close()

# Classe Tag
class Tag:
    def __init__(self, message_id, name):
        self.message_id = message_id
        self.name = name

#    @staticmethod
#    def add_tag(message_id, name):
#        connection = get_db_connection()
#        cursor = connection.cursor()
#        cursor.execute("""
#            INSERT INTO tags (message_id, name)
#            VALUES (%s, %s)
#        """, (message_id, name))
#        connection.commit()
#        cursor.close()
#        connection.close()

# Routes FastAPI

@app.post("/users/", response_model=dict)
def create_user(user: UserCreate):
    User.create_user(user.user_name, user.email, user.picture_path, user.is_admin)
    return {"message": "User created successfully."}

@app.post("/messages/", response_model=dict)
def create_message(message: MessageCreate):
    Message.create_message(message.content, message.date_post, message.picture_path, message.message_parent)
    return {"message": "Message created successfully."}

@app.post("/reactions/", response_model=dict)
def add_reaction(reaction: ReactionCreate, message_id: int):
    Reaction.add_reaction(message_id, reaction.type, reaction.value)
    return {"message": "Reaction added successfully."}

@app.post("/tags/", response_model=dict)
def add_tag(tag: TagCreate, message_id: int):
    Tag.add_tag(message_id, tag.name)
    return {"message": "Tag added successfully."}

@app.get("/users/{user_id}", response_model=dict)
def get_user(user_id: int):
    user = User.get_user_by_id(user_id)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")
