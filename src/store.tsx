import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/Productslice.jsx";
import { productsFetch } from "./features/Productslice.jsx";
import { productsApi } from "./features/ProductsApi.js";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());

export type RootState = ReturnType<typeof store.getState>;
export default store;
