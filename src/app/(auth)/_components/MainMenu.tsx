"use client"
import { usePathname } from "next/navigation";
import MainMenuUser from "./MainMenuUser";
import Link from "next/link";

export default function MainMenu() {
    const pathname = usePathname();


    const links: { title: string, link: string }[] = [
        {
            title: "Хаки",
            link: "/dashboard/hacks"
        }
    ]

    return (
        <div className="flex flex-col justify-between min-h-full px-4 pb-4">
            <div className="flex-1">
                {links.map(link => (
                    <Link key={link.link} href={link.link}>
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