import { isAdmin } from "@/types/User";
import getUser from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const user = await getUser();

    if (!isAdmin(user))
        redirect('/dashboard');


    return children;
}