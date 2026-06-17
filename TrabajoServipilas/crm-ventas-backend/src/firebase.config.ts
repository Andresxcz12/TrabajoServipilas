import * as admin from 'firebase-admin';

// Al inicializar sin argumentos, Firebase busca automáticamente 
// la variable de entorno GOOGLE_APPLICATION_CREDENTIALS
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const db = admin.firestore();
