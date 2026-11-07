import React from 'react';
import { Text, View } from 'react-native';
import { colors, radius } from '../theme/theme';

export default function ConfigWarning() {
  return (
    <View style={{ marginTop: 16, padding: 12, borderRadius: radius.sm, backgroundColor: '#FFF6E0', borderWidth: 1, borderColor: '#F2DC9B' }}>
      <Text style={{ color: '#7A5A00', fontSize: 13, lineHeight: 19 }}>
        Firebase is not configured. Copy .env.example to .env, fill in your Firebase keys, and restart.
      </Text>
    </View>
  );
}
