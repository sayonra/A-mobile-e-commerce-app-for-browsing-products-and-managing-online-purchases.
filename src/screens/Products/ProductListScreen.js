import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../components/InputField';
import CategoryChips from '../../components/CategoryChips';
import ProductCard from '../../components/ProductCard';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import EmptyView from '../../components/EmptyView';
import {
  fetchProducts,
  fetchCategories,
  setSelectedCategory,
  setSearchQuery,
  selectFilteredProducts,
} from '../../store/slices/productsSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { COLORS } from '../../theme/colors';

export default function ProductListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { status, error, categories, selectedCategory, searchQuery } = useSelector((s) => s.products);
  const filtered = useSelector(selectFilteredProducts);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const onRefresh = () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  };

  if (status === 'loading' && filtered.length === 0) {
    return <LoadingView message="Loading products..." />;
  }

  if (status === 'failed' && filtered.length === 0) {
    return <ErrorView message={error} onRetry={onRefresh} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <InputField placeholder="Search products..." value={searchInput} onChangeText={setSearchInput} style={{ marginBottom: 0 }} />
      </View>
      <CategoryChips categories={categories} selected={selectedCategory} onSelect={(c) => dispatch(setSelectedCategory(c))} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={onRefresh} colors={[COLORS.primary]} />}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
        )}
        ListEmptyComponent={<EmptyView title="No products found" message="Try a different search or category." />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  searchWrap: { paddingHorizontal: 12, paddingTop: 12 },
  list: { paddingHorizontal: 6, paddingBottom: 24 },
});
