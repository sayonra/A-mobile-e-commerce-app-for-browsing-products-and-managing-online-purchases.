import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest, registerRequest, fetchUsersRequest } from '../../api/authApi';
import { removeFromStorage, STORAGE_KEYS } from '../../utils/storage';

const initialState = {
  user: null, // { id, username, email, isMockSession }
  token: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { token } = await loginRequest({ username, password });
      let profile = { username };
      try {
        // Enrich the profile with real user data if we can find a match.
        const users = await fetchUsersRequest();
        const match = users.find((u) => u.username === username);
        if (match) profile = { id: match.id, username: match.username, email: match.email };
      } catch (e) {
        // Non-fatal - proceed with the basic profile.
      }
      return { token, user: { ...profile, isMockSession: false } };
    } catch (err) {
      return rejectWithValue(err.message || 'Invalid username or password');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const created = await registerRequest({ email, username, password });
      // FakeStoreAPI does not persist new users for real login (see API_SOURCES.md),
      // so we start a local "mock" session right after registering.
      const token = `mock-session-${created.id ?? Date.now()}`;
      return {
        token,
        user: {
          id: created.id ?? Date.now(),
          username: created.username ?? username,
          email: created.email ?? email,
          isMockSession: true,
        },
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Could not create account');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth: (state, action) => {
      if (action.payload?.token) {
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      removeFromStorage(STORAGE_KEYS.AUTH);
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { hydrateAuth, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
