import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import HacksTable from "./_components/HacksTable";
import { Suspense } from "react";
import { SkeletonTable } from "@/app/_components/Skeletons/SkeletonTable";


export const metadata: Metadata = {
    title: "Хаки",
    description: "Страница управления хаками"
}


export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const sparams = await searchParams;
    const page = sparams.page || 1;

    const soptions = new URLSearchParams({ page: String(page) });


    return (
        <main className="pb-4">
            <nav className="flex gap-4 mb-4">
                <Link
                    className="flex gap-1 w-fit py-2 px-3 rounded-lg 
                        border dark:border-neutral-800 border-neutral-300"
                    href={'/dashboard/hacks/create'}
                >
                    <Plus />
                    Добавить
                </Link>
            </nav>

            <Suspense fallback={<SkeletonTable />}>
                <HacksTable
                    page={Number(page)}
                    soptions={soptions}
                />
            </Suspense>
        </main>
    )
}