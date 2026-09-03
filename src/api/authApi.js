import { apiClient } from './client';

export async function loginRequest({ username, password }) {
  const { data } = await apiClient.post('/auth/login', { username, password });
  return data; // { token }
}

export async function registerRequest({ email, username, password }) {
  const { data } = await apiClient.post('/users', { email, username, password });
  return data; // { id, email, username, password } - not persisted for real login, see API_SOURCES.md
}

export async function fetchUsersRequest() {
  const { data } = await apiClient.get('/users');
  return data;
}
