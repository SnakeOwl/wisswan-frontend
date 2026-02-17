import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react"
import MainMenu from "./_components/MainMenu";

export default async function Layout({
    children
}: {
    children: ReactNode
}) {
    const cookiesStorage = await cookies();

    // ==== Redirecting users without token

    if (!cookiesStorage.has("auth_token"))
        redirect('/login');

    // ---- Redirecting users without token


    return (
        <div className="flex flex-1">
            <div className="min-h-full w-[200px] 
                border-r dark:border-neutral-800 border-neutral-300 py-4">
                <MainMenu />
            </div>

            <div className="pl-4 pt-2 flex-1">
                {children}
            </div>
        </div>
    )

}