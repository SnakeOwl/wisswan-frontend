import clsx from "clsx";


export interface IButtonStyled extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "default" | "red" | "red-reversed" | "emerald-reversed"
}


export default function ButtonStyled({
    className = '',
    theme = "default",
    ...other
}: IButtonStyled) {
    return (
        <button
            className={clsx(`border focus:outline-hidden not-disabled:cursor-pointer duration-300
                ${className}`, {
                "text-white hover:text-red-500 bg-red-500 dark:bg-red-600 border-red-700 dark:border-red-700 hover:bg-white dark:hover:bg-neutral-950": theme == "red",
                "hover:text-white text-red-500 hover:bg-red-500 dark:hover:bg-red-600 border-red-700 dark:border-red-700 bg-white dark:bg-neutral-950": theme == "red-reversed",
                "hover:text-white text-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600 border-emerald-400 dark:border-emerald-700 bg-white dark:bg-neutral-950": theme == "emerald-reversed",
            })}

            {...other}
        >
        </button>
    )
}