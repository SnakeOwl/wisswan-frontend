"use client"

import clsx from "clsx";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Pagination({
    page,
    totalPages
}: {
    page: number,
    totalPages: number
}) {
    const pathname = usePathname();
    const disableLeftArrow = page < 2;
    const disableRightArrow = page >= totalPages;
    const showNextPage = page + 1 < totalPages;
    const showLeftDots = page > 2;
    const showRightDots = showNextPage;
    const showFirstPage = page > 1;
    const showLastPage = page < totalPages;


    return (
        <div className="w-full flex gap-2 justify-center  items-center">
            <Link href={`${pathname}?page=${page - 1}`}
                className={clsx("border border-neutral-200 dark:border-neutral-800 rounded-sm", {
                    "pointer-events-none text-neutral-500": disableLeftArrow
                })}
            >
                <div className="p-1">
                    <ChevronLeft />
                </div>
            </Link>


            {showFirstPage &&
                <Link href={`${pathname}?page=1`}
                    className="border border-neutral-200 dark:border-neutral-800 rounded-sm min-w-[32px] text-center"
                >
                    <div className="p-1">
                        1
                    </div>
                </Link>
            }


            {showLeftDots &&
                <div className="min-w-[32px] text-center p-1">
                    <Ellipsis />
                </div>
            }


            <Link href="#" className="pointer-events-none text-neutral-500 border border-neutral-200 dark:border-neutral-800 rounded-sm min-w-[32px] text-center">
                <div className="p-1">
                    {page}
                </div>
            </Link>


            {showRightDots &&
                <div className="min-w-[32px] text-center p-1">
                    <Ellipsis />
                </div>
            }


            {showLastPage &&
                <Link href={`${pathname}?page=${totalPages}`}
                    className="border border-neutral-200 dark:border-neutral-800 rounded-sm min-w-[32px] text-center"
                >
                    <div className="p-1">
                        {totalPages}
                    </div>
                </Link>
            }


            <Link href={`${pathname}?page=${page + 1}`}
                className={clsx("border border-neutral-200 dark:border-neutral-800 rounded-sm", {
                    "pointer-events-none text-neutral-500": disableRightArrow
                })}
            >
                <div className="p-1">
                    <ChevronRight />
                </div>
            </Link>
        </div>
    )
}