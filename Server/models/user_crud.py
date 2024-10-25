from sqlalchemy.orm import Session
from models.user_model import UserCreate, UserInDB
from models.security import get_password_hash
from passlib.context import CryptContext

# Définir le contexte de hachage des mots de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = UserInDB(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        is_admin=False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(UserInDB).filter(UserInDB.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user
