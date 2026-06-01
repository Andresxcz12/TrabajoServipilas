import * as admin from 'firebase-admin';

// Si estás en Render u otro hosting, define la variable de entorno
// FIREBASE_SERVICE_ACCOUNT con el JSON completo de tu cuenta de servicio.
// Ejemplo: {"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",...}
const firebaseCredentials = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : {
      type: 'service_account',
      projectId: 'crm-rappi-mercadolibre',
      privateKeyId: '9734ef488660d6e89f4439072e6ed28267533b3a',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n',
      clientEmail: 'firebase-adminsdk-fbsvc@crm-rappi-mercadolibre.iam.gserviceaccount.com',
      clientId: '108880754230132825811',
      authUri: 'https://accounts.google.com/o/oauth2/auth',
      tokenUri: 'https://oauth2.googleapis.com/token',
      authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
      clientCertUrl: 'https://www.googleapis.com/oauth2/v1/certs/firebase-adminsdk-fbsvc%40crm-rappi-mercadolibre.iam.gserviceaccount.com',
      universeDomain: 'googleapis.com',
    };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const db = admin.firestore();