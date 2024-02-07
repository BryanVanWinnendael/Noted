# App
This is the server for Noted.

To setup the server:
```bash
pip install -r requirements.txt
```
To run the app:

```bash
uvicorn main:app --reload
```

## .env
```json
DATABASE_URL=""
ORIGIN=""
ADMIN_EMAILS=""
```
DATABASE_URL can be found under the [firebase config](https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article).
ORIGIN are the allowed urls that can access the server.
ADMIN_EMAILS are the admins used to accept themes.

## key.json
Download the key.json from
[firebase admin](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments).