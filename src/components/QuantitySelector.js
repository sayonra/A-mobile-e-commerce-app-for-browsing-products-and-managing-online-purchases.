import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1 }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.btn} onPress={onDecrease} disabled={quantity <= min}>
        <Ionicons name="remove" size={18} color={quantity <= min ? COLORS.gray500 : COLORS.black} />
      </TouchableOpacity>
      <Text style={styles.value}>{quantity}</Text>
      <TouchableOpacity style={styles.btn} onPress={onIncrease}>
        <Ionicons name="add" size={18} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.gray300, borderRadius: 8 },
  btn: { padding: 8 },
  value: { minWidth: 28, textAlign: 'center', fontSize: 15, fontWeight: '600', color: COLORS.black },
});
