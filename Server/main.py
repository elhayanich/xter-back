from fastapi import FastAPI
import mysql.connector
from mysql.connector import Error
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

# Configuration de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration de la base de données
def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='colas',
            password='1212',
            database='xter'
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

# Modèle de données pour les messages
class Message(BaseModel):
    user_id: int  # Ajout de user_id
    content: str

# Endpoint pour récupérer un message GET
@app.get("/messages")
def get_messages():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM message ORDER BY date_post DESC;")  # Récupère tous les messages et les trie par date
    messages = cursor.fetchall()  # Utilise fetchall pour récupérer tous les messages
    cursor.close()
    connection.close()

    if messages:
        return messages  # Retourne la liste des messages
    return {"message": "No messages found."}

# Endpoint pour envoyer un message POST
@app.post("/messages")
def create_message(message: Message):
    connection = create_connection()
    cursor = connection.cursor()

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



