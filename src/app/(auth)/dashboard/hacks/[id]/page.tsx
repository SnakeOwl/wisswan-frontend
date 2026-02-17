import { Get } from "@/libs/Fetch";
import { Hack } from "@/types/Hack";
import { Metadata } from "next";
import HackDashboard from "../_components/HackDashboard";


export const metadata: Metadata = {
    title: "Хаки: изменение"
}


export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params;

    const hackResponse: Hack | number = await Get(`user/hacks/${id}`);


    if (hackResponse == 403)
        return (
            <main>
                Недостаточно прав
            </main>
        );


    if (typeof hackResponse !== "number" && hackResponse.id == undefined)
        throw new Error(`Не смог получить хак. id: ${id}`);


    const hack: Hack = hackResponse as Hack;


    return (
        <main>
            <HackDashboard hack={hack} />
        </main>
    )
}