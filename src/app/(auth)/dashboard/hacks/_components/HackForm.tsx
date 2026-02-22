"use client"

import { Hack } from "@/types/Hack";
import { useActionState, useCallback, useContext, useEffect, useRef, useState } from "react"
import saveHackRequest from "../_requests/saveHackRequest";
import { Save } from "lucide-react";
import TextareaV2Styled from "@/app/_components/inputs/TextareaV2Styled";
import Editorjs from "@/app/_components/inputs/Editorjs";
import ContextToast from "@/context/messages/Toaster/ContextToast";
import DomainSelectorWrapper from "./DomainSelectorWrapper";


export default function HackForm({
    initialHack = null,
}: {
    initialHack?: Hack | null
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, formAction, isPending] = useActionState(saveHackRequest, null);
    const [data, setData] = useState<Record<string, any>>({
        id: initialHack?.id && String(initialHack?.id) || null,
        title: initialHack?.title || "",
        domains: initialHack?.domains || [],
        // value: initialHack?.value || "" // editorjs has dynamical import, and handlers don't recreating on rerenders
    });
    const { dispatchToast } = useContext(ContextToast);
    const [value, setValue] = useState<string>(initialHack?.value || '');



    useEffect(() => {
        if (formState?.errors?.general) {
            dispatchToast({
                type: "SET",
                title: "Ошибка",
                style: "red",
                message: formState.errors.general,
            });
        }

        if (formState?.id != undefined && data.id == undefined) {
            // ==== HACK WAS CREATED HAS ID
            setData({ ...data, id: formState.id });

        }
    }, [formState]);


    useEffect(() => {
        // BRIDGE: I can't send form using onBlur on Editorjs. Because need to write his value to somewhere.
        // Or implementation this feauture will be so clumsily
        formRef.current!.requestSubmit();
    }, [value]);


    const inputsBlur = useCallback(() => {
        if (value?.length > 1) {
            formRef.current!.requestSubmit();
        }
    }, [value])




    return (
        <div>
            <form ref={formRef}
                action={formAction}
                className="grid w-3/4 gap-4"
            >
                {data.id &&
                    <input type="hidden" name="id" value={data.id} />
                }

                <div className="grid">
                    <label htmlFor="title">Заголовок</label>
                    <TextareaV2Styled id="title"
                        rows={4}
                        maxLength={65535}
                        placeholder="Пример использования useState"
                        onBlur={inputsBlur}
                        error={formState?.errors?.title}
                        className="w-full"
                        value={data.title || ""}
                        onChange={e => setData({ ...data, title: e.target.value || "" })}
                    />
                </div>

                <div className="mb-6">
                    <DomainSelectorWrapper
                        hackId={data.id}
                        initialUsedDomains={initialHack?.domains || []}
                    />
                </div>


                <div>
                    <h4>Содержимое хака (копируемый текст)*:</h4>
                    <Editorjs
                        className="border-r dark:border-neutral-800 border-neutral-300"
                        hideToolbar
                        onBlur={(content: string) => setValue(content)}
                        savedData={value || undefined}
                    />

                    {formState?.errors?.value &&
                        <div className="text-red-500">
                            {formState?.errors?.value}
                        </div>
                    }
                    <input type="hidden" name="value" value={value} />
                </div>
            </form>


            {/** saving icon */}
            {isPending &&
                <div className="fixed right-4 bottom-4 animate-pulse">
                    <Save className="dark:stroke-neutral-700 stroke-neutral-300" />
                </div>
            }
        </div>
    )
}