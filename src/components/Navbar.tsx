import { Link, useLocation } from "react-router-dom";
import { CartCount, CartIcon } from "../assets/icons";
import { TypeAnimation } from "react-type-animation";
import { FC } from "react";
const Navbar: FC = () => {
  const location = useLocation();

  return (
    <header>
      <nav className="max-w-[100vw] h-16 bg-purple flex justify-between items-center">
        <Link
          to="/"
          aria-label="Phone Paradise"
          className="md:hover:bg-hoverPurple md:focus:bg-hoverPurple focus:outline-none text-lightGray px-[1.2rem] 
        transition-all duration-500 h-16 flex items-center"
        >
          <TypeAnimation
            sequence={["Phone Paradise"]}
            cursor={false}
            speed={5}
          ></TypeAnimation>
        </Link>

        <ul className="items-center pr-8 hidden md:flex">
          <li
            className={
              location.pathname.includes("/about") ? "bg-hoverPurple" : ""
            }
          >
            <Link
              to="about"
              className="focus:outline-none list-none hover:bg-hoverPurple focus:bg-hoverPurple text-lightGray px-[1.2rem] 
            transition-all duration-500 h-16 flex items-center"
            >
              Why us?
            </Link>
          </li>
          <li
            className={
              location.pathname.includes("/contact") ? "bg-hoverPurple" : ""
            }
          >
            <Link
              to="contact"
              aria-label="Contact with us"
              className="focus:outline-none list-none hover:bg-hoverPurple focus:bg-hoverPurple text-lightGray px-[1.2rem] 
            transition-all duration-500 h-16 flex items-center"
            >
              Contact
            </Link>
          </li>
          <li
            className={`${
              location.pathname.includes("/cart") ? "bg-hoverPurple" : ""
            } relative
          `}
          >
            <Link
              to="cart"
              aria-label="Go to cart"
              className="focus:outline-none list-none hover:bg-hoverPurple focus:bg-hoverPurple text-lightGray px-[1.2rem] 
            transition-all duration-500 h-16 flex items-center"
            >
              <CartIcon />
              <CartCount />
            </Link>
          </li>
          <li
            className={`${
              location.pathname.includes("/login") ? "bg-hoverPurple" : ""
            } h-16 flex justify-center items-center
        `}
          >
            <Link
              to="/login"
              className="focus:outline-none text-lightGray  px-[0.5rem] rounded-full 
        transition-all duration-500  flex items-center hover:bg-hoverPurple focus:bg-hoverPurple"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
