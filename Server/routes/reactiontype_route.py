# reactiontype_route.py
from fastapi import APIRouter
from typing import List 
from models import ReactionTypeGet
from mysql.connector import Error
import database_connect

router = APIRouter()

# Route pour obtenir tous les types de réactions
@router.get("/", response_model=List[ReactionTypeGet])
def get_reactiontypes():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute("SELECT id, name, rate, picture FROM reactiontype")
        reactiontypes = cursor.fetchall()

        if reactiontypes:
            return reactiontypes
        return {"message": "Aucun type de réaction trouvé."}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de la récupération des types de réactions."}
    finally:
        cursor.close()
        connection.close()
