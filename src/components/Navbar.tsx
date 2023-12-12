import { Link, useLocation } from "react-router-dom";
import { CartCount, CartIcon } from "../assets/icons";
import { TypeAnimation } from "react-type-animation";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Navbar: FC = () => {
  const location = useLocation();

  const storedUserData = useSelector(
    (state: RootState) => state.login.userData
  );
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const actualColor = useSelector(
    (state: RootState) => state.login.userData.avatarColor
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
          <TypeAnimation
            sequence={["Phone Paradise"]}
            cursor={false}
            speed={5}
          ></TypeAnimation>
        </Link>

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
              location.pathname.includes("/profile")
                ? "bg-hoverPurple"
                : ""
            }  h-16 flex justify-center items-center 
            `}
          >
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="hover:bg-hoverPurple focus:bg-hoverPurple focus:outline-none w-full h-full flex items-center px-[0.8rem]"
              >
                <div
                  className={`border border-black w-8 h-8 rounded-full ${actualColor} flex justify-center items-center`}
                >
                  <span>{storedUserData.name.slice(0, 1)}</span>
                </div>
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
      </nav>
    </header>
  );
};

export default Navbar;
