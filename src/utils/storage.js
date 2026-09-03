import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  AUTH: '@mini_ecommerce/auth',
  CART: '@mini_ecommerce/cart',
  ORDERS: '@mini_ecommerce/orders',
};

export async function saveToStorage(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save to storage', key, e);
  }
}

export async function loadFromStorage(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn('Failed to load from storage', key, e);
    return fallback;
  }
}

export async function removeFromStorage(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to remove from storage', key, e);
  }
}
