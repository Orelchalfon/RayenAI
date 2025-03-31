import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAz4Vl0Jhtr2DyOYDjcHW-ikH03bV2Phbk",
    authDomain: "rayenai-490c3.firebaseapp.com",
    projectId: "rayenai-490c3",
    storageBucket: "rayenai-490c3.firebasestorage.app",
    messagingSenderId: "1040470955848",
    appId: "1:1040470955848:web:6a1d992f9546e59bcc057d",
    measurementId: "G-62JP14078C"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };

