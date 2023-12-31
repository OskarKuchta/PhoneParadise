import { Link } from "react-router-dom";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const EmptyCart: FC = () => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center text-center my-16 mx-8">
      <h2 className="tracking-widest mb-4">{t("empty-cart")}</h2>
      <h3 className="mb-8">{t("empty-cart-hint")}</h3>
      <Link
        to="/"
        aria-label="Back to main page"
        className="text-white bg-purple focus:outline-none py-4 px-6
        border-transparent rounded-[5px] text-base relative overflow-hidden
        transition-all duration-500 hover:bg-hoverPurple focus:bg-hoverPurple hover:scale-110 focus:scale-110"
      >
        {t("empty-cart-button")}
      </Link>
    </section>
  );
};

export default EmptyCart;
