import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ProductsStack from './ProductsStack';
import CartStack from './CartStack';
import OrdersStack from './OrdersStack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { selectCartCount } from '../store/slices/cartSlice';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

const ICONS = {
  ProductsTab: 'storefront',
  CartTab: 'cart',
  OrdersTab: 'receipt',
  ProfileTab: 'person',
};

export default function MainTabs() {
  const cartCount = useSelector(selectCartCount);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: { backgroundColor: COLORS.white, borderTopColor: COLORS.gray300 },
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name] || 'ellipse'} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="ProductsTab" component={ProductsStack} options={{ title: 'Shop' }} />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          title: 'Cart',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: COLORS.primary },
        }}
      />
      <Tab.Screen name="OrdersTab" component={OrdersStack} options={{ title: 'Orders' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
