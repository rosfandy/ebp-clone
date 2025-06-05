import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState, useRef, useEffect } from "react";

export const TextInput = (props) => {
    const { t } = useLaravelReactI18n();
    const { title, name, placeholder, error, className = "", onChange = null, defaultValue = null } = props;
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue])

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange ? onChange(event.target.value) : null;
    };

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="flex flex-col w-full">
            {error && <span className="text-red-500 text-xs pb-2">{error}</span>}
            <div className="relative flex flex-col justify-center w-full rounded-xl py-2 px-4 cursor-text user-select-none focus-within:border-blue-500 border border-gray-300">
                <label htmlFor={name} className="text-xs text-gray-500">{title}</label>
                <input
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className={`p-0 w-full border-none focus:ring-0 focus:outline-none ${className}`}
                    placeholder={placeholder ? placeholder : t('Enter :name', { name: t(name) })}
                    ref={inputRef}
                />
            </div>
        </div>
    );
};