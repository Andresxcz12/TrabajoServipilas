import * as admin from 'firebase-admin';
import * as fs from 'fs';

// La ruta donde Render coloca los archivos secretos
const secretPath = '/etc/secrets/serviceAccount.json';
const serviceAccount = JSON.parse(fs.readFileSync(secretPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();