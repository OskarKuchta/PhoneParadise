import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/Productslice.tsx";
import { productsFetch } from "./features/Productslice.tsx";
import CartReducer from "./features/CartSlice.tsx";
import ModalReducer from "./features/ModalSlice.tsx";
import LoginReducer from "./features/AccountSlice.tsx";
import PaymentReducer from "./features/PaymentSlice.tsx";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import languageReducer from "./features/LanguageSwitcherSlice.tsx";

const persistConfig = {
  key: "main-root",
  storage,
  whitelist: ["products", "cart", "modal", "payment", "account", "language"],
};
const rootReducer = combineReducers({
  products: productsReducer,
  cart: CartReducer,
  modal: ModalReducer,
  payment: PaymentReducer,
  account: LoginReducer,
  language: languageReducer,
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
