import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store";

export const CartIcon = () => {
  return (
    <svg
      className="cart-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="20"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
    </svg>
  );
};
export const CartCount = () => {
  const { amount } = useSelector((state: RootState) => state.cart);
  return (
    <svg
      className="cart-count"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 50 50"
    >
      <circle
        className="count-circle"
        cx="25"
        cy="25"
        r="20"
        fill="transparent"
        stroke="white"
        strokeWidth="2"
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="24"
        fill="white"
      >
        {amount}
      </text>
    </svg>
  );
};
export const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
    </svg>
  );
};
export const ContactIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
    </svg>
  );
};
