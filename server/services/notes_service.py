from firebase_admin import db
from pydantic import BaseModel


class Notes(BaseModel):
    id: str
    data: any


def get_note(id: str):
    try:
        ref = db.reference("/notes/" + id)
        return ref.get()
    except Exception as e:
        return e


def add_note(note: Notes, user_email: str):
    try:
        ref = db.reference("/notes/" + note.id)
        ref.set({
            "data": note.data,
            "user_email": user_email,
        })
        return "success"
    except Exception as e:
        return e


def remove_note(id: str, user_email: str):
    try:
        note = get_note(id)
        if note["user_email"] != user_email:
            return {"error": "Unauthorized"}
        ref = db.reference("/notes/" + id)
        ref.delete()
        return "success"
    except Exception as e:
        return e
