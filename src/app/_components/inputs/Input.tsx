import { RefObject } from "react"

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: RefObject<HTMLInputElement | null>
}

export default function Input({ className, ...other }: IInput) {
    const name = other.name ? other.name : other.id ? other.id : undefined;

    return (
        <input
            maxLength={255}
            type="text"
            name={name}
            className={`
                border border-neutral-300 dark:border-neutral-800 focus:border-b-neutral-800 dark:focus:border-b-white
                duration-300 focus:outline-hidden dark:bg-black/50 dark:focus:bg-black
                disabled:text-neutral-500
                ${className}`}

            {...other}
        />
    )
}