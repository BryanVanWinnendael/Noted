from fastapi import APIRouter, Depends
from ..services import downloads_service
from ..middleware.auth import get_firebase_user

router = APIRouter()


@router.get("/{type}")
async def count_downloads(type: str):
    return downloads_service.count_download(type)
