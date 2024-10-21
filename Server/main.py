from fastapi import FastAPI
import mysql.connector
from mysql.connector import Error
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
            user='root',  
            password='devia',  
            database='xter'  
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

# Endpoint pour récupérer un message
@app.get("/messages")
def get_message():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM messages LIMIT 1;")
    message = cursor.fetchone()
    cursor.close()
    connection.close()
    
    if message:
        return message  # Retourne le message
    return {"message": "No message found."}

