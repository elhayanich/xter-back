from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Importing all the routes from routes/__init__.py
from routes import *

app = FastAPI()

# Configuration de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(register_router, prefix="/register", tags=["Register"])
app.include_router(message_router, prefix="/messages", tags=["Messages"])
app.include_router(tag_router, prefix="/tags")
app.include_router(login_route, prefix="/login", tags=["Logins"])
app.include_router(test_token, prefix="/token")
app.include_router(user_route, prefix="/user", tags=["Users"])



