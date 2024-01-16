import { useEffect, useState, ReactNode } from "react";
import { PolandFlag, UkFlag } from "./assets/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "./features/LanguageSwitcherSlice.tsx";
import { RootState } from "./store.tsx";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const [initialFlag, setInitialFlag] = useState<ReactNode | null>(null);

  useEffect(() => {
    const flag = currentLanguage === "pl" ? <PolandFlag /> : <UkFlag />;
    setInitialFlag(flag);
    i18n.changeLanguage(currentLanguage === "pl" ? "pl" : "en");
  }, [currentLanguage]);

  const changeLanguage = () => {
    const newLanguage = currentLanguage === "pl" ? "en" : "pl";
    i18n.changeLanguage(newLanguage);
    dispatch(setLanguage(newLanguage));
  };

  return (
    <button className="mr-12 p-2" onClick={changeLanguage}>
      {initialFlag}
    </button>
  );
};

export default LanguageSwitcher;
