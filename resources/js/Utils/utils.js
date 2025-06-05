import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string) {
    if (!string) return string;
    const lowerCaseString = string.toLocaleLowerCase();

    return lowerCaseString
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}