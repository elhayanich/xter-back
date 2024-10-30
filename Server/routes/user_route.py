from fastapi import APIRouter
from models import User
import database_connect
from mysql.connector import Error

router = APIRouter()

@router.get("/{user_id}", response_model=User)
def get_user_from_db(user_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    # try
    try: 
        #requête sql
        cursor.execute("SELECT id from user where id = (?);", [user_id])
        user_data = cursor.fetchone()[0]

        # récupérer les données sous forme d'User
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
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de a récupération de l'utilisateur."}
    finally:
        cursor.close()
        connection.close() 

@router.get("/me", response_model=User)
def get_user_name():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    # try
    try: 
        #requête sql
        cursor.execute("SELECT username from user where id = (?);", [user_id])
        user_data = cursor.fetchone()[0]

        # récupérer les données sous forme d'User
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
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de a récupération de l'utilisateur."}
    finally:
        cursor.close()
        connection.close() 