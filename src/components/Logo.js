import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme/theme';

export default function Logo({ size = 32 }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} accessibilityRole="header">
      <Text style={{ fontSize: size, fontWeight: '800', color: colors.ink, letterSpacing: -1 }}>HB</Text>
      <Text style={{ fontSize: size * 0.8, fontWeight: '800', color: colors.red, marginLeft: 1 }}>+</Text>
    </View>
  );
}
