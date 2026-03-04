import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        value: string | number
        title: string
    }[]
}


export default function Select({
    options,
    ...other
}: ISelect) {
    const name = other.name || other.id || undefined;



    return (
        <div className="relative">
            <select
                className="bg-white dark:bg-neutral-950 p-2 rounded w-full
                    border border-neutral-200 dark:border-neutral-800
                    focus:outline-0 appearance-none"
                name={name}
                {...other}
            >
                {options.map((option, index) => (
                    <option key={index}
                        value={option.value}
                    >
                        {option.title}
                    </option>
                ))
                }
            </select>

            { /* Кастомная иконка стрелки */}
            <div className="pointer-events-none absolute top-[50%] -translate-y-[50%] right-0 flex items-center px-2 text-white">
                <ChevronsUpDown className="h-5" />
            </div>
        </div>
    )
}