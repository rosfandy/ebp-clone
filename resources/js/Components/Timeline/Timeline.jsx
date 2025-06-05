import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaCheck } from "react-icons/fa6";

export const Timeline = (props) => {
    const { items, status } = props
    const { t } = useLaravelReactI18n();
    console.log(status)
    return (
        <>
            <div className="flex lg:flex-row flex-col">
                <div className="flex lg:flex-row flex-col lg:items-center">
                    {items.map((item, index) => (
                        <>
                            <div className="status lg:pt-[20px] flex lg:flex-col items-center gap-x-2 gap-y-2 z-[99] ">
                                <div className={`lg:ml-[-50px] lg:mt-0 mt-[-5px] flex justify-center items-center border-4 text-white border-white shadow-md lg:w-[60px] lg:h-[60px] w-[50px] h-[50px] rounded-[50%]
                                ${index < status - 1 || status == items.length ? 'bg-[#34b288]' : 'bg-gray-300'}
                                `}>
                                    <FaCheck className="text-lg" />
                                </div>
                                <div className="lg:ml-[-50px] text-sm">{t(item.name)}</div>
                            </div >
                            {
                                index < items.length - 1 &&
                                <div className={`lg:ml-[-50px] lg:mt-[-10px] ml-[17px] mt-[-5px] lg:h-[1rem] h-[8vh] xl:w-[200px] lg:w-[150px] w-[13px] lg:rounded-l-2xl lg:rounded-r-none lg:rounded-b-none rounded-t-md rounded-b-md
                                ${index < status - 1 ? 'bg-[#34b288]' : 'bg-gray-300'}
                                `}>
                                </div>
                            }
                        </>
                    ))}
                </div>
            </div >

        </>
    )
}