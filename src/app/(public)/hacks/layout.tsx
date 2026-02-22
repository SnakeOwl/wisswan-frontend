import { Fetch } from "@/libs/Fetch"
import DomainsFilter from "./_components/DomainsFilter"

export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const filterDomainsResponse = await Fetch('feed/hacks-domains', Number(process.env.NEXT_PUBLIC_FETCH_CACHE_LONG));


    return (
        <div>
            <h1>Хаки по областям</h1>

            {Array.isArray(filterDomainsResponse) &&
                <section className="my-6 border dark:border-neutral-800 border-neutral-200 p-2 rounded-lg">
                    <h4 className="mb-2">Области применения</h4>

                    <DomainsFilter domains={filterDomainsResponse} />
                </section>
            }

            {children}
        </div>
    )
}