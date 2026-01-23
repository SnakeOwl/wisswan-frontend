"use client"
import ContextUser from "@/context/ContextUser";
import Link from "next/link";
import React, { useContext } from "react";
import Img from "../Img";

const UserButton = React.memo(() => {

    const { stateUser } = useContext(ContextUser);

    if (stateUser.authentication_status == "unknown")
        return null;
    

    if (stateUser.authentication_status == "authorized")
        return (
            <div>
                <Link href={'dashboard'}>
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
                </Link>
            </div>
        );

    return (
        <div>
            <Link href="/login/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </Link>
        </div>
    )
});


UserButton.displayName = "UserButton";

export default UserButton;

