// WEB: Firebase popup sign-in (falls back to redirect if the popup is blocked)
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { friendlyAuthError } from '../utils/errors';

export function useGoogleAuth() {
  const { setError, setSigningIn } = useAuth();

  const signIn = async () => {
    setError(null);
    setSigningIn(true);
    const provider = new GoogleAuthProvider();
    // Real domain validation happens in AuthContext (and in Firestore rules)
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged in AuthContext takes over from here
    } catch (e) {
      if (e?.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, provider);
        return;
      }
      setSigningIn(false);
      const msg = friendlyAuthError(e);
      if (msg) setError(msg);
    }
  };

  return { signIn, ready: true };
}