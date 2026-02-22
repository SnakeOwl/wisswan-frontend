"use client"
import EditorjsHackView from "@/app/_components/Editorjs/EditorjsHackView"
import { Hack } from "@/types/Hack"


export default function HackView({
    hack,
    className = '',
    onClick,
}: {
    hack: Hack
    className?: string
    onClick?: () => void
}) {
    return (
        <div key={hack.id}
            className={`rounded-lg border dark:border-neutral-800 border-neutral-200 p-2 ${className}`}
            onClick={onClick}
        >
            <div className="text-lg mb-2">
                {hack.title}
            </div>

            {hack.domains && hack.domains.length > 0 &&
                <div className="mb-2 flex flex-wrap gap-3">
                    {hack.domains.map(domain => (
                        <div key={domain.id}
                            className="px-2 py-1 border border-neutral-200 dark:border-neutral-800 rounded-md"
                        >
                            {domain.name}
                        </div>
                    ))
                    }
                </div>
            }


            <EditorjsHackView
                JSONContext={hack.value || ''}
                hackId={hack.id}
            />
        </div>
    )
}