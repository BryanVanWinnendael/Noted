import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.db.firebase import Firebase
from .routers import themes


load_dotenv()
app = FastAPI()

Firebase().get_app()

origins = [os.environ.get("ORIGIN")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router=themes.router,
    prefix="/api/themes",
    tags=["themes"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}
