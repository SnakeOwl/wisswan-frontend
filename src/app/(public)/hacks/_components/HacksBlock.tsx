import { Fetch } from "@/libs/Fetch"
import { log } from "@/libs/Logging";
import { Hack } from "@/types/Hack";
import HackView from "../../_components/HackView";

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
    hacksRequest.total;


    return (
        <div>
            {hacks.map((hack: Hack) => (
                <HackView key={hack.id}
                    hack={hack}
                    className="mb-4"
                />
            ))}
        </div>
    )
}