"use client"

import Button from "@/app/_components/buttons/Button"
import Input, { IInput } from "@/app/_components/inputs/Input"
import strReplaceAt from "@/utils/strReplaceAt"
import { useActionState, useContext, useEffect, useRef, useState } from "react"
import loginCodeRequest from "../_requests/loginCodeRequest"
import clsx from "clsx"
import ContextUser from "@/context/ContextUser"
import setCookie from "@/utils/setCookie"
import { redirect, RedirectType, useRouter } from "next/navigation"

export default function LoginFormCode({
    email,
    changeForm
}: {
    email: string
    changeForm: () => void
}) {
    const CODE_LENGTH = 5;

    const router = useRouter();
    const { dispatchUser } = useContext(ContextUser);
    const [code, setCode] = useState<string>('');
    const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
    const [formState, formAction, isPending] = useActionState(loginCodeRequest, null);

    const formRef = useRef<HTMLFormElement>(null);
    const input1_ref = useRef<HTMLInputElement>(null);
    const input2_ref = useRef<HTMLInputElement>(null);
    const input3_ref = useRef<HTMLInputElement>(null);
    const input4_ref = useRef<HTMLInputElement>(null);
    const input5_ref = useRef<HTMLInputElement>(null);


    const codeFieldClick = () => {
        switch (code.length) {
            case 0: input1_ref.current?.focus();
                break
            case 1: input2_ref.current?.focus();
                break
            case 2: input3_ref.current?.focus();
                break
            case 3: input4_ref.current?.focus();
                break
            default: input5_ref.current?.focus();
                break
        }
    }


    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = event.clipboardData.getData('text/plain');
        const trimmedText = pastedText.trim();

        if (trimmedText.length == CODE_LENGTH) {
            // just spit and paste ONE char in each input.
            const croppedText = trimmedText.substring(0, 5);
            setCode(croppedText);
        }

        // event.preventDefault(); // reject event
    };


    const handleKeyPress = (indexOfInput: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // ==== catching backspace and del
        if (e.key === 'Backspace' || e.key === 'Delete') {
            let val = ' ';

            const newCode = strReplaceAt(code, indexOfInput, val);
            setCode(newCode)
        }
        // ---- catching backspace and del


        // ==== catching left and right arrows
        if (e.key === 'ArrowRight') {
            e.preventDefault();

            if (indexOfInput == 0) {
                input2_ref.current?.focus();
            } else if (indexOfInput == 1) {
                input3_ref.current?.focus();
            } else if (indexOfInput == 2) {
                input4_ref.current?.focus();
            } else if (indexOfInput == 3) {
                input5_ref.current?.focus();
            }
        }

        if (e.key === 'ArrowLeft') {
            e.preventDefault();

            if (indexOfInput == 1) {
                input1_ref.current?.focus();
            } else if (indexOfInput == 2) {
                input2_ref.current?.focus();
            } else if (indexOfInput == 3) {
                input3_ref.current?.focus();
            } else if (indexOfInput == 4) {
                input4_ref.current?.focus();
            }
        }
        // ---- catching left and right arrows


        // ==== catching backspace and del
        if (e.key === 'Backspace' || e.key === 'Delete') {
            let val = ' ';

            const newCode = strReplaceAt(code, indexOfInput, val);
            setCode(newCode)
        }
        // ---- catching backspace and del


        // ==== catching chars
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            let val = (e.key || "").toLocaleUpperCase();


            if (indexOfInput == 0) {
                input2_ref.current?.focus();
            } else if (indexOfInput == 1) {
                input3_ref.current?.focus();
            } else if (indexOfInput == 2) {
                input4_ref.current?.focus();
            } else if (indexOfInput == 3) {
                input5_ref.current?.focus();
            }

            const newCode = strReplaceAt(code, indexOfInput, val);
            setCode(newCode)
        };
        // ---- catching chars
    }

    // Modal will be closed by clicking on wrapper
    const inputCodeClick = (indexOfInput: number, event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (code.length)
            event.stopPropagation();
    }


    useEffect(() => {
        // ==== show the submit button when code length is 5
        if (code.length == 5) {
            formRef.current?.requestSubmit();
            setShowSubmitButton(true);
        }
        // ---- show the submit button when code length is 5
    }, [code])

    useEffect(() => {
        if (!!formState?.user && !!formState?.token) {
            // SUCCESS: has token and User
            setCookie('auth_token', formState.token);

            dispatchUser({
                type: "SET",
                user: formState.user,
                authentication_status: "authorized"
            });

            router.push('/dashboard'); // 
            router.refresh(); // without refresh() URL is not changing
        }
    }, [formState])


    return (
        <form
            ref={formRef}
            action={formAction}
            className="w-full lg:w-[400px] flex flex-col gap-4"
        >
            <div className="flex flex-col gap-2">
                <div className={clsx(`rounded-sm border border-neutral-800 hover:border-b-neutral-100  duration-300 focus:outline-hidden dark:bg-black/50 focus:bg-black 
                    flex  justify-center gap-2 mx-auto 
                    cursor-pointer p-2 text-xl`, {
                    'border-red-500': !!formState?.errors?.code
                })}
                    onClick={codeFieldClick}
                >
                    <input type="hidden" value={code} name="code" />
                    <input type="hidden" value={email} name="email" />

                    <Input
                        ref={input1_ref}
                        className="w-9 border-transparent focus:border-b-neutral-100 px-2 text-center cursor-pointer border-x-0 border-t-0"
                        maxLength={1}
                        onKeyDown={e => handleKeyPress(0, e)}
                        value={code[0] || ''}
                        readOnly
                        onClick={e => inputCodeClick(0, e)}
                        onPaste={handlePaste}
                    />
                    <Input
                        ref={input2_ref}
                        className="w-9 border-transparent focus:border-b-neutral-100 px-2 text-center cursor-pointer border-x-0 border-t-0"
                        maxLength={1}
                        onKeyDown={e => handleKeyPress(1, e)}
                        value={code[1] || ''}
                        readOnly
                        onClick={e => inputCodeClick(1, e)}
                        onPaste={handlePaste}

                    />
                    <Input
                        ref={input3_ref}
                        className="w-9 border-transparent focus:border-b-neutral-100 px-2 text-center cursor-pointer border-x-0 border-t-0"
                        maxLength={1}
                        onKeyDown={e => handleKeyPress(2, e)}
                        value={code[2] || ''}
                        readOnly
                        onClick={e => inputCodeClick(2, e)}
                        onPaste={handlePaste}

                    />
                    <Input
                        ref={input4_ref}
                        className="w-9 border-transparent focus:border-b-neutral-100 px-2 text-center cursor-pointer border-x-0 border-t-0"
                        maxLength={1}
                        onKeyDown={e => handleKeyPress(3, e)}
                        value={code[3] || ''}
                        readOnly
                        onClick={e => inputCodeClick(3, e)}
                        onPaste={handlePaste}

                    />
                    <Input
                        ref={input5_ref}
                        className="w-9 border-transparent focus:border-b-neutral-100 px-2 text-center cursor-pointer border-x-0 border-t-0"
                        maxLength={1}
                        onKeyDown={e => handleKeyPress(4, e)}
                        value={code[4] || ''}
                        readOnly
                        onClick={e => inputCodeClick(4, e)}
                        onPaste={handlePaste}

                    />
                </div>

                {!!formState?.errors?.code &&
                    <p className="text-red-500">
                        {formState.errors.code}
                    </p>
                }
            </div>

            <p>На почту: <span className="font-bold">{email}</span> был выслан код подтверждения. Введите его в поле выше.</p>

            {showSubmitButton &&
                <Button className="text-xl py-2 rounded-sm"
                    disabled={isPending}
                >
                    {isPending ? 'Проверка' : 'Отправить'}
                </Button>
            }

            <p>Код действителен в течении 15-ти минут.</p>

            {!!formState?.codeWasSent &&
                <Button type="button" className="py-1 rounded-sm">Отправить код снова</Button>
            }

            <Button onClick={changeForm} type="button" className="py-1 rounded-sm">Изменить почту</Button>

            {!!formState?.errors?.general &&
                <p className="text-red-500">
                    {formState.errors.general}
                </p>
            }
        </form>
    )
}