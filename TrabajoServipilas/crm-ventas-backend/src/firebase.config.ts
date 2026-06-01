import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const base64Config = process.env.FIREBASE_BASE64_JSON;
    
    if (!base64Config) {
      throw new Error("La variable FIREBASE_BASE64_JSON no está configurada en Render");
    }

    // Decodifica el Base64 y lo convierte en el objeto JSON que Google espera
    const credentials = JSON.parse(Buffer.from(base64Config, 'base64').toString('utf8'));
    
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
    console.log("Firebase inicializado correctamente desde variable de entorno.");
  } catch (error) {
    console.error("Error crítico al inicializar Firebase:", error);
    process.exit(1); // Esto detendrá el proceso si no conecta, para que veas el error en los logs de Render
  }
}

export const db = admin.firestore();