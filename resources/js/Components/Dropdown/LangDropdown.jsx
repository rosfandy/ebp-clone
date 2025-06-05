import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineTranslate } from "react-icons/hi";
import "./style.css";
import { DropdownBox } from "./Partials/DropdownBox";
import { DropdownList } from "./Partials/DropdownList";
export const LangDropdown = (props) => {
    const { currentLang } = props;
    const [isDropdown, setIsDropdown] = useState(false);
    const { setLocale, t } = useLaravelReactI18n();
    const langRef = useRef(null);

    const handleLanguage = (lang) => {
        setLocale(lang);
        setIsDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [langRef]);

    return (
        <div ref={langRef} className="relative">
            <button
                onClick={() => setIsDropdown(!isDropdown)}
                className="inline-flex w-full justify-center md:gap-x-1.5 rounded-md md:px-3 py-2 md:text-sm text-xs items-center text-gray-900 px-4"
            >
                {currentLang === 'en' ? 'English' : 'Bahasa'}
                <IoIosArrowDown />
            </button>
            <DropdownBox show={isDropdown} title={t("Choose language")} description={t("Choose language for system")}>
                <DropdownList onClick={() => handleLanguage('en')}>
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center mt-[-8px]">
                            <span className="font-dongle text-xl">En</span>
                        </div>
                        <span>English</span>
                    </div>
                </DropdownList>
                <DropdownList onClick={() => handleLanguage('id')}>
                    <div className="flex items-center gap-x-2" >
                        <div className="flex items-center mt-[-8px]">
                            <span className="font-dongle text-xl">Id</span>
                        </div>
                        <span>Bahasa</span>
                    </div>
                </DropdownList>

            </DropdownBox>
        </div>
    );
};