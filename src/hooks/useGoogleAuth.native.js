// ANDROID / IOS: Google OAuth 2.0 via expo-auth-session, then exchange the ID token with Firebase
import { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { ALLOWED_DOMAIN, googleClientIds } from '../config';
import { friendlyAuthError } from '../utils/errors';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const { setError, setSigningIn } = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientIds.web,
    webClientId: googleClientIds.web,
    androidClientId: googleClientIds.android,
    iosClientId: googleClientIds.ios,
    extraParams: { hd: ALLOWED_DOMAIN, prompt: 'select_account' },
  });

  useEffect(() => {
    if (!response) return;
    if (response.type === 'success') {
      const idToken = response.params?.id_token;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential).catch((e) => {
        setSigningIn(false);
        const msg = friendlyAuthError(e);
        if (msg) setError(msg);
      });
    } else if (response.type === 'error') {
      setSigningIn(false);
      setError('Google sign-in failed. Please try again.');
    } else {
      setSigningIn(false); // cancelled / dismissed
    }
  }, [response]);

  const signIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await promptAsync();
    } catch (e) {
      setSigningIn(false);
      setError('Could not open Google sign-in. Please try again.');
    }
  };

  return { signIn, ready: Boolean(request) };
}
