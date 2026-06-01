import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';

let firebaseCredentials: any;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  // Limpieza estricta para quitar comillas o espacios que inyecte Render
  const cleanKey = process.env.FIREBASE_PRIVATE_KEY
    .trim()
    .replace(/^"+|"+$/g, '')
    .replace(/\\n/g, '\n');

  // Mapeamos tanto camelCase como snake_case para asegurar compatibilidad total con el SDK
  firebaseCredentials = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    project_id: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: cleanKey,
    private_key: cleanKey,
  };
} else {
  // Respaldo para entorno local
  firebaseCredentials = {
    projectId: serviceAccount.project_id,
    project_id: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    client_email: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    private_key: serviceAccount.private_key,
  };
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const db = admin.firestore();