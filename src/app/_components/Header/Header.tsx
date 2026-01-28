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
            <div className="p-[32px]"></div>
            <header className="fixed top-0 w-max-[1280px] w-[1280px]">
                <div className="grid grid-cols-3 pt-4 ">
                    <div className="">
                        <GlobalMenuToggler onClick={() => setShowGlobalMenu(!showGlobalMenu)} />

                        <Link
                            className="ml-2 text-center h1"
                            href="/"
                        >
                            <Logo />
                        </Link>
                    </div>

                    <div></div>

                    <div className="flex justify-end">
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