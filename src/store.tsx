import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/Productslice.tsx";
import { productsFetch } from "./features/Productslice.tsx";
import CartReducer from "./features/CartSlice.tsx";
import ModalReducer from "./features/ModalSlice.tsx";
import LoginReducer from "./features/AccountSlice.tsx";
import PaymentReducer from "./features/PaymentSlice.tsx";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "main-root",
  storage,
};
const rootReducer = combineReducers({
  products: productsReducer,
  cart: CartReducer,
  modal: ModalReducer,
  payment: PaymentReducer,
  account: LoginReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
store.dispatch(productsFetch());
const Persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export { Persistor };
export default store;
