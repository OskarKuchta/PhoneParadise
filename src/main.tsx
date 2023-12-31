import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store, { Persistor } from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PhoneProvider } from "./context/PhoneProvider";
import "./i18n.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <BrowserRouter>
          <PhoneProvider>
            <App />
          </PhoneProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
