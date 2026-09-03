import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/colors';

export default function PrimaryButton({ title, onPress, loading = false, disabled = false, variant = 'primary', style }) {
  const isOutline = variant === 'outline';
  return (
    <TouchableOpacity
      style={[styles.base, isOutline ? styles.outline : styles.filled, disabled ? styles.disabled : null, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={[styles.text, isOutline ? styles.outlineText : styles.filledText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  filled: { backgroundColor: COLORS.primary },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary },
  disabled: { opacity: 0.5 },
  text: { fontSize: 15, fontWeight: '700' },
  filledText: { color: COLORS.white },
  outlineText: { color: COLORS.primary },
});
