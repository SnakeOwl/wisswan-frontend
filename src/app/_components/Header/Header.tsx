"use client"

import Logo from "@/app/_components/Logo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserButton from "./UserButton";
import GlobalMenu from "../GlobalMenu";
import GlobalMenuToggler from "../GlobalMenuToggler";
import { usePathname } from "next/navigation";


const Header = React.memo(() => {
    const [showGlobalMenu, setShowGlobalMenu] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        setShowGlobalMenu(false);
    }, [pathname]);


    return (
        <>
            {/** padding under header */}
            <div className="pt-[55px]"></div>
            <header className="fixed top-0 lg:w-max-[1280px] lg:w-[1280px] w-[calc(100%-1rem)] 
                border-b border-neutral-300 dark:border-neutral-800">
                <div className="grid grid-cols-2 pt-2 ">
                    <div className="flex items-center">
                        <div className="mr-2 flex h-full items-center">
                            <GlobalMenuToggler onClick={() => setShowGlobalMenu(!showGlobalMenu)} />
                        </div>

                        <Link
                            className="text-center h1"
                            href="/"
                        >
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex justify-end items-center">
                        <UserButton />
                    </div>
                </div>
            </header>

            {showGlobalMenu &&
                <GlobalMenu />
            }
        </>
    )
})


Header.displayName = "Header";

export default Header;