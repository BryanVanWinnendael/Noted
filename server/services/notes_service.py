from uuid import uuid4
from fastapi import HTTPException
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
        raise HTTPException(status_code=404, detail="Not Found")


def add_note(note: Note, user_email: str):
    try:
        uuid = str(uuid4())
        ref = db.reference("/notes/" + uuid)
        ref.set(
            {
                "data": note.data,
                "user_email": user_email,
                "path": note.path,
                "id": uuid,
                "style": note.style,
            }
        )
        return uuid
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


def remove_note(id: str, user_email: str):
    try:
        note = get_note(id)
        if note["user_email"] != user_email:
            raise HTTPException(status_code=403, detail="Unauthorized")
        ref = db.reference("/notes/" + id)
        ref.delete()
        return "success"
    except Exception as e:
        raise HTTPException(status_code=403, detail="Unauthorized")


def get_user_notes(user_email: str):
    try:
        ref = db.reference("/notes")
        user_notes = ref.order_by_child("user_email").equal_to(user_email).get()
        return list(user_notes.values()) if user_notes else []
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
