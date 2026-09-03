import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function EmptyView({ icon = 'cube-outline', title = 'Nothing here yet', message }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={COLORS.gray500} />
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: COLORS.white },
  title: { fontSize: 16, fontWeight: '600', color: COLORS.black, marginTop: 12 },
  message: { fontSize: 13, color: COLORS.gray700, marginTop: 4, textAlign: 'center' },
});
