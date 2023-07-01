import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import mobileMenuReducer from './slices/mobileMenuSlice';
import modalReducer from './slices/modalSlice';
import watchlistsReducer from './slices/watchlistsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileMenu: mobileMenuReducer,
    modal: modalReducer,
    watchlists: watchlistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
