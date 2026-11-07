import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme/theme';

export default function Badge({ role }) {
  const admin = role === 'admin';
  return (
    <View
      style={{
        backgroundColor: admin ? colors.redSoft : colors.greenSoft,
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: 'flex-start',
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: '700', color: admin ? colors.redText : colors.green }}>
        {admin ? 'Admin' : 'User'}
      </Text>
    </View>
  );
}
