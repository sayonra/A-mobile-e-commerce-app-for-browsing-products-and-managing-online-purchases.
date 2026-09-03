import { apiClient } from './client';

export async function fetchProductsRequest() {
  const { data } = await apiClient.get('/products');
  return data;
}

export async function fetchCategoriesRequest() {
  const { data } = await apiClient.get('/products/categories');
  return data;
}

export async function fetchProductByIdRequest(id) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}
