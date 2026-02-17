"use client"

import ContextToast, { stateToastInitial } from "@/context/messages/Toaster/ContextToast";
import ReducerToast from "@/context/messages/Toaster/ReduceToast";
import { useEffect, useReducer, useState } from "react"
import Button from "../buttons/Button";
import { Check } from "lucide-react";
import clsx from "clsx";

export default function ToastProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [stateToast, dispatchToast] = useReducer(ReducerToast, stateToastInitial);
    const [showToast, setShowToast] = useState<boolean>(false);


    useEffect(() => {
        if (!!stateToast.message || !!stateToast.title) {
            setShowToast(true);

            if (!!stateToast.secondsBeforeHide) {
                setInterval(() => setShowToast(false), 1000 * stateToast.secondsBeforeHide)
            }
        }
    }, [stateToast]);


    return (
        <ContextToast.Provider value={{ stateToast, dispatchToast }}>
            {showToast &&
                <div className={clsx(`w-[300px] top-[40px]
                        border 
                        rounded-lg
                        fixed z-[99] left-1/2 -translate-x-1/2
                        flex gap-1 p-6 justify-between`, {
                            "bg-white dark:bg-neutral-950 dark:border-neutral-800 border-neutral-300": stateToast.style == "default",
                            "bg-emerald-100  dark:text-white dark:bg-emerald-950 dark:border-emerald-700 border-emerald-300": stateToast.style == "green",
                            "bg-red-100 dark:bg-red-950 dark:border-red-800 border-red-300": stateToast.style == "red"
                        })}

                    onClick={e => setShowToast(false)}
                >
                    <div className="flex flex-col gap-1 justify-around">
                        {!!stateToast.title &&
                            <div className="font-bold">
                                {stateToast.title}
                            </div>
                        }

                        {!!stateToast.message &&
                            <div className="text-sm">
                                {stateToast.message}
                            </div>
                        }
                    </div>

                    {stateToast.actionOnButton != undefined &&
                        <div className="flex items-center">
                            <Button
                                className="p-1 rounded-sm"
                                onClick={e => {
                                    e.stopPropagation();
                                    stateToast.actionOnButton!()
                                }}
                            >
                                {stateToast.buttonText || <Check />}
                            </Button>
                        </div>
                    }
                </div>

            }

            {children}
        </ContextToast.Provider>
    )
}