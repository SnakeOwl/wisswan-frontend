"use client"

import ContextUser, { stateUserInitial } from "@/context/ContextUser";
import ReducerUser from "@/context/ReduceUser";
import { useReducer } from "react"
import UserInitiator from "./UserInitiator";

export default function UserProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [stateUser, dispatchUser] = useReducer(ReducerUser, stateUserInitial);

    return (
        <ContextUser.Provider value={{ stateUser, dispatchUser }}>
            <UserInitiator />

            {children}
        </ContextUser.Provider>
    )
}