import { createSlice } from '@reduxjs/toolkit';

interface MobileMenuState {
  isOpen: boolean;
}

const initialState: MobileMenuState = {
  isOpen: false,
};

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    openMobileMenu: (state) => {
      state.isOpen = true;
    },
    closeMobileMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleMobileMenu, openMobileMenu, closeMobileMenu } =
  mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
