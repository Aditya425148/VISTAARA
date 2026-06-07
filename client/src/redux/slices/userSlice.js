import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: JSON.parse(localStorage.getItem('ott_favorites') || '[]'),
  progress: JSON.parse(localStorage.getItem('ott_progress') || '{}'),
  history: JSON.parse(localStorage.getItem('ott_history') || '[]')
};

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const movie = action.payload;
      const exists = state.favorites.some((item) => item._id === movie._id);
      state.favorites = exists ? state.favorites.filter((item) => item._id !== movie._id) : [movie, ...state.favorites];
      save('ott_favorites', state.favorites);
    },
    saveProgress(state, action) {
      const { movie, progress, duration } = action.payload;
      state.progress[movie._id] = { progress, duration };
      state.history = [{ movie, progress, duration, watchedAt: new Date().toISOString() }, ...state.history.filter((item) => item.movie._id !== movie._id)].slice(0, 30);
      save('ott_progress', state.progress);
      save('ott_history', state.history);
    }
  }
});

export const { toggleFavorite, saveProgress } = userSlice.actions;
export default userSlice.reducer;
