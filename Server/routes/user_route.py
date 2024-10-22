from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from models.user_model import UserCreate
from datetime import datetime
import database_connect
from mysql.connector import Error
from classes.user import User

router = APIRouter()

@router.post("/register")
def register_user(user: UserCreate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(
            "INSERT INTO user (username, is_admin, email, user_password, date_inscription, picture_id) VALUES (%s, 0, %s, %s, %s, 0)",
            (user.username, user.email, user.password, datetime.now())
        )
        connection.commit()
        return {"message": "User registration successful!"}
    except Error as e:
        print(f"The error' '{e}' 'occured")
        return {"error": "Error with user registration"}
    finally:
        cursor.close()
        connection.close()