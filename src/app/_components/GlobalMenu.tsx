
import Image from "next/image";
import Link from "next/link";

export default function GlobalMenu() {
    return (
        <div className="fixed top-[77px] z-40 flex text-sm flex-col bg-white dark:bg-black/90 w-max-[1280px] w-[1280px] h-full">
            <div className={"flex lg:flex-row gap-4 pb-12"} >
                <div className="border-r border-gray-300 p-2">
                <Image src="/images/logo.png" alt="Логотип сайта" width={64} height={64} />

                </div>

                <nav className="flex flex-col gap-1">
                    <Link href={'/about'}>О проекте</Link>
                    <Link href={'/privacy'}>Политика обработки персональных данных</Link>
                </nav>
            </div>
        </div>
    )
}