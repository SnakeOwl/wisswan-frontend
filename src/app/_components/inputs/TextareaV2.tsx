import { RefObject } from "react"
import Textarea from "./Textarea"
import clsx from "clsx"

export interface ITextareaV2 extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    classNameWrapper?: string
    classNameInfo?: string
    error?: string | boolean
    success?: string | boolean
    warning?: string | boolean
}

export default function TextareaV2({
    classNameWrapper,
    classNameInfo,
    error,
    success,
    warning,
    className,
    ...other
}: ITextareaV2) {
    const name = other.name ? other.name : other.id ? other.id : undefined;
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
            <Textarea
                name={name}
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
}