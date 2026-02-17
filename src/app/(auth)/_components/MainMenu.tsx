"use client"
import { usePathname } from "next/navigation";
import MainMenuUser from "./MainMenuUser";
import Link from "next/link";
import { Copy } from "lucide-react";
import clsx from "clsx";


export default function MainMenu() {
    const pathname = usePathname();


    const links: {
        title: string,
        link: string,
        icon: React.ReactNode
    }[] = [
            {
                title: "Хаки",
                link: "/dashboard/hacks",
                icon: <Copy />
            }
        ];


    return (
        <div className="flex flex-col justify-between min-h-full">
            <div className="flex-1">
                {links.map(link => (
                    <Link key={link.link}
                        href={link.link}
                        className={clsx("flex gap-2", {
                            "text-sky-400": pathname.includes(link.link)
                        })}
                    >
                        {link.icon}
                        {link.title}
                    </Link>
                ))}
            </div>

            <Link href={"/personal"}>
                <MainMenuUser />
            </Link>
        </div>
    )
}