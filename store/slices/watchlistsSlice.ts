import { createSlice } from '@reduxjs/toolkit';
import { Watchlist } from '@/types/types';

interface WatchlistsState {
  watchlists: Watchlist[];
}

const initialState: WatchlistsState = {
  watchlists: [],
};

const watchlistsSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    setWatchlists(state, action) {
      state.watchlists = action.payload;
    },
    addWatchlist(state, action) {
      state.watchlists.push(action.payload);
    },
    updateWatchlist(state, action) {
      const { _id } = action.payload;
      const watchlistIndex = state.watchlists.findIndex(
        (watchlist) => watchlist._id === _id
      );
      state.watchlists[watchlistIndex] = action.payload;
    },
    updateWatchlists(state, action) {
      const watchlists = action.payload;
      watchlists.forEach((watchlist: Watchlist) => {
        const watchlistIndex = state.watchlists.findIndex(
          (w) => w._id === watchlist._id
        );
        state.watchlists[watchlistIndex] = watchlist;
      });
    },
    removeWatchlist(state, action) {
      const { _id } = action.payload;
      const watchlistIndex = state.watchlists.findIndex(
        (watchlist) => watchlist._id === _id
      );
      state.watchlists.splice(watchlistIndex, 1);
    },
    logOutWatchlists(state) {
      state.watchlists = [];
    },
  },
});

export const {
  setWatchlists,
  addWatchlist,
  updateWatchlist,
  updateWatchlists,
  removeWatchlist,
  logOutWatchlists,
} = watchlistsSlice.actions;
export default watchlistsSlice.reducer;
