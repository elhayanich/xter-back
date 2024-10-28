from passlib.context import CryptContext
from datetime import datetime, timedelta

KEYCRYP = "weekend"


class AuthTool:
    SECRET_KEY = "weekend!"  # Utilisez une clé secrète forte en production
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    # This will be used to "hash" password
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Return hashed password
    @classmethod
    def password_hash(cls, password):
        return cls.pwd_context.hash(password)

    # Return true is password is the same that hashed_password, else return false
    @classmethod
    def password_verify(cls, password, hashed_password):
        return cls.pwd_context.verify(password, hashed_password)
    
    # Reste à implementer les tokens