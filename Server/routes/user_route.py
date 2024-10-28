from fastapi import APIRouter, HTTPException
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
        cursor.execute("SELECT * from user where id = %s;", (user_id,))
        user_data = cursor.fetchone()

        if user_data is None:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

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
        raise HTTPException(status_code=500, detail="Erreur de connexion à la base de données")
    
    finally:
        cursor.close()
        connection.close() 
