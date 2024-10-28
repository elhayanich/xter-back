from passlib.context import CryptContext
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from models.user_model import User

KEYCRYP = "weekend!"


class AuthTool:
    secret_key = "weekend!"  # Utilisez une clé secrète forte en production
    algo = "HS256"
    delta_time = timedelta(minutes=30)

    # Ceci pas être utilisé pour Hasher le mot de passe
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Création  d'une dépendance qui extrait le token JWT depuis l’en-tête Authorization pour les routes protégées
    # En redirigeant vers tokenUrl si le token est absent ou invalide
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

    # Retourne le mdp hashé
    @classmethod
    def password_hash(cls, password):
        return cls.pwd_context.hash(password)

    # Retourne True si le mdp est le bon, False sinon
    @classmethod
    def password_verify(cls, password, hashed_password):
        return cls.pwd_context.verify(password, hashed_password)
    

    # Passons aux tokens maintenant


    # Creation d'un token 
    @classmethod
    def create_token(cls, user_id: int):
        expire = datetime.now() + cls.delta_time                                # Date d'expiration du token
        expire = expire.timestamp()
        to_encode = {"exp" : expire, "sub" : user_id}
        token = jwt.encode(to_encode, cls.secret_key, algorithm=cls.algo)       # Ajout de la date d'expiration aux donnees a encoder
        return token                                                            # Encodage avec notre clé secrète, selon notre algo
    
    # Retourne notre user actuel
    @classmethod
    async def get_current_user(cls, token : str = Depends(oauth2_scheme)):
        try:
            payload = jwt.decode(token, cls.secret_key, algorithm=cls.algo)     # Decodage de notre token
            user_id = payload.get("sub")                                           # "sub" contient le sujet du token (et donc notre user)
            if user_id is None:
                raise Exception.add_note("No user for this credential")
            return user_id
        
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate user",
                headers={"WWW-Authenticate": "Bearer"},
            )
        

