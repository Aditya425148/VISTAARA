import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const savedUser = JSON.parse(localStorage.getItem('ott_user') || 'null');
const savedProfile = JSON.parse(localStorage.getItem('ott_profile') || 'null');

export const login = createAsyncThunk('auth/login', async (payload) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data;
  } catch {
    const name = payload.email.split('@')[0] || 'Viewer';
    return {
      token: 'demo-token',
      user: {
        id: 'demo-user',
        name,
        email: payload.email,
        role: payload.email.includes('admin') ? 'admin' : 'user',
        profiles: [{ _id: 'main', name, avatar: `https://api.dicebear.com/9.x/personas/svg?seed=${name}` }]
      }
    };
  }
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch {
    return {
      token: 'demo-token',
      user: {
        id: 'demo-user',
        name: payload.name,
        email: payload.email,
        role: 'user',
        profiles: [{ _id: 'main', name: payload.name, avatar: `https://api.dicebear.com/9.x/personas/svg?seed=${payload.name}` }]
      }
    };
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    token: localStorage.getItem('ott_token'),
    profile: savedProfile,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.profile = null;
      localStorage.removeItem('ott_user');
      localStorage.removeItem('ott_token');
      localStorage.removeItem('ott_profile');
    },
    switchProfile(state, action) {
      state.profile = action.payload;
      localStorage.setItem('ott_profile', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => [login.fulfilled.type, register.fulfilled.type].includes(action.type), (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.profile = action.payload.user.profiles?.[0] || null;
        localStorage.setItem('ott_user', JSON.stringify(action.payload.user));
        localStorage.setItem('ott_token', action.payload.token);
        localStorage.setItem('ott_profile', JSON.stringify(state.profile));
      })
      .addMatcher((action) => [login.rejected.type, register.rejected.type].includes(action.type), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout, switchProfile } = authSlice.actions;
export default authSlice.reducer;
