from fastapi import APIRouter, HTTPException
from models import MessageCreate, MessageGet
from typing import List
import database_connect
from mysql.connector import Error
from create_fake_profiles import *
import subprocess

router = APIRouter()

@router.get("/")
def get_messages():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
            cursor.execute("""
                SELECT m.id, m.content, m.user_id, m.date_post, m.parent_id,
                GROUP_CONCAT(t.tagname) AS tags
                FROM message m
                LEFT JOIN tagmessage mt ON m.id = mt.message_id
                LEFT JOIN tag t ON mt.tag_id = t.id
                GROUP BY m.id
                ORDER BY m.date_post DESC;
            """)
            messages = cursor.fetchall()
            
            if messages:
                return messages
            return {"message": "Aucun message trouvé."}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de la récupération des messages."}
    finally:
        cursor.close()
        connection.close()


@router.post("/")
def create_message(message: MessageCreate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try:
        # inssérer le message dans sa
        cursor.execute(
            "INSERT INTO message (user_id, content, parent_id) VALUES (%s, %s, %s)",
            (message.user_id, message.content, message.parent_id)
        )
        message_id = cursor.lastrowid  # Récupérer l'ID du message inséré
        connection.commit()

        # insérer les tags dans la table de jointure qu'on a 
        if message.tag_ids:  
            for tag_id in message.tag_ids:
                cursor.execute(
                    "INSERT INTO tagmessage (message_id, tag_id) VALUES (%s, %s)",
                    (message_id, tag_id)
                )
            connection.commit()

        return {"message": "Message et tags envoyés avec succès!"}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de l'envoi du message."}
    finally:
        cursor.close()
        connection.close()



@router.post("/reply")
def create_reply(message: MessageCreate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try:
        # Insertion de la réponse dans la table message, avec le parent_id
        cursor.execute(
            "INSERT INTO message (user_id, content, parent_id) VALUES (%s, %s, %s)",
            (message.user_id, message.content, message.parent_id)
        )
        connection.commit()

        return {"message": "Réponse ajoutée avec succès!"}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de l'envoi de la réponse."}
    finally:
        cursor.close()
        connection.close()

  
        
# test get user messages 
@router.get("/{user_id}/messages")
def get_user_messages(user_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try: #tags
            cursor.execute("""
                SELECT m.id, m.content, m.user_id, m.date_post, m.parent_id,
                GROUP_CONCAT(t.tagname) AS tags
                FROM message m
                LEFT JOIN tagmessage mt ON m.id = mt.message_id
                LEFT JOIN tag t ON mt.tag_id = t.id
                where m.user_id = %s
                GROUP BY m.id
                ORDER BY m.date_post DESC;
            """, (user_id,))
            messages = cursor.fetchall()
            
            if messages:
                return messages
            return {"message": "Aucun message trouvé."}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de la récupération des messages."}
    finally:
        cursor.close()
        connection.close()


@router.get("/followed-messages/{user_id}")
def get_followed_messages(user_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # First, get the IDs of followed users
        cursor.execute("SELECT followed FROM follow WHERE follower = %s", (user_id,))
        followed_ids = [row['followed'] for row in cursor.fetchall()]

        if not followed_ids:
            return {"message": "Aucun message trouvé pour les utilisateurs suivis."}

        # Fetch messages from followed users
        format_strings = ','.join(['%s'] * len(followed_ids))
        cursor.execute(f"""
            SELECT m.id, m.content, m.user_id, m.date_post, m.parent_id,
            GROUP_CONCAT(t.tagname) AS tags
            FROM message m
            LEFT JOIN tagmessage mt ON m.id = mt.message_id
            LEFT JOIN tag t ON mt.tag_id = t.id
            WHERE m.user_id IN ({format_strings})
            GROUP BY m.id
            ORDER BY m.date_post DESC;
        """, tuple(followed_ids))

        messages = cursor.fetchall()
        
        return messages if messages else {"message": "Aucun message trouvé pour les utilisateurs suivis."}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de la récupération des messages suivis."}
    finally:
        cursor.close()
        connection.close()
    
@router.post("/fake-messages")
async def add_fake_messages():
    try:
        # Exécutez le script Python pour ajouter des messages
        result = subprocess.run(["python3", "insert_messages.py"], capture_output=True, text=True)
        if result.returncode == 0:
            return {"message": "Fake messages added successfully"}
        else:
            return {"error": f"Failed to add fake messages: {result.stderr}"}
    except Exception as e:
        return {"error": str(e)}