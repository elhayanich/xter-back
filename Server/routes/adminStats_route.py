import mysql.connector
from fastapi import APIRouter
import mysql.connector
router = APIRouter

def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="xter"
    )
    return connection

@router.get("/admin/stats")
async def get_stats():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
 # Requête pour le nombre de messages
    cursor.execute("SELECT COUNT(*) AS num_messages FROM messages")
    num_messages = cursor.fetchone()["num_messages"]

    # Requête pour le nombre de réactions
    cursor.execute("SELECT COUNT(*) AS num_reactions FROM reactions")
    num_reactions = cursor.fetchone()["num_reactions"]

    # Requête pour les utilisateurs actifs
    cursor.execute("SELECT COUNT(*) AS active_users FROM users WHERE is_active = 1")
    active_users = cursor.fetchone()["active_users"]

    cursor.close()
    connection.close()

    return {
        "num_messages": num_messages,
        "num_reactions": num_reactions,
        "active_users": active_users
    }
@router.get("/admin/users")
async def get_users():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user") 
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return users