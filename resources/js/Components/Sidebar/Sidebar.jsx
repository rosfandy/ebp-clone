import { FaCheckToSlot, FaEnvelopeOpenText, FaGraduationCap, FaHouse, FaUsers } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { LinkSidebar } from "../Navigation/Link/LinkSidebar";

export const Sidebar = (props) => {
    const { user, isCollapsed, setIsCollapsed } = props;
    const { t } = useLaravelReactI18n();
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
        <>
            <div className={`lg:flex hidden flex-col min-h-screen flex-grow bg-[#142e4b] z-[1] shadow duration-500 fixed 
                ${isCollapsed ? 'xl:w-[5%] lg:w-[8%]' : ' xl:w-[11%] w-[18%]'}`}>
                <div className="flex flex-col gap-y-8">
                    <div className="collapse-menu p-4 w-full duration-500 relative">
                        <div id="element" className={`absolute right-0 transition-all duration-500 
                            ${isCollapsed ? 'left-1/2 transform -translate-x-1/2' : 'right-5'}`}>
                            <div className="text-white hover:text-primary text-lg px-2" >
                                <div id="menu-icon" onClick={() => setIsCollapsed(!isCollapsed)} className="text-[24px] cursor-pointer">
                                    <HiOutlineMenu />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col min-h-[85vh] justify-between mt-4">
                        <div className={`duration-200 flex flex-col px-6 ${isCollapsed ? 'gap-y-7' : 'gap-y-4'}`}>
                            {authorityAccess.map((link, index) => (
                                <LinkSidebar key={index} link={link} index={index} path={path} isCollapsed={isCollapsed} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}