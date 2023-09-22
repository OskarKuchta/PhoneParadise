import About from "./pages/About.tsx";
import Navbar from "./components/Navbar.tsx";
import Contact from "./pages/Contact.tsx";
import BadURL from "./pages/BadURL.tsx";
import { Location, Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage.tsx";
import { getTotal } from "./features/CartSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Payments from "./pages/Payments";
import PaymentsEnd from "./pages/PaymentsEnd.tsx";
import { resetPaymentState } from "./features/PaymentSlice.tsx";

const App = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const dispatch = useDispatch();
  const location: Location = useLocation();
  const { cartItems } = useSelector((store: RootState) => store.cart);
  const isPhone: boolean = windowWidth < 769;

  useEffect(() => {
    if (location.pathname !== "/payment-submit") {
      dispatch(resetPaymentState());
    }
  }, [location.pathname, dispatch]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/payments" element={<Payments />} />
        <Route path="payment-submit" element={<PaymentsEnd />} />
        <Route path="*" element={<BadURL />} />
      </Routes>
      {isPhone && <Footer />}
    </>
  );
};

export default App;
