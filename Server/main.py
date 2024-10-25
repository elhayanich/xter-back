from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Importing all the routes from routes/__init__.py
# from routes import *
from routes.message_route import router as message_router
from routes.register_route import router as register_router
from routes.tag_route import router as tag_router
from routes.login_route import router as login_router
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

app.include_router(register_router, prefix="/register", tags=["Register"])
app.include_router(message_router, prefix="/messages", tags=["Messages"])
app.include_router(tag_router, prefix="/tags")
app.include_router(login_router, prefix="/login")


