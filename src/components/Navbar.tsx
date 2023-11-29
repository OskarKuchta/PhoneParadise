import { Link, useLocation } from "react-router-dom";
import { CartCount, CartIcon } from "../assets/icons";
import { TypeAnimation } from "react-type-animation";
import { FC } from "react";
const Navbar: FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" aria-label="Phone Paradise" className="navbar-name">
        <TypeAnimation
          sequence={["Phone Paradise"]}
          cursor={false}
          speed={5}
        ></TypeAnimation>
      </Link>

      <ul className="navbar-links">
        <li
          className={location.pathname.includes("/about") ? "active-link" : ""}
        >
          <Link to="about">Why us?</Link>
        </li>
        <li
          className={
            location.pathname.includes("/contact") ? "active-link" : ""
          }
        >
          <Link to="contact" aria-label="Contact with us">
            Contact
          </Link>
        </li>
        <li
          className={
            location.pathname.includes("/cart")
              ? "active-link cart-nav"
              : "cart-nav"
          }
        >
          <Link to="cart" aria-label="Go to cart">
            <CartIcon />
            <CartCount />
          </Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
