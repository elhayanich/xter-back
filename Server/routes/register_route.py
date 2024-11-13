from fastapi import APIRouter
import database_connect
from models import *
from mysql.connector import Error
from auth_tools import AuthTool
from create_fake_profiles import *
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

# route pour récupérer les fake profiles sur le front 
@router.get("/fake-users", response_model=List[UserCreate])
def get_fake_users():
    try:
        return fake_users_set1
    except Exception as e:
        print(f"Error: {e}")
        return {"error": "Failed to fetch fake users"}