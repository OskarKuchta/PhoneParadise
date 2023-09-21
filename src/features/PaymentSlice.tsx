import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const PaymentSlice = createSlice({
  name: "Payment",
  initialState,
  reducers: {
    openPayment: (state) => {
      state.isOpen = true;
    },
    closePayment: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closePayment, openPayment } = PaymentSlice.actions;
export default PaymentSlice.reducer;
