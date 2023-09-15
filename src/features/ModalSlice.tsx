import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const ModalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {},
});

export default ModalSlice.reducer;
