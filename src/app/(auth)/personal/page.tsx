import { Metadata } from "next";
import LogoutButton from "./_component/LogoutButton";
import getUser from "@/utils/getUser";
import UserForm from "../_components/UserForm";
import { log } from "@/libs/Logging";
import getCookie from "@/utils/getCookie";

export const metadata: Metadata = {
    title: "Личная информация"
}

export default async function Page() {
    const user = await getUser();

    if (user == null) {
        log("Не смог получить пользователя, token:" + await getCookie('auth_token'));
        throw new Error("Не смог получить пользователя, token:");
    }


    return (
        <main>
            <section className="mb-4">
                <UserForm initialUser={user} />
            </section>



            <LogoutButton />
        </main>
    )
}