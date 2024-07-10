from uuid import uuid4
from firebase_admin import db
from pydantic import BaseModel


class Note(BaseModel):
    data: str
    path: str
    style: str


def get_note(id: str):
    try:
        ref = db.reference("/notes/" + id)
        return ref.get()
    except Exception as e:
        return e


def add_note(note: Note, user_email: str):
    try:
        uuid = str(uuid4())
        ref = db.reference("/notes/" + uuid)
        ref.set({
            "data": note.data,
            "user_email": user_email,
            "path": note.path,
            "id": uuid,
            "style": note.style
        })
        return uuid
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


def get_user_notes(user_email: str):
    try:
        ref = db.reference("/notes")
        notes = ref.get()
        user_notes = []
        for _, value in notes.items():
            if value["user_email"] == user_email:
                user_notes.append(value)
        return user_notes
    except Exception as e:
        return e
