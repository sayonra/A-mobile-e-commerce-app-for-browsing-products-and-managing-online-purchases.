import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/CartItem';
import EmptyView from '../../components/EmptyView';
import PrimaryButton from '../../components/PrimaryButton';
import { selectCartItems, selectCartTotal, updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../theme/colors';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return <EmptyView icon="cart-outline" title="Your cart is empty" message="Browse products and add items to your cart." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.productId)}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}
            onDecrease={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}
            onRemove={() => dispatch(removeFromCart(item.productId))}
          />
        )}
      />
      <View style={styles.summary}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>
        <PrimaryButton title="Checkout" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  summary: { padding: 16, borderTopWidth: 1, borderTopColor: COLORS.gray300 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 16, color: COLORS.black, fontWeight: '600' },
  totalValue: { fontSize: 18, color: COLORS.primary, fontWeight: '800' },
});
