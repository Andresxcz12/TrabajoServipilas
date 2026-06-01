import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';

// Forzamos el uso del archivo JSON local que tiene el formato PEM perfecto
const firebaseCredentials = serviceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials as any),
  });
}

export const db = admin.firestore();