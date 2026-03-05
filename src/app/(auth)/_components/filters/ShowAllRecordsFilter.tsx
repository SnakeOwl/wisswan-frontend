"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"

export default function ShowAllRecordsFilter() {
    const pathname = usePathname();
    const searchParams = useSearchParams();


    let link = pathname;
    const newSparams = new URLSearchParams(searchParams);
    const filterIsUsing = newSparams.has('show_all_records');

    if (filterIsUsing) {
        newSparams.delete('show_all_records');
    } else {
        newSparams.append('show_all_records', '1');
    }


    return (
        <Link href={`${link}?${newSparams.toString()}`}
            className={clsx('py-1 px-2 border rounded', {
                'border-red-600 text-red-600': filterIsUsing,
                'border-emerald-600 text-emerald-600 hover:animate-pulse': !filterIsUsing,
            })}
        >
            Все записи
        </Link>
    )
}