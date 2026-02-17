"use client"

import React from 'react';
import { ToastDispatchAction } from './ReduceToast';


export type ToastContextType = {
    title: string | null
    message?: string | null | React.ReactNode
    secondsBeforeHide?: number
    style?: "default" | "green" | "red"
    actionOnButton?: () => void
    buttonText?: string
};


export const stateToastInitial: ToastContextType = {
    title: null,
    message: null,
    style: "default",
    secondsBeforeHide: 4,
}


/**
 * @example
 * dispatchToast({
        type: "SET",
        title: "Сохранено",
        secondsBeforeHide: 4,
        style: "green",
    })
 */
const ContextToast = React.createContext<{
    stateToast: ToastContextType,
    dispatchToast: React.Dispatch<ToastDispatchAction>
}>({
    stateToast: stateToastInitial,
    dispatchToast: () => { }
});

export default ContextToast;