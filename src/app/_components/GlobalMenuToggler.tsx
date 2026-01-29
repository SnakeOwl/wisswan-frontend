"use client"

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function GlobalMenuToggler({
    onClick
}: {
    onClick: () => void
}) {
    const pathname = usePathname();

    const line1Ref = useRef<HTMLDivElement>(null)
    const line2Ref = useRef<HTMLDivElement>(null)
    const line3Ref = useRef<HTMLDivElement>(null)
    const isClosedRed = useRef<boolean>(true);


    const animation = () => {
        line1Ref.current?.classList.toggle('rotate-[45deg]');
        line1Ref.current?.classList.toggle('top-[11px]');
        line1Ref.current?.classList.toggle('top-[5px]');

        line2Ref.current?.classList.toggle('rotate-[45deg]');

        line3Ref.current?.classList.toggle('rotate-[-45deg]');
        line3Ref.current?.classList.toggle('top-[17px]');
        line3Ref.current?.classList.toggle('top-[11px]');

        isClosedRed.current = !isClosedRed.current;
    }


    useEffect(() => {
        if (!isClosedRed.current) {
            animation();
        }
    }, [pathname])


    const click = () => {
        animation();

        onClick();
    }



    return (
        <button className="relative w-[24px] h-[24px] p-[3px] cursor-pointer"
            onClick={click}
        >
            <div
                ref={line1Ref}
                className="bg-neutral-800 dark:bg-white absolute top-[5px] w-[18px] h-[2px] max-h-4 duration-300"
            ></div>
            <div
                ref={line2Ref}
                className="bg-neutral-800 dark:bg-white absolute top-[11px] w-[18px] h-[2px] max-h-4 duration-300"
            ></div>
            <div
                ref={line3Ref}
                className="bg-neutral-800 dark:bg-white absolute top-[17px] w-[18px] h-[2px] max-h-4 duration-300"
            ></div>
        </button>
    )
}