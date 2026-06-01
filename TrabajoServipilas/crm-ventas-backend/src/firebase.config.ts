import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';

let firebaseCredentials: any;

if (process.env.FIREBASE_CONFIG_JSON) {
  try {
    // Parseamos el string completo que guardamos en Render
    const parsedConfig = JSON.parse(process.env.FIREBASE_CONFIG_JSON);
    
    // Nos aseguramos de corregir estrictamente los saltos de línea de la llave PEM
    parsedConfig.privateKey = parsedConfig.private_key.replace(/\\n/g, '\n');
    parsedConfig.projectId = parsedConfig.project_id;
    parsedConfig.clientEmail = parsedConfig.client_email;

    firebaseCredentials = parsedConfig;
  } catch (error) {
    console.error('Error al parsear FIREBASE_CONFIG_JSON:', error);
    firebaseCredentials = serviceAccount;
  }
} else {
  // Respaldo para tu entorno de desarrollo local
  firebaseCredentials = {
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  };
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const db = admin.firestore();