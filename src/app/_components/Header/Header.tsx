import Logo from "@/app/_components/Logo";
import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";

const Header = React.memo(() => (
    <header>
        <div className="flex flex-wrap py-2">
            <div className="w-1/3"></div>

            <div className="w-1/3 text-center h1">
                <Link href="/">
                    <Logo />
                </Link>
            </div>

            <div className="w-1/3 flex flex-wrap items-center justify-center">
                <UserButton />
            </div>
        </div>
    </header>
))


Header.displayName = "Header";

export default Header;