import { stateToastInitial, ToastContextType } from "./ContextToast";


export type ToastDispatchAction =
    | ({ type: 'SET' } & ToastContextType)
    | { type: 'RESET' }


export default function ReducerToast(
    state: ToastContextType,
    action: ToastDispatchAction
): ToastContextType {
    const { type,
        ...newType } = action;

    // here you can define default data
    const {
        secondsBeforeHide = 4,
        title = null,
        actionOnButton = undefined,
        message = null,
        buttonText = undefined,
        style = "default",
        ...newAction
    } = newType as ToastContextType


    switch (type) {
        case "SET":
            return {
                title, secondsBeforeHide, actionOnButton, message, buttonText, style,
                ...newAction
            }

        case "RESET":
            return stateToastInitial;

        default:
            return state;
    }
}