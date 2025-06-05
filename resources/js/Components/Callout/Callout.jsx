import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaCircleInfo } from "react-icons/fa6";

export const Callout = (props) => {
    const { Icon, title, children } = props

    return (
        <div role="alert" className="alert">
            <div className="bg-gray-200 p-4 rounded-xl">
                <div className="flex items-center gap-x-4 ">
                    {Icon && Icon}
                    <div className="text-sm">{title}</div>
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    )
}