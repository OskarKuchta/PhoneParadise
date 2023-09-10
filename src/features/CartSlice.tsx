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
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.cartItems.push(action.payload);
      state.amount += 1;
    },
    increaseProductAmount: (state, action) => {
      state.amount += 1;
      const { productId } = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseProductAmount: (state, action) => {
      const { productId } = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);
      product.quantity -= 1;
      if (product.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== productId
        );
      }
      state.amount -= 1;
    },
  },
});

export const { addItem, increaseProductAmount, decreaseProductAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
