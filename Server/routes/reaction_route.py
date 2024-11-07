# reaction_route.py
from fastapi import APIRouter
from models import ReactionCreate
from mysql.connector import Error
import database_connect

router = APIRouter()


@router.post("/{message_id}/reactions")
def create_reaction(message_id: int, reaction: ReactionCreate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("""
            INSERT INTO reaction (user_id, message_id, reaction_id)
            VALUES (%s, %s, %s)
        """, (reaction.user_id,message_id, reaction.reaction_id))
        connection.commit()
        return {"message": "yaaay reaction ajoutée!"}
    except Error as e:
        print(f"L'erreur is : '{e}'")
        return {"error": "erreur lors ajout de reaction."}
    finally:
        cursor.close()
        connection.close()


# GET endpoint to fetch all reactions for a specific message
@router.get("/{message_id}/reactions")
def get_reactions(message_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Add WHERE clause to filter by message_id
        cursor.execute("""
            SELECT reaction.user_id, reaction.message_id, reaction.reaction_id
            FROM reaction
            WHERE reaction.message_id = %s
        """, (message_id,))
        
        reactions = cursor.fetchall()
        return reactions
    except Error as e:
        print(f"L'erreur est : '{e}'")
        return {"error": "Erreur lors de la récupération des réactions."}
    finally:
        cursor.close()
        connection.close()


# @router.get("/{message_id}/reactions", response_model=List[ReactionGet])
# def get_reactions(message_id: int):
#     connection = database_connect.get_db_connection()
#     cursor = connection.cursor(dictionary=True)

#     try:
#         cursor.execute("""
#             SELECT r.id, r.user_id, r.message_id, rt.name AS reaction_name
#             FROM reaction r
#             JOIN reactiontype rt ON r.reaction_id = rt.id
#             WHERE r.message_id = %s;
#         """, (message_id,))
#         reactions = cursor.fetchall()

#         if reactions:
#             return reactions
#         return {"message": "Aucune réaction trouvée pour ce message."}
#     except Error as e:
#         print(f"L'erreur suivante est survenue : '{e}'")
#         return {"error": "Une erreur s'est produite lors de la récupération des réactions."}
#     finally:
#         cursor.close()
#         connection.close()

