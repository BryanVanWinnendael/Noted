import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import rewrite


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
    router=rewrite.router,
    prefix="/api/rewrite",
    tags=["rewrite"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}
