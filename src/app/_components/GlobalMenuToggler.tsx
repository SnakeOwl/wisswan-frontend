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
        line1Ref.current?.classList.toggle('top-[10px]');
        line1Ref.current?.classList.toggle('top-[4px]');

        line2Ref.current?.classList.toggle('rotate-[45deg]');

        line3Ref.current?.classList.toggle('rotate-[-45deg]');
        line3Ref.current?.classList.toggle('top-[16px]');
        line3Ref.current?.classList.toggle('top-[10px]');

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
        <button className="relative w-[24px] h-[24px] p-[2px] cursor-pointer"
            onClick={click}
        >
            <div
                ref={line1Ref}
                className="bg-white absolute top-[4px] w-[18px] h-[2px] max-h-4 duration-300"
            ></div>
            <div
                ref={line2Ref}
                className="bg-white absolute top-[10px] w-[18px] h-[2px] max-h-4 duration-300"
            ></div>
            <div
                ref={line3Ref}
                className="bg-white absolute top-[16px] w-[18px] h-[2px] max-h-4 duration-300"
            ></div>
        </button>
    )
}