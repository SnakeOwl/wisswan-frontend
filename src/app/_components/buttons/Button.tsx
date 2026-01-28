export default function Button({
    className,
    ...other
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`
                border border-neutral-300 dark:border-neutral-800 
                hover:border-neutral-800 dark:hover:border-neutral-100 
                duration-300 dark:bg-black/50
                not-disabled:cursor-pointer dark:disabled:text-neutral-500 disabled:text-neutral-500
                focus:outline-hidden 
                ${className}
                `}

            {...other}
            >
        </button>
    )
}