import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import { selectCartItems, selectCartTotal, clearCart } from '../../store/slices/cartSlice';
import { addOrder } from '../../store/slices/ordersSlice';
import { checkoutSchema, validateForm } from '../../utils/validation';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../theme/colors';

const PAYMENT_METHODS = ['Cash on Delivery', 'Card (Mock)'];

export default function CheckoutScreen({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const user = useSelector((s) => s.auth.user);

  const [values, setValues] = useState({ fullName: user?.username || '', address: '', city: '', zip: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState(PAYMENT_METHODS[0]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  const handlePlaceOrder = async () => {
    const { valid, errors: validationErrors } = await validateForm(checkoutSchema, values);
    setErrors(validationErrors);
    if (!valid) return;

    setSubmitting(true);
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items,
      total,
      address: values,
      paymentMethod: payment,
      status: 'Placed',
    };

    setTimeout(() => {
      dispatch(addOrder(order));
      dispatch(clearCart());
      setSubmitting(false);
      Alert.alert('Order placed!', 'Your order has been placed successfully.', [
        { text: 'View Orders', onPress: () => navigation.getParent()?.navigate('OrdersTab') },
      ]);
    }, 500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Shipping details</Text>
      <InputField label="Full name" value={values.fullName} onChangeText={(t) => handleChange('fullName', t)} error={errors.fullName} />
      <InputField label="Address" value={values.address} onChangeText={(t) => handleChange('address', t)} error={errors.address} />
      <InputField label="City" value={values.city} onChangeText={(t) => handleChange('city', t)} error={errors.city} />
      <InputField label="ZIP / Postal code" value={values.zip} onChangeText={(t) => handleChange('zip', t)} keyboardType="number-pad" error={errors.zip} />
      <InputField label="Phone" value={values.phone} onChangeText={(t) => handleChange('phone', t)} keyboardType="phone-pad" error={errors.phone} />

      <Text style={styles.sectionTitle}>Payment method</Text>
      {PAYMENT_METHODS.map((method) => (
        <PrimaryButton
          key={method}
          title={method}
          variant={payment === method ? 'primary' : 'outline'}
          onPress={() => setPayment(method)}
          style={{ marginBottom: 10 }}
        />
      ))}

      <View style={styles.summary}>
        <Text style={styles.sectionTitle}>Order summary</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Items ({items.length})</Text>
          <Text style={styles.value}>{formatCurrency(total)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>
      </View>

      <PrimaryButton title="Place Order" onPress={handlePlaceOrder} loading={submitting} style={{ marginTop: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.black, marginTop: 16, marginBottom: 12 },
  summary: { marginTop: 8, padding: 14, backgroundColor: COLORS.gray100, borderRadius: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: COLORS.gray700 },
  value: { color: COLORS.black, fontWeight: '600' },
  totalLabel: { color: COLORS.black, fontWeight: '700', marginTop: 6 },
  totalValue: { color: COLORS.primary, fontWeight: '800', fontSize: 16, marginTop: 6 },
});
