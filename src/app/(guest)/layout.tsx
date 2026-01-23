import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

export default async function Layout({
    children
}: {
    children: ReactNode
}) {
    const cookiesStorage = await cookies();

    // ==== Redirecting users without token
    
    if (cookiesStorage.has("auth_token"))
        redirect('/dashboard');

    // ---- Redirecting users without token


    return children
}