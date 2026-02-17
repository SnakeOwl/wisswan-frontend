import { HTMLAttributes } from "react";

export default function TableTheadTr(props: HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr
            {...props}
            className={`text-lg border-b dark:border-neutral-800 border-neutral-300 ${props.className}`}
        >
        </tr>
    )
}