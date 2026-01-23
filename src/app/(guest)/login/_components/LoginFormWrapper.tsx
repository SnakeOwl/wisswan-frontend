"use client"

import { useState } from "react"
import LoginFormEmail from "./LoginFormEmail";
import LoginFormCode from "./LoginFormCode";

export default function LoginFormWrapper() {
    const [showEmailForm, setShowEmailForm] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');

    return showEmailForm
        ? <LoginFormEmail
            changeForm={() => setShowEmailForm(!showEmailForm)}
            email={email}
            setEmail={setEmail}
        />
        : <LoginFormCode
            changeForm={() => setShowEmailForm(!showEmailForm)}
            email={email}
        />;
}