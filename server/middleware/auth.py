"""Template App
"""
import logging
import os
from dotenv import load_dotenv
from fastapi import HTTPException
from starlette.requests import Request

from firebase_admin import auth
load_dotenv()

ADMINS = os.environ.get("ADMIN_EMAILS").split(",")


def get_firebase_user(request: Request):
    """Get the user details from Firebase, based on TokenID in the request

    :param request: The HTTP request
    """
    cookie = request.headers.get('Authorization')
    if not cookie:
        raise HTTPException(status_code=400, detail='TokenID must be provided')

    try:
        claims = auth.verify_session_cookie(cookie)
        return claims
    except Exception as e:
        logging.exception(e)
        raise HTTPException(status_code=401, detail='Unauthorized')


def get_firebase_user_admin(request: Request):
    """Get the user details from Firebase, based on TokenID in the request

    :param request: The HTTP request
    """
    cookie = request.headers.get('Authorization')
    if not cookie:
        raise HTTPException(status_code=400, detail='TokenID must be provided')

    try:
        claims = auth.verify_session_cookie(cookie)
        email = claims["email"]

        if not email in ADMINS:
            raise HTTPException(status_code=401, detail='Unauthorized')
        return claims
    except Exception as e:
        logging.exception(e)
        raise HTTPException(status_code=401, detail='Unauthorized')
