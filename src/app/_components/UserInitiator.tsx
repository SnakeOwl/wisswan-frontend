"use client"

import ContextUser from "@/context/ContextUser";
import { User } from "@/types/User";
import { deleteCookie } from "@/utils/deleteCookie";
import getCookie from "@/utils/getCookie";
import getUser from "@/utils/getUser";
import React, { useContext, useEffect } from "react";

const UserInitiator = React.memo(() => {
    const { dispatchUser } = useContext(ContextUser);


    // ==== checking auth_token in cookies
    useEffect(() => {
        getCookie('auth_token').then((token) => {
            if (typeof token === 'string') {
                getUser().then((user: User | null) => {
                    
                    if (user !== null) {
                        dispatchUser({
                            type: 'SET',
                            authentication_status: "authorized",
                            user: user,
                        });
                    } else {
                        // can't get the User by token
                        dispatchUser({
                            type: 'SET',
                            authentication_status: "unauthorized",
                            user: null,
                        });
                        
                        deleteCookie('auth_token');
                    }
                });

            } else {
                // no token
                dispatchUser({
                    type: 'SET',
                    authentication_status: "unauthorized",
                    user: null,
                });
            }
        })
    }, []);
    // ---- checking auth_token in cookies



    return null; // need only functional part
})


UserInitiator.displayName = "ParticlesWrapper";

export default UserInitiator;