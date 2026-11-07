import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../src/components/Logo';
import Badge from '../src/components/Badge';
import Loader from '../src/components/Loader';
import { useAuth } from '../src/context/AuthContext';
import { listUsers } from '../src/services/userService';
import { ALLOWED_DOMAIN } from '../src/config';
import { formatDate, initials } from '../src/utils/format';
import { colors, radius } from '../src/theme/theme';

function Tile({ label, value }) {
  return (
    <View style={{ flexGrow: 1, flexBasis: 200, backgroundColor: colors.page, borderRadius: radius.md, padding: 16 }}>
      <Text style={{ fontSize: 13, color: colors.inkSoft }}>{label}</Text>
      <Text style={{ fontSize: 17, fontWeight: '600', color: colors.ink, marginTop: 4 }} numberOfLines={1}>{value}</Text>
    </View>
  );
}

function AdminPanel() {
  const [users, setUsers] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    listUsers().then(setUsers).catch(() => setErr('Could not load users.'));
  }, []);

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, padding: 20, marginTop: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '700', color: colors.ink }}>All users</Text>
      <Text style={{ fontSize: 13, color: colors.inkSoft, marginTop: 2, marginBottom: 12 }}>Visible to admins only.</Text>
      {err && <Text style={{ color: colors.redText }}>{err}</Text>}
      {!users && !err && <ActivityIndicator color={colors.ink} />}
      {users?.map((u, i) => (
        <View
          key={u.uid}
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingVertical: 12, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.line, gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }} numberOfLines={1}>{u.name}</Text>
            <Text style={{ fontSize: 13, color: colors.inkSoft }} numberOfLines={1}>{u.email}</Text>
          </View>
          <Badge role={u.role} />
        </View>
      ))}
    </View>
  );
}

export default function DashboardScreen() {
  const { user, profile, role, isAdmin, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [loggingOut, setLoggingOut] = useState(false);

  // Second line of defence: never render private UI without a verified user
  if (!user || !profile) return <Loader label="Loading" />;

  const onLogout = async () => {
    setLoggingOut(true);
    try { await logout(); } finally { setLoggingOut(false); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <View
        style={{
          backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.line,
          paddingTop: insets.top, paddingHorizontal: 20,
        }}
      >
        <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 880, alignSelf: 'center' }}>
          <Logo size={28} />
          <Pressable
            onPress={loggingOut ? undefined : onLogout}
            accessibilityRole="button"
            accessibilityLabel="Logout"
            style={({ hovered, pressed }) => ({
              height: 38, paddingHorizontal: 16, borderRadius: radius.sm, borderWidth: 1,
              borderColor: hovered ? colors.ink : colors.line, backgroundColor: pressed ? colors.page : colors.card,
              alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
            })}
          >
            {loggingOut && <ActivityIndicator size="small" color={colors.ink} style={{ marginRight: 8 }} />}
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>Logout</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 + insets.bottom, alignItems: 'center' }}>
        <View style={{ width: '100%', maxWidth: 880 }}>
          <Text style={{ fontSize: 26, fontWeight: '700', color: colors.ink }}>Welcome, {profile.name.split(' ')[0]}</Text>
          <Text style={{ fontSize: 15, color: colors.inkSoft, marginTop: 4 }}>You're signed in with your {ALLOWED_DOMAIN} account.</Text>

          <View style={{ backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, padding: 20, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              {profile.photoURL ? (
                <Image source={{ uri: profile.photoURL }} style={{ width: 52, height: 52, borderRadius: 26 }} />
              ) : (
                <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: '700', color: colors.blue }}>{initials(profile.name)}</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: colors.ink }} numberOfLines={1}>{profile.name}</Text>
                <Text style={{ fontSize: 14, color: colors.inkSoft }} numberOfLines={1}>{profile.email}</Text>
              </View>
              <Badge role={role} />
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
              <Tile label="Role" value={isAdmin ? 'Admin' : 'User'} />
              <Tile label="Domain" value={ALLOWED_DOMAIN} />
              <Tile label="Last login" value={formatDate(profile.lastLoginAt)} />
            </View>
          </View>

          {isAdmin && <AdminPanel />}
        </View>
      </ScrollView>
    </View>
  );
}
