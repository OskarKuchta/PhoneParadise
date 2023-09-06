import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/Productslice.tsx";
import { productsFetch } from "./features/Productslice.tsx";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

store.dispatch(productsFetch());

export type RootState = ReturnType<typeof store.getState>;
export default store;
