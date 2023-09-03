import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/Productslice.jsx";
import { Fetch } from "./features/Productslice.jsx";
import { productsApi } from "./features/ProductsApi.js";

const store = configureStore({
  reducer: {
    products: productsSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

store.dispatch(Fetch());

export default store;
