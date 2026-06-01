import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';

// Si no está inicializada, inicialízala
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export const db = admin.firestore();