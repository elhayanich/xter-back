from passlib.context import CryptContext
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from typing import Annotated

KEYCRYP = "weekend!"


class AuthTool:
    secret_key = "bonjour!"
    algo = "HS256"
    delta_time = timedelta(minutes=30)

    # Ceci sera utilisé pour Hasher le mot de passe
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Création  d'une dépendance qui extrait le token JWT depuis l’en-tête Authorization pour les routes protégées
    # En redirigeant vers tokenUrl si le token est absent ou invalide
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


    @classmethod
    def password_hash(cls, password):
        return cls.pwd_context.hash(password)


    @classmethod
    def password_verify(cls, password, hashed_password):
        return cls.pwd_context.verify(password, hashed_password)
    

    # Passons aux tokens maintenant


    # Creation d'un token 
    @classmethod
    def create_token(cls, user_id: str):
        expire = datetime.now() + cls.delta_time                                
        expire = expire.timestamp()
        to_encode = {"exp" : expire, "sub" : user_id}
        token = jwt.encode(to_encode, cls.secret_key, algorithm="HS256")
        return token                                                            
    

    # Comment appelle la fonction suivante : 
    # async def ma_fonction_de_route(token: Annotated[str, Depends(oauth2_scheme)]):
    #      user = AuthTool.get_current_user(token)
    #
    # Annotated[str, Depends(oauth2_scheme)] permet d'extraire automatiquement le token depuis l'url

    @classmethod
    async def get_current_user(cls, token : Annotated[str, Depends(oauth2_scheme)]):
        try:
            payload = jwt.decode(token, cls.secret_key, algorithms=["HS256"])
            user_id = payload.get("sub")                                        # "sub" contient le sujet du token (et donc notre user)
            if user_id is None:
                raise Exception.add_note("No user for this token")
            return user_id
        
        except Exception as e:
            print(f"JWTError: {e}")
            raise HTTPException(
                status_code=401,
                detail="Could not validate user",
                headers={"WWW-Authenticate": "Bearer"},
            )
        

