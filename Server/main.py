from fastapi import FastAPI
from routes import *
from fastapi.middleware.cors import CORSMiddleware





app = FastAPI()
from fastapi.staticfiles import StaticFiles

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
app.include_router(login_router, prefix="/login", tags=["Logins"])
app.include_router(token_router, prefix="/token")
app.include_router(user_router, prefix="/user", tags=["Users"])
app.include_router(reaction_router, prefix="/reactions")
app.include_router(reactiontype_router, prefix="/reactiontypes")
app.include_router(admin_router, prefix="/admin", tags=["admin"])



app.mount("/Server/profilePictures", StaticFiles(directory="profilePictures"), name="static") # to upload local files

