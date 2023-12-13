import {
  CartIcon,
  CartCount,
  HomeIcon,
  InfoIcon,
  LoginIcon,
  ContactIcon,
} from "../../assets/icons";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../store";

const Footer: FC = () => {
  const avatarColor = useSelector(
    (state: RootState) => state.profile.userData.avatarColor
  );
  const userName = useSelector(
    (state: RootState) => state.profile.userData.name
  );
  const navigate: NavigateFunction = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  return (
    <footer className="block md:hidden w-screen fixed bottom-0 h-12 bg-gray-800">
      <ul className="h-full flex justify-between px-8 items-center">
        <li>
          <Link to="about" aria-label="About company">
            <InfoIcon />
          </Link>
        </li>
        <li>
          <Link to="/contact" aria-label="Contact with us">
            <ContactIcon />
          </Link>
        </li>
        <li className="mb-[5px]">
          <Link to="/" aria-label="Back to main page">
            <HomeIcon />
          </Link>
        </li>
        {isLoggedIn ? (
          <button
            className={`border border-black w-8 h-8 mb-1 rounded-full ${avatarColor} flex justify-center items-center`}
            onClick={() => navigate("/profile")}
          >
            <span>{userName.slice(0, 1)}</span>
          </button>
        ) : (
          <>
            <li>
              <Link to="/login" aria-label="Login to account">
                <LoginIcon />
              </Link>
            </li>
          </>
        )}
        <li>
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
