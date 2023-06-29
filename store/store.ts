import { configureStore } from '@reduxjs/toolkit';
import mobileMenuReducer from './slices/mobileMenuSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
