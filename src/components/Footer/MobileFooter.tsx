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
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useAvatarContext } from "../../context/AvatarProvider";

const Footer: FC = () => {
  const storedUserData = useSelector(
    (state: RootState) => state.login.userData
  );
  const { actualColor } = useAvatarContext();
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
          <div
            className={`border border-black w-8 h-8 mb-1 rounded-full ${actualColor} flex justify-center items-center`}
          >
            <span>{storedUserData.name.slice(0, 1)}</span>
          </div>
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
