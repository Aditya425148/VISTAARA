import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { buildRows, demoMovies } from '../../data/demoMovies';

export const fetchHome = createAsyncThunk('movies/fetchHome', async () => {
  try {
    const { data } = await api.get('/movies/home');
    return data;
  } catch {
    return { featured: demoMovies[0], rows: buildRows(demoMovies) };
  }
});

export const searchMovies = createAsyncThunk('movies/search', async (term) => {
  if (!term.trim()) return [];
  try {
    const { data } = await api.get('/movies', { params: { search: term } });
    return data;
  } catch {
    const needle = term.toLowerCase();
    return demoMovies.filter((movie) => `${movie.title} ${movie.genre}`.toLowerCase().includes(needle));
  }
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
        state.featured = action.payload.featured || demoMovies[0];
        state.rows = action.payload.rows?.length ? action.payload.rows : buildRows(demoMovies);
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  }
});

export default movieSlice.reducer;
