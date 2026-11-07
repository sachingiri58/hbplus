import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '../theme/theme';

export default function Loader({ label = 'Loading' }) {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.page }}
      accessibilityLabel={label}
    >
      <ActivityIndicator size="large" color={colors.ink} />
      <Text style={{ marginTop: 12, color: colors.inkSoft, fontSize: 14 }}>{label}</Text>
    </View>
  );
}
