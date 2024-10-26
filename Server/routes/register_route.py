from fastapi import APIRouter
# Importing all models from models/__init__.py
from models import *
import database_connect
from mysql.connector import Error
from passlib.context import CryptContext
from auth_tools import AuthTool

"""
# This will be used to "hash" password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
"""

# Creating a router
router = APIRouter()

# Endpoint to register a new user (POST/register)
@router.post("")
def register_user(user: UserCreate):    
    try:
        print(f"user : {user}")
        connection = database_connect.get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO user (username, is_admin, email, user_password, picture_id) VALUES (%s, 0, %s, %s, 0)",
            (user.username, user.email, AuthTool.pwd_context.hash(user.password))
        )
        connection.commit()
        return {"message": "User registration successful!"}
    except Error as e:
        print(f"The error' '{e}' 'occured")
        return {"error": "An error occured during registration. Username and email may already be taken."}
    finally:
        cursor.close()
        connection.close()