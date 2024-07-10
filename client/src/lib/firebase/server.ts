import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.PUBLIC_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-cayuu@noted-5a4d1.iam.gserviceaccount.com",
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

export const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
