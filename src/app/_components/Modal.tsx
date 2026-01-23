"use client"

import React, { useEffect } from "react"

export default function Modal({
    hide,
    wrapperClick,
    children,
    className = ""
}: {
    hide: () => void
    wrapperClick?: () => void
    children: React.ReactNode
    className?: string
}) {
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden"); // block scroll under Modal

        return () => {
            document.body.classList.toggle("overflow-hidden"); // block scroll under Modal
        };
    }, []);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape")
                hide();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    return (
        <div className={`absolute z-50 inset-0 flex items-center ${className}`}
            onClick={wrapperClick}
        >
            <div className="relative flex-1 bg-transparent">
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    {children}
                </div>
            </div>
        </div>
    )
}