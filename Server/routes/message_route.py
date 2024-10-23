from fastapi import APIRouter
from models import *
import database_connect
from mysql.connector import Error

router = APIRouter()

@router.get("")
def get_messages():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM message ORDER BY date_post DESC;")  # Récupère tous les messages et les trie par date
    messages = cursor.fetchall()  # Utilise fetchall pour récupérer tous les messages
    cursor.close()
    connection.close()

    if messages:
        return messages  # Retourne la liste des messages
    return {"message": "No messages found."}

# Endpoint pour envoyer un message POST
@router.post("")
def create_message(message: MessageCreate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()
    print(message)

    try:
        # Insérer le message avec user_id dans la base de données
        cursor.execute(
            "INSERT INTO message (user_id, content) VALUES (%s, %s)", 
            (message.user_id, message.content)
        )
        connection.commit()  # Valider la transaction
        return {"message": "Message envoyé avec succès!"}
    except Error as e:
        print(f"The error '{e}' occurred")
        return {"error": "Une erreur s'est produite lors de l'envoi du message."}
    finally:
        cursor.close()
        connection.close()