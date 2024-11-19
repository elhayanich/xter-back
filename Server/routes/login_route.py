# from fastapi import APIRouter
# from models import *
# import database_connect
# from mysql.connector import Error
# from auth_tools import AuthTool
# from fastapi import HTTPException


# router = APIRouter()

# # Endpoint to login a user (POST/login)
# @router.post("")
# def login_user(user_to_log: UserAuth):    
#     try:
#         connection = database_connect.get_db_connection()
#         cursor = connection.cursor()

#         # On commence par voir si l'email se trouve dans la base de donnees
#         cursor.execute(
#             "SELECT * FROM user WHERE email = %s", 
#             (user_to_log.email, )
#         )
#         user_data = cursor.fetchone()

#         if user_data is None:
#             raise HTTPException(status_code=404, detail="This email is not registered yet!")

#         if not AuthTool.password_verify(user_to_log.password, user_data[4]):
#             raise HTTPException(status_code=401, detail="Wrong password!")


#         try:
#             token = AuthTool.create_token(str(user_data[0]))
#             print(user_data[0])
#             print(token)
        
#             return {"message": "Authentification successfull!!", "username" : user_data[1], "token" : token, "is_admin": user_data[2]}
#         except Error as e:
#             return {"error": "Can't create token"}
        
#     except Error as e:
#         return {"error": "An error occured during registration. Cannot get authentification."}
#     finally:
#         cursor.close()
#         connection.close()
        
from fastapi import APIRouter, HTTPException
from models import *
import database_connect
from mysql.connector import Error
from auth_tools import AuthTool
from datetime import datetime

router = APIRouter()

# Endpoint to login a user (POST/login)
@router.post("")
def login_user(user_to_log: UserAuth):    
    try:
        connection = database_connect.get_db_connection()
        cursor = connection.cursor()

        # Step 1: Check if the email exists in the database
        cursor.execute(
            "SELECT * FROM user WHERE email = %s", 
            (user_to_log.email, )
        )
        user_data = cursor.fetchone()

        if user_data is None:
            raise HTTPException(status_code=404, detail="This email is not registered yet!")

        # Step 2: Verify the password
        if not AuthTool.password_verify(user_to_log.password, user_data[4]):
            raise HTTPException(status_code=401, detail="Wrong password!")

        # Step 3: Update the last login timestamp (do this, but don't block login on failure)
        try:
            cursor.execute(
                "UPDATE user SET last_login = %s WHERE id = %s", 
                (datetime.now(), user_data[0])
            )
            connection.commit()
        except Error as e:
            print(f"Failed to update last_login for user {user_data[0]}: {e}")
            # Log the error but don't raise an exception - user will still log in.

        # Step 4: Generate the token
        try:
            token = AuthTool.create_token(str(user_data[0]))
            return {
                "message": "Authentication successful!",
                "username": user_data[1],
                "token": token,
                "is_admin": user_data[2]
            }
        except Error as e:
            raise HTTPException(status_code=500, detail="Can't create token")
        
    except Error as e:
        raise HTTPException(status_code=500, detail="An error occurred during authentication.")
    finally:
        cursor.close()
        connection.close()
