from fastapi import APIRouter
import database_connect
from models import *
from mysql.connector import Error
from auth_tools import AuthTool
import hashlib

router = APIRouter()

@router.post("")
def register_user(user: UserCreate):
    try:
        connection = database_connect.get_db_connection()
        cursor = connection.cursor()

        username_hash = hashlib.md5(user.username.encode()).hexdigest() 
        avatar_url = f"https://api.dicebear.com/6.x/bottts/svg?seed={username_hash}"

        cursor.execute(
            "INSERT INTO user (username, is_admin, email, user_password, picture) VALUES (%s, 0, %s, %s, %s)",
            (user.username, user.email, AuthTool.pwd_context.hash(user.password), avatar_url)
        )
        connection.commit()
        return {"message": "User registration successful!"}
    except Error as e:
        print(f"The error '{e}' occurred")
        return {"error": "An error occurred during registration. Username and email may already be taken."}
    finally:
        cursor.close()
        connection.close()
