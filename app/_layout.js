import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import Loader from '../src/components/Loader';

/**
 * Route guard. Runs for every route, including direct URL visits on web.
 *  - not logged in + private route  -> /login
 *  - logged in + /login or /        -> /dashboard
 * <Slot /> is always rendered (Expo Router requires it on first render).
 * A full-screen loader covers the screen while we check or redirect,
 * and private screens also refuse to render without a verified user.
 */
function Guard() {
  const { user, initializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const onLogin = segments[0] === 'login';
  const onRoot = segments.length === 0;

  useEffect(() => {
    if (initializing) return;
    if (!user && !onLogin) router.replace('/login');
    else if (user && (onLogin || onRoot)) router.replace('/dashboard');
  }, [user, initializing, onLogin, onRoot]);

  let overlay = null;
  if (initializing) overlay = 'Checking your session';
  else if (!user && !onLogin) overlay = 'Redirecting to login';
  else if (user && (onLogin || onRoot)) overlay = 'Opening dashboard';

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {overlay && (
        <View style={StyleSheet.absoluteFill}>
          <Loader label={overlay} />
        </View>
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Guard />
      </AuthProvider>
    </SafeAreaProvider>
  );
}