import { DashboardBreadcrumb } from "@/Components/Breadcrumb/DashboardBreadcrumb";
import { DashboardNavbar } from "@/Components/Navigation/Navbar/DashboardNavbar";
import { Sidebar } from "@/Components/Sidebar/Sidebar";
import { toggleSidebar } from "@/Store/SidebarSlice";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { Head } from "@inertiajs/react";
import classNames from "classnames";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const DashboardLayout = (props) => {
    const { user, children } = props;
    const dispatch = useDispatch();
    const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
    const path = window.location.pathname;
    const { t } = useLaravelReactI18n();

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) toast.success(t(flash.success));
        if (flash.error) toast.error(t(flash.error));
    }, [flash]);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const collapsedClass = classNames('duration-500 w-0', {
        'xl:w-[5%] lg:w-[8%] overflow-auto': isCollapsed,
        'xl:w-[11%] lg:w-[18%] overflow-auto': !isCollapsed
    })


    const contentClass = classNames('duration-500', {
        'xl:w-[95%] lg:w-[92%] w-full': isCollapsed,
        'xl:w-[89%] lg:w-[82%] w-full': !isCollapsed
    })


    return (
        <div className="flex bg-slate-50 min-h-screen bggre">
            <Head title={t(`${capitalizeFirstLetter(path.split('/').pop())}`)} />
            <div id="sidebar" className={collapsedClass}>
                <Sidebar user={user} isCollapsed={isCollapsed} setIsCollapsed={handleToggleSidebar} />
            </div>
            <div className={contentClass}>
                <DashboardNavbar user={user} />
                <div id="content" className="md:p-8 p-4">
                    <DashboardBreadcrumb navigation={[path]} />
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}