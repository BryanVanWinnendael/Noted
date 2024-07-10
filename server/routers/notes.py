from fastapi import APIRouter, Depends
from ..services import notes_service
from ..middleware.auth import get_firebase_user

router = APIRouter()


@router.get("/user")
async def get_notes_from_user(user=Depends(get_firebase_user)):
    user_email = user['email']
    notes = notes_service.get_user_notes(user_email)
    return notes


@router.get("/{id}")
async def get_note_with_id(id: str):
    note = notes_service.get_note(id)
    return note


@router.delete("/{id}")
async def remove_note_with_id(id: str, user=Depends(get_firebase_user)):
    user_email = user['email']
    res = notes_service.remove_note(id, user_email)
    return res


@router.post("")
async def add_note_with_user(note: notes_service.Note, user=Depends(get_firebase_user)):
    user_email = user['email']
    res = notes_service.add_note(note, user_email)
    return {
        "id": res
    }
