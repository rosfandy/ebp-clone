import { Link } from "@inertiajs/react";
import { Button } from "../Button/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useLaravelReactI18n } from "laravel-react-i18n";

export const TablePagination = ({ pagination, handleFilter }) => {
    const { t } = useLaravelReactI18n();

    const handleClick = (page) => {
        handleFilter({ page });
    };

    return (
        <>
            <div className="flex justify-between items-center text-gray-500">
                <div id='page-title' className={`text-sm flex items-center gap-x-1`}>
                    <span>{t('words.Pages')}</span>
                    <span className="text-blue-500 font-bold">{`${pagination && pagination.current_page}`}</span>
                    <span>{t('words.Of')}</span>
                    <span>{`${pagination.last_page}`}</span>
                </div>
                <div className="flex items-center gap-x-2 ml-auto">
                    <button onClick={() => handleClick(pagination.current_page - 1)} >
                        <Button
                            Icon={<FaChevronLeft />}
                            size="small"
                            variant={"outline"}
                            className="md:text-sm md:px-4 text-[10px]"
                            disabled={pagination.current_page === 1}
                        />
                    </button>
                    <button onClick={() => handleClick(pagination.current_page + 1)} >
                        <Button
                            Icon={<FaChevronRight />}
                            IconPosition="right"
                            size="small"
                            variant={"outline"}
                            className={`md:text-sm md:px-4 text-[10px]`}
                            disabled={pagination.current_page === pagination.last_page}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};