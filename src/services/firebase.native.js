// Android / iOS Firebase setup: persist the session in AsyncStorage
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../config';

let app;
let auth;
if (getApps().length) {
  app = getApp();
  auth = getAuth(app);
} else {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
}

export { auth };
export const db = getFirestore(app);
