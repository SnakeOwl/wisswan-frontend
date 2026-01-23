import { UserContextType } from "./ContextUser";


export type UserDispatchAction =
    | ({ type: 'SET' } & UserContextType)
    | { type: 'RESET' }


export default function ReducerUser(
    state: UserContextType,
    action: UserDispatchAction
): UserContextType {
    // Исключаем поле `type`
    const { type, ...newAction } = action;


    switch (type) {
        case "SET":
            return {
                ...newAction as UserContextType
            }

        case "RESET":
            return {
                user: null,
                authentication_status: "unknown",
            }

        default:
            return state;
    }
}