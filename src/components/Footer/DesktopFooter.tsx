import { FC } from "react";
import { useTranslation } from "react-i18next";

const DesktopFooter: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="hidden md:block fixed bottom-0 right-0 left-0 w-screen text-center bg-gray-800 text-lightGray p-2">
      <p>Phone Paradise &#169; 2024 – {t("desktop-footer")}</p>
    </footer>
  );
};

export default DesktopFooter;
