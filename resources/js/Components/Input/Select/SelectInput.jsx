import { useState, useRef, useEffect } from "react";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";


export const SelectInput = (props) => {
    const { t } = useLaravelReactI18n();
    const {
        datas,
        title,
        useLocale = null,
        onChange = null,
        name,
        disabled,
        error,
        placeholder = t('Select an option'),
        useCode = false,
        defaultValue = null,
        className
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (data) => {
        if (!disabled) {
            setSelectedOption(data);
            setIsOpen(false);
            onChange ? onChange(data.id) : null;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        if (defaultValue) {
            const selectedData = datas.find((item) => item.id == defaultValue)
            setSelectedOption(selectedData);
        }
    }, [defaultValue]);

    const containerClass = classNames(`relative w-full cursor-pointer user-select-none ${className}`, {
        'opacity-50 cursor-not-allowed': disabled
    });
    const selectInputClass = classNames('flex flex-col justify-center border duration-200 hover:border-blue-500 rounded-xl py-2 px-4 ', {
        'border-blue-500': isOpen,
        'border-gray-300': !isOpen,
        'bg-gray-200': disabled
    });
    const dropdownClass = classNames('absolute z-[99] w-full bg-white border rounded-xl shadow-lg max-h-[30vh] overflow-auto');

    return (
        <div id="container" className={containerClass} ref={dropdownRef}>
            {error && <span className="text-red-500 text-xs">{error}</span>}
            <input type="text" hidden value={selectedOption ? selectedOption.id : ''} name={name} readOnly />
            <div id="selectInput" className={selectInputClass} onClick={handleToggleDropdown}>
                {title && <span className="text-xs text-gray-500">{title}</span>}
                <div className="flex items-center justify-between text-sm">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {selectedOption ?
                            (useLocale ? t(`${capitalizeFirstLetter(selectedOption.name.toLowerCase())}`) : capitalizeFirstLetter(selectedOption.name))
                            : placeholder}
                    </div>
                    <div className=""><FaChevronDown /></div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        id="dropdown"
                        className={dropdownClass}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                    >
                        {datas && datas.length > 0 ? datas.map((data) => (
                            <li
                                key={data.id}
                                className="py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer border-b"
                                onClick={() => handleOptionClick(data)}
                            >
                                <div className="px-4 flex items-center gap-x-2">
                                    {useCode &&
                                        <>
                                            <div className="flex items-center gap-x-1">
                                                <span className="">{" [ "}</span>
                                                <span className="w-[3em] text-center">{data.code}</span>
                                                <span className="">{" ] "}</span>
                                            </div>
                                            <div className="">{" - "}</div>
                                        </>
                                    }
                                    <span>
                                        {useLocale ? t(`${capitalizeFirstLetter(data.name.toLowerCase())}`) : capitalizeFirstLetter(data.name.toLowerCase())}
                                    </span>
                                </div>
                            </li>
                        )) :
                            <li className="p-2 text-gray-500">
                                {t('No data found')}
                            </li>}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};