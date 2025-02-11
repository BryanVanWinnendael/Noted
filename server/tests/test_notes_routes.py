import pytest
from fastapi.testclient import TestClient
from ..main import app
from firebase_admin import auth
import requests
from dotenv import load_dotenv
import os

load_dotenv()

client = TestClient(app)
API_KEY = os.environ.get("FIREBASE_API_KEY")

def get_id_token():
    """
    Authenticate user and get an ID token using Firebase Auth REST API.
    """
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
    email = os.environ.get("FIREBASE_TEST_EMAIL")
    password = os.environ.get("FIREBASE_TEST_PASSWORD")

    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        return response.json().get("idToken")
    else:
        raise Exception(f"Failed to get ID token: {response.json()}")
    
def get_second_user_token():
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
    email = os.environ.get("FIREBASE_TEST_EMAIL2")
    password = os.environ.get("FIREBASE_TEST_PASSWORD")

    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        id_token = response.json().get("idToken")
        token = auth.create_session_cookie(id_token, expires_in=3600)
        return token
    else:
        raise Exception(f"Failed to get ID token: {response.json()}")

@pytest.fixture
def user_token():
    id_token = get_id_token()
    token = auth.create_session_cookie(id_token, expires_in=3600)
    return token

def test_get_notes_from_user(user_token):
    response = client.get("/api/notes/user", headers={"Authorization": f"{user_token}"})
    assert response.status_code == 200

def test_notes(user_token):
    """
    Create a note.
    """
    note_data = {"data": "Test Note", "path": "/", "style": ""}
    response_add = client.post("/api/notes", json=note_data, headers={"Authorization": f"{user_token}"})
    note_id = response_add.json()["id"]
    assert response_add.status_code == 200


    """
    Get the note.
    """
    response_get = client.get(f"/api/notes/{note_id}", headers={"Authorization": f"{user_token}"})
    assert response_get.status_code == 200


    """
    Remove the note with different account.
    """
    user_token2 = get_second_user_token()
    response_delete_different_user = client.delete(f"/api/notes/{note_id}", headers={"Authorization": f"{user_token2}"})
    assert response_delete_different_user.status_code == 403


    """
    Remove the note.
    """
    response_delete_user = client.delete(f"/api/notes/{note_id}", headers={"Authorization": f"{user_token}"})
    assert response_delete_user.status_code == 200







