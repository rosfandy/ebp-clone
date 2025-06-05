import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { IoLogOutOutline, IoSettingsOutline, IoTriangle } from "react-icons/io5";
import './style.css'
import { DropdownBox } from "./Partials/DropdownBox";
import { DropdownList } from "./Partials/DropdownList";

export const ProfileDropdown = (props) => {
    const { user } = props;
    const [isDropdown, setIsDropdown] = useState(false);
    const profileRef = useRef(null);
    const { t } = useLaravelReactI18n();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

    return (
        <div ref={profileRef} className="relative">
            <div onClick={() => setIsDropdown(!isDropdown)} className="cursor-pointer px-4">
                {user.picture ?
                    <img src={user.picture} className="h-8 w-8 rounded-full" alt="" /> :
                    <FaUserCircle className="text-blue-500" size={30} />
                }
            </div>
            <DropdownBox show={isDropdown} title={user.name} description={user.email}>
                <DropdownList href="https://portal.its.ac.id/akun">
                    <IoSettingsOutline size={18} />
                    <span>{t(t(`:name, Profile`, { name: 'myITS SSO' }))}</span>
                </DropdownList>
                <DropdownList href="/auth/logout">
                    <IoLogOutOutline size={18} />
                    <span>{t('Logout')}</span>
                </DropdownList>
            </DropdownBox>
        </div >
    );
};