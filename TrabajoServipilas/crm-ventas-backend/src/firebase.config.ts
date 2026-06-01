import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

let firebaseCredentials: any;

// Buscamos el archivo directamente en la raíz del proyecto (donde lo creará Render)
const rootPath = path.resolve(process.cwd(), 'serviceAccount.json');
// Ruta por si en local lo tienes dentro de src/config/
const localPath = path.resolve(process.cwd(), 'src/config/serviceAccount.json');

if (fs.existsSync(rootPath)) {
  firebaseCredentials = JSON.parse(fs.readFileSync(rootPath, 'utf8'));
} else if (fs.existsSync(localPath)) {
  firebaseCredentials = JSON.parse(fs.readFileSync(localPath, 'utf8'));
} else {
  try {
    const serviceAccount = require('./config/serviceAccount.json');
    firebaseCredentials = serviceAccount;
  } catch (error) {
    throw new Error('No se pudo encontrar el archivo serviceAccount.json en la raíz ni en src/config/');
  }
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const db = admin.firestore();