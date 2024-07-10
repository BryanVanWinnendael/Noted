from firebase_admin import db
from pydantic import BaseModel


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
        requested_theme = get_requested_theme(theme.name)

        if existing_theme:
            return {"error": f"Theme with name '{theme.name}' already requested/existing"}
        if requested_theme:
            delete_requested_theme(theme.name)

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


def get_requested_theme(theme_name: str):
    try:
        ref = db.reference("/requested_themes/" + theme_name)
        return ref.get()
    except Exception as e:
        return e


def add_requested_theme(email: str, theme: Theme):
    try:
        user_requested_themes = get_requested_themes_for_user(email)
        if user_requested_themes and len(user_requested_themes) >= 3:
            return {"error": "You can only request 3 themes at a time"}
        existing_theme = get_requested_theme(theme.name)
        if existing_theme:
            return {"error": f"Theme with name '{theme.name}' already requested/existing"}
        ref = db.reference("/requested_themes/" + theme.name)
        ref.set({
            "email": email,
            "backgroundColor": theme.backgroundColor,
            "secondaryBackgroundColor": theme.secondaryBackgroundColor,
            "textColor": theme.textColor,
            "iconColor": theme.iconColor,
            "accentColor": theme.accentColor
        })
        return "success"
    except Exception as e:
        return e


def get_requested_themes():
    try:
        ref = db.reference("/requested_themes")
        return ref.get()
    except Exception as e:
        return e


def delete_requested_theme(theme_name: str):
    try:
        ref = db.reference("/requested_themes/" + theme_name)
        ref.delete()
        return "success"
    except Exception as e:
        return e


def get_requested_themes_for_user(email: str):
    try:
        ref = db.reference("/requested_themes")
        themes = ref.get()
        user_themes = {}
        if not themes:
            return user_themes
        for theme in themes:
            if themes[theme]['email'] == email:
                user_themes[theme] = themes[theme]

        return user_themes
    except Exception as e:
        return e
