"use client"

import { Domain } from "@/types/Domain";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function DomainsFilter({
    className,
    domains
}: {
    className?: string
    domains: Domain[]
}) {
    const pathname = usePathname();


    return (
        <div className="flex flex-wrap gap-3">
            {domains.map(el => {
                const pathsegments = pathname.split('/');
                const alias = el.alias || String(el.id);
                const aliasIndex = pathsegments.findIndex(el => el == alias);
                let domainUsed: boolean = false;
                if (aliasIndex == -1) {
                    pathsegments.push(alias);
                } else {
                    domainUsed = true;
                    pathsegments.splice(aliasIndex, 1);
                }

                const link = pathsegments.join('/');

                
                return (
                    <Link key={el.id}
                        href={link}
                        className={clsx("px-2 py-1 border border-neutral-200 dark:border-neutral-800 rounded-md", {
                            "text-neutral-500 hover:text-red-500 hover:border-red-500": domainUsed,
                            "hover:border-emerald-500 dark:hover:border-emerald-700 dark:hover:text-emerald-600 hover:text-emerald-500": !domainUsed
                        })}
                    >
                        {el.name}
                    </Link>
                )
            })
            }
        </div>
    )
}