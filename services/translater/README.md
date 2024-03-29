# Service Translater

This is the translater service for Noted.

To setup the server locally:

```bash
pip install -r requirements.txt
```

To run the app:

```bash
uvicorn main:app --reload
```

### .env

```json
ORIGIN=*
ADMIN_EMAILS="test@test.com,test2@test2.com"
RAPID_API_KEY=""

```

To get the rapid api key vist [rapidapi](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/).

## Build production

```bash
docker compose up -d
```
