from fastapi import APIRouter
from pydantic import BaseModel
from utils import translator

router = APIRouter()

class Text(BaseModel):
    text: str
    language: str = "en"

@router.post("")
async def translate_text(body: Text):
    res = translator.translate_text(body.text, body.language)
    return res

@router.get("")
async def get_languages():
    res = translator.get_languages()
    return {"languages": res}
