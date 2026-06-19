import * as admin from 'firebase-admin';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const localServiceAccount = join(process.cwd(), 'src', 'config', 'serviceAccount.json');

let serviceAccount: any;
let source = 'unknown';

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    source = 'FIREBASE_SERVICE_ACCOUNT';
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
    );
    source = 'FIREBASE_SERVICE_ACCOUNT_BASE64';
  } else if (credentialsPath) {
    serviceAccount = JSON.parse(readFileSync(credentialsPath, 'utf8'));
    source = 'GOOGLE_APPLICATION_CREDENTIALS';
  } else {
    serviceAccount = JSON.parse(readFileSync(localServiceAccount, 'utf8'));
    source = 'src/config/serviceAccount.json';
  }
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Firebase credential load failed:', { source, credentialsPath, error: message });
  throw error;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
  console.log('Firebase initialized with project:', serviceAccount.project_id, 'source:', source);
}

export const db = admin.firestore();
