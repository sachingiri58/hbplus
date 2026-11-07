import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../src/components/Logo';
import GoogleButton from '../src/components/GoogleButton';
import ErrorBanner from '../src/components/ErrorBanner';
import ConfigWarning from '../src/components/ConfigWarning';
import { useAuth } from '../src/context/AuthContext';
import { useGoogleAuth } from '../src/hooks/useGoogleAuth';
import { ALLOWED_DOMAIN, isFirebaseConfigured } from '../src/config';
import { colors, radius } from '../src/theme/theme';

export default function LoginScreen() {
  const { signingIn, error } = useAuth();
  const { signIn, ready } = useGoogleAuth();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.page }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 20 + insets.top,
        paddingBottom: 20 + insets.bottom,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          width: '100%',
          maxWidth: 420,
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.line,
          padding: 28,
        }}
      >
        <Logo size={36} />
        <Text style={{ fontSize: 24, fontWeight: '700', color: colors.ink, marginTop: 28 }}>Sign in to your workspace</Text>
        <Text style={{ fontSize: 15, lineHeight: 22, color: colors.inkSoft, marginTop: 8, marginBottom: 24 }}>
          Use your official @{ALLOWED_DOMAIN} Google account to continue.
        </Text>

        <GoogleButton onPress={signIn} loading={signingIn} disabled={!ready || !isFirebaseConfigured} />
        {!isFirebaseConfigured && <ConfigWarning />}
        <ErrorBanner message={error} />

        <Text style={{ fontSize: 12, color: colors.muted, marginTop: 20, lineHeight: 18 }}>
          Accounts from other domains, such as gmail.com, can't access this app.
        </Text>
      </View>
    </ScrollView>
  );
}
