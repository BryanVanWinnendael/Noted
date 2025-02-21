from fastapi import HTTPException
from firebase_admin import firestore
from pydantic import BaseModel


def count_download(type: str):
    try:
        ref = firestore.client().collection("downloads").document(type)
        ref.update({"count": firestore.Increment(1)})
        return "success"
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
