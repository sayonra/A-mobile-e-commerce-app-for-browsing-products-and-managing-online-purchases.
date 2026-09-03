import axios from 'axios';

// FakeStoreAPI - free public REST API used for product & auth testing.
// See /API_SOURCES.md at the project root for full documentation.
export const API_BASE_URL = 'https://fakestoreapi.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (typeof error.response?.data === 'string' ? error.response.data : null) ||
      error.message ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);
