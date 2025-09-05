import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Configuration Firebase Admin
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

// Initialiser Firebase Admin
const adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

// Initialiser Firestore Admin
export const adminDb = getFirestore(adminApp);

export default adminApp;