"use client"

import LoginFormWrapper from "@/app/(guest)/login/_components/LoginFormWrapper";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathname = usePathname();

    // if (pathname != "login")
    //     return null;


    return (
        <main className="p-4 border border-neutral-800 rounded-xl relative h-full flex flex-col items-center justify-around"
            onClick={e => e.stopPropagation()}
        >
            <div className="w-full lg:w-[400px] flex flex-col gap-4">
                <h1>Вход</h1>

                <LoginFormWrapper />

                <p className="text-sm">
                    Отправляя форму, вы&nbsp;даёте своё согласие на&nbsp;обработку ваших персональных данных.
                </p>
            </div>
        </main>
    )
}
