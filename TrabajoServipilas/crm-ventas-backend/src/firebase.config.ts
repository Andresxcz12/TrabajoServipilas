import * as admin from 'firebase-admin';

// Soporta dos formas en el entorno:
// - FIREBASE_SERVICE_ACCOUNT: JSON compactado (una línea) con las claves originales
// - FIREBASE_SERVICE_ACCOUNT_BASE64: la misma JSON codificada en base64 (útil si el panel trunca o modifica saltos)
let firebaseCredentials: any | undefined;
const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT;
const rawBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (rawBase64) {
  try {
    firebaseCredentials = JSON.parse(Buffer.from(rawBase64, 'base64').toString('utf8'));
  } catch (err) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64:', err instanceof Error ? err.message : String(err));
  }
} else if (rawJson) {
  try {
    firebaseCredentials = JSON.parse(rawJson);
  } catch (err) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', err instanceof Error ? err.message : String(err));
  }
}

// Fallback al archivo local (solo para desarrollo)
if (!firebaseCredentials) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  firebaseCredentials = require('./config/serviceAccount.json');
}

// Comprobación rápida: imprimir si faltan campos esenciales (no imprime la clave privada)
if (!firebaseCredentials || !firebaseCredentials.client_email || !firebaseCredentials.private_key) {
  console.error('Firebase credentials invalid or incomplete. Check FIREBASE_SERVICE_ACCOUNT env var or config/serviceAccount.json');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const db = admin.firestore();