import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lang/en/lan-en.json";
import ar from "./lang/ar/lan-ar.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: (() => {
    try {
      const stored = localStorage.getItem("language");
      return stored ? JSON.parse(stored) : "en";
    } catch {
      return "en";
    }
  })(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
