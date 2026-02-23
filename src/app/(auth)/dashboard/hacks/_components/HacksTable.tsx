"use client"

import { Hack } from "@/types/Hack"
import { useEffect, useRef, useState } from "react"
import { Get } from "@/libs/Fetch";
import Pagination from "@/app/_components/Paginations/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import HackView from "@/app/(public)/_components/HackView";


export default function HacksTable({
    page,
}: {
    page: number,
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [hacks, setHacks] = useState<Hack[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const perPageRef = useRef<number>(1);


    useEffect(() => {
        const sparams = new URLSearchParams(searchParams);

        // FIX: must to get Hacks in useEffect on client side. Otherwise it will cache on SSR.
        Get(`user/hacks?${sparams.toString()}`).then((hacksPaginate) => {
            if (hacksPaginate === false)
                throw new Error("Запрос на хаки оборавался");


            perPageRef.current = hacksPaginate.per_page;
            setTotalPages(hacksPaginate.last_page);
            setHacks(hacksPaginate.data); // user's Hacks
        });
    }, [page, searchParams]);


    return (
        <div className="grid gap-4">
            <div className="w-full flex flex-col gap-6 ">
                {hacks.map((hack: Hack) => (
                    <HackView key={hack.id}
                        hack={hack}
                        onClick={() => router.push(`/dashboard/hacks/${hack.id}`)}
                    />
                ))
                }
            </div>


            {totalPages > 1 &&
                <Pagination totalPages={totalPages} />
            }
        </div>
    )
}