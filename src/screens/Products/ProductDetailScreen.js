import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import StarRating from '../../components/StarRating';
import QuantitySelector from '../../components/QuantitySelector';
import PrimaryButton from '../../components/PrimaryButton';
import { addToCart } from '../../store/slices/cartSlice';
import { fetchProductByIdRequest } from '../../api/productsApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../theme/colors';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const cachedProduct = useSelector((s) => s.products.items.find((p) => p.id === productId));
  const [product, setProduct] = useState(cachedProduct || null);
  const [loading, setLoading] = useState(!cachedProduct);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!cachedProduct) {
      setLoading(true);
      fetchProductByIdRequest(productId)
        .then((data) => setProduct(data))
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  if (loading) return <LoadingView message="Loading product..." />;
  if (error || !product) return <ErrorView message={error || 'Product not found'} />;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    Alert.alert('Added to cart', `${product.title} x${quantity} added to your cart.`);
  };

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <StarRating rate={product.rating?.rate} count={product.rating?.count} />
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <QuantitySelector quantity={quantity} onIncrease={() => setQuantity((q) => q + 1)} onDecrease={() => setQuantity((q) => Math.max(1, q - 1))} />
        <PrimaryButton title="Add to Cart" onPress={handleAddToCart} style={styles.addBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.white },
  container: { padding: 20, paddingBottom: 100 },
  image: { width: '100%', height: 240, marginBottom: 16 },
  category: { fontSize: 12, color: COLORS.primary, fontWeight: '700', textTransform: 'uppercase', marginBottom: 6 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.black, marginBottom: 8 },
  price: { fontSize: 22, fontWeight: '800', color: COLORS.primary, marginTop: 10, marginBottom: 12 },
  description: { fontSize: 14, color: COLORS.gray700, lineHeight: 20 },
  footer: { flexDirection: 'row', alignItems: 'center', padding: 16, borderTopWidth: 1, borderTopColor: COLORS.gray300, backgroundColor: COLORS.white },
  addBtn: { flex: 1, marginLeft: 12 },
});
