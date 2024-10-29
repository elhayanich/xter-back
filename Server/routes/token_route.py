from fastapi import APIRouter
from models import *
from auth_tools import AuthTool
from fastapi import Depends, HTTPException
from typing import Annotated


router = APIRouter()

@router.get("")
async def check_token(token: Annotated[str, Depends(AuthTool.oauth2_scheme)]):
    try:
        user= await AuthTool.get_current_user(token)
        print("user : " + user)
        return {"user": user}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

# Route de test
@router.post("/message")
async def test_messages(message: dict):
    try:
        print ("message recu : ", message)
        return {"status": "Message reçu avec succès"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Mauvais traitement du message")