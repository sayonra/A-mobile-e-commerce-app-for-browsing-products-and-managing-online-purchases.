import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';
import productsReducer from './slices/productsSlice';
import { saveToStorage, STORAGE_KEYS } from '../utils/storage';

// Lightweight persistence: after any auth/cart/orders action, mirror the
// relevant slice into AsyncStorage so state survives an app restart.
const persistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();

  if (action.type.startsWith('auth/') && action.type !== 'auth/loginUser/pending' && action.type !== 'auth/registerUser/pending') {
    saveToStorage(STORAGE_KEYS.AUTH, { token: state.auth.token, user: state.auth.user });
  }
  if (action.type.startsWith('cart/')) {
    saveToStorage(STORAGE_KEYS.CART, state.cart.items);
  }
  if (action.type.startsWith('orders/')) {
    saveToStorage(STORAGE_KEYS.ORDERS, state.orders.items);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistenceMiddleware),
});
