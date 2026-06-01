import * as admin from 'firebase-admin';

// Datos de tu cuenta de servicio (inyectados directamente)
const serviceAccount = {
  type: "service_account",
  project_id: "crm-rappi-mercadolibre",
  private_key_id: "9734ef488660d6e89f4439072e6ed28267533b3a",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDTlXhXJHgJTCuI\n9MxlCth04Zn1WfYetlyQOeLht/JtIO0x6stMZZD6B0+wzqilfvNUKCRs67EOy9Or\niOTtMldUq16oOuSzKD4rOrZK14qb5/FFnN0eKvjkKIH2x6gb5WwbBfeJOGaqrKZk\nbpmSPmk1gHy1bEzQr+PGg0IDEBYJSQ2mSpdpbk/Nxq4ddWaHXewYmL8IqP2YnaMZ\nouskrsPUUtOHEhq58+mbDAnUsN1ZQC+LmRyZOpkOQV8ICfbSCntF8lTiER1Fgimo\n/DvXj7Cy7Vzk6c9JButPt9PrGnd+teHes6kn+HxW1zcADpf73/EpqECSiaDvKlo6\nYeG/UJJjAgMBAAECggEAAznMUmPLcrTXFb5JtCFUsyonWz6/tQXUZnHY0YEo8IdS\ne8gtHkvkHckTwB8pIhDL6+oKwssFxt3OVddUn4B80AfRfctxZivZustT29M/w+hm\n3MgAn6+fCMzMonMLzz+8Wgh0FthQdGSvyr3cQzGxZUVBYXthC8N1ZmGPlZVes03Y\nidzftRpoMjDArvtjhty9uDgUulLQa+gKzTVwYZbIMaEuvDrV1yd+ztFSp2WzrKnH\n3n2o/6/OjsSGYup7vhCN16Yq34yzlFdITRSUXsr1As3BtTyMOLkzPhyRnz3LWbCm\nogoNr5mlQR6IGA01fRaTQpd0GhLWsbse8SSgnLLX7QKBgQD7RvS3b/kyF6Vn1WGT\nduyWR8mUSZTm/8VwuP/zZ8sW4m1X69QCtlIKHoVJ57AEs3bTIbLFIaSdfTbkkqQ4\nTMk22pQnHgwPQn85RDUUkg6kxigWv+bS8cYl+KuZ1b5aU9+clVYAGIDiR72QJUBA\n2ek9SKM4IiTxudjdjdKt2+4oxQKBgQDXj4aqY5YBaubY8kUksHb+XyTtPKewnDow\nF7mTrebZNQNotjZYwONYYbfzMo89arK4c+1j49faMm8safySGQ6PkOaQZR2/C1+x\n08qq6ZxBaByN7cZb95PK8IZ3XfmeeUfcfT55BhK7z7MRrKcWMRtLbeHh1EoDJKBb\nQYefKHzxBwKBgQDtSFkI7D0212uDvNVSyqepVgr98+ofpQIOazSP5sC6UIGO2Ayx\nrveTxLR7UMU/+zTHNXg6fYWUjsyKVgurep88JHZo5g/fTR0Ut9skHLSlVtY+fWL8\nagGCk+t/7n69j5yGoeK/XmQ+yh4xA2xEkUKWc4RmGqAmgChRN37uXNPuPQKBgQDR\nT6+uwfaFt90iqdVT8/oHtDFyH2ShTIH/8vmjGci//wcpZU1OTzYyuuhYwS5vr6yN\nCRxo03PkjvZ+xQeYgbYu17/aVCVXPd8VGJeB8EdnB4Y6lrj20mdzNq0LOXhKVm/d\n/MttzuTf86VosyKnnNVpH/CnTXD0rlr7YZ0kgbcYfwKBgDBpRkfDwmheOd/gc65M\nsN8KZmsr1d/8/oVgtbWJAbjapXxtkIEGqUuZdt3DDOZQ5+b6w3LIMRDHmY6xBKNV\n5QTQIkdy47MZaTWfe5pqLLytmO3PRiiW3AtxhjGK7NHZAr/71JmC4/OljOmxs97y\n3qAjPVq38+Et3iKxzeEpv9vn\n-----END PRIVATE KEY-----",
  client_email: "firebase-adminsdk-fbsvc@crm-rappi-mercadolibre.iam.gserviceaccount.com",
  client_id: "108880754230132825811",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs/firebase-adminsdk-fbsvc%40crm-rappi-mercadolibre.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export const db = admin.firestore();