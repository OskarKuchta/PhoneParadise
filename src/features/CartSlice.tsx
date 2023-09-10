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
      const existingProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } 
      else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.cartItems.push(action.payload);
      state.amount += 1;
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
