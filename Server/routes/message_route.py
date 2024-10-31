from fastapi import APIRouter, HTTPException
from models import MessageCreate, MessageGet
from typing import List
import database_connect
from mysql.connector import Error

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

# route pour récupérer les messages d'une personne 
@router.get("/{user_id}", response_model=List[MessageGet])
def get_user_messages(user_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try: 
        cursor.execute("SELECT * from message where user_id = %s", (user_id,))
        user_messages = cursor.fetchall()

        if user_messages is None:
                raise HTTPException(status_code=404, detail="Pas de messages trouvés pour cet utilisateur")
        
        user_messages_list = []
        for message in user_messages:
            current_message = MessageGet(
                id = message[0],
                user_id = message[1],
                content = message[2],
                picture = message[3],
                date_post = message[4], 
                reactions_id = message[5],
                parent_id = message[6]
            )
            user_messages_list.append(current_message)
        return user_messages_list
        
    
    finally:
        cursor.close()
        connection.close()  
        