"use client"

import Button from "@/app/_components/buttons/Button";
import ContextUser from "@/context/ContextUser"
import { deleteCookie } from "@/utils/deleteCookie";
import { redirect } from "next/navigation";
import { useContext } from "react"

export default function LogoutButton() {
    const { dispatchUser } = useContext(ContextUser);

    const logout = async () => {
        if (!confirm("Выйти из аккаунта?"))
            return null;


        await deleteCookie('auth_token');

        dispatchUser({
            type: "SET",
            authentication_status: "unauthorized",
            user: null
        });

        redirect('/');
    }

    return (
        <Button className="px-4 py-2 rounded-lg text-red-500 dark:text-red-700 hover:text-white hover:bg-red-500 dark:hover:bg-red-700"
            onClick={logout}
        >
            Выйти
        </Button>
    )
}