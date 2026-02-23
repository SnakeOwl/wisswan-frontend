"use client"

import { Copy } from "lucide-react";
import DOMPurify from 'isomorphic-dompurify';
import { useRef } from "react";
import { Post } from "@/libs/Fetch";

export default function EditorjsHackView({
    JSONContext,
    hackId
}: {
    JSONContext: string
    hackId: number
}) {
    // take only pharagraphs

    const valueContainer = useRef<HTMLDivElement>(null);
    const copyButton = useRef<HTMLDivElement>(null);

    const value = JSON.parse(JSONContext);

    if (!value || value?.blocks == undefined || value.blocks.length == 0)
        return null; // can't read JSON object


    function decodeHtml(html: string) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }


    const blocks = value.blocks;
    const blocksValues = blocks.map((block: any) => block.data.text);

    const copyClick = () => {
        copyButton.current?.classList.toggle('!text-emerald-500')
        const decodedValues = blocksValues.map((val: string) => decodeHtml(val));
        const copiedText = decodedValues.join('\n');

        navigator.clipboard.writeText(copiedText);

        Post(`hacks/rating-inc/${hackId}`);

        setTimeout(() => {
            copyButton.current?.classList.toggle('!text-emerald-500')
        }, 1500)
    }


    return (
        <div className="relative p-2 min-h-[44px] dark:bg-neutral-950 rounded-md
            border border-neutral-200 dark:border-neutral-800
        "
            onClick={e => e.stopPropagation()}
        >
            <div ref={copyButton}
                className="absolute top-3 right-3 cursor-pointer hover:text-sky-400"
                onClick={copyClick}
            >
                <Copy />
            </div>

            <div ref={valueContainer}>
                {blocks.map((block: any) => (
                    <div key={block.id}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) + '<br class="explicit-break" />' }}
                    />
                ))}
            </div>
        </div>
    )
}