import { Link } from "react-router-dom";
import { CartCount, CartIcon } from "../assets/icons";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" aria-label="Back to main page" className="navbar-name">
        <h2>Phone Paradise</h2>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/about">Why us?</Link>
        </li>
        <li>
          <Link to="/contact" aria-label="Contact with us">Contact</Link>
        </li>
        <li className="cart-nav">
          <Link to="/cart" aria-label="Go to cart">
            <CartIcon />
            <CartCount />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
