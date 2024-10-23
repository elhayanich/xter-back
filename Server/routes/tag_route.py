from fastapi import APIRouter
from models.tag_model import TagCreate
from typing import List
import database_connect
from mysql.connector import Error

router = APIRouter()

# Endpoint pour envoyer une liste de tags
@router.post("")
def create_tags(tags: List[TagCreate]):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try:
        # Insérer chaque tag dans la base de données
        for tag in tags:
            cursor.execute(
                "INSERT INTO tag (tagname) VALUES (%s)",
                (tag.tagname,)
            )
        connection.commit()  # Valider la transaction
        return {"message": "Tags envoyés avec succès!"}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de l'envoi des tags."}
    finally:
        cursor.close()
        connection.close()
