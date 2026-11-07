import React from 'react';
import { Text, View } from 'react-native';
import { colors, radius } from '../theme/theme';

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <View
      accessibilityRole="alert"
      style={{
        flexDirection: 'row',
        backgroundColor: colors.redSoft,
        borderColor: '#F5C2BF',
        borderWidth: 1,
        borderRadius: radius.sm,
        padding: 12,
        marginTop: 16,
        alignItems: 'flex-start',
      }}
    >
      <Text style={{ color: colors.redText, fontWeight: '700', marginRight: 8 }}>!</Text>
      <Text style={{ color: colors.redText, fontSize: 14, lineHeight: 20, flex: 1 }}>{message}</Text>
    </View>
  );
}
