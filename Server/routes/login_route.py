from fastapi import APIRouter
from models import *
import database_connect
from mysql.connector import Error
from auth_tools import AuthTool
from fastapi import HTTPException


router = APIRouter()

# Endpoint to login a user (POST/login)
@router.post("")
def login_user(user_to_log: UserAuth):    
    try:
        connection = database_connect.get_db_connection()
        cursor = connection.cursor()

        # On commence par voir si l'email se trouve dans la base de donnees
        cursor.execute(
            "SELECT * FROM user WHERE email = %s", 
            (user_to_log.email, )
        )
        user_data = cursor.fetchone()

        if user_data is None:
            raise HTTPException(status_code=404, detail="This email is not registered yet!")

        if not AuthTool.password_verify(user_to_log.password, user_data[4]):
            raise HTTPException(status_code=401, detail="Wrong password!")


        try:
            token = AuthTool.create_token(str(user_data[0]))
            print(user_data[0])
            print(token)
            # si le user est admin
            #is_admin = True
            # sinon
            #is_admin = False
            return {"message": "Authentification successfull!!", "username" : user_data[1], "token" : token, "is_admin": user_data[2]}
        except Error as e:
            return {"error": "Can't create token"}
        
    except Error as e:
        return {"error": "An error occured during registration. Cannot get authentification."}
    finally:
        cursor.close()
        connection.close()
        
