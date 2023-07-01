import { createSlice } from '@reduxjs/toolkit';

export interface Watchlist {
  _id: string;
  uid: string;
  name: string;
  stocks: string[];
}

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
    logOutWatchlists(state) {
      state.watchlists = [];
    },
  },
});

export const {
  setWatchlists,
  addWatchlist,
  updateWatchlist,
  logOutWatchlists,
} = watchlistsSlice.actions;
export default watchlistsSlice.reducer;