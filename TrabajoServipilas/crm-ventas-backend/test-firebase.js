const admin = require('firebase-admin');

let creds;
if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  try {
    creds = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8'));
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64:', e.message || e);
    process.exit(1);
  }
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', e.message || e);
    process.exit(1);
  }
} else {
  creds = require('./src/config/serviceAccount.json');
}

try {
  admin.initializeApp({ credential: admin.credential.cert(creds) });
} catch (e) {
  console.error('Initialize error:', e);
  process.exit(1);
}

const db = admin.firestore();

db.collection('usuario').limit(1).get()
  .then(snapshot => {
    console.log('OK, docs:', snapshot.size);
    process.exit(0);
  })
  .catch(err => {
    console.error('FIRESTORE ERR:', err);
    process.exit(1);
  });
