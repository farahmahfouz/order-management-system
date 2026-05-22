import { useLanguage } from "../context/LanguageContext"
import ButtonIcon from './ButtonIcon';

function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();
    return (
        <ButtonIcon onClick={toggleLanguage} title={language === "en" ? "العربية" : "English"}>{language === 'en' ? 'AR' : 'EN'}</ButtonIcon>
    )
}

export default LanguageToggle