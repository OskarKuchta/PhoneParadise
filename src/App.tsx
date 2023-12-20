import { ErrorBoundary } from "react-error-boundary";
import React, { Dispatch, Suspense, useEffect } from "react";
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

const About = React.lazy(() => import("./pages/About.tsx"));
const Contact = React.lazy(() => import("./pages/Contact.tsx"));
const BadURL = React.lazy(() => import("./pages/BadURL.tsx"));
const Cart = React.lazy(() => import("./pages/Cart.tsx"));
const MainPage = React.lazy(() => import("./pages/MainPage.tsx"));
const Payments = React.lazy(() => import("./pages/Payments.tsx"));
const PaymentsEnd = React.lazy(() => import("./pages/PaymentsEnd.tsx"));
const Login = React.lazy(() => import("./pages/Login.tsx"));
const Register = React.lazy(() => import("./pages/Register.tsx"));
const CompleteRegistration = React.lazy(
  () => import("./pages/CompleteRegistration.tsx")
);
const Profile = React.lazy(() => import("./pages/Profile.tsx"));

const App = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const location: Location = useLocation();
  const { cartItems, isDiscount, total, discount } = useSelector(
    (store: RootState) => store.cart
  );
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
      <ErrorBoundary
        fallback={<main className="without-data">{Error.toString()}</main>}
      >
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
                Loading...
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
      {isPhone ? <Footer /> : <DesktopFooter />}
    </>
  );
};

export default App;
