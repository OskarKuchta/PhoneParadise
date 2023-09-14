import { Link } from "react-router-dom";
import { CartCount, CartIcon } from "../assets/icons";
import { TypeAnimation } from "react-type-animation";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" aria-label="Back to main page" className="navbar-name">
        <TypeAnimation
          sequence={["Phone Paradise"]}
          cursor={false}
          speed={20}
        ></TypeAnimation>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="about">Why us?</Link>
        </li>
        <li>
          <Link to="contact" aria-label="Contact with us">
            Contact
          </Link>
        </li>
        <li className="cart-nav">
          <Link to="cart" aria-label="Go to cart">
            <CartIcon />
            <CartCount />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
