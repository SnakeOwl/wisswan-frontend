"use client"

import Img from "@/app/_components/Img";
import ContextUser from "@/context/ContextUser";
import { useContext } from "react"

export default function MainMenuUser() {
    const { stateUser } = useContext(ContextUser);

    if (stateUser.authentication_status !== 'authorized')
        return null;

    return (
        <div className="flex gap-2 items-center">
            {stateUser.user?.avatar != null ?
                <Img
                    src={stateUser.user?.avatar}
                    alt="Аватар пользователя"
                    width={32}
                    height={32}
                    className="rounded-md"
                />
                :
                <div
                    className="rounded-md  w-[32px] h-[32px] uppercase border border-neutral-800 text-center flex items-center justify-center text-xl"
                >
                    {stateUser.user!.email[0]}
                </div>
            }

            <div className="text-lg font-bold">
                {stateUser.user?.email}
            </div>
        </div>
    )
}