"use client"

import MultiSwitcher from "@/app/_components/inputs/MultiSwitcher";
import { useState } from "react"
import HackForm from "./HackForm";
import { Hack } from "@/types/Hack";
import HackAdvancedForm from "./HackAdvancedForm";


export default function HackDashboard({
    hack = null
}: {
    hack?: Hack | null
}) {
    const multiSwitcherOptions = [
        {
            title: "Поля",
            code: "form"
        }, {
            title: "Дополнительно",
            code: "advanced"
        }
    ];


    const [showMode, setShowMode] = useState<"form" | "advanced">("form");


    return (
        <div>
            <MultiSwitcher
                elements={multiSwitcherOptions}
                activeElementCode={showMode}
                onChange={(newMode) => setShowMode(newMode as "form" | "advanced")}
                classnameWrapper="mb-4"
            />

            {showMode == "form" &&
                <HackForm initialHack={hack} />
            }

            {showMode == "advanced" &&
                <HackAdvancedForm initialHack={hack} />
            }
        </div>
    )
}