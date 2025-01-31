import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db.firebase import Firebase
from .routers import themes, notes


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

app.include_router(
    router=notes.router,
    prefix="/api/notes",
    tags=["notes"],
)


@app.get("/")
async def root():
    return {"message": "This is the server of Noted"}
