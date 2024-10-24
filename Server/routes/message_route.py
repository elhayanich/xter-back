from fastapi import APIRouter
from models import MessageCreate
import database_connect
from mysql.connector import Error

router = APIRouter()

@router.get("/")
def get_messages():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM message ORDER BY date_post DESC;")  
    messages = cursor.fetchall()  
    cursor.close()
    connection.close()

    if messages:
        return messages 
    return {"message": "Aucun message trouvé."}

@router.get("/with_tags")
def get_messages_with_tags():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT m.id, m.content, m.user_id, m.date_post, GROUP_CONCAT(t.tagname) AS tags
            FROM message m
            LEFT JOIN tagmessage mt ON m.id = mt.message_id
            LEFT JOIN tag t ON mt.tag_id = t.id
            GROUP BY m.id;
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

# Endpoint pour envoyer un message
@router.post("/")
def create_message(message: MessageCreate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()
    print(message)

    try:
        cursor.execute(
            "INSERT INTO message (user_id, content) VALUES (%s, %s)", 
            (message.user_id, message.content)
        )
        connection.commit()  
        return {"message": "Message envoyé avec succès!"}
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        return {"error": "Une erreur s'est produite lors de l'envoi du message."}
    finally:
        cursor.close()
        connection.close()

@router.post("/with_tags")
def create_message_with_tags(message: MessageCreate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try:
        # Insérer le message dans la table des messages
        cursor.execute(
            "INSERT INTO message (user_id, content) VALUES (%s, %s)",
            (message.user_id, message.content)
        )
        message_id = cursor.lastrowid  # Récupérer l'ID du message inséré
        connection.commit()

        # Insérer les tags dans la table de jointure
        if message.tag_ids:  # Supposons que message.tag_ids est une liste d'IDs de tags
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

