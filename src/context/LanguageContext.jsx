import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useEffect } from "react";
import i18n from './../i18n';
import { useContext } from "react";


const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
    const [language, setLanguage] = useLocalStorageState('en', 'language')

    useEffect(() => {
        i18n.changeLanguage(language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language])

    function toggleLanguage() {
        setLanguage((lang) => (lang === "en" ? "ar" : "en"));
    }

    return <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
        {children}
    </LanguageContext.Provider>
}

function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
export { LanguageProvider, useLanguage };

