import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ErrorView from '../../components/ErrorView';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../theme/colors';

export default function OrderDetailScreen({ route }) {
  const { orderId } = route.params;
  const order = useSelector((s) => s.orders.items.find((o) => o.id === orderId));

  if (!order) return <ErrorView message="Order not found" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.orderId}>{order.id}</Text>
      <Text style={styles.date}>{new Date(order.date).toLocaleString()}</Text>
      <Text style={styles.status}>{order.status}</Text>

      <Text style={styles.sectionTitle}>Items</Text>
      {order.items.map((item) => (
        <View key={item.productId} style={styles.itemRow}>
          <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.itemMeta}>{item.quantity} x {formatCurrency(item.price)}</Text>
          </View>
          <Text style={styles.itemTotal}>{formatCurrency(item.quantity * item.price)}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Shipping address</Text>
      <Text style={styles.text}>{order.address?.fullName}</Text>
      <Text style={styles.text}>{order.address?.address}, {order.address?.city}</Text>
      <Text style={styles.text}>{order.address?.zip}</Text>
      <Text style={styles.text}>{order.address?.phone}</Text>

      <Text style={styles.sectionTitle}>Payment</Text>
      <Text style={styles.text}>{order.paymentMethod}</Text>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  orderId: { fontSize: 18, fontWeight: '800', color: COLORS.black },
  date: { color: COLORS.gray700, fontSize: 12, marginTop: 4 },
  status: { color: COLORS.primary, fontWeight: '700', marginTop: 6, marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.black, marginTop: 18, marginBottom: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  itemImage: { width: 50, height: 50, marginRight: 10 },
  itemTitle: { fontSize: 13, color: COLORS.black, fontWeight: '600' },
  itemMeta: { fontSize: 12, color: COLORS.gray700, marginTop: 2 },
  itemTotal: { fontSize: 13, fontWeight: '700', color: COLORS.black },
  text: { fontSize: 14, color: COLORS.gray700, marginBottom: 2 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: COLORS.gray300 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: COLORS.black },
  totalValue: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
});
