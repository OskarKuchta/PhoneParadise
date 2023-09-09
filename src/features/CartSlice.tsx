import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
      state.amount += 1;
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
