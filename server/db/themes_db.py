import os
from dotenv import load_dotenv
from firebase_admin import db, credentials
import firebase_admin
from pydantic import BaseModel

load_dotenv()

cred = credentials.Certificate('key.json')

firebase_admin.initialize_app(cred, {
    "databaseURL": os.environ.get("DATABASE_URL")
})


class Theme(BaseModel):
    name: str
    backgroundColor: str
    secondaryBackgroundColor: str
    textColor: str
    iconColor: str
    accentColor: str


def get_theme(theme_name: str):
    try:
        ref = db.reference("/themes/" + theme_name)
        return ref.get()
    except Exception as e:
        return e


def add_theme(theme: Theme):
    try:
        existing_theme = get_theme(theme.name)
        print(existing_theme)
        if existing_theme:
            return "Theme already exists"
        ref = db.reference("/themes/" + theme.name)
        ref.set({
            "backgroundColor": theme.backgroundColor,
            "secondaryBackgroundColor": theme.secondaryBackgroundColor,
            "textColor": theme.textColor,
            "iconColor": theme.iconColor,
            "accentColor": theme.accentColor
        })
        return "success"
    except Exception as e:
        return e


def get_themes():
    try:
        ref = db.reference("/themes")
        return ref.get()
    except Exception as e:
        return e


def delete_theme(theme_name: str):
    try:
        ref = db.reference("/themes/" + theme_name)
        ref.delete()
        return "success"
    except Exception as e:
        return e
