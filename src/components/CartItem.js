import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { formatCurrency } from '../utils/formatCurrency';
import QuantitySelector from './QuantitySelector';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        <View style={styles.bottomRow}>
          <QuantitySelector quantity={item.quantity} onIncrease={onIncrease} onDecrease={onDecrease} />
          <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
            <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.gray300 },
  image: { width: 70, height: 70, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: COLORS.black },
  price: { fontSize: 13, color: COLORS.primary, fontWeight: '700', marginTop: 4 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  removeBtn: { padding: 6 },
});
