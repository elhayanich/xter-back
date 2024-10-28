from fastapi import APIRouter, HTTPException, Depends
from models.user_model import User
import database_connect
from mysql.connector import Error
from auth_tools import AuthTool

router = APIRouter()

# Route pour récupérer un User à partir de son Id, et le retourner au format User
@router.get("/{user_id}", response_model=User)
def get_user(user_id: int):
    try :
        connection = database_connect.get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(f"SELECT * FROM user WHERE id = {user_id};")  # Récupère un utilisateur
        user_data = cursor.fetchone()

        user = User(
            id = user_data[0],
            username = user_data[1],
            is_admin = user_data[2],
            email = user_data[3],
            date_inscription = user_data[5],
            picture = user_data[6]
        )
        
        return user
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

"""
@router.get("/me")
async def get_myslef(current_user: dict = Depends(AuthTool.get_current_user)):
    return 
"""