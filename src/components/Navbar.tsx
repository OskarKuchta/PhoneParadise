import { Link } from "react-router-dom";
import { CartIcon, CartCount } from "../assets/Icons.jsx";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name">
        <h2>Phone Paradise</h2>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/about">Why us?</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li className="cart">
          <Link to="/cart">
            <CartIcon />
            <CartCount />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
