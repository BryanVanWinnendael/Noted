from fastapi import APIRouter
from pydantic import BaseModel
from utils import rewriter

router = APIRouter()

class Text(BaseModel):
    text: str
    

@router.post("")
async def rewrite_text(body: Text):
    res = rewriter.rewrite_text(body.text)
    return res

