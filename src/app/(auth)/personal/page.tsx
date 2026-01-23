import Button from "@/app/_components/buttons/Button";
import { Metadata } from "next";
import LogoutButton from "./_component/LogoutButton";

export const metadata: Metadata = {
    title: "Личная информация"
}

export default async function Page() {
    return (
        <main>
            <LogoutButton />
        </main>
    )
}