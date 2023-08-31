import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.tsx";
import Contact from "./pages/Contact.jsx";
import BadURL from "./pages/BadURL.jsx";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>123</div>} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<BadURL />} />
      </Routes>
    </>
  );
};

export default App;
