import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials

load_dotenv()


class Firebase:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Firebase, cls).__new__(cls)
            cred = credentials.Certificate('key.json')
            cls._instance.app = firebase_admin.initialize_app(cred, {
                "databaseURL": os.environ.get("DATABASE_URL")
            })
        return cls._instance

    def get_app(self):
        return self.app


firebase_singleton = Firebase().get_app()
