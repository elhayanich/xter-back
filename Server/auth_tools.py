from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import random
from fastapi import Request
from fastapi import Body
from mysql.connector import Error
from passlib.context import CryptContext

KEYCRYP = "weekend"


class AuthTool:
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
    
    