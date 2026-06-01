import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';

// 1. Cargamos la variable o el archivo local
let firebaseCredentials: any;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    firebaseCredentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    
    // 2. CORRECCIÓN CLAVE: Reparamos los saltos de línea de la llave privada si se desconfiguraron en Render
    if (firebaseCredentials.private_key) {
      firebaseCredentials.private_key = firebaseCredentials.private_key.replace(/\\n/g, '\n');
    }
  } catch (error) {
    console.error('Error al parsear FIREBASE_SERVICE_ACCOUNT, usando archivo local:', error);
    firebaseCredentials = serviceAccount;
  }
} else {
  firebaseCredentials = serviceAccount;
}

// 3. Inicializamos Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const db = admin.firestore();