import { Metadata } from "next";
import UsersList from "./_components/UsersList";

export const metadata: Metadata = {
    title: "Пользователи"
}


export default async function Page() {
    return (
        <main>
            <UsersList />
        </main>
    )
}