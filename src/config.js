// All values come from .env (EXPO_PUBLIC_* are inlined at build time).
// Note: process.env.X must be accessed directly so Expo can inline it.
export const ALLOWED_DOMAIN = (process.env.EXPO_PUBLIC_ALLOWED_DOMAIN || 'hbplus.fit').toLowerCase();

export const DOMAIN_ERROR = 'Access restricted. Please login using your official domain email.';

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const googleClientIds = {
  web: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  android: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
