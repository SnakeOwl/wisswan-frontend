"use client"

import TableTheadTr from "@/app/_components/tables/TableTheadTr";
import { Hack } from "@/types/Hack"
import { useEffect, useRef, useState } from "react"
import HackRow from "./HackRow";
import { Get } from "@/libs/Fetch";
import Pagination from "@/app/_components/Paginations/Pagination";


export default function HacksTable({
    page,
    soptions,
}: {
    page: number,
    soptions: URLSearchParams
}) {
    const [hacks, setHacks] = useState<Hack[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const perPageRef = useRef<number>(1);


    useEffect(() => {
        const sparams = new URLSearchParams(soptions);
        
        // FIX: must to get Hacks in useEffect on client side. Otherwise it will cache on SSR.
        Get(`user/hacks?${sparams.toString()}`).then((hacksPaginate) => {
            if (hacksPaginate === false)
                throw new Error("Запрос на хаки оборавался");
            

            perPageRef.current = hacksPaginate.per_page;
            setTotalPages(hacksPaginate.last_page)
            setHacks(hacksPaginate.data); // user's Hacks
        });
    }, [page]);


    return (
        <div className="grid gap-4">
            <div className="w-full flex flex-col gap-6 ">
                    {hacks.map((hack: Hack) => (
                        <HackRow key={hack.id}
                            hack={hack}
                        />
                    ))
                    }

            </div>
                

            {totalPages > 1 &&
                <Pagination page={Number(page)} totalPages={totalPages} />
            }
        </div>
    )
}