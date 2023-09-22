import { createSlice } from "@reduxjs/toolkit";
import { InitialModal } from "../Types";

const initialState: InitialModal = {
  isOpen: false,
};

const ModalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = ModalSlice.actions;

export default ModalSlice.reducer;
