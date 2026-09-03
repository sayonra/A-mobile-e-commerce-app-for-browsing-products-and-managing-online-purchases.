import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function StarRating({ rate = 0, count = 0, size = 14 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.row}>
      {stars.map((s) => (
        <Ionicons
          key={s}
          name={rate >= s ? 'star' : rate >= s - 0.5 ? 'star-half' : 'star-outline'}
          size={size}
          color={COLORS.primary}
          style={{ marginRight: 2 }}
        />
      ))}
      <Text style={styles.count}>({count})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  count: { marginLeft: 4, fontSize: 12, color: COLORS.gray700 },
});
