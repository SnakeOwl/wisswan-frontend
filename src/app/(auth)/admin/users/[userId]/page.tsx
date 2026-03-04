import UserForm from "@/app/(auth)/_components/UserForm";
import { Get } from "@/libs/Fetch";

export default async function Page({
    params
}: PageProps<'/admin/users/[userId]'>) {
    const userId = (await params).userId;

    const user = await Get(`admin/users/${userId}`);


    return (
        <main>
            <UserForm initialUser={user} />
        </main>
    )
}