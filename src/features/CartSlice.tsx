import { createSlice } from "@reduxjs/toolkit";
import { InitialCart } from "../Types/Types";

export const initialState: InitialCart = {
  cartItems: [],
  amount: 0,
  total: 0,
  discount: 0,
  isDiscount: false,
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
    removeProduct: (state, action) => {
      const { productId } = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);
      if (product) {
        state.amount -= product.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== productId
        );
      }
    },
    getTotal: (state) => {
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.discount = state.total;
    },
    addCode: (state, action) => {
      const percentage = action.payload;
      const discount = (state.total * percentage) / 100;
      state.discount = Number.isInteger(state.total - discount)
        ? state.total - discount
        : parseFloat((state.total - discount).toFixed(2));
      state.isDiscount = true;
    },
    removeAllProducts: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.isDiscount = false;
    },
  },
});

export const {
  addItem,
  increaseProductAmount,
  decreaseProductAmount,
  removeProduct,
  getTotal,
  addCode,
  removeAllProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
