import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/Productslice.tsx";
import { productsFetch } from "./features/Productslice.tsx";
import CartReducer from "./features/CartSlice.tsx";
import ModalReducer from "./features/ModalSlice.tsx";
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: CartReducer,
    modal: ModalReducer,
  },
});

store.dispatch(productsFetch());

export type RootState = ReturnType<typeof store.getState>;
export default store;
