import { capitalizeFirstLetter } from "@/Utils/utils"
import { Link } from "@inertiajs/react"
import { useLaravelReactI18n } from "laravel-react-i18n"
import { FaChevronRight, FaHouse } from "react-icons/fa6"

export const DashboardBreadcrumb = (props) => {
    const { navigation } = props
    const { t } = useLaravelReactI18n();
    const items = navigation[0].split('/')
    items.shift()

    return (
        <>
            <div id="breadcrumb" className="text-sm text">
                <div className="flex items-center gap-x-3">
                    <Link href={'/dashboard'} className="text-gray-500 hover:text-blue-500 cursor-pointer text-[20px]">
                        <FaHouse />
                    </Link>
                    <FaChevronRight className="text-xs text-gray-500" />
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-x-3">
                            {index < items.length - 1 ? (
                                <>
                                    <Link href={`/${item}`} className="text-gray-500 hover:text-blue-500 cursor-pointer transition-all">
                                        {t(`${capitalizeFirstLetter(item.split('/').pop())}`)}
                                    </Link>
                                    <FaChevronRight className="text-xs text-gray-500" />
                                </>
                            ) : (
                                <div className="text-gray-500">
                                    {t(`${capitalizeFirstLetter(item.split('/').pop())}`)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}