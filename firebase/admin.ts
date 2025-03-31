import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';



import { cert, getApps, initializeApp } from 'firebase-admin/app';

const initFirebaseAdmin = () => {
    const apps = getApps();
    if (apps.length === 0) {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJ_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            })
        })
    } else {
        console.log('Firebase Admin SDK already initialized');
    }
    return {
        auth: getAuth(),
        db: getFirestore()
    }
}
export const { auth, db } = initFirebaseAdmin();



