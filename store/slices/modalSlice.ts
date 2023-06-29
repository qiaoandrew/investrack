import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  content: string;
}

const initialState: ModalState = {
  content: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.content = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
