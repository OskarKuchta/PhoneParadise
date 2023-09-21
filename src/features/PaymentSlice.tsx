import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isOpen: false,
  accepted: false,
  declined: false,
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
    acceptedPayment: (state) => {
      state.accepted = true;
    },
    declinedPayment: (state) => {
      state.declined = true;
    },
    resetPaymentState: (state) => {
      state.accepted = initialState.accepted;
      state.declined = initialState.declined;
    },
  },
});

export const { closePayment, openPayment, acceptedPayment, declinedPayment, resetPaymentState } = PaymentSlice.actions;
export default PaymentSlice.reducer;
