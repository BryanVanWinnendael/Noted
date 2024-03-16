import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import translate


load_dotenv()
app = FastAPI()

origins = [os.environ.get("ORIGIN")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router=translate.router,
    prefix="/api/translate",
    tags=["translate"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}
