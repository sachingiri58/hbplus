import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, limit } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Creates the user document on first login (role = "user"),
 * or updates lastLoginAt on later logins. Returns the profile.
 * Role can only be changed to "admin" from the Firebase console (see firestore.rules).
 */
export async function upsertUserProfile(fbUser) {
  const ref = doc(db, 'users', fbUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const profile = {
      uid: fbUser.uid,
      email: fbUser.email,
      name: fbUser.displayName || fbUser.email.split('@')[0],
      photoURL: fbUser.photoURL || null,
      role: 'user',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    };
    await setDoc(ref, profile);
    return { ...profile, createdAt: new Date(), lastLoginAt: new Date() };
  }

  await updateDoc(ref, {
    lastLoginAt: serverTimestamp(),
    name: fbUser.displayName || snap.data().name,
    photoURL: fbUser.photoURL || null,
  });
  return { ...snap.data(), lastLoginAt: new Date() };
}

/** Admin only (enforced by Firestore rules too) */
export async function listUsers() {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(50));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}
