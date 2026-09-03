import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchProductsRequest, fetchCategoriesRequest } from '../../api/productsApi';

const initialState = {
  items: [],
  categories: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  selectedCategory: 'all',
  searchQuery: '',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    return await fetchProductsRequest();
  } catch (err) {
    return rejectWithValue(err.message || 'Failed to load products');
  }
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    return await fetchCategoriesRequest();
  } catch (err) {
    return rejectWithValue(err.message || 'Failed to load categories');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSelectedCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;

export const selectFilteredProducts = createSelector(
  (state) => state.products.items,
  (state) => state.products.selectedCategory,
  (state) => state.products.searchQuery,
  (items, category, query) =>
    items.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesQuery = p.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    })
);
