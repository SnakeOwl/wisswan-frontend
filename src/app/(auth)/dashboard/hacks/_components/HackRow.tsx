"use client"

import { Hack } from "@/types/Hack";
import { useRouter } from "next/navigation";
import EditorjsHackView from "@/app/_components/Editorjs/EditorjsHackView";

export default function HackRow({
    hack
}: {
    hack: Hack
}) {
    const router = useRouter();


    return (
        <div className="text-lg cursor-pointer border dark:border-neutral-800 border-neutral-200 rounded-md p-2"
            onClick={() => router.push(`/dashboard/hacks/${hack.id}`)}
        >

            <div className="flex flex-col gap-3">
                {hack.title}

                <div onClick={e => e.stopPropagation()}
                    className="cursor-default"
                >
                    <EditorjsHackView JSONContext={hack.value || ""} />
                </div>
            </div>
        </div>
    )
}