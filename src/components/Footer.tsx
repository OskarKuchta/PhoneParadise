import { CartIcon, CartCount, HomeIcon, ContactIcon } from "../assets/icons";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer-icons">
        <li>
          <Link to="/contact">
            <ContactIcon />
          </Link>
        </li>
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li className="cart">
          <Link to="/cart">
            <CartIcon />
            <CartCount />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
