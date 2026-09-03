import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { store } from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingView from './src/components/LoadingView';
import { hydrateAuth } from './src/store/slices/authSlice';
import { hydrateCart } from './src/store/slices/cartSlice';
import { hydrateOrders } from './src/store/slices/ordersSlice';
import { loadFromStorage, STORAGE_KEYS } from './src/utils/storage';
import { COLORS } from './src/theme/colors';

function Bootstrap({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const [auth, cart, orders] = await Promise.all([
        loadFromStorage(STORAGE_KEYS.AUTH, null),
        loadFromStorage(STORAGE_KEYS.CART, []),
        loadFromStorage(STORAGE_KEYS.ORDERS, []),
      ]);
      dispatch(hydrateAuth(auth || {}));
      dispatch(hydrateCart(cart));
      dispatch(hydrateOrders(orders));
      setReady(true);
    })();
  }, [dispatch]);

  if (!ready) return <LoadingView message="Starting app..." />;
  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.flex}>
        <StatusBar style="dark" backgroundColor={COLORS.white} />
        <Bootstrap>
          <RootNavigator />
        </Bootstrap>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.white },
});
