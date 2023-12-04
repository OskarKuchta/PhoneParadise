import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import DesktopFooter from "../Footer/DesktopFooter";
const PaymentDeclined: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const backToCart = () => {
    navigate("/cart");
  };
  return (
    <main className="flex flex-col justify-center items-center text-center h-[60vh] w-[80vw] mx-[10%]">
      <h2>Something went wrong with payment. Back to cart and try again.</h2>
      <button
        onClick={backToCart}
        className="mt-12 py-2 px-8 border-2 rounded border-purple transition-colors duration-500 focus:bg-purple focus:text-white focus:outline-none hover:bg-purple hover:text-white"
      >
        Back to main
      </button>
      <DesktopFooter />
    </main>
  );
};

export default PaymentDeclined;
