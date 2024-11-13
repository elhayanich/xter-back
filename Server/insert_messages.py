import pandas as pd
import random
import database_connect
from mysql.connector import Error

ds = pd.read_csv("../Database/Kaggle_Sentimentdataset.csv")

def insert_fake_messages():
    connection = database_connect.get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        
        for i, row in ds.iterrows():
            message_content = row["Text"]
            username = row["User"]

           
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
            
            cursor.execute("""
                INSERT INTO message (user_id, content) 
                VALUES (%s, %s)
            """, (user_id, message_content))
        
        connection.commit()
        print("Les messages ont été insérés avec succès.")
    
    except Error as e:
        print(f"Error: {e}")
    
    finally:
        cursor.close()
        connection.close()


insert_fake_messages()