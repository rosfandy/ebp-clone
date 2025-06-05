import { cn } from "@/Utils/utils";
import { cva } from "class-variance-authority";
import classNames from "classnames";

export const Button = (props) => {
    const { Icon, IconPosition = 'left', label, variant, size, className, onClick, disabled = false } = props;

    const Variants = cva(
        "font-semibold rounded-lg transition-all",
        {
            variants: {
                variant: {
                    primary: "bg-[#3b82f6] hover:bg-blue-700 text-white text-sm",
                    secondary: "bg-white text-[#3b82f6] text-sm",
                    outline: "border hover:bg-blue-500 hover:text-white border-[#3b82f6] text-[#3b82f6] text-sm",
                    success: "bg-green-500 hover:bg-green-600 text-white text-sm",
                    danger: "bg-red-500 hover:bg-red-600 text-white text-sm",
                    warning: "bg-yellow-500 hover:bg-yellow-600 text-white text-sm",
                    slate: "bg-gray-300 hover:bg-gray-400 hover:text-white text-gray-500 text-sm",
                },
                size: {
                    small: "text-xs py-4 px-4",
                    medium: "text-base py-4 px-10",
                    large: "text-base py-5 px-14",
                }
            },
            defaultVariants: {
                variant: "primary",
                size: "medium",
            },
        }
    );

    const IconClass = classNames('flex items-center gap-x-2 justify-center', {
        'flex-row-reverse': IconPosition === 'right',
    })

    return (
        <button
            onClick={disabled ? undefined : onClick}
            className={cn(Variants({ variant, size }), className, {
                'opacity-50 cursor-not-allowed': disabled,
            })}
            disabled={disabled}
        >
            <div className={IconClass}>
                {Icon && Icon}
                {label}
            </div>
        </button>
    );
}