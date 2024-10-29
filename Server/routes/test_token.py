from fastapi import APIRouter
from models import *
from auth_tools import AuthTool
from fastapi import Depends, HTTPException
from typing import Annotated


router = APIRouter()

@router.get("")
async def test_token(token: Annotated[str, Depends(AuthTool.oauth2_scheme)]):
    print("ON Y EST")
    try:
        user = await AuthTool.get_current_user(token)
        print(f"user : {user}")
        return {"user": user}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

"""  
def test_token():
    print("ON Y EST")
    try:
        token = AuthTool.get_current_user(token)
        print(f"user : {user}")
        return {"user": user}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
        """