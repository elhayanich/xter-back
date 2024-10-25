from fastapi import APIRouter, HTTPException
from models.user_model import User, UserMessages
import mysql.connector
import database_connect
from mysql.connector import Error
from fastapi.responses import JSONResponse

router = APIRouter()

"""
# Route pour récupérer un User à partir de son Id, et le retourner au format User
@router.get("/{user_id}", response_model=UserMessages)
def get_user(user_id : int):
    try :
        connection = database_connect.get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user WHERE id = %s;", (user_id,))  # Récupère un utilisateur
        user = cursor.fetchone()
        print(f"user : {user}")

        if user:
            return user  # Retourne l'utilisateur
        else:
            raise HTTPException(status_code=404, detail=f"User {user_id} not found.")
        
    except mysql.connector.Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
"""




# Route pour récupérer un User à partir de son Id, et le retourner au format User
@router.get("/{user_id}", response_model=User)
def get_user(user_id : int):
    try :
        connection = database_connect.get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user WHERE id = %s;", (user_id,))  # Récupère un utilisateur
        user = cursor.fetchone()
        print(f"user : {user}")

        if user:
            return user  # Retourne l'utilisateur
        else:
            raise HTTPException(status_code=404, detail=f"User {user_id} not found.")
        
    except mysql.connector.Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()




"""
# Route pour récupérer tous les User
@router.get("/all", response_model=User)
def get_all_users():
    try :
        connection = database_connect.get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(f"SELECT id FROM user;")  # Récupère les id de tous les utilisateurs
        users = cursor.fetchall()
        

        if users:
            return JSONResponse(content=users)  # Retourne la liste des utilisateurs
        else:
            raise HTTPException(status_code=404, detail="Request not found.")
        
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
"""