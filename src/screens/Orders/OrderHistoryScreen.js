import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import EmptyView from '../../components/EmptyView';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../theme/colors';

export default function OrderHistoryScreen({ navigation }) {
  const orders = useSelector((s) => s.orders.items);

  if (orders.length === 0) {
    return <EmptyView icon="receipt-outline" title="No orders yet" message="Your placed orders will show up here." />;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(o) => o.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}>
          <View style={styles.rowBetween}>
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.items}>{item.items.length} item(s)</Text>
            <Text style={styles.total}>{formatCurrency(item.total)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray300, borderRadius: 12, padding: 14, marginBottom: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  orderId: { fontWeight: '700', color: COLORS.black },
  status: { color: COLORS.primary, fontWeight: '700', fontSize: 12 },
  date: { color: COLORS.gray700, fontSize: 12, marginBottom: 6 },
  items: { color: COLORS.gray700, fontSize: 13 },
  total: { color: COLORS.black, fontWeight: '700' },
});
