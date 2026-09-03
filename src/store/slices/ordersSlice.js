import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // placed orders, newest first
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    hydrateOrders: (state, action) => {
      state.items = action.payload || [];
    },
    addOrder: (state, action) => {
      state.items.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const { hydrateOrders, addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
