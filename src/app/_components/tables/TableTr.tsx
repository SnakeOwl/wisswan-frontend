import { HTMLAttributes } from "react";

export default function TableTr(props: HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr
            {...props}

            className={`even:bg-neutral-100 dakr:even:bg-neutral-300/50 dark:even:bg-neutral-800/50 dark:hover:bg-neutral-950
                        border-b dark:border-neutral-800 border-neutral-300 hover:border-neutral-800 dark:hover:border-neutral-300
                        duration-300
                        ${props.className}
                    `}
        >
        </tr>
    )
}