# reaction_route.py
from fastapi import APIRouter
from models import ReactionCreate
from mysql.connector import Error
import database_connect
import random

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

# Post fake reactions
@router.get("/fake-reactions")
def post_fake_reactions():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()
 
    try: 
        # Récupérer tous les utilisateurs id dans un tableau à partir de user
        cursor.execute("select id from user;")
        user_list = cursor.fetchall()
        # Récupérer tous les messages id dans un tableau à partir de message
        cursor.execute("select id from message;")
        messages_list = cursor.fetchall()
        print(user_list, messages_list)
        # Attribuer un user et une réaction au hasard à chaque message (table reaction)
        for message_id in messages_list: 
            random_user = random.choice(user_list)
            random_reaction = random.randint(1,3)
            cursor.execute("insert into reaction (user_id, message_id, reaction_id) values (%s, %s, %s)", (random_user[0], message_id[0], random_reaction))
            print("Line added : ", random_user, message_id, random_reaction)

        connection.commit()
        return {"message" : "plein de fakes reactions ajoutées !"}

    except Error as e:
        print(f"L'erreur is : '{e}'")
        return {"error": "erreur lors ajout de fausse réaction."}
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

