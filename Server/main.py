from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import *
from routes.login_route import router as user_router
from models.security import get_password_hash
from models.user_crud import authenticate_user



app = FastAPI()

# Configuration de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(register_router, prefix="/register")
app.include_router(message_router, prefix="/messages")
app.include_router(tag_router, prefix="/tags")
app.include_router(user_router)
