import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderHistoryScreen from '../screens/Orders/OrderHistoryScreen';
import OrderDetailScreen from '../screens/Orders/OrderDetailScreen';
import { COLORS } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: COLORS.white }, headerTintColor: COLORS.black }}>
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'My Orders' }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Order Details' }} />
    </Stack.Navigator>
  );
}
