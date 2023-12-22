from fastapi import APIRouter
from pydantic import BaseModel
from db import themes_db

router = APIRouter()

class Theme(BaseModel):
    name: str
    backgroundColor: str
    secondaryBackgroundColor: str
    textColor: str
    iconColor: str
    accentColor: str


@router.get("")
async def get_themes():
    themes = themes_db.get_themes()
    return themes


@router.get("/{name}")
async def get_theme(name: str):
    theme = themes_db.get_theme(name)
    return theme


@router.post("")
async def upload_theme(theme: Theme):
    res = themes_db.add_theme(theme)
    return res


@router.delete("/{name}")
async def delete_theme(name: str):
    res = themes_db.delete_theme(name)
    return res
