import { useState } from "react";
import { PolandFlag, UkFlag } from "./assets/icons";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("pl");

  const changeLanguage = () => {
    const newLanguage = currentLanguage === "pl" ? "en" : "pl";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <button className="mr-12 w-4" onClick={changeLanguage}>
      {currentLanguage === "pl" ? <PolandFlag /> : <UkFlag />}
    </button>
  );
};

export default LanguageSwitcher;
