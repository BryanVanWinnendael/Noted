from fastapi import APIRouter, Depends
from pydantic import BaseModel
from db import themes_db
from middleware.auth import get_firebase_user, get_firebase_user_admin

router = APIRouter()


class Theme(BaseModel):
    email: str = None
    name: str
    backgroundColor: str
    secondaryBackgroundColor: str
    textColor: str
    iconColor: str
    accentColor: str


@router.get("/requests")
async def get_requested_themes_for_admin(user=Depends(get_firebase_user_admin)):
    themes = themes_db.get_requested_themes()
    return themes


@router.post("/requests")
async def upload_theme(theme: Theme, user=Depends(get_firebase_user)):
    user_email = user['email']
    res = themes_db.add_requested_theme(user_email, theme)
    return res


@router.delete("/requests/{name}")
async def delete_requested_theme(name: str, user=Depends(get_firebase_user_admin)):
    res = themes_db.delete_requested_theme(name)
    return res


@router.get("/requests/user")
async def get_all_requested_themes_for_user(user=Depends(get_firebase_user)):
    user_email = user['email']
    themes = themes_db.get_requested_themes_for_user(user_email)
    return themes


@router.get("")
async def get_themes():
    themes = themes_db.get_themes()
    return themes


@router.get("/{name}")
async def get_theme(name: str, user=Depends(get_firebase_user)):
    theme = themes_db.get_theme(name)
    return theme


@router.post("")
async def upload_theme(theme: Theme, user=Depends(get_firebase_user_admin)):
    res = themes_db.add_theme(theme)
    return res


@router.delete("/{name}")
async def delete_theme(name: str, user=Depends(get_firebase_user_admin)):
    res = themes_db.delete_theme(name)
    return res
