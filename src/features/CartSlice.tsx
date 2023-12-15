import { createSlice } from "@reduxjs/toolkit";
import { InitialCart } from "../Types/Types";

export const initialState: InitialCart = {
  cartItems: [],
  amount: 0,
  total: 0,
  withDiscount: 0,
  discount: 0,
  percentage: 0,
  isDiscount: false,
  codeName: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { payload } = action;
      const existingProduct = state.cartItems.find(
        (item) => item.id === payload.id
      );
      if (existingProduct) {
        if (existingProduct.quantity < existingProduct.inStock) {
          existingProduct.quantity += 1;
          state.amount += 1;
        }
      } else {
        if (payload.inStock > 0) {
          state.cartItems.push({ ...payload, quantity: 1 });
          state.amount += 1;
        }
      }
    },
    increaseProductAmount: (state, action) => {
      state.amount += 1;
      const { productId } = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);
      if (product && product.quantity < product.inStock) {
        product.quantity += 1;
      } else {
        state.amount -= 1;
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
      if (state.amount === 0) {
        state.isDiscount = false;
      }
      if (state.isDiscount) {
        state.withDiscount =
          state.total - (state.total * state.percentage) / 100;
      }
    },
    addCode: (state, action) => {
      state.percentage = action.payload.percentage;
      state.discount = (state.total * state.percentage) / 100;
      state.isDiscount = true;
      state.codeName = action.payload.codeName;
      state.total -= Number(state.discount.toFixed(2));
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
