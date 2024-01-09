import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./translations/en.json";
import plJSON from "./translations/pl.json";
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    pl: { ...plJSON },
  },
  lng: "en",
});
