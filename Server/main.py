from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_route import router as user_route
from pydantic import BaseModel


app = FastAPI()

# Configuration de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_route, prefix="/users")