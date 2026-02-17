import { Metadata } from "next";
import HackForm from "../_components/HackForm";


export const metadata: Metadata = {
    title: "Хаки: создание"
}


export default async function Page() {
    return (
        <main>
            <HackForm />
        </main>
    )
}