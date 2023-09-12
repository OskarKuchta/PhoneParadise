import { CartIcon, CartCount, HomeIcon, ContactIcon } from "../assets/icons";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer-icons">
        <li>
          <Link to="/contact" aria-label="Contact with us">
            <ContactIcon />
          </Link>
        </li>
        <li>
          <Link to="/" aria-label="Back to main page">
            <HomeIcon />
          </Link>
        </li>
        <li className="cart-nav">
          <Link to="/cart" aria-label="Go to cart">
            <CartIcon />
            <CartCount />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
