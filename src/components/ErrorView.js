import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import PrimaryButton from './PrimaryButton';

export default function ErrorView({ message = 'Something went wrong.', onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <PrimaryButton title="Try Again" onPress={onRetry} style={{ marginTop: 16 }} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: COLORS.white },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.black, marginBottom: 8 },
  message: { fontSize: 14, color: COLORS.gray700, textAlign: 'center' },
});
