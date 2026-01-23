"use client"
import { User } from '@/types/User';
import React from 'react';
import { UserDispatchAction } from './ReduceUser';

export type UserContextType = {
    user: User | null
    authentication_status: "unknown" | "authorized" | "unauthorized" // 'unknown' on start, theother after check.
};

export const stateUserInitial: UserContextType = {
    user: null,
    authentication_status: "unknown",
}


const ContextUser = React.createContext<{
    stateUser: UserContextType,
    dispatchUser: React.Dispatch<UserDispatchAction>
}>({
    stateUser: stateUserInitial,
    dispatchUser: () => { }
});

export default ContextUser;