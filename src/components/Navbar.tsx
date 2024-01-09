import { Link, Location, useLocation } from "react-router-dom";
import { CartCount, CartIcon } from "../assets/icons";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LanguageSwitcher from "../LanguageSwitcher";

const Navbar: FC = () => {
  const location: Location = useLocation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.account.isLoggedIn
  );
  const actualColor = useSelector(
    (state: RootState) => state.account.userData.avatarColor
  );
  const userName = useSelector(
    (state: RootState) => state.account.userData.name
  );
  return (
    <header>
      <nav className="max-w-[100vw] h-16 bg-purple flex justify-between items-center">
        <Link
          to="/"
          aria-label="Phone Paradise"
          className="md:hover:bg-hoverPurple md:focus:bg-hoverPurple focus:outline-none text-lightGray px-[1.2rem] 
          transition-colors duration-500 h-16 flex items-center"
        >
          Phone Paradise
        </Link>
        <div className="flex items-center">
          <LanguageSwitcher />
          <ul className="items-center pr-6 hidden md:flex">
            <li
              className={
                location.pathname.includes("/about") ? "bg-hoverPurple" : ""
              }
            >
              <Link
                to="about"
                className="focus:outline-none list-none hover:bg-hoverPurple focus:bg-hoverPurple text-lightGray px-[1.2rem] 
              transition-colors duration-500 h-16 flex items-center"
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
              transition-colors duration-500 h-16 flex items-center"
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
              transition-colors duration-500 h-16 flex items-center"
              >
                <CartIcon />
                <CartCount />
              </Link>
            </li>
            <li
              className={`${
                location.pathname.includes("/login") ||
                location.pathname.includes("/login")
                  ? "bg-hoverPurple"
                  : ""
              }  h-16 flex justify-center items-center 
            `}
            >
              {isLoggedIn ? (
                <Link
                  to="/login"
                  className="hover:bg-hoverPurple focus:bg-hoverPurple focus:outline-none w-full h-full flex items-center px-[0.8rem]"
                >
                  <button
                    className={`border border-black w-8 h-8 rounded-full ${actualColor} flex justify-center items-center focus:outline-none`}
                  >
                    <span>{userName.slice(0, 1).toUpperCase()}</span>
                  </button>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="focus:outline-none text-lightGray  px-[0.5rem] rounded-full 
              transition-colors duration-500  flex items-center hover:bg-hoverPurple focus:bg-hoverPurple"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
