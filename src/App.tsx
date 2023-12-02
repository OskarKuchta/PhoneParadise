import About from "./pages/About.tsx";
import Navbar from "./components/Navbar.tsx";
import Contact from "./pages/Contact.tsx";
import BadURL from "./pages/BadURL.tsx";
import { Location, Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import { useEffect } from "react";
import MainPage from "./pages/MainPage.tsx";
import { getTotal } from "./features/CartSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Payments from "./pages/Payments";
import PaymentsEnd from "./pages/PaymentsEnd.tsx";
import { resetPaymentState } from "./features/PaymentSlice.tsx";
import Login from "./pages/Login.tsx";
import Footer from "./components/Footer/MobileFooter.tsx";
import DesktopFooter from "./components/Footer/DesktopFooter.tsx";
import { usePhoneContext } from "./context/PhoneProvider.tsx";

const App = () => {
  const dispatch = useDispatch();
  const location: Location = useLocation();
  const { cartItems, isDiscount, total } = useSelector(
    (store: RootState) => store.cart
  );
  const isPhone = usePhoneContext();
  useEffect(() => {
    if (location.pathname !== "/payment-submit") {
      dispatch(resetPaymentState());
    }
  }, [location.pathname, dispatch]);
  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, isDiscount, total]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="cart/payments" element={<Payments />} />
        <Route path="payment-submit" element={<PaymentsEnd />} />
        <Route path="*" element={<BadURL />} />
      </Routes>
      {isPhone ? <Footer /> : <DesktopFooter />}
    </>
  );
};

export default App;
