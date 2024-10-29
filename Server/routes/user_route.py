from fastapi import APIRouter, HTTPException
from models import User, UserPictureUpdate
import database_connect
from mysql.connector import Error

router = APIRouter()

@router.get("/{user_id}", response_model=User)
def get_user_from_db(user_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try: 
        cursor.execute("SELECT * from user where id = %s;", (user_id,))
        user_data = cursor.fetchone()

        if user_data is None:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

        # récupérer les données sous forme d'User
        user = User(
                id = user_data[0],
                username = user_data[1],
                is_admin = user_data[2],
                email = user_data[3],
                date_inscription = user_data[5],
                picture = user_data[6]
            )
        
        return user
    
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        raise HTTPException(status_code=500, detail="Erreur de connexion à la base de données")
    
    finally:
        cursor.close()
        connection.close() 

@router.get("/{picture}", response_model=User) # À FINIR !!!
def get_user_picture_from_db(user_id: int):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try: 
        cursor.execute("SELECT picture from user where id = %s;", (user_id,))
        user_data = cursor.fetchone()

        if user_data is None:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

        # récupérer les données sous forme d'User
        user = User(
                id = user_data[0],
                username = user_data[1],
                is_admin = user_data[2],
                email = user_data[3],
                date_inscription = user_data[5],
                picture = user_data[6]
            )
        #retourner la photo uniquement
        return user.picture
    
    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        raise HTTPException(status_code=500, detail="Erreur de connexion à la base de données")
    
    finally:
        cursor.close()
        connection.close() 

@router.post("/{user_id}/uploadImgUrl")
def upload_img_url(user_id: int, data: UserPictureUpdate):
    connection = database_connect.get_db_connection()
    cursor = connection.cursor()

    try : 
        cursor.execute("UPDATE user SET picture = %s WHERE id = %s", (data.url, user_id))
        connection.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

        return {"message": "URL de l'image enregistrée avec succès"}

    except Error as e:
        print(f"L'erreur suivante est survenue : '{e}'")
        raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement de l'URL de l'image")

    finally:
        cursor.close()
        connection.close()