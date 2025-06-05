import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaRightToBracket } from "react-icons/fa6";
import { LangDropdown } from "@/Components/Dropdown/LangDropdown";
import { LinkNav } from "../Link/LinkNavbar";

export const HomeNavbar = () => {
    const { setLocale, currentLocale } = useLaravelReactI18n();

    return (
        <>
            <div className="fixed w-full lg:px-24 md:px-12 px-4 md:py-4 py-4 flex items-center justify-between bg-sky-100 border-b z-[10]">
                <div className="flex justify-between w-full items-center">
                    <div className="md:flex hidden items-center">
                        <a href="/" className="flex gap-x-4 items-center">
                            <img className="h-[25px] md:h-full w-auto" src="/img/logo-icon.png"
                                alt="" width="" />
                            <div className="">
                                <h1 className="font-bold text-lg mb-[-5px]">{import.meta.env.VITE_APP_NAME}</h1>
                                <h3 className="lg:text-md font-medium text-gray-400">E-Bebas Pustaka <span
                                    className="text-blue-500 font-bold">ITS</span>
                                </h3>
                            </div>
                        </a>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-4 mr-12">
                        <LinkNav href="#home" label="Home" />
                        <LinkNav href="#services" label="Services" />
                    </div>
                    <div className="flex items-center justify-end md:w-fit w-full">
                        <LangDropdown setLocale={setLocale} currentLang={currentLocale()} />
                        <div className="flex items-center gap-x-4">
                            <LinkNav icon={<FaRightToBracket className="text-sm" />} href="/auth" ssr={false} label="Login" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}