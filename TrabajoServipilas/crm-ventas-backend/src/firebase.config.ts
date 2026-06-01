import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';

let firebaseCredentials: any;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    // Parseamos el JSON de la variable de entorno
    firebaseCredentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    
    // IMPORTANTE: Esto arregla el formato de la llave privada en servidores Linux
    if (firebaseCredentials.private_key) {
      firebaseCredentials.private_key = firebaseCredentials.private_key.replace(/\\n/g, '\n');
    }
  } catch (error) {
    firebaseCredentials = serviceAccount;
  }
} else {
  firebaseCredentials = serviceAccount;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const db = admin.firestore();