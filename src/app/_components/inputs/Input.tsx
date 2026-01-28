import { RefObject } from "react"

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: RefObject<HTMLInputElement | null>
}

export default function Input({className, ...other}: IInput){
    return (
        <input 
            maxLength={255}
            type="text"
            className={`
                border border-neutral-300 dark:border-neutral-800 focus:border-b-neutral-800 dark:focus:border-b-white
                duration-300 focus:outline-hidden dark:bg-black/50 dark:focus:bg-black
                ${className}`}

            {...other}
        />
    )
}