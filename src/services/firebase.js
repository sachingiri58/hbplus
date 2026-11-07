// Web (and default) Firebase setup. Native override lives in firebase.native.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Web: Firebase keeps the session in IndexedDB and refreshes tokens automatically
export const auth = getAuth(app);
export const db = getFirestore(app);
