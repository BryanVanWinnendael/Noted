# Service Rewriter

This is the rewriter service for Noted.

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
```

## Build production

```bash
docker compose up -d
```
