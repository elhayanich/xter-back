from fastapi import APIRouter
from database_connect import get_db_connection

router = APIRouter()

@router.get("/stats")
async def get_stats():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    try:
        # Requête pour le nombre de messages
        cursor.execute("SELECT COUNT(*) AS num_messages FROM message")
        num_messages = cursor.fetchone()["num_messages"]
        print("Nombre de messages :", num_messages)

        # Requête pour le nombre de réactions
        cursor.execute("SELECT COUNT(*) AS num_reactions FROM reaction")
        num_reactions = cursor.fetchone()["num_reactions"]
        print("Nombre de réactions :", num_reactions)
        
          # Requête pour le nombre d'utilisateurs
        cursor.execute("SELECT COUNT(*) AS num_users FROM user")
        num_users = cursor.fetchone()["num_users"]
        print("Nombre d'utilisateurs :", num_users) # type: ignore

       
    except Exception as e:
        print("Erreur lors de la récupération des statistiques :", e)
        return {"error": "Erreur lors de la récupération des statistiques"}
    
    finally:
        cursor.close()
        connection.close()

    return {
        "num_messages": num_messages,
        "num_reactions": num_reactions,
        "num_users": num_users
       
    }

# Route pour récupérer la liste des utilisateurs
@router.get("/users")
async def get_users():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user")  
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return users

@router.delete("/{id}")
async def delete_user(id: int):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("DELETE FROM user WHERE id = %s;", (id,))  
    cursor.close()
    connection.commit()
    connection.close()
    return "ok"