import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { readStorage } from '../../utils/storage';

const savedUser = readStorage('ott_user', null);
const savedProfile = readStorage('ott_profile', null);

export const login = createAsyncThunk('auth/login', async (payload) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Could not sign in. Check that the backend is running.');
  }
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Could not create your account. Check that the backend is running.');
  }
});

export const googleLogin = createAsyncThunk('auth/googleLogin', async (credential) => {
  try {
    const { data } = await api.post('/auth/google', { credential });
    return data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Google sign-in is taking too long. Try again after the server wakes up.');
    }
    throw new Error(error.response?.data?.message || 'Could not reach the Google sign-in API.');
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
    },
    addProfile(state, action) {
      if (!state.user) return;
      const name = action.payload.trim();
      if (!name) return;
      const newProfile = {
        _id: 'profile-' + Date.now(),
        name,
        avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=' + encodeURIComponent(name)
      };
      state.user.profiles = [...(state.user.profiles || []), newProfile];
      state.profile = newProfile;
      localStorage.setItem('ott_user', JSON.stringify(state.user));
      localStorage.setItem('ott_profile', JSON.stringify(newProfile));
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
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => [login.fulfilled.type, register.fulfilled.type, googleLogin.fulfilled.type].includes(action.type), (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.profile = action.payload.user.profiles?.[0] || null;
        localStorage.setItem('ott_user', JSON.stringify(action.payload.user));
        localStorage.setItem('ott_token', action.payload.token);
        localStorage.setItem('ott_profile', JSON.stringify(state.profile));
      })
      .addMatcher((action) => [login.rejected.type, register.rejected.type, googleLogin.rejected.type].includes(action.type), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout, switchProfile, addProfile } = authSlice.actions;
export default authSlice.reducer;
