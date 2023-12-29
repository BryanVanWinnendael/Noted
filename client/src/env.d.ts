/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FIREBASE_PRIVATE_KEY_ID: string
  readonly FIREBASE_PRIVATE_KEY: string
  readonly FIREBASE_CLIENT_ID: string
  readonly FIREBASE_CLIENT_X509_CERT_URL: string
  readonly PUBLIC_API_KEY: string
  readonly PUBLIC_AUTH_DOMAIN: string
  readonly PUBLIC_DATABASE_URL: string
  readonly PUBLIC_PROJECT_ID: string
  readonly PUBLIC_STORAGE_BUCKET: string
  readonly PUBLIC_MESSAGING_SENDER_ID: string
  readonly PUBLIC_APP_ID: string
  readonly FIREBASE_ADMIN_EMAILS: string[]
  readonly PUBLIC_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
