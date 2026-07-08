import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchHome = createAsyncThunk('movies/fetchHome', async () => {
  const { data } = await api.get('/movies/home');
  return data;
});

export const searchMovies = createAsyncThunk('movies/search', async (term) => {
  if (!term.trim()) return [];
  const { data } = await api.get('/movies', { params: { search: term, limit: 5000 } });
  return data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    featured: null,
    rows: [],
    searchResults: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload.featured || action.payload.rows?.[0]?.movies?.[0] || null;
        state.rows = action.payload.rows || [];
      })
      .addCase(fetchHome.rejected, (state) => {
        state.loading = false;
        state.featured = null;
        state.rows = [];
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  }
});

export default movieSlice.reducer;
