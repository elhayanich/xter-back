from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Hacher le mot de passe
def get_password_hash(password):
    return pwd_context.hash(password)

# Vérifier le mot de passe
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Créer un jeton JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



async def get_current_user(token: str = Depends(oauth2_scheme)):
    # Logique pour vérifier le token et obtenir l'utilisateur
    # Par exemple, décoder le token JWT et récupérer l'utilisateur
    user = ...  # récupérer l'utilisateur
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user
