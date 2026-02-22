"use client"

import { Domain } from "@/types/Domain"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React from "react"

const DomainsFilterSOptions = React.memo(({
    className = '',
    domains
}: {
    className?: string
    domains: Domain[]
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();


    return (
        <div className={`flex flex-wrap gap-3  ${className}`}>
            {domains.map((domain) => {
                const domainIsUsed = searchParams.has('domains[]', domain.alias || String(domain.id));
                const soptions = new URLSearchParams(searchParams);
                if (!domainIsUsed) {
                    soptions.append('domains[]', domain.alias || String(domain.id));
                } else {
                    soptions.delete('domains[]', domain.alias || String(domain.id));
                }
                const link = `${pathname}?${soptions.toString()}`;


                return (
                    <Link key={domain.id}
                        href={link}
                        className={clsx("px-2 py-1 border border-neutral-200 dark:border-neutral-800 rounded-md", {
                            "text-neutral-500 hover:text-red-500 hover:border-red-500": domainIsUsed,
                            "hover:border-emerald-500 dark:hover:border-emerald-700 dark:hover:text-emerald-600 hover:text-emerald-500": !domainIsUsed
                        })}
                    >
                        {domain.name}
                    </Link>
                )
            })
            }
        </div>
    )
})


DomainsFilterSOptions.displayName = 'DomainsFilterSOptions';

export default DomainsFilterSOptions;