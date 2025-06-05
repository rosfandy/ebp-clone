import { LangDropdown } from "@/Components/Dropdown/LangDropdown";
import { ProfileDropdown } from "@/Components/Dropdown/ProfileDropdown";
import { Link } from "@inertiajs/react"
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaBars, FaCheckToSlot, FaEnvelopeOpenText, FaGraduationCap, FaHouse, FaUsers } from "react-icons/fa6";
import { LinkSidebar } from "../Link/LinkSidebar";
import { AnimatePresence, motion } from "framer-motion";

export const DashboardNavbar = (props) => {
    const { user } = props
    const { t, setLocale, currentLocale } = useLaravelReactI18n();
    const [collapsed, setCollapsed] = useState(false)
    const path = window.location.pathname;

    const links = [
        { href: "/dashboard", label: t("Dashboard"), icon: <FaHouse />, role: ['student', 'staff', 'admin'] },
        { href: "/verification", label: t("Verification"), icon: <FaCheckToSlot />, role: ['admin', 'staff'] },
        { href: "/member", label: t("Member"), icon: <FaUsers />, role: ['admin'] },
        { href: "/academic", label: t("Academic"), icon: <FaGraduationCap />, role: ['admin'] },
        { href: "/letter", label: t("Letter") + ' BP', icon: <FaEnvelopeOpenText />, role: ['admin', 'student'] },
    ];

    const filterLinks = (user, links) => {
        const role = user.role.toLowerCase();
        return links.filter(link => link.role.includes(role));
    }

    const authorityAccess = filterLinks(user, links);

    return (
        <div className="w-full lg:px-24 md:px-12 px-4 py-4 flex items-center justify-between bg-sky-100 border-b z-[10]">
            <div className="flex justify-between w-full items-center">
                <div className="items-center lg:flex hidden">
                    <Link href="/dashboard" className="flex gap-x-4 items-center">
                        <img className="h-[25px] md:h-full w-auto" src="/img/logo-icon.png" />
                        <div className="">
                            <h1 className="font-bold text-lg mb-[-5px]">LibriGo</h1>
                            <h3 className="lg:text-md font-medium text-gray-400">E-Bebas Pustaka <span
                                className="text-blue-500 font-bold">ITS</span></h3>
                        </div>
                    </Link>
                </div>
                <div onClick={() => setCollapsed(true)} className="lg:hidden flex cursor-pointer">
                    <FaBars size={20} />
                </div>
                <div className="flex items-center gap-x-4">
                    <LangDropdown setLocale={setLocale} currentLang={currentLocale()} />
                    {user && <ProfileDropdown user={user} />}
                </div>
            </div>
            <AnimatePresence>
                {collapsed && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed bg-[#142e4b] z-[99999] left-0 top-0 text-white p-8 md:w-1/3 w-full h-screen"
                    >
                        <div className="flex justify-end cursor-pointer" onClick={() => setCollapsed(false)}>
                            <FaBars size={20} />
                        </div>
                        <div className="flex flex-col mt-12">
                            <div className={`duration-200 flex flex-col pr-8 gap-y-6`}>
                                {authorityAccess.map((link, index) => (
                                    <LinkSidebar key={index} link={link} index={index} path={path} isCollapsed={false} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}   
