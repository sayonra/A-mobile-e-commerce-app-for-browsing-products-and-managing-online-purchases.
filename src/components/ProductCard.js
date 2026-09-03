import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { formatCurrency } from '../utils/formatCurrency';
import StarRating from './StarRating';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <StarRating rate={product.rating?.rate} count={product.rating?.count} size={12} />
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: COLORS.white, borderRadius: 14, margin: 6, padding: 12, borderWidth: 1, borderColor: COLORS.gray300 },
  image: { width: '100%', height: 110, marginBottom: 8 },
  title: { fontSize: 13, fontWeight: '600', color: COLORS.black, marginBottom: 4, minHeight: 34 },
  price: { fontSize: 15, fontWeight: '700', color: COLORS.primary, marginTop: 6 },
});
