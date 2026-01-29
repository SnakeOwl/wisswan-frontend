
import Link from "next/link";

export default function GlobalMenu() {
    return (
        <div className="fixed top-[60px] z-40 flex  flex-col bg-white dark:bg-black/90 w-max-[1280px] w-[1280px] h-full">
            <div className={"flex flex-col lg:flex-row gap-4 pb-12"} >
                <nav className="flex flex-col gap-1">
                    <Link href={'/about'}>О проекте</Link>
                    <Link href={'/privacy'}>Политика обработки персональных данных</Link>
                </nav>
            </div>
        </div>
    )
}