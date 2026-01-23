import React from "react"
import Input from "./Input"
import clsx from "clsx"

export interface IInputV2 extends React.InputHTMLAttributes<HTMLInputElement> {
    classNameWrapper?: string
    classNameInfo?: string
    error?: string | boolean
    success?: string | boolean
    warning?: string | boolean
}


const InputV2 = React.memo(({
    classNameWrapper,
    classNameInfo,
    error,
    success,
    warning,
    className,
    ...other
}: IInputV2) => {
    const infoText: string | false = (typeof error === "string" && error)
        || (typeof warning === "string" && warning)
        || (typeof success === "string" && success)
        || false; // no info

    const showInfo = infoText != false;

    const hasError = !!error;
    const hasWarning = !!warning;
    const hasSuccess = !!success;



    return (
        <div className={classNameWrapper}>
            <Input
                className={clsx(className, {
                    "!border-red-500 ": hasError,
                    "!border-amber-500 ": !hasError && hasWarning,
                    "!border-emerald-500 ": !hasError && !hasWarning && hasSuccess,
                })}
                {...other}
            />

            {showInfo &&
                <div
                    className={clsx(classNameInfo, {
                        "!text-red-500 ": hasError,
                        "!text-amber-500 ": !hasError && hasWarning,
                        "!text-emerald-500 ": !hasError && !hasWarning && hasSuccess,
                    })}
                >
                    {infoText}
                </div>
            }
        </div>
    )
})


export default InputV2;