import { RefObject } from "react"

export interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: RefObject<HTMLTextAreaElement | null>
}

export default function Textarea({ className, ...other }: ITextarea) {
    const name = other.name ? other.name : other.id ? other.id : undefined;

    return (
        <textarea
            name={name}
            className={`
                border border-neutral-300 dark:border-neutral-800 focus:border-b-neutral-800 dark:focus:border-b-white
                duration-300 focus:outline-hidden dark:bg-black/50 dark:focus:bg-black
                ${className}`}

            {...other}
        />
    )
}