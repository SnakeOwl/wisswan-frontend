import { TableHTMLAttributes } from "react"

export default function Table(props: TableHTMLAttributes<HTMLTableElement>) {
    return (
        <table
            {...props}
            className={`w-full table-auto border-collapse ${props.className}`}
        >
        </table>
    )
}