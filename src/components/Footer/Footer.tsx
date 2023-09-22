import { CartIcon, CartCount, HomeIcon, InfoIcon } from "../../assets/icons";
import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer>
      <ul className="footer-icons">
        <li>
          <Link to="about" aria-label="About company">
            <InfoIcon />
          </Link>
        </li>
        <li>
          <Link to="/" aria-label="Back to main page">
            <HomeIcon />
          </Link>
        </li>
        <li className="cart-nav">
          <Link to="cart" aria-label="Go to cart">
            <CartIcon />
            <CartCount />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
