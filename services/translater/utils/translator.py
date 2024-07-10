import os
import requests
from dotenv import load_dotenv
import json
from functools import lru_cache

load_dotenv()

URL_TRANSLATE = "https://microsoft-translator-text.p.rapidapi.com/translate"
URL_DETECT = "https://microsoft-translator-text.p.rapidapi.com/Detect"
LANGUAGES_PATH = "utils/languages.json"

querystring = {"api-version":"3.0"}

headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": os.environ.get("RAPID_API_KEY"),
	"X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com"
}

@lru_cache(maxsize=None)
def get_languages():
  with open(LANGUAGES_PATH, 'r', encoding='utf-8') as file:
    data = json.load(file)
  languages_objects = data["translation"]
  languages_keys = [lang for lang in languages_objects]

  return languages_keys

def translate_text(text, to_lang="en"):
  querystring = {"to[0]":to_lang,"api-version":"3.0","profanityAction":"NoAction","textType":"plain"}
  payload = [{ "Text": text }]
  response = requests.post(URL_TRANSLATE, json=payload, headers=headers, params=querystring)
  return {"text": response.json()[0]["translations"][0]["text"]}