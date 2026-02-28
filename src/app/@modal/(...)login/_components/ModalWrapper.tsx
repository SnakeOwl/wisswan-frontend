"use client"

import Modal from "@/app/_components/Modal"
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const hide = () => router.back();

    return (
        <Modal hide={hide}
            wrapperClick={hide}
        >
                <div className="relative bg-white dark:bg-neutral-950">
                    <X className="absolute right-4 top-4 cursor-pointer dark:hover:text-white w-fit h-fit z-50 hover:animate-pulse" />

                    {children}
                </div>
        </Modal>
    )
}