import { HomeFooter } from "@/Components/Footer/HomeFooter"
import { HomeNavbar } from "@/Components/Navigation/Navbar/HomeNavbar"
import { Head } from "@inertiajs/react"
import { useLaravelReactI18n } from "laravel-react-i18n";

export const HomeLayout = ({ children }) => {
    const { t } = useLaravelReactI18n();
    return (
        <>
            <HomeNavbar />
            <Head title={t("Home")} />
            <div className="">
                {children}
            </div>
            <HomeFooter />
        </>
    )
}
