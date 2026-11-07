import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { colors, radius } from '../theme/theme';

export default function GoogleButton({ onPress, loading, disabled }) {
  const blocked = loading || disabled;
  return (
    <Pressable
      onPress={blocked ? undefined : onPress}
      accessibilityRole="button"
      accessibilityLabel="Login with Google"
      accessibilityState={{ disabled: blocked, busy: loading }}
      style={({ pressed, hovered }) => ({
        height: 48,
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: hovered ? colors.ink : colors.line,
        backgroundColor: pressed ? colors.page : colors.card,
        opacity: disabled && !loading ? 0.5 : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color={colors.ink} />
          <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '600', color: colors.ink }}>Signing you in…</Text>
        </>
      ) : (
        <>
          <View
            style={{
              width: 22, height: 22, borderRadius: 11, backgroundColor: colors.blueSoft,
              alignItems: 'center', justifyContent: 'center', marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '800', color: colors.blue }}>G</Text>
          </View>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.ink }}>Login with Google</Text>
        </>
      )}
    </Pressable>
  );
}
