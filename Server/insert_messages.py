# import pandas as pd
# import random
# import database_connect
# from mysql.connector import Error

# ds = pd.read_csv("../Database/Kaggle_Sentimentdataset.csv")

# def insert_fake_messages():
#     connection = database_connect.get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     try:
        
#         for i, row in ds.iterrows():
#             message_content = row["Text"]
#             username = row["User"]

           
#             cursor.execute("SELECT id FROM user WHERE username = %s", (username,))
#             user_id = cursor.fetchone()

#             if user_id:
#                 user_id = user_id['id']  
#             else:
#                 print(f"L'utilisateur {username} n'existe pas dans la base de données. Attribution d'un utilisateur au hasard.")
               
#                 cursor.execute("SELECT id FROM user ORDER BY RAND() LIMIT 1")
#                 user_id = cursor.fetchone()

#                 if user_id:
#                     user_id = user_id['id']  
#                 else:
#                     print("Aucun utilisateur trouvé dans la base de données.")
#                     continue 
            
#             cursor.execute("""
#                 INSERT INTO message (user_id, content) 
#                 VALUES (%s, %s)
#             """, (user_id, message_content))
        
#         connection.commit()
#         print("Les messages ont été insérés avec succès.")
    
#     except Error as e:
#         print(f"Error: {e}")
    
#     finally:
#         cursor.close()
#         connection.close()


# insert_fake_messages()

import pandas as pd
import random
import database_connect
from mysql.connector import Error

# Charger le dataset
ds = pd.read_csv("../Database/Kaggle_Sentimentdataset.csv")

def insert_fake_messages():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        for i, row in ds.iterrows():
            message_content = row["Text"]
            username = row["User"]
            tags = row["Hashtags"].split()  # Extraire les tags en les séparant par des espaces

            # Récupérer l'ID de l'utilisateur ou en attribuer un aléatoire si l'utilisateur n'existe pas
            cursor.execute("SELECT id FROM user WHERE username = %s", (username,))
            user_id = cursor.fetchone()

            if user_id:
                user_id = user_id['id']
            else:
                print(f"L'utilisateur {username} n'existe pas dans la base de données. Attribution d'un utilisateur au hasard.")
                cursor.execute("SELECT id FROM user ORDER BY RAND() LIMIT 1")
                user_id = cursor.fetchone()
                if user_id:
                    user_id = user_id['id']
                else:
                    print("Aucun utilisateur trouvé dans la base de données.")
                    continue

            # Insertion du message
            cursor.execute("""
                INSERT INTO message (user_id, content, date_post) 
                VALUES (%s, %s, %s)
            """, (user_id, message_content, row["Timestamp"]))
            message_id = cursor.lastrowid  # Récupérer l'ID du message inséré

            # Gestion des tags
            for tag in tags:
                tag = tag.strip('#')  # Supprime le caractère '#' au début du tag s'il existe
                cursor.execute("SELECT id FROM tag WHERE tagname = %s", (tag,))
                tag_row = cursor.fetchone()

                # Si le tag n'existe pas, l'insérer
                if tag_row:
                    tag_id = tag_row['id']
                else:
                    cursor.execute("INSERT INTO tag (tagname) VALUES (%s)", (tag,))
                    tag_id = cursor.lastrowid

                # Créer une entrée dans la table de liaison `tagmessage`
                cursor.execute("""
                    INSERT IGNORE INTO tagmessage (message_id, tag_id) 
                    VALUES (%s, %s)
                """, (message_id, tag_id))

        connection.commit()
        print("Les messages et leurs tags ont été insérés avec succès.")

    except Error as e:
        print(f"Error: {e}")

    finally:
        cursor.close()
        connection.close()

insert_fake_messages()
