import { Fetch } from "@/libs/Fetch";
import { log } from "@/libs/Logging";
import { Hack } from "@/types/Hack";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import HackView from "./HackView";

export default async function HacksBlock() {

    const hacksResponse = await Fetch('feed/index-hacks');

    if (!Array.isArray(hacksResponse)) {
        log("Проблемы с получением хаков, hacksResponse: ", hacksResponse);
        return null;
    }


    return (
        <div>
            <h2 className="mb-2">Популярные хаки</h2>

            <div className="flex flex-col gap-4 mb-3">
                {hacksResponse.map((hack: Hack) => (
                    <HackView key={hack.id}
                        hack={hack} />
                ))
                }
            </div>


            <Link href={'/hacks'}
                className="flex items-center gap-2 border px-3 py-2 rounded-md border-neutral-300 dark:border-neutral-700 w-fit "
            >
                <span className="text-lg">
                    Все публичные хаки
                </span>

                <ChevronRight />
            </Link>
        </div>
    )
}