import ErrorBoundary from "./ErrorBoundary.tsx";
import { Dispatch, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Location } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { usePhoneContext } from "./context/PhoneProvider.tsx";
import DesktopFooter from "./components/Footer/DesktopFooter.tsx";
import Footer from "./components/Footer/MobileFooter.tsx";
import { getTotal } from "./features/CartSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { resetPaymentState } from "./features/PaymentSlice.tsx";
import { AnyAction } from "redux";
import { isPhone } from "./Types/Types.ts";
import { useTranslation } from "react-i18next";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import BadURL from "./pages/BadURL.tsx";
import Cart from "./pages/Cart.tsx";
import MainPage from "./pages/MainPage.tsx";
import Payments from "./pages/Payments.tsx";
import PaymentsEnd from "./pages/PaymentsEnd.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CompleteRegistration from "./pages/CompleteRegistration.tsx";
import Profile from "./pages/Profile.tsx";

const App = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const location: Location = useLocation();
  const { cartItems, isDiscount, total, discount } = useSelector(
    (store: RootState) => store.cart
  );
  const { t } = useTranslation();
  const isPhone: isPhone = usePhoneContext();
  useEffect(() => {
    if (location.pathname !== "/payment-submit") {
      dispatch(resetPaymentState());
    }
  }, [location.pathname, dispatch]);
  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, isDiscount, total, discount]);
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Suspense
          fallback={
            <>
              <main className="without-data">
                <div className="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {t("loading")}...
              </main>
            </>
          }
        >
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="register/complete"
              element={<CompleteRegistration />}
            />
            <Route path="profile" element={<Profile />} />
            <Route path="cart/payments" element={<Payments />} />
            <Route path="payment-submit" element={<PaymentsEnd />} />
            <Route path="*" element={<BadURL />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      {isPhone.isPhone ? <Footer /> : <DesktopFooter />}
    </>
  );
};

export default App;
