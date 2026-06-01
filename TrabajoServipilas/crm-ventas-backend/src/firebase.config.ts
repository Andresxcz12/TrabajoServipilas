import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';

const firebaseCredentials = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : serviceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials as any),
  });
}

export const db = admin.firestore();