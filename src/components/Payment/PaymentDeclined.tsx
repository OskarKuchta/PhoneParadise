import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import DesktopFooter from "../Footer/DesktopFooter";
import { useTranslation } from "react-i18next";
const PaymentDeclined: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const backToCart = () => {
    navigate("/cart");
  };
  const { t } = useTranslation();
  return (
    <main className="flex flex-col justify-center items-center text-center h-[60vh] w-[80vw] mx-[10%]">
      <h2>{t("payment-declined")}</h2>
      <button
        onClick={backToCart}
        className="mt-12 py-2 px-8 border-2 rounded border-purple transition-colors duration-500 focus:bg-purple focus:text-white focus:outline-none hover:bg-purple hover:text-white"
      >
        {t("back-to-cart")}
      </button>
      <DesktopFooter />
    </main>
  );
};

export default PaymentDeclined;
