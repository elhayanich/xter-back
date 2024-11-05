from fastapi import APIRouter, HTTPException
from models.tag_model import TagCreate
from typing import List
import database_connect
from mysql.connector import Error

router = APIRouter()

# Endpoint pour envoyer une liste de tags
@router.post("", response_model=List[dict], status_code=201)
def create_tags(tags: List[TagCreate]):
    connection = database_connect.get_db_connection()
    created_tags = []  

    try:
        with connection.cursor() as cursor:
            for tag in tags:
                cursor.execute(
                    "INSERT INTO tag (tagname) VALUES (%s)",
                    (tag.tagname,)
                )
                tag_id = cursor.lastrowid  # Pour Récupérer l'ID du tag inséré
                created_tags.append({"id": tag_id, "tagname": tag.tagname})  # Ajouter le tag à la liste
            connection.commit()
        return created_tags  # Retourner les tags créés
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        raise HTTPException(status_code=500, detail="Une erreur s'est produite lors de l'envoi des tags.")
    finally:
        connection.close()

# Endpoint pour récupérer les tags
@router.get("", response_model=List[dict], status_code=200)
def get_tags():
    connection = database_connect.get_db_connection()
    
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM tag;")  
            tags = cursor.fetchall()
        if not tags:
            raise HTTPException(status_code=404, detail="Aucun tag trouvé.")
        return tags
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des tags.")
    finally:
        connection.close()

@router.get("/{tagname}")
def get_messages_by_tag(tagname: str):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)
    #tagname = "#"+tagname
    try:
        cursor.execute("""
            SELECT m.id, m.content, m.user_id, m.date_post, m.parent_id,
            GROUP_CONCAT(t.tagname) AS tags
            FROM message m
            LEFT JOIN tagmessage mt ON m.id = mt.message_id
            LEFT JOIN tag t ON mt.tag_id = t.id
            WHERE t.tagname = %s
            GROUP BY m.id
            ORDER BY m.date_post DESC;
        """, (tagname,))
        
        messages = cursor.fetchall()
        
        if messages:
            return messages
        return {"message": "Aucun message trouvé pour ce tag."}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de la récupération des messages."}
    finally:
        cursor.close()
        connection.close()