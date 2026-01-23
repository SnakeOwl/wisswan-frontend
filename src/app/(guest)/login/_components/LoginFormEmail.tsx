"use client"

import Button from "@/app/_components/buttons/Button";
import InputV2 from "@/app/_components/inputs/InputV2";
import React, { useActionState, useEffect } from "react"
import loginRequest from "../_requests/loginRequest";

const LoginFormEmail = React.memo(({
    changeForm,
    email,
    setEmail
}: {
    changeForm: () => void
    email: string
    setEmail: (val: string) => void
}) => {
    const [formState, formAction, isPending] = useActionState(loginRequest, null);


    useEffect(() => {
        if (!!formState?.success) {
            // code was ыend
            changeForm();
        }
    }, [formState]);


    return (
        <form
            action={formAction}
            className="w-full lg:w-[400px] flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>

                <InputV2 id="email"
                    name="email"
                    type="email"
                    error={formState?.errors?.email}
                    value={email}
                    onChange={e => setEmail(e.target.value || '')}

                    className="p-2 rounded-sm w-full"
                    placeholder="WalterWhite@ggmail.com"
                />
            </div>

            <Button className="text-xl py-2 rounded-sm"
                disabled={isPending || email.length < 4}
            >
                Выслать код
            </Button>
            <Button onClick={changeForm} type="button">change form</Button>
        </form>
    )
})


LoginFormEmail.displayName = 'LoginFormEmail';

export default LoginFormEmail;