import { Link } from "@inertiajs/react"

export const LinkSidebar = (props) => {
    const { link, index, path, isCollapsed } = props;
    return (
        <>
            <Link key={index} href={link.href} className={`relative group ${path.includes(link.href) ? 'text-white' : 'text-[#687b95]'}`}>
                <div className={`flex gap-x-2 items-center cursor-pointer text-[20px] w-full hover:text-white`}>
                    <div className={`transition-all duration-500 flex justify-center items-center 
                    ${isCollapsed ? 'scale-[1.3] ml-[12%]' : ''}`}>
                        {link.icon}
                    </div>
                    <div className="overflow-hidden">
                        <span className={`transition-all duration-500 text-sm
                        ${isCollapsed ? 'ml-[-500%] opacity-0' : 'opacity-100'}`}>
                            {link.label}
                        </span>
                    </div>
                </div>
                {isCollapsed && (
                    <div aria-label={link.label} className="absolute left-full transform -translate-y-1/2 top-3 text-center backdrop-blur-sm shadow
                        bg-gray-700 text-white text-xs rounded py-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {link.label}
                    </div>
                )}
            </Link>
        </>
    )
}