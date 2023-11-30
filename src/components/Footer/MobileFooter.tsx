import { CartIcon, CartCount, HomeIcon, InfoIcon } from "../../assets/icons";
import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="block md:hidden w-screen fixed bottom-0 h-12 bg-gray-800">
      <ul className="h-full flex justify-between px-8 items-center">
        <li>
          <Link to="about" aria-label="About company">
            <InfoIcon />
          </Link>
        </li>
        <li className="mb-[5px]">
          <Link to="/" aria-label="Back to main page">
            <HomeIcon />
          </Link>
        </li>
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
