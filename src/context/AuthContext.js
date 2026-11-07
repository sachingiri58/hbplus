import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { upsertUserProfile } from '../services/userService';
import { ALLOWED_DOMAIN, DOMAIN_ERROR } from '../config';
import { isAllowedEmail } from '../utils/validateDomain';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);          // Firebase user (only set if domain is allowed)
  const [profile, setProfile] = useState(null);    // Firestore profile (name, role, ...)
  const [initializing, setInitializing] = useState(true); // true until Firebase restores the session
  const [signingIn, setSigningIn] = useState(false);      // true while login is in progress
  const [error, setError] = useState(null);

  useEffect(() => {
    // Single place where EVERY sign-in (web popup, native token, restored session) is validated.
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setProfile(null);
        setInitializing(false);
        return;
      }

      // 1. Domain check. Unknown domain: sign out immediately, never touch the database.
      if (!fbUser.emailVerified || !isAllowedEmail(fbUser.email, ALLOWED_DOMAIN)) {
        await signOut(auth).catch(() => {});
        setUser(null);
        setProfile(null);
        setError(DOMAIN_ERROR);
        setSigningIn(false);
        setInitializing(false);
        return;
      }

      // 2. Allowed: load or create the profile (role)
      try {
        const p = await upsertUserProfile(fbUser);
        setProfile(p);
        setUser(fbUser);
        setError(null);
      } catch (e) {
        await signOut(auth).catch(() => {});
        setUser(null);
        setProfile(null);
        setError('Could not load your profile. Please try again.');
      } finally {
        setSigningIn(false);
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      role: profile?.role || null,
      isAdmin: profile?.role === 'admin',
      initializing,
      signingIn,
      error,
      setError,
      setSigningIn,
      logout,
    }),
    [user, profile, initializing, signingIn, error, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
