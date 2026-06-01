import * as admin from 'firebase-admin';

// Inyección directa de texto literal. 
// Copia tu llave desde el JSON original y pégala aquí tal cual, 
// respetando los \n que trae de origen.
const serviceAccount = {
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
  universeDomain: 'googleapis.com'
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();