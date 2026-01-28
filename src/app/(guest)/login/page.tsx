import Link from "next/link";
import LoginFormWrapper from "./_components/LoginFormWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Вход",
    description: "Форма входа"
}


export default async function Page() {
    return (
        <main className="flex-1 flex flex-col items-center justify-around">
            <div className="w-full lg:w-[400px] flex flex-col gap-4">
                <h1>Вход</h1>

                <LoginFormWrapper />

                <p className="text-sm">
                    Отправляя форму, вы&nbsp;даёте своё согласие на&nbsp;<Link href="/privacy">обработку ваших персональных данных</Link>.
                </p>
            </div>
        </main>
    )
}