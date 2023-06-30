import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    uid: string;
    email: string;
  } | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
