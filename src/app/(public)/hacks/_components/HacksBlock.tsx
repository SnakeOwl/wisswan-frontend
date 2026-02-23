import { Fetch } from "@/libs/Fetch"
import { log } from "@/libs/Logging";
import { Hack } from "@/types/Hack";
import HackView from "../../_components/HackView";
import Pagination from "@/app/_components/Paginations/Pagination";

export default async function HacksBlock({
    filters
}: {
    filters: URLSearchParams
}) {
    const soptions = new URLSearchParams(filters);

    const hacksRequest = await Fetch(`feed/hacks?${soptions.toString()}`);


    if (hacksRequest.data == undefined || !Array.isArray(hacksRequest.data)) {
        await log(`Не смог получить хаки, soptions: ${soptions.toString()}`)
        throw new Error("Произошла техническая ошибка. На её исправление мы направили самого талантливого разараба!");
    }


    const hacks = hacksRequest.data;
    const pages = hacksRequest.last_page;


    return (
        <div>
            {hacks.map((hack: Hack) => (
                <HackView key={hack.id}
                    hack={hack}
                    className="mb-4"
                />
            ))}


            {pages > 1 &&
                <Pagination
                    totalPages={pages}
                />
            }
        </div>
    )
}