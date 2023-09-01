import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.tsx";
import Contact from "./pages/Contact.jsx";
import BadURL from "./pages/BadURL.jsx";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import Footer from "./components/Footer.tsx";
import { useState, useEffect } from "react";

const App = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isPhone = windowWidth < 769;
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>123</div>} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />}></Route>
        <Route path="*" element={<BadURL />} />
      </Routes>
      {isPhone && <Footer />}
    </>
  );
};

export default App;
