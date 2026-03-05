import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import HacksTable from "./_components/HacksTable";
import DomainsFilterSOptions from "./_components/DomainsFilterSOptions";
import { Get } from "@/libs/Fetch";
import getUser from "@/utils/getUser";
import { isAdmin } from "@/types/User";
import ShowAllRecordsFilter from "../../_components/filters/ShowAllRecordsFilter";


export const metadata: Metadata = {
    title: "Хаки",
    description: "Страница управления хаками"
}


export default async function Page(props: PageProps<'/dashboard/hacks'>) {
    const sparams = await props.searchParams;
    const page = sparams.page || 1;

    const usedDomains = await Get('user/get-used-domains-in-hacks');
    const user = await getUser();

    return (
        <main className="pb-4 pt-3">
            {isAdmin(user) &&
                <section className="mb-4">
                    <ShowAllRecordsFilter />
                </section>
            }

            {Array.isArray(usedDomains) &&
                <section className="mb-6">
                    <h3 className="mb-1">Фильтр по областям:</h3>

                    <DomainsFilterSOptions
                        domains={usedDomains}
                    />
                </section>
            }

            <nav className="flex gap-4 mb-4">
                <Link
                    className="flex gap-1 w-fit py-2 px-3 rounded-lg 
                        border dark:border-neutral-800 border-neutral-300"
                    href={'/dashboard/hacks/create'}
                >
                    <Plus />
                    Создать Хак
                </Link>
            </nav>

            <HacksTable
                page={Number(page)}
            />
        </main>
    )
}